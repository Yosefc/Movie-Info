<template>
  <div class="search-results">
    <main>
      <div class="title">
        <h1>Showing results for "{{$route.params.searchValue}}"</h1>
      </div>
      <h2 class="no-results" v-if="error">{{error}}</h2>
      <div class="results">
        <div class="result" v-for="result in results.Search" :key="result.imdbID">
          <router-link :to="`/movie/${result.imdbID}`">
            <div class="img-container">
              <img :src="doesMovieHavePoster(result.Poster)" :alt="result.Title + 'Poster'" />
            </div>
            <h2>{{result.Title}}</h2>
            <span>- ({{result.Year}})</span>
          </router-link>
        </div>
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
import CheckPoster from "../methods/CheckPoster";

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
    },
    doesMovieHavePoster: function(poster) {
      return CheckPoster(
        poster,
        `${window.location.origin}/poster-placeholder.jpg`
      );
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

.title {
  text-align: center;
  margin: 10px;
  position: relative;
}

.title::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: block;
  width: 25%;
  height: 2px;
  margin-top: 5px;
  background-color: white;
}

.no-results {
  text-align: center;
  margin-top: 15%;
}

.results {
  margin: 25px 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  display: -ms-flexbox;
  -ms-flex-wrap: wrap;
}

.result {
  text-align: center;
  padding: 15px 15px 5px 15px;
  font-size: 0.9rem;
  width: 300px;
  overflow-wrap: break-word;
}

.result h2 {
  margin: 5px 0px 0px 20px;
}

.result a {
  text-decoration: none;
  color: white;
}

.result a:hover {
  color: rgba(119, 119, 175, 0.7);
}

.img-container {
  height: 400px;
  width: 300px;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  margin: auto;
  margin-right: 20px;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 25px;
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