<template>
  <div class="search-results">
    <main>
      <div class="title">
        <h1>Showing results for "{{$route.params.searchValue}}"</h1>
      </div>
      <h2 class="no-results" v-if="error">{{error}}</h2>
      <div class="results" v-for="result in results.Search" :key="result.imdbID">
        <h2>{{result.Title}}</h2>
      </div>
    </main>
    <div class="pagination">
      <ul v-for="page in maxSelectedPage " :key="page">
        <li v-on:click="nextPage(page)" :class="{active:page == selectedPage}">{{page}}</li>
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
      selectedPage: 1,
      error: ""
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
    },
    maxSelectedPage: function() {
      if (this.results.totalResults) {
        const numOfPagesToShow = 14;
        const pagesShownLength = this.pagination.slice(this.pageSelection - 1)
          .length;

        if (pagesShownLength < numOfPagesToShow) {
          return this.pagination.slice(
            Math.max(this.pagination.length - 15, 1)
          );
        }

        if (this.pagination.length > 10) {
          return this.pagination.slice(
            this.pageSelection - 1,
            this.selectedPage + numOfPagesToShow - 1
          );
        }

        return this.pagination;
      }
      return null;
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
        this.error = error.response.data;
      }
    },
    nextPage: async function(page) {
      const res = await axios.get(
        `/api/search/title/title=${this.$route.params.searchValue}&page=${page}`
      );
      this.results = res.data;
      this.selectedPage = page;
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