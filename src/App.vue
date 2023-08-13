<template>
  <div id="app">
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/Footer.vue";
export default {
  components: { FooterComponent },
};
</script>
