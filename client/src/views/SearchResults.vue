<template>
  <div class="search-results">
    <main>
      <div class="title">
        <h1>Showing results for "{{$route.params.searchValue}}"</h1>
      </div>
      <div class="results" v-for="result in results.Search" :key="result.imdbID">
        <h2>{{result.Title}}</h2>
      </div>
    </main>
    <div class="pagination">
      <ul
        v-for="page in pagination.length > 10 ? pagination.slice(pageSelection-1, selectedPage+14) : pagination"
        :key="page"
      >
        <li
          v-on:click="nextPage(page), selectedPage = page"
          :class="{active:page == selectedPage}"
        >{{page}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchResults",
  data: () => {
    return {
      results: [],
      selectedPage: 1
    };
  },
  created: async function() {
    await this.getMovies();
  },
  watch: {
    async $route() {
      await this.getMovies();
    }
  },
  computed: {
    pagination: function() {
      const pages = [];
      const { totalResults } = this.results;
      const totalPages = Math.ceil(parseInt(totalResults) / 10);

      if (totalResults) {
        for (let pageNum = 1; pageNum < totalPages; pageNum++) {
          pages.push(pageNum);
        }
        return pages;
      }
      return 1;
    },
    pageSelection: function() {
      if (this.selectedPage > 1) {
        return this.selectedPage - 1;
      }
      return this.selectedPage;
    }
  },
  methods: {
    getMovies: async function() {
      try {
        const res = await axios.get(
          `/api/search/title/title=${this.$route.params.searchValue}&page=1`
        );
        this.results = res.data;
      } catch (error) {
        this.results = error;
      }
    },
    nextPage: async function(page) {
      const res = await axios.get(
        `/api/search/title/title=${this.$route.params.searchValue}&page=${page}`
      );
      this.results = res.data;
    }
  }
};
</script>

<style scoped>
.search-results {
  width: 80%;
  margin: auto;
}

main {
  min-height: 50vh;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pagination li {
  list-style: none;
  padding: 5px;
  width: 30px;
  text-align: center;
  background-color: white;
  color: black;
  font-size: 1.2rem;
}

.pagination li:hover {
  cursor: pointer;
  font-size: 1.3rem;
  margin-top: -1px;
  background-color: rgb(228, 212, 212);
}

li.active {
  color: white;
  background-color: rgb(182, 182, 248);
}
</style>