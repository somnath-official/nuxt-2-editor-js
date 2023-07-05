<template>
  <div>
    <div :id="name" class="custom-dynamic-editor-js"></div>
    <button
      type="button"
      class="btn btn-success mt-2"
      @click="saveEditorData"
      v-if="!readOnly"
    >
      Save
    </button>
  </div>
</template>

<script>
import Image from './plugins/BlockTools/image-tool/image'
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
    },
    editorData: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      $editor: null,
    }
  },
  mounted() {
    this.$editor = new EditorJS({
      holder: this.name,
      readOnly: this.readOnly,
      placeholder: this.placeholder,
      data: this.editorData ? this.editorData : {},
      logLevel: 'ERROR',
      tools: {
        image: {
          class: Image,
        },
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3
          }
        },
        embed: {
          class: Embed,
        },
      },
      onReady: () => {this.$emit('onReady')},
      onChange: (api, event) => {this.$emit('onChange', event)},
    });
  },
  methods: {
    saveEditorData() {
      this.$editor.save()
      .then((outputData) => this.$emit('onSaveSuccess', outputData))
      .catch((error) => this.$emit('onSaveError', error));
    }
  },
}
</script>

<style>
.custom-dynamic-editor-js {
  /* max-height: 500px;
  overflow-y: scroll; */
  border: 1px solid #bbbbbb;
  border-radius: 8px;
  /* padding: 8px 0px; */
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
