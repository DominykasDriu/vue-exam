<template>
  <div>
    <Header/>
    <div class="d-flex align-items-center justify-content-center py-4 pl-3" style="width: 800px">
      <span>From:</span>
      <input class="form-control mx-4" type="date" v-model="dateFrom">
      <span>To:</span>
      <input class="form-control mx-4" type="date" v-model="dateTo">
      <button class="btn btn-primary" @click="filterByDate">Filter</button>
    </div>
    <main class="container" v-if="posts">
      <PostCard
      v-for="post in filteredPosts || posts"
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
      posts: null,
      filteredPosts: null,
      dateFrom: null,
      dateTo: null
    }
  },
  methods: {
    filterByDate() {
      if (this.dateFrom && this.dateTo) {
        let from = new Date(this.dateFrom).getTime()
        let to = new Date(this.dateTo).getTime()
        this.filteredPosts = this.posts.filter((e) => {
          return e.timestamp > from && e.timestamp < to
        })
      }
    },
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

<style lang="scss" scoped>
main {
  display: flex;
  flex-wrap: wrap;
}
</style>

