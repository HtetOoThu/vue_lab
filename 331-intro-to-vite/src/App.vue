<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const pageSize = ref(Number(route.query.pageSize) || 2)

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
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
          <RouterLink :to="{ name: 'student-list-view' }">Students</RouterLink>
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
#layout{
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
</style>
