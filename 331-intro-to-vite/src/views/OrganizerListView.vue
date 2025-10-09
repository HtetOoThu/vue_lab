<script setup lang="ts">
import OrganizerCard from '@/components/OrganizerCard.vue'; 
import { type Organizer } from '@/types';
import { ref, onMounted, computed, watchEffect } from 'vue';
import OrganizerService from '@/services/OrganizerService'; 

const organizers = ref<Organizer[] | null>(null);
const totalOrganizers = ref(0);

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
});

const page = computed(() => props.page);
const pageSize = computed(() => props.pageSize);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizers.value / pageSize.value);
  return page.value < totalPages;
});

onMounted(() => {
  watchEffect(() => {
    OrganizerService.getOrganizers(pageSize.value, page.value)
      .then(response => {
        organizers.value = response.data;
        totalOrganizers.value = response.headers['x-total-count'];
      })
      .catch(error => {
        console.error('Error fetching organizers:', error);
      });
  });
});
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Organizers</h1>

    <div class="flex flex-col items-center space-y-4">
      <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer" />
    </div>

    <div class="flex justify-between w-full mt-8">
      <RouterLink
        v-if="page > 1"
        :to="{ name: 'organizer-list-view', query: { page: page - 1, pageSize: pageSize } }"
        class="text-blue-600 hover:underline"
        rel="prev"
      >
        &lt; Prev Page
      </RouterLink>

      <RouterLink
        v-if="hasNextPage"
        :to="{ name: 'organizer-list-view', query: { page: page + 1, pageSize: pageSize } }"
        class="text-blue-600 hover:underline ml-auto"
        rel="next"
      >
        Next Page &gt;
      </RouterLink>
    </div>
  </div>
</template>

