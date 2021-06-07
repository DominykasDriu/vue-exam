<template>
  <div>
    <Header/>
    <main v-if="posts">
      <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @edit="editPost"
      @delete="deletePost"
      />
    </main>
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
      posts: null
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
      fetch('http://167.99.138.67:1111/getallposts')
      .then(res => res.json())
      .then(data => this.posts = data.data)
      .catch(e => console.log(e))
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>

