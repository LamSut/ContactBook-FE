<script setup>
defineProps({
  contacts: { type: Array, default: () => [] },
  selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
<ul class="list-group">
  <li
    v-for="(contact, index) in contacts"
    :key="contact.id"
    :class="{ active: index === selectedIndex }"
    class="list-group-item px-3"
    @click="$emit('update:selectedIndex', index)"
  >
    {{ contact.name }}
  </li>
</ul>
</template>