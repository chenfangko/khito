<template lang="pug">
v-container.pa-0
  v-container.main
    v-row
      v-col.pa-2
        ListInfo.pa-4(:info="list.info")
    v-row.place-wrap.pa-4.mt-4(v-show="isList")
      ListPlaceHeader
      ListPlaceItem(
        v-for="(place, index) in list.places",
        :key="index",
        :place="place"
      )
  v-container.map(v-if="isMap")
    Map

  //btn
  v-btn.ma-14(
    fab,
    right,
    top,
    fixed,
    elevation="0",
    x-large,
    @click="toggleMap"
  )
    svg(width="30", v-show="isMap")
      use(xlink:href="#list-text")
    svg(width="35", v-show="isList")
      use(xlink:href="#map")

  router-link(:to="{ name: 'EditList' }") 
    v-btn.ma-14(
      fab,
      right,
      bottom,
      fixed,
      elevation="0",
      x-large,
      color="#a8b7c6",
      v-show="sameUser"
    )
      svg(width="35")
        use(xlink:href="#editpage")
</template>

<script>
import { mapState } from "vuex";
import ListInfo from "../components/list/ListInfo";
import ListPlaceHeader from "../components/list/ListPlaceHeader";
import ListPlaceItem from "../components/list/ListPlaceItem";
import Map from "../components/list/Map";
export default {
  components: {
    Map,
    ListInfo,
    ListPlaceHeader,
    ListPlaceItem,
  },
  data() {
    return {
      dialog: false,
      isList: true,
      isMap: false,
      // info: {
      //   id: 0,
      //   creator_id: 0,
      //   creator_name: "牟牟牟",
      //   name: "某某某咖啡清單",
      //   coverImageURL: "string",
      //   creator_username: "Coffee Lover",
      //   privacy: 1,
      //   description:
      //     "公告中提到，因應未來CITY系列現調飲品寄杯雲端化，今年12月1日起，CITY CAFE、CITY PRIMA精品咖啡、CITY TEA現萃茶。",
      //   createdTime: 0,
      //   updatedTime: 0,
      // },
      // places: [
      //   {
      //     id: 0,
      //     gmap_id: "aaa",
      //     name: "ＡＡＡ",
      //     phone: "0987654321",
      //     address: "string",
      //     type: "string",
      //     photo:
      //       "https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg",
      //   },
      //   {
      //     id: 0,
      //     gmap_id: "aaa",
      //     name: "未央咖啡",
      //     phone: "02-22334455",
      //     address: "string",
      //     type: "string",
      //     photo:
      //       "https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg",
      //   },
      // ],
      // system_tags: ["string"],
      // user_tags: [
      //   {
      //     id: 0,
      //     type: 0,
      //     name: "string",
      //   },
      // ],
    };
  },
  watch: {
    selectTags: function () {
      this.$store.dispatch("common/getListDetail", {
        list_id: this.$route.params.listId,
        filter: this.selectTags.map((tag) => tag.id),
      });
    },
  },
  computed: {
    ...mapState(["selectTags"]),
    ...mapState("common", ["list"]),
    sameUser() {
      const userstring = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : '{"user_id":-1}';
      const userId = JSON.parse(userstring).user_id;
      return (
        this.list.editors_id.includes(parseInt(userId)) ||
        this.list.info.creator_id == userId
      );
    },
  },
  methods: {
    showDialog: function () {
      this.dialog = true;
    },
    closeDialog: function () {
      this.dialog = false;
    },
    saveTags: function () {
      this.dialog = false;
    },
    toggleMap: function () {
      this.isList = !this.isList;
      this.isMap = !this.isMap;
    },
  },
  mounted() {
    this.$store.dispatch("common/getListDetail", {
      list_id: this.$route.params.listId,
      filter: [],
    });
  },
};
</script>

<style lang="sass" scoped>
// *
//   outline: 1px red solid
#edit
  position: absolute
  right: 5%
  top: 12%
  span
    color: white
.main
  width: 75%
.map
  width: 75%
</style>