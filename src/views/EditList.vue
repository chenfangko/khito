<template lang="pug">
v-container
  router-link(:to="{ name: 'List' }") 
    v-btn.ma-14(
      fab,
      right,
      bottom,
      fixed,
      elevation="0",
      x-large,
      color="#a8b7c6"
    )
      svg(width="35")
        use(xlink:href="#see")
  v-row
    EditedListPlacesContainer.main
    v-col(cols="1")
  
   
</template>

<script>
import EditedListPlacesContainer from "../components/editlist/EditedListPlacesContainer";
export default {
  components: {
    EditedListPlacesContainer
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: 1px red solid
.main
  width: 75%

</style>