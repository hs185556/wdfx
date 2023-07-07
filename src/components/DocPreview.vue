<template>
  <div>
    <button style="z-index: 999" @click="save">下载</button>
    <!-- <div id="wordView"></div> -->
    <vue-office-docx :src="src" v-if="src" style="height: 100vh" @rendered="rendered" />
    <!-- <vue-office-docx :src="docx" style="height: 100vh" @rendered="rendered" /> -->
  </div>
</template>

<script>
// import * as mammoth from 'mammoth'
import axios from 'axios'
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import saveAs from 'file-saver'

export default {
  components: {
    VueOfficeDocx
  },
  data() {
    return {
      docx: 'http://static.shanhuxueyuan.com/test6.docx', //设置文档网络地址，可以是相对地址
      src: '',
      downloadUrl: ''
    }
  },
  methods: {
    rendered() {
      console.log('渲染完成')
    },
    save() {
      saveAs(this.downloadUrl, 'test6.docx')
    }
  },
  mounted() {
    axios({
      method: 'get',
      responseType: 'arraybuffer', // 设置响应文件格式
      url: this.docx
    }).then(({ data }) => {
      this.src = data
      const blob = new Blob([data])
      this.downloadUrl = window.URL.createObjectURL(blob)
    })
  }
}
</script>
