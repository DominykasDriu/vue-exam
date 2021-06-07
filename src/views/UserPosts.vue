<template>
  <div>
    <Header/>
    <h2 class="container mt-4">{{userPage}} posts</h2>
    <main v-if="posts" class="container mt-4">
      <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @edit="editPost"
      @delete="deletePost"
      />
    </main>
    <h3 v-if="!posts" class="container mt-5 text-center">{{userPage}} has no posts.</h3>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import PostCard from '../components/PostCard.vue'

export default {
  components: {
    Header,
    PostCard
  },
  data() {
    return {
      posts: null,
      userPage: this.$route.params.name,
    }
  },
  methods: {
    editPost(e) {
      this.$router.push(`/edit/${e.user}/${e.id}`)
    },
    deletePost(id) {
      fetch('http://167.99.138.67:1111/deletepost', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          secretKey: JSON.parse(localStorage.getItem('blogUser')).key,
          id: id
        })
      })
      .then(() => {
        this.getPosts()
      })
      .catch(e => console.log(e))
    },
    getPosts() {
      fetch(`http://167.99.138.67:1111/getuserposts/${this.userPage}`)
      .then(res => res.json())
      .then(data => {
        if (data.data.length) this.posts = data.data
      })
      .catch(e => console.log(e))
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-wrap: wrap;
}
</style>