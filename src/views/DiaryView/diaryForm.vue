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
              v-if="field.show ? field.show(formData.status) : true"
              v-bind="field.vanFieldProps"
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
        <div style="margin: 16px" v-if="propType === 2 && formData.id">
          <van-button block type="primary" native-type="submit"> 编辑 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { eventBus } from '@/utils'
import { DIARYFIELDS } from './constant.js'

const typeFieldsMap = {
  1: DIARYFIELDS,
  2: DIARYFIELDS
}

// 接收路由参数
const route = useRoute()
const propType = route.query.type && Number(route.query.type)
const propTitle = route.query.title

const formIns = ref(null)
const formData = reactive({
  id: '',
  title: '',
  content: '',
  date: '',
})

const formFields = ref(typeFieldsMap[propType])

// 导航栏点击返回
const onClickLeft = () => history.back()

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
  }
}
</style>
