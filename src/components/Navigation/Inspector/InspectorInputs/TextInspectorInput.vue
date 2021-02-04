<template>
  <div class="field">
    <label class="label is-small has-text-left">{{ label }}</label>
    <div class="control">
      <input
        v-model="value"
        class="input is-small"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'TextInspectorInput',
  props: {
    label: String,
    slug: String,
    placeholder: [String, Number],
    defaultValue: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  created() {
    if (this.defaultValue) {
      this.value = this.defaultValue;
    }
  },
  methods: {
    emitValueUpdate: _.debounce(function() {
      this.$emit('valueChange', {
        slug: this.slug,
        value: this.value,
      });
    }, 250),
  },
  watch: {
    value() {
      this.emitValueUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 5px;
}
</style>
