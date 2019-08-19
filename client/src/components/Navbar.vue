<template>
  <header>
    <div class="logo">Movie-Info</div>
    <nav class="navbar">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;
  padding: 0 25px;
  margin-bottom: 25px;
  background-color: #292727;
  color: white;
  font-size: 1.2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-item {
  padding: 0 10px;
  text-decoration: none;
  color: white;
}
</style>