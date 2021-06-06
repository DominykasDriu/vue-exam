<template>
  <div>
    <Header/>
    <h2>{{user}} posts.</h2>
    <main v-if="posts">
      <div class="card" style="width: 18rem;" v-for="post in posts" :key="post.id">
        <img :src="post.image" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{post.title}}</h5>
          <p class="card-text">{{truncateDescription(post.description)}}</p>
          <a class="btn btn-primary" @click="goToPost(post.username, post.id)">Read more</a>
        </div>
      </div>
    </main>
    <h3 v-if="!posts">User has no posts.</h3>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      posts: null,
      user: this.$route.params.name
    }
  },
  methods: {
    goToPost(name, id) {
      this.$router.push(`/post/${name}/${id}`)
    },
    truncateDescription(val) {
      return (val.length > 150) ? val.substr(0, 150-1) + ' ...' : val;
    }
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.user}`)
    .then(res => res.json())
    .then(data => {
      if (data.data.length) this.posts = data.data
    })
    .catch(e => console.log(e))
  }
}
</script>