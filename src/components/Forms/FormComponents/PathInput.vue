<template>
  <div>
    <label class="label">{{ inputData.label }}</label>
    <div class="field is-grouped is-horizontal">
      <div class="control is-expanded">
        <input
          v-model="value"
          class="input"
          type="text"
          @input="handleInput"
          :placeholder="inputData.placeholder"
          :required="this.inputData.required"
          :disabled="this.inputData.disabled"
        />
      </div>
      <div class="control">
        <button
          type="button"
          class="button is-info"
          @click="sendPathRequestToBackend"
        >
          Select Path
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestPath } from '../../../utilities/ipc';

export default {
  name: 'PathInput',
  data() {
    return {
      value: '',
    };
  },
  props: {
    inputData: Object,
  },

  computed: {
    isValid() {
      if (!this.inputData.required) {
        return true;
      } else {
        if (this.value !== null && this.value !== '') {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    value() {
      this.handleInput();
    },
  },
  methods: {
    handleInput() {
      this.$emit('inputChange', {
        slug: this.inputData.slug,
        value: this.value,
        isValid: this.isValid,
      });
    },
    sendPathRequestToBackend() {
      requestPath(this.inputData.options)
        .then(res => {
          console.log('getting path');
          if (!res.canceled) {
            this.value = res.filePaths[0];
          }
        })
        .catch(err => console.log(err));
    },
  },
  created() {
    if (this.inputData && this.inputData.defaultValue !== '') {
      this.value = this.inputData.defaultValue;
    }
  },
};
</script>

<style lang="scss" scoped></style>
