<script setup lang="ts">
import type { Organizer } from '@/types'

defineProps<{
  organizer: Organizer
}>()
</script>

<template>
  <div class="organizer-card2">
    <p>{{ organizer.organizationName }} | {{ organizer.address }}</p>
  </div>
</template>

<style scoped>
.organizer-card2 {
  text-align: right;
  font-size: 16px;
}
</style>
