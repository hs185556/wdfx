<template>
  <div id="wordView"></div>
</template>

<script>
import * as mammoth from 'mammoth'
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      docx: 'http://127.0.0.1:5500/src/assets/upm1%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.doc' //设置文档网络地址，可以是相对地址
    }
  },
  methods: {
    rendered() {
      console.log('渲染完成')
    }
  },
  mounted() {
    axios({
      method: 'get',
      responseType: 'arraybuffer', // 设置响应文件格式
      url: 'http://127.0.0.1:5500/src/assets/upm1%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.doc'
    }).then(({ data }) => {
      mammoth
        .convertToHtml({ arrayBuffer: new Uint8Array(data) })
        .then(function (resultObject) {
          this.$nextTick(() => {
            document.querySelector('#wordView').innerHTML = resultObject.value
          })
        })
    })
  }
}
</script>
