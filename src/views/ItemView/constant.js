// 1:新建/修改主题
// id *name updateTime(不让选) type(默认1)
// 2:新建/修改类目
// id *name parentId(不让选) updateTime(不让选) type(默认2)
// 3:新建/修改条目
// id *name *startTime stopTime updateTime(不让选) *expectedHours actualHours(status不为0展示) step summary(status不为0展示) status(新建默认0) parentId(不然选) type(默认3)
// 4:完成条目
// id  status(根据时间自动判断为1/2) expectedHours(仅展示) *actualHours step summary updateTime(不让选)
// 5:条目详情
// readonly
export const THEMEFIELDS = [
  {
    vanFieldProps: {
      label: '主题名称',
      name: 'name',
      placeholder: '请输入主题名称',
      required: true
    }
  }
]

export const CATEGORYFIELDS = [
  {
    vanFieldProps: {
      label: '类目名称',
      name: 'name',
      placeholder: '请输入类目名称',
      required: true
    }
  }
]

export const ITEMFIELDS = [
  {
    vanFieldProps: {
      label: '类目名称',
      name: 'name',
      placeholder: '请输入类目名称',
      required: true
    }
  },
  {
    vanFieldProps: {
      label: '开始时间',
      name: 'startTime',
      placeholder: '请选择开始时间',
      required: true,
      type: 'datetime-local'
    }
  },
  {
    vanFieldProps: {
      label: '截止时间',
      name: 'stopTime',
      placeholder: '请选择截止时间',
      type: 'datetime-local'
    }
  },
  {
    suffixUnit: '时',
    vanFieldProps: {
      label: '预计时长',
      name: 'expectedHours',
      type: 'number'
    }
  },
  {
    suffixUnit: '时',
    show: (v) => v != 0, //  TODO 自定义 需要实现
    vanFieldProps: {
      label: '实际时长',
      name: 'actualHours',
      type: 'number'
    }
  },
  {
    vanFieldProps: {
      autosize: true,
      'label-align': 'top',
      'input-align': 'left',
      label: '步骤',
      name: 'steps',
      placeholder: '请输入条目步骤',
      type: 'textarea',
      rows: 5,
      maxlength: '500',
      'show-word-limit': true
    }
  },
  {
    show: (v) => v != 0, //  TODO 自定义 需要实现
    vanFieldProps: {
      autosize: true,
      'label-align': 'top',
      'input-align': 'left',
      label: '总结',
      name: 'summary',
      placeholder: '请输入条目总结',
      type: 'textarea',
      rows: 5,
      maxlength: '500',
      'show-word-limit': true
    }
  }
]

export const FINISHFIELDS = [
  {
    vanFieldProps: {
      readonly: true,
      label: '类目名称',
      name: 'name',
      placeholder: '请输入类目名称',
      required: true
    }
  },
  {
    suffixUnit: '时',
    vanFieldProps: {
      readonly: true,
      label: '预计时长',
      name: 'expectedHours',
      type: 'number'
    }
  },
  {
    suffixUnit: '时',
    vanFieldProps: {
      label: '实际时长',
      name: 'actualHours',
      type: 'number',
      required: true
    }
  },
  {
    vanFieldProps: {
      autosize: true,
      'label-align': 'top',
      'input-align': 'left',
      label: '总结',
      name: 'summary',
      placeholder: '请输入条目总结',
      type: 'textarea',
      rows: 5,
      maxlength: '500',
      'show-word-limit': true
    }
  }
]
