<template>
  <div>
    <editor-component
      name="test"
      placeholder="Hello Editor JS..."
      @onReady="onEditorReady"
      @onChange="onEditorStateChange"
    />
    <!-- <editor-component name="test2"/> -->
  </div>
</template>

<script>
import EditorComponent from '../components/EditorComponent.vue'
export default {
  components: { EditorComponent },
  name: 'IndexPage',
  methods: {
    onEditorReady() {
      // console.log('Editor is ready')
    },
    onEditorStateChange(newState) {
      // console.log(newState.details)
    }
  }
}
</script>
