<template>
  <div class="about">
    <h1>{{ config }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Settings',
    computed: {
      config: function() {
        return this.$store.state.workspace.config.repos
      },
    }
  }
</script>
