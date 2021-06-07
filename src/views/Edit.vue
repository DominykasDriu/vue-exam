<template>
  <div>
    <Header/>
    <main class="container mt-5">
      <form @submit.prevent="handleSubmit">
        <h2 class="mb-5">Edit post</h2>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="info.title">
        </div>
        <div class="form-group">
          <label for="image">Image URL</label>
          <input type="text" class="form-control" id="image" v-model="info.image">
        </div>
        <div class="form-group">
          <label for="body">Text</label>
          <textarea style="resize: none" class="form-control" id="body" rows="4" v-model="info.description"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div v-if="message" class="alert alert-info mt-4" role="alert">
        {{message}}
      </div>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Edit',
  components: {Header},
  data() {
    return {
      info: null,
      message: null
    }
  },
  methods: {
    handleSubmit() {
      const user = JSON.parse(localStorage.getItem('blogUser'))
      if (user) {
        if (this.info.title && this.info.description && this.info.image) {
          fetch('http://167.99.138.67:1111/updatepost', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            secretKey: user.key,
            title: this.info.title,
            image: this.info.image,
            description: this.info.description,
            id: this.$route.params.id
          })
          })
          .then(res => res.json())
          .then(data => {
            this.message = data.message
          })
          .catch(e => console.log(e))
        } else {
          this.message = 'There can be no empty fields!'
        }
      } else {
        alert('You need to log in before updating post!')
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getsinglepost/${this.$route.params.name}/${this.$route.params.id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data) this.info = data.data;
    })
    .catch((e) => console.log(e));
  }
}
</script>