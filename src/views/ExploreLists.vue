<template lang="pug">
v-container.px-10
  v-row.flex-nowrap.mt-5(align="center", justify="space-between")
    v-col(cols="auto")
      span.list-index 嘿，今天你想去哪野？
    v-col(cols="auto")
      router-link(:to="{ name: 'ExplorePlaces' }") 
        svg.group
          use(xlink:href="#group")
  v-row.mt-10(align="center", justify="start")
    v-col.list(
      cols="12",
      xs="12",
      sm="6",
      md="4",
      lg="3",
      xl="2",
      v-for="(list, index) in recommandLists.lists",
      :key="index",
      @click="selectList"
    )
      router-link(:to="{ name: 'List', params: { listId: list.id } }") 
        //- img(:src="list.coverImageURL ? list.coverImageURL : 'https://lh3.googleusercontent.com/proxy/-z8W_kPUoQNB09Ym-8Q3SEDpIzhO29gu0GCoyLjF3w69gAuHxf0FRV_LvLfxGYF2BG2WgEIWaiDwjeUtRBYERhcc6Xn7W6Ot9a2JbE5TKTH_vQ4tgMxa_2pPQ3BLsM0'")
        v-col.photo.pb-0.px-1
          img(
            :src="list.coverImageURL ? (url + list.coverImageURL) : 'https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg'"
          )
        v-col.pt-0.mt-0.px-5
          .list-name {{ list.name }}
</template>

<script>
import { url } from "@/services/Const";
import { mapState } from "vuex";
// import tempImg from "@/assets/img/photo-list3.jpg";
export default {
  data() {
    return {
      url: url.baseUrl
      // recommandLists: {
      //   lists: [
      //     {
      //       id: 1,
      //       creator_id: 1,
      //       name: "台北復古時髦街區散步地圖",
      //       coverImageURL: null,
      //     },
      //     {
      //       id: 2,
      //       creator_id: 1,
      //       name: "新北復古時髦街區散步地圖",
      //       coverImageURL: null,
      //     },
      //   ],
      //   system_tags: ["string"],
      //   user_tags: [
      //     {
      //       id: 0,
      //       type: 0,
      //       name: "string",
      //     },
      //   ],
      // },
    };
  },
  watch: {
    selectTags: function () {
      this.$store.dispatch("common/getRecommandLists", {
         filter: this.selectTags.map((tag) => tag.id),
      });
    },
  },
  computed: {
    ...mapState(["selectTags"]),
    ...mapState("common", ["recommandLists"]),
  },
  methods: {
    selectList: function () {},
  },
  mounted() {
    this.$store.dispatch("common/getRecommandLists", {
      filter: [],
    });
  },
};
</script>
<style lang="sass" scoped>
.list-index
  font-size: 30px

.list-name
  font-size: 18px
  font-weight: bold
  color: black

.group
  width: 80px
  height: 80px

.background-color
  background-color: red
  width: 200px
  height: 200px

.list
  cursor: pointer

.photo
  // width: 100%
  // height: 100%
  width: 200px
  height: 150px

img
  width: 100%
  height: 100%
  object-fit: cover
  border-radius: 10px
</style>