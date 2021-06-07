<template>
  <div class="modal_wrapper rounded">
    <h5>{{title}}</h5>
    <p>Are you sure you want to {{data}} post?</p>
    <div>
      <button @click="sendAnswer(true)" class="btn btn-primary mr-3">Yes</button>
      <button @click="sendAnswer(false)" class="btn btn-secondary">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['data', 'title'],
  methods: {
    sendAnswer(val) {
      this.$emit('answer', val, this.data)
    }
  },
}
</script>

<style lang="scss" scoped>
.modal_wrapper {
  background: white;
  border: 1px solid grey;
  width: 300px;
  height: auto;
  position: fixed;
  top: calc(50vh - 100px);
  left: 0; 
  right: 0; 
  margin: 0 auto;
  padding: 20px;
}
</style>
