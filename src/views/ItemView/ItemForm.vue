<template>
  <div class="wrapper flexDirectionColumn">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      :title="propTitle"
      :border="false"
      style="margin-bottom: 12px"
      class="shadow-box"
    />
    <div class="content flex1Column">
      <van-form @submit="onSubmit" ref="formIns" class="flexDirectionColumn">
        <van-cell-group inset class="flex1Column" style="overflow: auto">
          <template v-for="field in formFields" :key="field.name">
            <van-field
              :readonly="propType === 5"
              input-align="right"
              v-model="formData[field.vanFieldProps.name]"
              v-if="field.show ? field.show(formData.status) : true"
              v-bind="field.vanFieldProps"
              :placeholder="propType === 5 ? '' : field.vanFieldProps.placeholder"
            >
              <template #extra v-if="field.suffixUnit">
                <span class="suffixUnit">{{ field.suffixUnit }}</span>
              </template>
            </van-field>
          </template>
        </van-cell-group>
        <div style="margin: 16px" v-if="propType !== 5">
          <van-button block type="primary" native-type="submit"> 提交 </van-button>
        </div>
        <div class="btns" v-if="propType === 5 && formData.id">
          <van-button
            block
            type="primary"
            native-type="submit"
            @click="handleClickOption({ value: 'itemSet' })"
          >
            {{ formData.status === 0 ? '设置为已完成' : '设置为未完成' }}
          </van-button>
          <div class="bottom-btns">
            <div>
              <van-button
                block
                type="default"
                native-type="submit"
                @click="handleClickOption({ value: 'itemEdit' })"
              >
                修改
              </van-button>
            </div>
            <div>
              <van-button
                block
                type="danger"
                native-type="submit"
                @click="handleClickOption({ value: 'itemDel' })"
              >
                删除
              </van-button>
            </div>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDate, eventBus, objectToQueryString } from '@/utils'
import { showConfirmDialog, showToast } from 'vant'
import itemService from '../../service/itemService'
import { THEMEFIELDS, CATEGORYFIELDS, ITEMFIELDS, FINISHFIELDS } from './constant.js'

const typeFieldsMap = {
  1: THEMEFIELDS,
  2: CATEGORYFIELDS,
  3: ITEMFIELDS,
  4: FINISHFIELDS,
  5: ITEMFIELDS
}

// 接收路由参数
const route = useRoute()
const router = useRouter()
const propType = ref(route.query.type && Number(route.query.type))
const propTitle = route.query.title
const propItem = route.query.item && JSON.parse(route.query.item as string)
const propParentId = route.query.parentId && Number(route.query.parentId)

const formIns = ref(null)
const formData = reactive({
  id: '',
  name: '',
  startTime: '',
  stopTime: '',
  updateTime: '',
  expectedHours: '',
  actualHours: '',
  steps: '',
  summary: '',
  status: undefined,
  parentId: '',
  type: 3,
  ...(propItem || {})
})

const formFields = ref(typeFieldsMap[propType.value])

// 导航栏点击返回
const onClickLeft = () => {
  router.go(-1)
}

// 添加Item
const addItem = async (val) => {
  const res = await itemService.addItemData(val)
  if (res) {
    showToast('添加成功')
    // 如果添加主题，则默认选中这个新添加的主题
    if (propType.value == 1) localStorage.setItem('themeId', res)
    onClickLeft()
  }
}

// 编辑Item
const editItem = async (val) => {
  const res = await itemService.updateItemData(val)
  if (res) {
    showToast('编辑成功')
    onClickLeft()
  }
}

// 跳转页面
const gotoPage = (val, params?) => {
  switch (val) {
    case 'itemForm':
      router.replace('/itemForm' + objectToQueryString(params))
      eventBus.emit("refreshPage")
      break
    default:
      break
  }
}

// 删除item以及item下的数据
const deleteItem = async () => {
  const res = await itemService.deleteItemAndRelatedDataByKey(propItem.id)
  if (res) {
    showToast('删除成功')
    onClickLeft()
  }
}

// 点击遮罩按钮面板选项
const handleClickOption = (action) => {
  console.log(action.text)
  switch (action.value) {
    case 'itemSet':
      gotoPage('itemForm', {
        type: 4,
        title: propItem?.name || '-',
        item: JSON.stringify(propItem)
      })
      break
    case 'itemEdit':
      gotoPage('itemForm', {
        type: 3,
        title: propItem?.name || '-',
        item: JSON.stringify(propItem)
      })
      break
    case 'itemDel':
      showConfirmDialog({
        title: `确认删除${propItem.name}及其关联数据吗？`,
        confirmButtonColor: '#ee0a24'
      })
        .then(() => {
          deleteItem()
        })
        .catch(() => {
          // on cancel
        })
      break
    default:
      break
  }
}

// 提交
const onSubmit = (val) => {
  switch (propType.value) {
    case 1:
      // 主题的新建和编辑 type:1 updateTime
      if (propItem && propItem.id) {
        editItem({ ...propItem, ...val, updateTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') })
      } else {
        addItem({
          ...val,
          type: 1,
          parentId: propParentId,
          updateTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
        })
      }
      break
    case 2:
      // 类目的新建和编辑 type:2 parentId updateTime
      if (propItem && propItem.id) {
        editItem({ ...propItem, ...val, updateTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') })
      } else {
        addItem({
          ...val,
          type: 2,
          parentId: propParentId,
          updateTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
        })
      }
      break
    case 3:
      // 条目的新建和编辑 type:3 parentId updateTime status:0
      if (propItem && propItem.id) {
        editItem({ ...propItem, ...val, updateTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') })
      } else {
        addItem({
          ...val,
          type: 3,
          parentId: propParentId,
          updateTime: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          status: 0
        })
      }
      break
    case 4:
      // 设置为已完成和未完成 type:3 updateTime status: 0 || 1 || 2
      if (propItem && propItem.id) {
        let updateTime = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
        let status =
          propItem.status === 0
            ? propItem.stopTime &&
              formatDate(new Date(propItem.stopTime), 'YYYY-MM-DD HH:mm:ss') < updateTime
              ? 2
              : 1
            : 0
        editItem({
          ...propItem,
          ...val,
          updateTime,
          status
        })
      }
      break
    default:
      break
  }
}

onMounted(() => {
  // 隐藏底部标签
  eventBus.emit('hiddenTabbar', true)
})

onUnmounted(() => {
  eventBus.emit('hiddenTabbar', false)
})

defineExpose({
  formIns
})
</script>

<style scoped lang="scss">
input[type='datetime-local'] {
  width: 100%;
}
.wrapper {
  background: #f2f2f7;
  height: 100%;
  .content {
    background: #fff;
    overflow: auto;
    :deep(.van-cell-group--inset) {
      margin: 0;
    }
    :deep(.van-field__error-message) {
      text-align: right;
    }
    :deep(.van-cell:last-child:after, .van-cell--borderless:after) {
      display: block;
    }
    .suffixUnit {
      color: #828282;
      margin-left: 0.5rem;
    }
    .btns {
      margin: 16px;
      .bottom-btns {
        margin-top: 12px;
        display: flex;
        & > div {
          width: calc(50% - 4px);
          margin-right: 8px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
