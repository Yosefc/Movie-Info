<template>
  <div>
    <div v-if="loading" class="loader">
      Loading
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div v-show="!loading" :class="`movie-details ${loaded ? 'show' : 'hide'}`">
      <div class="img-container">
        <img :src="doesMovieHavePoster(movieDetails.Poster)" :alt="`${movieDetails.Title} poster`" />
        <router-link to="/">
          <button type="button" class="back-botton">Back</button>
        </router-link>
      </div>
      <div class="movie-info">
        <span class="movie-tile">
          <h1 class="title">{{movieDetails.Title}}</h1>
          <p>({{movieDetails.Year}})</p>
        </span>
        <p v-if="movieDetails.Plot !== 'N/A'" class="movie-plot">{{movieDetails.Plot}}</p>
        <p>Writen by: {{movieDetails.Writer}}</p>
        <p>Director: {{movieDetails.Director}}</p>
        <p>Rated: {{movieDetails.Rated}}</p>
        <p>Rating: {{movieDetails.imdbRating}} {{ ratedBy.length > 0 ? `- ( Rated by: ${ratedBy} )` : null }}</p>
        <p>Country: {{movieDetails.Country}}</p>
        <p>Language: {{movieDetails.Language}}</p>
        <p>Runtime: {{movieDetails.Runtime}}</p>
        <p v-if="movieDetails.Awards !== 'N/A'">Awards: {{movieDetails.Awards}}</p>
        <p v-if="movieDetails.BoxOffice !== 'N/A'">Box Office: {{movieDetails.BoxOffice}}</p>
        <p>Genre: {{movieDetails.Genre}}</p>
        <p v-if="movieDetails.Production !== 'N/A'">Production: {{movieDetails.Production}}</p>
        <p v-if="movieDetails.Website && movieDetails.Website !== 'N/A'">
          Website:
          <a :href="movieDetails.Website" target="_blank">{{movieDetails.Website}}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieDetails",
  data() {
    return {
      movieID: this.$route.params.movieID,
      movieDetails: {},
      loading: true,
      loaded: false,
      placeholder: `${window.location.origin}/poster-placeholder.jpg`
    };
  },
  created: async function() {
    try {
      const res = await axios.get(`/api/movie/movie_id=${this.movieID}`);
      this.movieDetails = res.data;
      this.loading = false;
      this.loaded = true;
    } catch (error) {
      this.movieDetails = error;
    }
  },
  methods: {
    doesMovieHavePoster: function(poster) {
      if (poster) {
        return poster.match(/http/) ? poster : this.placeholder;
      }
      return null;
    }
  },
  computed: {
    ratedBy: function() {
      if (this.movieDetails.Ratings) {
        const rated = this.movieDetails.Ratings.map(rate => " " + rate.Source);
        return rated;
      }
      return [];
    }
  }
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 2rem;
}

.show {
  transition: all 0.5s ease-in-out;
  transition-property: opacity;
  animation: show 0.8s;
}

.hide {
  opacity: 0;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.loader > span {
  display: inline-block;
  background-color: white;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin: 0 8px;
  animation: bounce 0.7s infinite alternate;
  transform: translate3d(0);
  margin-top: 14px;
}

.loader > span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader > span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  to {
    width: 9px;
    height: 9px;
    transform: translate3d(0, -16px, 0);
  }
}

.movie-details {
  display: flex;
  position: relative;
  top: 10vh;
  left: 50%;
  transform: translate(-50%);
  height: 50vh;
  width: 70vw;
}

.img-container {
  height: 300px;
  width: 200px;
  position: relative;
  top: 0%;
  margin: 15px auto;
  margin-right: 15px;
  margin-left: 20%;
}

.img-container img {
  height: 100%;
  width: auto;
  max-width: 200px;
  margin: 0;
  object-fit: contain;
}

.back-botton {
  border: none;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 50%;
  height: 10%;
  font-size: 1.2rem;
  cursor: pointer;
}

.back-botton a {
  text-decoration: none;
  color: black;
}

.movie-info {
  padding: 20px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  max-width: 700px;
}

.movie-info p {
  margin-bottom: 5px;
}

.movie-info a {
  color: white;
}

.movie-info a:hover {
  color: rgba(119, 119, 175, 0.7);
}

.movie-tile h1,
.movie-tile p {
  display: inline-block;
}

.movie-tile p {
  font-size: 1.4rem;
  padding-left: 3px;
}

.movie-plot {
  margin: 15px;
  padding-bottom: 55px;
}

@media (max-width: 850px) {
  .movie-details {
    flex-direction: column;
  }

  .img-container {
    border: 1px solid tomato;
    position: relative;
    top: 500px;
    height: 300px;
    width: 200px;
    z-index: 2;
  }
}
</style>