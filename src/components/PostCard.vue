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
          <a class="btn btn-primary" @click="readMore">Read more</a>
          <a class="btn btn-secondary ml-2" v-if="user.name === post.username" @click="startModal('edit')">Edit</a>
          <a class="btn btn-warning ml-2" v-if="user.name === post.username" @click="startModal('delete')">Delete</a>
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
    readMore() {
      this.$router.push(`/post/${this.post.username}/${this.post.id}`)
    },
    startModal(action) {
      this.showModal = true
      this.modalInfo = action
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
    truncateDescription(val) {
      return (val.length > 150) ? val.substr(0, 150-1) + ' ...' : val;
    },
  },
}
</script>