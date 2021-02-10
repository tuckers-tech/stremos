<template>
  <div>
    <p class="menu-label has-text-left">
      Metadata
    </p>
    <TextInspectorInput
      :key="activeNode.id"
      :label="'Node ID'"
      :placeholder="activeNode.id"
      :defaultValue="activeNode.id"
      :disabled="true"
    />
    <div class="columns">
      <div class="column">
        <TextInspectorInput
          :key="activeNode.x"
          :label="'X Position'"
          :placeholder="activeNode.x"
          :defaultValue="activeNode.x"
          :disabled="true"
        />
      </div>
      <div class="column">
        <TextInspectorInput
          :key="activeNode.y"
          :label="'Y Position'"
          :placeholder="activeNode.y"
          :defaultValue="activeNode.y"
          :disabled="true"
        />
      </div>
    </div>
    <TextInspectorInput
      :key="activeNode.title"
      :slug="'title'"
      :label="'Node Title'"
      :placeholder="'Node Title'"
      :defaultValue="activeNode.title"
      @valueChange="inputValueChanged"
    />
    <p
      v-if="activeNode.values.variables.length > 0"
      class="menu-label has-text-left"
    >
      Variables
    </p>

    <div v-for="variable in activeNode.values.variables" :key="variable.slug">
      <div v-if="variable.show">
        <TextInspectorInput
          v-if="variable.type === 'string'"
          :key="variable.slug"
          :slug="'variable.' + variable.slug"
          :label="variable.name"
          :placeholder="variable.placeholder"
          :defaultValue="variable.value"
          @valueChange="inputValueChanged"
        />

        <SelectInspectorInput
          v-if="variable.type === 'select'"
          :key="variable.slug"
          :slug="'variable.' + variable.slug"
          :label="variable.name"
          :options="variable.options"
          :defaultValue="variable.value"
          @valueChange="inputValueChanged"
          @triggerAction="triggerAction"
        />

        <NumberInspectorInput
          v-if="variable.type === 'number'"
          :key="variable.slug"
          :slug="'variable.' + variable.slug"
          :label="variable.name"
          :placeholder="variable.placeholder"
          :defaultValue="variable.value"
          @valueChange="inputValueChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextInspectorInput from '@/components/Navigation/Inspector/InspectorInputs/TextInspectorInput';
import SelectInspectorInput from '@/components/Navigation/Inspector/InspectorInputs/SelectInspectorInput';
import NumberInspectorInput from '@/components/Navigation/Inspector/InspectorInputs/NumberInspectorInput';
export default {
  name: 'InspectorForm',
  components: {
    TextInspectorInput,
    SelectInspectorInput,
    NumberInspectorInput,
  },
  props: {
    activeNode: Object,
  },
  methods: {
    inputValueChanged(event) {
      let changeEvent = event;

      changeEvent.nodeID = this.activeNode.id;

      this.$store.dispatch('updateNode', changeEvent);
    },
    triggerAction(event) {
      let action = event;

      action.nodeID = this.activeNode.id;

      this.$store.dispatch('triggerAction', action);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.columns {
  margin-bottom: 0;
}
.column {
  padding-bottom: 0;
}
</style>
