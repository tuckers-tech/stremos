<template>
  <div class="field">
    <label class="label">{{ inputData.label }}</label>
    <div class="control is-full-width">
      <div class="select is-full-width">
        <select
          class="is-full-width"
          v-model="value"
          @input="handleInput"
          :required="this.inputData.required"
          :disabled="this.inputData.disabled"
        >
          <option value="null">Select A Project Type</option>
          <template v-for="option of inputData.options">
            <option
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </option>
          </template>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownInput',
  props: {
    inputData: Object
  },
  data() {
    return {
      value: null
    };
  },
  computed: {
    isValid() {
      if (!this.inputData.required) {
        return true;
      } else {
        if (this.value == null) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    handleInput() {
      console.log('input change');
      this.$emit('inputChange', {
        slug: this.inputData.slug,
        value: this.value,
        isValid: this.isValid
      });
    }
  },
  created() {
    if (this.inputData && this.inputData.defaultValue !== '') {
      this.value = this.inputData.defaultValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.is-full-width {
  width: 100%;
}
</style>
