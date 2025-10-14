<script setup lang="ts">
import { type Organizer } from '@/types';
import OrganizerIcon from './icons/OrganizerCard2.vue'; 

defineProps<{
  organizer: Organizer
}>();
</script>

<template>
  <RouterLink
    class="organizer-link"
    :to="{ name: 'organizer-detail-view', params: { id: organizer.id } }"
  >
    <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp">
      <h2>{{ organizer.name }}</h2>
      <OrganizerIcon :organizer="organizer" />
    </div>
  </RouterLink>
</template>
