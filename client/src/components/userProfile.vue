<template>
  <div class="column" style="margin-top: 30px">
    <p>username: {{ isUser.username }}</p>
    <p>email: {{isUser.email}}</p>
    <p>phone: {{ isUser.phone }}</p>
    <p>address: {{ isUser.address }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isUser'])
  }
};
</script>

<style>
</style>