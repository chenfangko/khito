<template lang="pug">
.wrap
  v-row.tag.fill-height.d-flex.justify-end.align-center.px-2.my-5(
    @click="selectWant",
    :style="{ 'background-color': wantSelected ? '#f6e18e' : '#eeeeee' }"
  )
    svg
      use(xlink:href="#want")
  v-row.tag.fill-height.d-flex.justify-end.align-center.px-2.my-5(
    @click="selectLove",
    :style="{ 'background-color': loveSelected ? '#f6e18e' : '#eeeeee' }"
  )
    svg
      use(xlink:href="#love")
  v-row.tag.fill-height.d-flex.justify-end.align-center.px-2.my-5(
    @click="selectTempsave",
    :style="{ 'background-color': tempsaveSelected ? '#f6e18e' : '#eeeeee' }"
  )
    svg
      use(xlink:href="#tempsave")
</template>

<script>
import "@/assets/icon/want.svg";
import "@/assets/icon/love.svg";
import "@/assets/icon/tempsave.svg";

export default {
  data() {
    return {
      wantSelected: false,
      loveSelected: false,
      tempsaveSelected: false,
    };
  },

  methods: {
    selectWant: function () {
      if (this.wantSelected === false) {
        this.$store.commit("ADD_SELECTTAG", {
          id: 101,
          type: 1,
          name: "想去",
        });
      } else {
        this.$store.commit("DELETE_SELECTTAG", {
          id: 101,
          type: 1,
          name: "想去",
        });
      }
      this.wantSelected = !this.wantSelected;
    },
    selectLove: function () {
      if (this.loveSelected === false) {
        this.$store.commit("ADD_SELECTTAG", {
          id: 102,
          type: 1,
          name: "喜歡",
        });
      } else {
        this.$store.commit("DELETE_SELECTTAG", {
          id: 102,
          type: 1,
          name: "喜歡",
        });
      }
      this.loveSelected = !this.loveSelected;
    },
    selectTempsave: function () {
      if (this.tempsaveSelected === false) {
        this.$store.commit("ADD_SELECTTAG", {
          id: 103,
          type: 1,
          name: "暫存",
        });
      } else {
        this.$store.commit("DELETE_SELECTTAG", {
          id: 103,
          type: 1,
          name: "暫存",
        });
      }
      this.tempsaveSelected = !this.tempsaveSelected;
    },
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: red 1px solid
svg
  width: 18px
  height: 18px
  fill: #4d89a5

.tag
  cursor: pointer
  width: 64px
  height: 33.5px
  border-radius: 0 10px 10px 0
  box-shadow: 0 1px 2px 0 #cccece
</style>