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
              :readonly="propType === 2"
              input-align="right"
              v-model="formData[field.vanFieldProps.name]"
              v-if="field.show ? field.show(formData) : true"
              v-bind="field.vanFieldProps"
              :placeholder="propType === 2 ? '' : field.vanFieldProps.placeholder"
            >
              <template #extra v-if="field.suffixUnit">
                <span class="suffixUnit">{{ field.suffixUnit }}</span>
              </template>
            </van-field>
          </template>
        </van-cell-group>
        <div style="margin: 16px" v-if="propType !== 2">
          <van-button block type="primary" native-type="submit"> 提交 </van-button>
        </div>
        <div class="btns" v-if="propType === 2 && formData.id">
          <div class="bottom-btns">
            <div>
              <van-button
                block
                type="primary"
                native-type="submit"
                @click="handleClickOption({ value: 'diaryEdit' })"
              >
                修改
              </van-button>
            </div>
            <div>
              <van-button
                block
                type="danger"
                native-type="submit"
                @click="handleClickOption({ value: 'diaryDel' })"
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
import { useRoute } from 'vue-router'
import { formatDate, eventBus, objectToQueryString } from '@/utils'
import { DIARYFIELDS } from './constant.js'
import diaryService from '../../service/diaryService'
import { showConfirmDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()

const typeFieldsMap = {
  1: DIARYFIELDS,
  2: DIARYFIELDS
}

// 接收路由参数
const route = useRoute()
const propType = ref(route.query.type && Number(route.query.type))
const propTitle = route.query.title
const propItem = route.query.item && JSON.parse(route.query.item as string)

const formIns = ref(null)
const formData = reactive({
  id: '',
  title: '',
  content: '',
  date: formatDate(new Date(), 'YYYY-MM-DD'),
  ...propItem
})

const formFields = ref(typeFieldsMap[propType.value])

// 导航栏点击返回
const onClickLeft = () => {
  router.go(-1)
}

// 添加Item
const addItem = async (val) => {
  const res = await diaryService.addDiaryData(val)
  if (res) {
    showToast('添加成功')
    onClickLeft()
  }
}

// 编辑Item
const editItem = async (val) => {
  const res = await diaryService.updateDiaryData(val)
  if (res) {
    showToast('编辑成功')
    onClickLeft()
  }
}

const deleteItem = async () => {
  const res = await diaryService.deleteDiaryDataByKey(propItem.id)
  if (res) {
    showToast('删除成功')
  }
}

// 跳转页面
const gotoPage = (val, params?) => {
  switch (val) {
    case 'diaryForm':
      router.replace('/diaryForm' + objectToQueryString(params))
      eventBus.emit('refreshPage')
      break
    default:
      break
  }
}

// 点击遮罩按钮面板选项
const handleClickOption = (action) => {
  console.log(action.text)
  switch (action.value) {
    case 'diaryEdit':
      gotoPage('diaryForm', {
        type: 1,
        title: propItem?.title || '-',
        item: JSON.stringify(propItem)
      })
      break
    case 'diaryDel':
      showConfirmDialog({
        title: `确认删除${propItem?.title}吗？`,
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
      // 分享的新建和编辑 id title* content* date(默认今天) updateTime(不让选)
      if (propItem && propItem.id) {
        editItem({ ...propItem, ...val, updateTime: formatDate(new Date(), 'YYYY-MM-DD') })
      } else {
        addItem({
          ...val,
          updateTime: formatDate(new Date(), 'YYYY-MM-DD')
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
