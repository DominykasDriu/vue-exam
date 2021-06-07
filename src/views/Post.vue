<template>
  <div>
    <Header />
    <main class="container">
      <article class="mb-4">
        <h2 class="font-weight-bold py-4">{{info.title}}</h2>
        <div class="col-6 mx-auto">
          <img class="img-fluid" :src="info.image">
        </div>
        <p class="mt-5">{{info.description}}</p>
      </article>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: "Post",
  components: {
    Header
  },
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    fetch(
      `http://167.99.138.67:1111/getsinglepost/${this.$route.params.name}/${this.$route.params.id}`
    )
    .then((res) => res.json())
    .then((data) => {
      if (data.data) this.info = data.data;
    })
    .catch((e) => console.log(e));
  },
};
</script>
