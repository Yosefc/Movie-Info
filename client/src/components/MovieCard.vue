<template>
  <div class="cards-container">
    <div v-if="movieList.length > 5" class="scroll_right" @click="scroll_right">right</div>
    <div v-if="movieList.length > 5" class="scroll_left" @click="scroll_left">left</div>
    <h1 class="cards-header">Movies from {{current_year}}</h1>
    <div class="cards">
      <div class="card" v-for="movie in movieList" :key="movie.imdbID">
        <router-link :to="`/movie/${movie.imdbID}`">
          <div class="img-container">
            <img :src="doeasMovieHavePoster(movie.Poster)" alt="Movie Poster" />
          </div>
          <div class="text-container">
            <h1 class="movie-title">{{ movie.Title }}</h1>
            <h3 class="movie-year">{{ (movie.Year) }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieCard",
  data: () => {
    return {
      movieList: [],
      placeholder: `${window.location.origin}/poster-placeholder.jpg`
    };
  },
  methods: {
    scroll_right: function() {
      const content = document.querySelector(".cards");
      content.scrollLeft += 600;
    },
    scroll_left: function() {
      const content = document.querySelector(".cards");
      content.scrollLeft -= 600;
    },
    doeasMovieHavePoster: function(poster) {
      return poster.match(/http/) ? poster : this.placeholder;
    }
  },
  computed: {
    current_year: function() {
      const date = new Date();
      return date.getFullYear();
    }
  },
  created: async function() {
    try {
      const res = await axios.get("/api/movies/current_year");
      this.movieList = res.data.Search;
    } catch (error) {
      this.movieList = error;
    }
  }
};
</script>

<style scoped>
.cards-container {
  position: relative;
  display: grid;
  place-items: center;
}

.scroll_left {
  position: absolute;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: crimson;
  cursor: pointer;
}

.scroll_right {
  position: absolute;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: orangered;
  cursor: pointer;
}

.cards {
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
}

.cards-header {
  margin-bottom: 15px;
}

.card {
  text-align: center;
  font-size: 0.6rem;
  width: 300px;
  height: 300px;
  margin: 0 15px 10px 15px;
}

.card a {
  text-decoration: none;
  color: white;
}

.card img {
  height: 100%;
  max-width: 70%;
  object-fit: cover;
}

.img-container {
  width: 300px;
  height: 250px;
}
</style>