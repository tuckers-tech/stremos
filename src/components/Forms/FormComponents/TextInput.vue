<template>
  <div class="field">
    <label class="label">{{ inputData.label }}</label>
    <div class="control">
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
  </div>
</template>

<script>
export default {
  name: 'TextInput',
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

  methods: {
    handleInput() {
      this.$emit('inputChange', {
        slug: this.inputData.slug,
        value: this.value,
        isValid: this.isValid,
      });
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
