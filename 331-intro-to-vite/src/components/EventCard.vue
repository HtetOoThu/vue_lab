<script setup lang="ts">
//defineProps<{
//  msg: string
//}>()
</script>

<template>
  <div class="event-class"></div> 
</template>

<style scoped>
.event-class{
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-class:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}
</style>