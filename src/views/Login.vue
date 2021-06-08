<template>
  <div>
    <main class="mt-5">
    <form class="container" @submit.prevent="handleSubmit">
      <h2 class="mb-5">Log-in</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" id="name" v-model="name" placeholder="Enter your name">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="pass" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <div v-if="showError" class="alert alert-info mt-4" role="alert">
        <p>Incorrect credentials!</p>
      </div>
    </form>
  </main>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      name: null,
      pass: null,
      showError: false
    }
  },
  methods: {
    handleSubmit() {
      fetch('http://167.99.138.67:1111/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          password: this.pass
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('blogUser', JSON.stringify({
            name: this.name,
            key: data.secretKey
          }))
          this.$router.push('/')
        } else {
          this.showError = true
        }
      })
    }
  }
}
</script>