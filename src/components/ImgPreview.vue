<template>
  <div>
    <button style="z-index: 999" @click="save">下载</button>
    <img :src="src" style="float: right" />
  </div>
</template>

<script>
// import * as mammoth from 'mammoth'
import axios from 'axios'
import saveAs from 'file-saver'

export default {
  components: {
  },
  data() {
    return {
      docx: 'http://127.0.0.1:5500/src/assets/R-C.jpg', //设置文档网络地址，可以是相对地址
      src: '',
      downloadUrl: ''
    }
  },
  methods: {
    rendered() {
      console.log('渲染完成')
    },
    save() {
      saveAs(this.downloadUrl, 'R-C.jpg')
    }
  },
  mounted() {
    axios({
      method: 'get',
      // responseType: 'arraybuffer', // 设置响应文件格式
      responseType: 'blob', // 设置响应文件格式
      url: this.docx
    }).then(({ data }) => {
      // const blob = new Blob([data])
      const blob = data
      this.src = window.URL.createObjectURL(blob)
      this.downloadUrl = this.src
    })
  }
}
</script>
