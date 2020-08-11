<template>
  <v-app>
    <app-navbar></app-navbar>
    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',

  components: {
    appNavbar: Navbar
  },

  data: () => ({
    
  }),
  // Get current route name
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
};
</script>
