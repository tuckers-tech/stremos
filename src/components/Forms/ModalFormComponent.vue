<template>
  <form
    class="new-project-form"
    :style="{ width: formData.width + 'px' }"
    @submit="handleSubmit"
  >
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ formData.title }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <template v-for="input of formData.components">
          <TextInput
            v-if="input.type === 'text'"
            :key="input.slug"
            :inputData="input"
            @inputChange="handleInputChange"
          />
          <DropdownInput
            v-if="input.type === 'dropdown'"
            :key="input.slug"
            :inputData="input"
            @inputChange="handleInputChange"
          />
          <PathInput
            v-if="input.type === 'filePath'"
            :key="input.slug"
            :inputData="input"
            @inputChange="handleInputChange"
          />
        </template>
      </section>
      <footer class="modal-card-foot">
        <template v-for="(button, index) in formData.buttons">
          <button
            v-if="button.action === 'close'"
            class="button"
            type="button"
            @click="$emit('close')"
            :key="index"
          >
            {{ button.label }}
          </button>
          <button
            v-if="button.action === 'execute'"
            class="button is-success"
            type="submit"
            :key="index"
            :disabled="!isFormValid"
          >
            {{ button.label }}
          </button>
        </template>
      </footer>
    </div>
  </form>
</template>

<script>
import TextInput from '@/components/Forms/FormComponents/TextInput';
import DropdownInput from '@/components/Forms/FormComponents/DropdownInput';
import PathInput from '@/components/Forms/FormComponents/PathInput';

export default {
  name: 'ModalFormComponent',
  components: {
    TextInput,
    DropdownInput,
    PathInput,
  },
  data() {
    return {
      formValue: [],
    };
  },
  computed: {
    isFormValid() {
      if (!this.formValue.length > 0) {
        return false;
      }

      let formValidBool = this.formValue.map(val => val.isValid);

      if (formValidBool.filter(Boolean).length === this.formValue.length) {
        return true;
      }

      return false;
    },
  },
  props: {
    formData: Object,
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      event.stopPropagation();

      this.$emit('formSubmit', this.formValue);
    },
    handleInputChange(event) {
      let newFormValue = [];

      this.formValue.forEach(element => {
        if (element.slug === event.slug) {
          newFormValue.push(event);
        } else {
          newFormValue.push(element);
        }
      });

      this.formValue = newFormValue;
    },
  },
  created() {
    this.formData.components.forEach(el => {
      this.formValue.push({
        slug: el.slug,
        value: el.defaultValue,
        isValid: false,
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
