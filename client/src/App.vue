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
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  color: white;
  background-color: #0b0c11;
}

.container {
  width: 85vw;
  margin: auto;
  min-height: 50vh;
}
</style>
