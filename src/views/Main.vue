<template>
  <div>
    <Header/>
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
      posts: null
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
    fetch('http://167.99.138.67:1111/getallposts')
    .then(res => res.json())
    .then(data => this.posts = data.data)
    .catch(e => console.log(e))
  }
}
</script>