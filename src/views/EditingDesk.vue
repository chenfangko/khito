<template lang="pug">
  v-container.wrap
    v-row.main
      MainContainer
    v-row.king-tags
      KingTags
    
      
</template>

<script>
import KingTags from "../components/editingdesk/KingTags.vue";
import MainContainer from "../components/editingdesk/MainContainer.vue";
export default {
  components: {
    KingTags,
    MainContainer,
  },
};
</script>

<style lang="sass" scoped>
  *
    // outline: blue 1px solid
  .wrap
    width: 80%
  .main
    width: 90%
  .king-tags
    position: fixed
    left: 300px
    top: 20%

</style>