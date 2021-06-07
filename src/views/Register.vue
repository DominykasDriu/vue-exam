<template>
  <main class="mt-5">
    <form class="container" @submit.prevent="handleSubmit">
      <h2 class="mb-5">Register your account</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" id="name" v-model="name" placeholder="Enter your name">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="pass" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="re-password">Repeat Password</label>
        <input type="password" class="form-control" id="re-password" v-model="passRe" placeholder="Repeat Password">
        <small class="form-text text-muted">Passwords must match!</small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <div v-if="errors.length" class="alert alert-info mt-4" role="alert">
        <p>Please fix the errors below:</p>
        <div v-for="error in errors" :key="error">
          <p>{{error}}</p>
        </div>
      </div>
    </form>
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