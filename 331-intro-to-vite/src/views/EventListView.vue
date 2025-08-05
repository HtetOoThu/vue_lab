<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import { type Event } from '@/types';
import { ref, onMounted, computed, watchEffect} from 'vue';
import EventService from '@/services/EventService';
import nProgress from 'nprogress';

const events = ref<Event[] | null>();
const totalEvents = ref(0);
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value);
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page);
const pageSize = computed(() => props.pageSize);
// const pageSize = ref(props.pageSize);

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
    .then(response => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count'];    })
    .catch((error) => {
      console.error('There was an error!', error);
    })
  });
});
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Events For Good</h1>

    <div class="flex flex-col items-center space-y-4">
      <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>

    <div class="flex justify-between w-full mt-8">
      <RouterLink id="page-prev" v-if="page > 1" 
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }"
        class="text-blue-600 hover:underline" rel="prev">
        &lt; Prev Page
      </RouterLink>

      <RouterLink id="page-next" v-if="hasNextPage"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }"
        class="text-blue-600 hover:underline ml-auto" rel="next">
        Next Page &gt;
      </RouterLink>
    </div>
  </div>
</template>


