<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand font-weight-bold" href="#">Blog</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" v-if="!loggedIn" to="/register">Register</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" v-if="!loggedIn" to="/login">Login</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" v-if="loggedIn" to="/create">Create new post</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Filter posts by user" v-model="userInput"/>
          <button class="btn btn-outline-success my-2 my-sm-0" @click="goToUserPosts">Go!</button>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <button class="btn btn-secondary my-2 my-sm-0 ml-4" v-if="loggedIn" @click="logOut">Log out</button>
          </li>
        </ul>
      </div>
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
    },
    logOut() {
      localStorage.removeItem("blogUser");
      this.loggedIn = false
    }
  },
  mounted() {
    if (localStorage.getItem('blogUser')) this.loggedIn = true
  }
}
</script>