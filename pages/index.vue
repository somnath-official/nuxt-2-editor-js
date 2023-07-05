<template>
  <div>
    <header-component />
    <main class="container mt-4">
      <editor-component
        name="test"
        :readOnly="false"
        placeholder="Hello Editor JS..."
        @onReady="onEditorReady"
        @onChange="onEditorStateChange"
        @onSaveSuccess="onSaveSuccess"
      />
    </main>
  </div>
</template>

<script>
import EditorComponent from '../components/EditorComponent'
import HeaderComponent from '../components/HeaderComponent'
export default {
  components: { EditorComponent, HeaderComponent },
  name: 'IndexPage',
  methods: {
    onEditorReady() {},
    onEditorStateChange(newState) {},
    onSaveSuccess(data) {console.log(JSON.stringify(data))}
  }
}
</script>
