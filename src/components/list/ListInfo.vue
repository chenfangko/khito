<template lang="pug">
v-container
  v-row
    v-col.main-title {{ info.name }}
  v-row
    v-col 創建人：{{ info.creator_username }} 
    v-col 時間： {{info.createdTime}}
    v-col 隱私：{{ info.privacy == 1 ? "公開" : "私人" }}
  v-row
    v-col(cols="auto") 清單介紹
    v-col {{info.description}}
</template>

<script>
export default {
  props: {
    info: { type: Object },
  },
  data() {
    return {
      privacy: null,
    };
  },

};
</script>

<style lang="sass" scoped>
*
  font-size: 16px
  font-weight: bold
.main-title
  font-size: 22px
  font-weight: bold
</style>