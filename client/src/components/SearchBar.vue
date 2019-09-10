<template>
  <div class="form">
    <input
      type="text"
      id="search-box"
      placeholder="Search Titles"
      v-model="searchValue"
      v-on:keyup.enter="search"
    />
    <input type="submit" id="movie-search-btn" value="Go" v-on:click="search" />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => {
    return {
      searchValue: ""
    };
  },
  methods: {
    search: function() {
      this.$router.push(`/search/${this.searchValue}`);
      this.searchValue = "";
    }
  }
};
</script>

<style scoped>
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

@media only screen and (max-width: 600px) {
  #search-box {
    width: 80%;
    height: 20px;
  }
}
</style>