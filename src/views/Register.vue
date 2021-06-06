<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="pass">
      <label for="repeat-password">Repeat Password</label>
      <input type="password" id="repeat-password" v-model="passRe">
      <button type="submit">Submit</button>
    </form>
    <div v-if="errors.length">
      <p>Please fix the errors below:</p>
      <div v-for="error in errors" :key="error">
        <p>{{error}}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: null,
      pass: null,
      passRe: null,
      errors: []
    }
  },
  methods: {
    handleSubmit() {
      let errors = []
      if (this.name && this.pass && this.passRe) {
        if (this.name.length < 5) {
          errors.push('Name has to be atleast 5 characters long!')
        }
        if (this.pass.length < 5) {
          errors.push('Passwords has to be atleast 5 characters long!')
        }
        if (this.pass !== this.passRe) {
          errors.push('Passwords must match!')
        }
        if (errors.length === 0) this.registerUser()
      } else {
        errors.push('There can be no empty fields!')
      }
      this.errors = errors
    },
    registerUser() {
      fetch('http://167.99.138.67:1111/createaccount', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          passwordOne: this.pass,
          passwordTwo: this.passRe
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Name is already taken') {
          this.errors = [data.message]
        } else {
          this.$router.push('/login')
        }
      })
      .catch(e => console.log(e))
    }
  }
}
</script>