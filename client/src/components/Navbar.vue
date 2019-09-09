<template>
  <header>
    <div class="logo">Movie-Info</div>
    <SearchBar />
    <nav class="navbar">
      <router-link
        class="nav-item"
        v-for="link in navLinks"
        :key="link.id"
        :to="link.to"
      >{{link.name}}</router-link>
    </nav>
    <div class="mobile-navbar">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<script>
import SearchBar from "@/components/SearchBar";

export default {
  name: "Navbar",
  components: {
    SearchBar
  },
  data: () => {
    return {
      navLinks: [
        { id: 1, to: "/", name: "Home" },
        { id: 2, to: "/about", name: "About" }
      ]
    };
  }
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
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

.mobile-navbar {
  display: none;
}

.nav-item {
  padding: 0 10px;
  text-decoration: none;
  color: white;
}

@media only screen and (max-width: 600px) {
  .logo {
    font-size: 0.85rem;
  }

  .mobile-navbar {
    display: block;
    cursor: pointer;
  }

  .mobile-navbar span {
    display: block;
    width: 16px;
    height: 3px;
    background-color: white;
    margin: 2px 1px;
  }

  .nav-item {
    display: none;
  }
}
</style>