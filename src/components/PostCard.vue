<template>
  <div>
    <Modal 
    title="Warning"
    :data="modalInfo"
    v-if="showModal"
    @answer="resolveModal"
    />
    <div class="card" style="width: 18rem;">
        <img :src="post.image" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{post.title}}</h5>
          <p class="card-text">{{truncateDescription(post.description)}}</p>
          <a class="btn btn-primary" @click="goToPost">Read more</a>
          <a class="btn btn-secondary ml-2" v-if="user.name === post.username" @click="tryEditPost()">Edit</a>
          <a class="btn btn-warning ml-2" v-if="user.name === post.username" @click="tryDeletePost()">Delete</a>
        </div>
      </div>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
  name: 'PostCard',
  props: ['post'],
  components: {Modal},
  data() {
    return {
      user: JSON.parse(localStorage.getItem('blogUser')) || null,
      showModal: false,
      modalInfo: null
    }
  },
  methods: {
    goToPost() {
      this.$router.push(`/post/${this.post.username}/${this.post.id}`)
    },
    resolveModal(answer, action) {
      if (answer) {
        if (action === 'edit') {
          this.$emit('edit', {user: this.post.username, id: this.post.id})
        } else {
          this.$emit('delete', this.post.id)
        }
      }
      this.showModal = false
    },
    tryEditPost() {
      this.showModal = true
      this.modalInfo = 'edit'
    },
    tryDeletePost() {
      this.showModal = true
      this.modalInfo = 'delete'
    },
    truncateDescription(val) {
      return (val.length > 150) ? val.substr(0, 150-1) + ' ...' : val;
    },
  },
}
</script>