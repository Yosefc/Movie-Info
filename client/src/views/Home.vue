<template>
  <div class="home">
    <section
      class="intro"
    >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, necessitatibus nihil voluptate quibusdam officiis optio cum reiciendis tempora quae facilis architecto rerum, quo tenetur commodi dolores fugiat, sequi dignissimos! Asperiores magni quibusdam ullam laborum provident velit? Minus perspiciatis magnam vitae consectetur dolores itaque impedit rem soluta? Ducimus odit id dolores.</section>
    <MovieCard />
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard";

export default {
  name: "home",
  components: {
    MovieCard
  }
};
</script>

<style scoped>
.intro {
  position: relative;
  top: 50px;
  margin-bottom: 100px;
  padding: 15px;
  font-size: 1.2rem;
}

@media only screen and (max-width: 600px) {
  .intro {
    top: 0;
    margin: 2px;
    font-size: 1rem;
  }
}
</style>
