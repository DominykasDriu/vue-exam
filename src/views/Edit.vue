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
  name: 'Edit',
  components: {Header},
  data() {
    return {
      info: null
    }
  },
  mounted() {
    
  }
}
</script>