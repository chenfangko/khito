<template lang="pug">
v-container
  v-chip-group(column)
    v-chip.grey--text.text--darken-1.mb-3.mr-3.rounded-lg(
      v-for="(tag, index) in place_tags",
      :key="index",
      color="#e7c99e" 
      @click="chipClickHandler(tag, index)"
    ) {{ tag.name }}
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tab: null,
    };
  },
  props: {
    tags: {
      type: Object,
    },
  },
  computed: {
    ...mapState("common", ["hotTags"]),
    ...mapState("place", ["place_tags"]),
  },
  methods: {
    chipClickHandler(tag, index) {
      this.$store.commit("place/ADD_MY_TAG", tag);
      this.$store.commit("place/DELETE_PLACE_TAG", index);
    },
  },
};
</script>

<style scoped lang="sass">
.icon
  height: 25px
  width: 25px

::v-deep
  .v-chip
    height: 22px !important
    border-radius: 6px !important
    box-shadow: 0 1px 4px 0 rgba(212, 212, 212, 0.5) !important

  .v-tabs-items
    background-color: transparent !important
    max-height: 40vh
    overflow-y: scroll
    -ms-overflow-style: none
    scrollbar-width: none
    &::-webkit-scrollbar
      display: none

    .v-chip__content
      font-family: TaipeiSansTCBeta !important
      font-size: 11.5px !important
      letter-spacing: 1.05px !important
      color: #617283 !important
</style>