<template>
  <ModalFormComponent
    :formData="formData"
    @formSubmit="handleSubmit"
    @close="$emit('close')"
  />
</template>

<script>
import ModalFormComponent from '@/components/Forms/ModalFormComponent';

export default {
  name: 'NewProjectForm',
  components: {
    ModalFormComponent,
  },
  data() {
    return {
      formData: {
        slug: 'newProjectForm',
        title: 'New Project',
        width: 450,
        buttons: [
          {
            label: 'Close',
            action: 'close',
          },
          {
            label: 'Add Project',
            action: 'execute',
          },
        ],
        components: [
          {
            slug: 'projectName',
            type: 'text',
            label: 'Project Name',
            placeHolder: 'Project Name',
            defaultValue: '',
            disabled: false,
            required: true,
          },
          {
            slug: 'projectType',
            type: 'dropdown',
            label: 'Project Type',
            placeHolder: 'Project Name',
            defaultValue: '',
            disabled: false,
            required: true,
            options: [
              {
                label: 'Web',
                value: 'web',
                disabled: false,
              },
              {
                label: 'Desktop',
                value: 'desktop',
                disabled: false,
              },
              {
                label: 'Embedded',
                value: 'embedded',
                disabled: false,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(event) {
      let projectData = this.buildProjectData(event);

      this.$store
        .dispatch('addProject', projectData)
        .then(result => {
          console.log(result);
          // this.$store.dispatch('updateProjects');
          this.$emit('close');
        })
        .catch(err => {
          console.error(err);
        });
    },
    buildProjectData(data) {
      let returnData = {};

      data.forEach(el => {
        returnData[el.slug] = el.value;
      });

      return returnData;
    },
  },
};
</script>

<style lang="scss" scoped></style>
