<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import { type Event } from '@/types';
import { ref, onMounted, computed, watchEffect} from 'vue';
import EventService from '@/services/EventService';
import router from '@/router';
import BaseInput from '@/components/BaseInput.vue';

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
    updateKeyword();
  });
});

const keyword = ref('');
function updateKeyword (){
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = EventService.getEvents(pageSize.value, page.value);
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, pageSize.value, page.value);
  }
  queryFunction.then(response => {
    events.value = response.data
    console.log('events', events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvents', totalEvents.value)
  }).catch(() => {
    router.push({ name: 'network-error-view' })
  })
}

</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Events For Good</h1>

    <div class="w-64">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>

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


