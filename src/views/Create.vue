<template>
  <div>
    <Header/>
    <main class="container mt-5">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="title">
        </div>
        <div class="form-group">
          <label for="image">Image URL</label>
          <input type="text" class="form-control" id="image" v-model="image">
        </div>
        <div class="form-group">
          <label for="body">Text</label>
          <textarea style="resize: none" class="form-control" id="body" rows="4" v-model="body"></textarea>
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
  name: 'Create',
  components: { Header },
  data() {
    return {
      title: null,
      image: null,
      body: null,
      message: null
    }
  },
  methods: {
    handleSubmit() {
      const user = JSON.parse(localStorage.getItem('blogUser'))
      if (user) {
        if (this.title && this.body && this.image) {
          fetch('http://167.99.138.67:1111/createpost', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            secretKey: user.key,
            title: this.title,
            image: this.image,
            description: this.body
          })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.title = ''
              this.image = ''
              this.body = ''
            }
            this.message = data.message
          })
          .catch(e => console.log(e))
        } else {
          this.message = 'There can be no empty fields!'
        }
      } else {
        alert('You need to log in before creating post!')
        this.$router.push('/login')
      }
    }
  }
}
</script>