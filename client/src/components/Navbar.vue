<template>
  <header>
    <div class="logo">Movie-Info</div>
    <div class="form">
      <input type="text" name id="search-box" />
      <input type="submit" id="movie-search-btn" value="Go" />
    </div>
    <nav class="navbar">
      <router-link
        class="nav-item"
        v-for="link in navLinks"
        :key="link.id"
        :to="link.to"
      >{{link.name}}</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
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

.nav-item {
  padding: 0 10px;
  text-decoration: none;
  color: white;
}

.form {
  display: flex;
  justify-content: center;
}

#search-box {
  border-radius: 30px;
  padding-right: 50px;
  padding-left: 8px;
  height: 25px;
  border: none;
  outline: none;
}

#movie-search-btn {
  margin-left: -20px;
  border: none;
  width: 20px;
  border-left: 0;
  border-radius: 0 30px 30px 0;
  outline: none;
  background-color: #fffefe;
  cursor: pointer;
}

#search-box:focus {
  box-shadow: 0 0 6px yellow;
}

#movie-search-btn:focus {
  box-shadow: 0 0 6px yellow;
}
</style>