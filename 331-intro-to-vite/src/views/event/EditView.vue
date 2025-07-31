<script setup lang="ts">
import { toRefs, defineProps} from 'vue';
import { type Event } from '@/types'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
    event: Event
    id: string
}>()
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const updateEvent = () => {
  store.updateMessage('The data has been updated.')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
    <p>Edit event here</p>
    <button @click="updateEvent">Edit</button>
</template>