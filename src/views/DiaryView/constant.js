// 1:新建/修改分享
// id title* content* date(默认今天) updateTime(不让选)
// 2:分享详情
// readonly
export const DIARYFIELDS = [
  {
    vanFieldProps: {
      label: '标题',
      name: 'title',
      placeholder: '请输入标题',
      required: true,
      rules: [{ required: true, message: '请填写标题' }]
    }
  },
  {
    vanFieldProps: {
      // autosize: true,
      'label-align': 'top',
      'input-align': 'left',
      label: '内容',
      name: 'content',
      placeholder: '请输入内容',
      type: 'textarea',
      rows: 10,
      maxlength: '500',
      'show-word-limit': true,
      required: true,
      rules: [{ required: true, message: '请填写内容' }]
    }
  },
  {
    vanFieldProps: {
      label: '日期',
      name: 'date',
      placeholder: '请选择日期',
      required: true,
      type: 'date',
      required: true,
      rules: [{ required: true, message: '请填写日期' }]
    }
  }
]
