<template lang="pug">
v-dialog(
  :value="dialog",
  v-on:input="$emit('update:dialog', $event)",
  width="450",
  @click:outside="() => (isActive = false)"
)
  v-card.rounded-xl.pa-3
    v-container
      v-row(align="center")
        v-col
          v-card-title.title.pa-0(v-text="`${placeInfo.name}`")
          v-card-text.text.pa-0(
            v-text="`電話 : ${placeInfo.phone}`",
            v-if="placeInfo.phone"
          )
          v-card-text.text.pa-0(v-text="`地址 : ${placeInfo.address}`")
        v-col(cols="auto")
          v-avatar(size="125", rounded="xl")
            v-img(
              :src="placeInfo.photo_url ? placeInfo.photo_url : 'https://imgs.gvm.com.tw/upload/gallery/20190212/55927_01.jpg'"
            )
      v-row
        v-col
          v-card-actions.w-100.pa-0
            v-btn.white--text(
              @click="btnClickHandler",
              width="100%",
              color="main-color"
            ) {{ isActive ? '標籤確認，將地點收進口袋' : '為地點加標籤' }}
      v-row(v-if="isActive && loggedIn")
        v-col.py-0
          TagSearchBox.middle(:SelectedTags="SelectedTags")
      v-row(v-if="isActive && loggedIn")
        v-col.py-0
          TagSelector.bottom(@add-tag="SelectedTags.push($event)")
</template>
<script>
import { mapState, mapGetters } from "vuex";

import TagSearchBox from "@/components/exploreplace/TagSearchBox";
import TagSelector from "@/components/exploreplace/TagSelector";

export default {
  props: {
    dialog: { type: Boolean },
    setActive: { type: Boolean },
  },
  data() {
    return {
      // isActive: false,
      SelectedTags: [],
    };
  },
  components: {
    TagSearchBox,
    TagSelector,
  },
  computed: {
    ...mapState("place", ["placeInfo"]),
    ...mapGetters("auth", ["loggedIn"]),
    isActive() {
      return this.setActive == true || this.setActive == null
    }
  },
  methods: {
    btnClickHandler() {
      if (!this.isActive) {
        this.setActive = this.loggedIn ? true : false;
      } else {
        this.$store.dispatch("place/modifyPlaceTag");
        this.$emit("update:dialog", false);
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.title
  font-size: 24px !important
  font-weight: bold !important
.text
  font-size: 16px !important
  font-weight: bold !important
.middle
  margin-top: 10px
  min-height: 200px
  max-height: 250px
.bottom
  min-height: 150px
  max-height: 200px
  overflow-y: scroll
  -ms-overflow-style: none
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none
</style>