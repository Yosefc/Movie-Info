<template>
  <div class="cards-container">
    <div v-if="movieList.length > 5" class="scroll_right" @click="scroll_right">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
    <div v-if="movieList.length > 5" class="scroll_left" @click="scroll_left">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
    <h1 class="cards-header">Movies from {{current_year}}</h1>
    <div :class="movieList.length <= 5 ? 'cards-auto cards' : 'cards'">
      <div class="card" v-for="movie in movieList" :key="movie.imdbID">
        <router-link :to="`/movie/${movie.imdbID}`" @click.native.prevent>
          <div class="img-container">
            <img :src="doesMovieHavePoster(movie.Poster)" alt="Movie Poster" />
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
  mounted() {
    const content = document.querySelector(".cards");
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    //Browser control
    content.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - content.offsetLeft;
      scrollLeft = content.scrollLeft;
    });

    content.addEventListener("mouseleave", () => {
      isDown = false;
    });

    content.addEventListener("mouseup", () => {
      isDown = false;
    });

    content.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - content.offsetLeft;
      const move = x - startX;
      content.scrollLeft = scrollLeft - move;
    });

    //Mobile Control
    content.addEventListener("touchstart", e => {
      isDown = true;
      startX = e.changedTouches[0].pageX - content.offsetLeft;
      scrollLeft = content.scrollLeft;
    });

    content.addEventListener("touchmove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.changedTouches[0].pageX - content.offsetLeft;
      const move = x - startX;
      content.scrollLeft = scrollLeft - move;
    });

    content.addEventListener("touchend", () => {
      isDown = false;
    });
  },
  methods: {
    scroll_right: function() {
      const content = document.querySelector(".cards");
      content.style.scrollBehavior = "smooth";
      content.scrollLeft += 600;
      content.style.scrollBehavior = "auto";
    },
    scroll_left: function() {
      const content = document.querySelector(".cards");
      content.style.scrollBehavior = "smooth";
      content.scrollLeft -= 600;
      content.style.scrollBehavior = "auto";
    },
    doesMovieHavePoster: function(poster) {
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
.no-click {
  pointer-events: none;
}
.cards-container {
  position: relative;
  display: grid;
  place-items: center;
}

.scroll_left {
  position: absolute;
  left: -50px;
  height: 10px;
  cursor: pointer;
}

svg {
  fill: white;
}

.scroll_right {
  position: absolute;
  right: -50px;
  height: 10px;
  cursor: pointer;
}

.cards {
  display: flex;
  overflow: hidden;
  width: 100%;
  animation: grabber 1s infinite;
}

@keyframes grabber {
  from {
    cursor: grabbing;
  }
  to {
    cursor: grab;
  }
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
  background: rgb(198, 198, 223);
  background: linear-gradient(
    177deg,
    rgba(198, 198, 223, 0.5) 0%,
    rgba(0, 0, 0, 0.2189250700280112) 23%,
    rgba(0, 0, 0, 1) 100%,
    rgba(0, 0, 0, 1) 100%
  );
  border-radius: 50px;
  padding-top: 5px;
  box-shadow: 0 0 6px rgba(198, 198, 223, 0.4);
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

.movie-title {
  max-width: 280px;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media only screen and (max-width: 1900px) {
  .cards-auto {
    flex-basis: auto;
    flex-wrap: wrap;
    justify-content: center;
    animation: none;
  }
}

@media only screen and (max-width: 600px) {
  .cards {
    flex-direction: column;
    align-items: center;
    animation: none;
  }
}
</style>