<template>
  <div class="nav-editor">
    <div class="editor-actions">
      <button @click="exportNav" class="btn-export" title="导出导航数据">
        📥 导出
      </button>
      <button @click="triggerImport" class="btn-import" title="导入导航数据">
        📤 导入
      </button>
      <button @click="resetToDefault" class="btn-reset" title="重置为默认">
        🔄 重置
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".json"
        @change="handleFileImport"
        style="display: none"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { storage } from '../utils/storage'
import { navigationData } from '../data/navigation'

export default {
  name: 'NavEditor',
  emits: ['import'],
  setup(_, { emit }) {
    const fileInput = ref(null)

    const exportNav = () => {
      const dataToExport = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        categories: navigationData.categories,
      }

      const dataStr = JSON.stringify(dataToExport, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `nav-export-${Date.now()}.json`
      link.click()
      URL.revokeObjectURL(url)
    }

    const triggerImport = () => {
      fileInput.value?.click()
    }

    const handleFileImport = (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result)
          if (importedData.categories && Array.isArray(importedData.categories)) {
            emit('import', importedData.categories)
            alert('导航数据导入成功！')
          } else {
            alert('导入文件格式不正确')
          }
        } catch (error) {
          alert('导入文件解析失败: ' + error.message)
        }
      }
      reader.readAsText(file)
      fileInput.value.value = ''
    }

    const resetToDefault = () => {
      if (confirm('确定要重置为默认导航数据吗？')) {
        storage.remove('customNavigation')
        emit('import', navigationData.categories)
        alert('已重置为默认导航数据')
      }
    }

    return {
      fileInput,
      exportNav,
      triggerImport,
      handleFileImport,
      resetToDefault,
    }
  },
}
</script>

<style scoped lang="scss">
.nav-editor {
  padding: 1rem 0;
}

.editor-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;

  button {
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: var(--transition);

    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }
  }

  .btn-export {
    background-color: var(--info-color);

    &:hover {
      background-color: #117a8b;
    }
  }

  .btn-import {
    background-color: var(--success-color);

    &:hover {
      background-color: #218838;
    }
  }

  .btn-reset {
    background-color: var(--warning-color);
    color: #212529;

    &:hover {
      background-color: #e0a800;
    }
  }
}
</style>
