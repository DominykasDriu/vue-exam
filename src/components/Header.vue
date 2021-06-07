<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="!loggedIn" to="/register">Register</router-link>
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <router-link v-if="loggedIn" to="/create">Create new post</router-link>
      <input type="text" placeholder="enter name of user" v-model="userInput"/>
      <button @click="goToUserPosts">Check Users Posts</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      loggedIn: false,
      userInput: null
    }
  },
  methods: {
    goToUserPosts() {
      if (this.userInput) {
        this.$router.push(`/user_posts/${this.userInput}`)
      }
    }
  },
  mounted() {
    if (localStorage.getItem('blogUser')) this.loggedIn = true
  }
}
</script>