<template>
  <div class="field">
    <label class="label is-small has-text-left">{{ label }}</label>
    <div class="control">
      <div class="select is-small is-fullwidth">
        <select v-model="value" @change="onInputChange">
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
  </div>
</template>

<script>
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

      let targetOption = this.options.filter(
        option => option.value === this.value,
      )[0];

      if (targetOption.actions) {
        this.emitActionChange(targetOption.actions);
      }
    },
    emitValueUpdate() {
      this.$emit('valueChange', {
        slug: this.slug,
        value: this.value,
      });
    },
    emitActionChange(actions) {
      this.$emit('triggerAction', {
        slug: this.slug,
        actions,
      });
    },
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
