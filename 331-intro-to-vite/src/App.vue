<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const pageSize = ref(Number(route.query.pageSize) || 2)
const store = useMessageStore()
const { messages } = storeToRefs(store)

watch(pageSize, (newSize) => {
  router.push({
    name: 'event-list-view',
    query: {
      page: route.query.page || 1,
      pageSize: newSize
    }
  })
})
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" v-if="messages">
        <h4>{{ messages }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" 
            :to="{ name: 'event-list-view' }">Event</RouterLink>

          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" 
            :to="{ name: 'about' }">About</RouterLink>
            
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" 
            :to="{ name: 'student-list-view' }">Students</RouterLink>
        </nav>
        <div>
          <label for="page-size">Page Size: </label>
          <input id="page-size" type="number" min="1" v-model.number="pageSize" />
        </div>
      </div>
    </header>
  </div>
  <RouterView />
</template>

<style>
nav {
  padding: 30px;
}

nav a{
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2{
  font-size: 20px;
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
