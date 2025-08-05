<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentService from '@/services/StudentService';
import type { Student } from '@/types';
import StudentCard from '@/components/StudentCard.vue';

const students = ref<Student[]>([]);

onMounted(() => {
  StudentService.getStudents()
    .then(response => {
      students.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching students:', error);
    });
});
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Student List</h1>

    <div class="flex flex-wrap gap-5 justify-center">
      <StudentCard v-for="student in students" :key="student.id" :student="student"/>
    </div>
  </div>
</template>
