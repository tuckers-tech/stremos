<template>
  <div class="field">
    <label class="label is-small has-text-left">{{ label }}</label>
    <div class="control">
      <div class="select is-small is-fullwidth">
        <select v-model="value">
          <option value="select">Select An Option</option>
          <option
            v-for="option of options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    {{ options }}
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'SelectInspectorInput',
  props: {
    label: String,
    slug: String,
    options: Array,
    defaultValue: {
      type: [String, Number],
      default: 'select',
    },
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
    onInputChange() {
      this.emitValueUpdate();
    },
    emitValueUpdate: _.debounce(function() {
      this.$emit('valueChange', {
        slug: this.slug,
        value: this.value,
      });
    }, 250),
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 5px;
}

.control {
  width: 100%;
}
</style>
