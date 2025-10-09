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

const registerOrganizer = () => {
  store.updateMessage(`You are successfully registered with ${props.organizer.organizationName}`);
  setTimeout(() => store.resetMessage(), 3000);
  router.push({ name: 'organizer-detail-view', params: { id: props.organizer.id } });
};
</script>

<template>
  <p>Register organizer here</p>
  <button @click="registerOrganizer">Register</button>
</template>
