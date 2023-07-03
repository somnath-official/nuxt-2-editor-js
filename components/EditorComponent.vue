<template>
  <div :id="name"></div>
</template>

<script>
export default {
  name: 'EditorJs',
  props: {
    name: {
      type: String,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Enter text...',
    }
  },
  mounted() {
    const editor = new EditorJS({
      holder: this.name,
      readOnly: this.readOnly,
      placeholder: this.placeholder,
      tools: {
        header: {
          class: Header,
          inlineToolbar : true
        },
        embed: {
          class: Embed,
        },
      },
      onReady: () => {this.$emit('onReady')},
      onChange: (api, event) => {this.$emit('onChange', event)}
    });
  }
}
</script>

<style>
.codex-editor {
  border: 1px solid #bbbbbb;
  border-radius: 8px;
}
.ce-block .ce-block__content{
  max-width: 90%;
}
.ce-toolbar {
  width: 100%;
}
.ce-toolbar .ce-toolbar__content {
  max-width: 100%;
}
.ce-toolbar .ce-toolbar__content .ce-toolbar__actions {
  right: unset;
}
</style>
