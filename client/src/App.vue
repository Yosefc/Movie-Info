<template>
  <div id="app">
    <Navbar />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  Name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 85vw;
  margin: auto;
}
</style>
