<template>
  <div class="custom-view-wrapper">
    <h2>Share with friends</h2>
    <ok-btn @click="handleShare('linkedin')" :options="options">LinkedIn</ok-btn>
    <cancel-btn @click="handleDismiss()" :options="options">Dismiss</cancel-btn> 
  </div>
</template>

<script>
  export default {
    name: 'addRepo',
  }
</script>
