<template>
  <div style="display: flex">
    <button @click="changeType('docs')" style="margin-right: 10px">docs</button>
    <button @click="changeType('docsUpload')" style="margin-right: 10px">docsUpload</button>
    <button @click="changeType('pdf')" style="margin-right: 10px">pdf</button>
    <button @click="changeType('doc')" style="margin-right: 10px">doc</button>
  </div>
  <div class="flex1Column">
    <docs-preview v-if="type === 'docs'"></docs-preview>
    <docs-upload-preview v-if="type === 'docsUpload'"></docs-upload-preview>
    <pdf-preview v-if="type === 'pdf'"></pdf-preview>
    <doc-preview v-if="type === 'doc'"></doc-preview>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DocsPreview from '@/components/DocsPreview.vue'
import DocsUploadPreview from '@/components/DocsUploadPreview.vue'
import PdfPreview from '@/components/PdfPreview.vue'
import DocPreview from '@/components/DocPreview.vue'
const type = ref('doc')
const changeType = (v) => {
  type.value = v
}
</script>
