<template>
  <div class="movie-details">
    <div>
      <h1 class="title">{{movieDetails.Title}}</h1>
      <span>{{movieDetails.Year}}</span>
    </div>
    <img :src="movieDetails.Poster" :alt="`${movieDetails.Title} poster`" />
    <p>Writer: {{movieDetails.Writer}}</p>
    <p>Director: {{movieDetails.Director}}</p>
    <p>Rating: {{movieDetails.imdbRating}}</p>
    <p>{{movieDetails.Country}}</p>
    <p>{{movieDetails.Language}}</p>
    <p>Runtime: {{movieDetails.Runtime}}</p>
    <p v-if="movieDetails.Awards !== 'N/A'">{{movieDetails.Awards}}</p>
    <p v-if="movieDetails.BoxOffice !== 'N/A'">{{movieDetails.BoxOffice}}</p>
    <p>Genre: {{movieDetails.Genre}}</p>

    <p>{{movieDetails.Plot}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieDetails",
  data() {
    return {
      movieID: this.$route.params.movieID,
      movieDetails: {}
    };
  },
  created: async function() {
    try {
      const res = await axios.get(`/api/movie/movie_id=${this.movieID}`);
      this.movieDetails = res.data;
    } catch (error) {
      this.movieDetails = error;
    }
  }
};
</script>

<style scoped>
.movie-details {
  display: grid;
  place-items: center;
}
</style>