<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="pass">
      <button type="submit">Login</button>
    </form>
    <div v-if="showError">
      <p>Incorrect credentials!</p>
    </div>
  </main>
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
        console.log(data);
        if (data.success) {
          localStorage.setItem('blogUser', JSON.stringify({
            name: this.name,
            key: data.secretKey
          }))
        } else {
          this.showError = true
        }
      })
    }
  }
}
</script>