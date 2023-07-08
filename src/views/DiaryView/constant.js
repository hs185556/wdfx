// 1:新建/修改分享
// id title* content* date(默认今天) updateTime(不让选)
// 2:分享详情
// readonly
export const DIARYFIELDS = [
  {
    vanFieldProps: {
      label: '分享标题',
      name: 'title',
      placeholder: '请输入分享标题',
      required: true
    }
  },
  {
    vanFieldProps: {
      autosize: true,
      'label-align': 'top',
      'input-align': 'left',
      label: '内容',
      name: 'content',
      placeholder: '请输入分享内容',
      type: 'textarea',
      rows: 5,
      maxlength: '500',
      'show-word-limit': true
    }
  },
  {
    vanFieldProps: {
      label: '日期',
      name: 'startTime',
      placeholder: '请选择日期',
      required: true,
      type: 'date'
    }
  }
]
