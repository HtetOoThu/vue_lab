<script setup lang="ts">
import { toRefs, defineProps } from 'vue';
import { type Organizer } from '@/types';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
    organizer: Organizer
    id: string
}>();
const { organizer } = toRefs(props);
const router = useRouter();
const store = useMessageStore();

const updateOrganizer = () => {
  store.updateMessage('The organizer data has been updated.');
  setTimeout(() => store.resetMessage(), 3000);
  router.push({ name: 'organizer-detail-view', params: { id: props.id } });
};
</script>

<template>
  <p>Edit organizer here</p>
  <button @click="updateOrganizer">Edit</button>
</template>
