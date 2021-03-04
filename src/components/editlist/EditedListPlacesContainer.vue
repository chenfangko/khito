<template lang="pug">
v-container
  v-row
    //List Info
    v-col.pa-2.info-wrap
      ListInfo.pa-4(:info="list.info")
      span#edit(@click="showDialog")
        v-btn.pa-0.ma-0(color="#4d89a5", title, @click="showDialog")
          svg(width="10")
            use(xlink:href="#pen")
          span.ml-1 編輯

    //Autocomplete
    v-col(cols="auto", align-self="end")
      v-autocomplete(
        v-model="model",
        :items="items",
        :search-input.sync="search",
        :loading="isLoading",
        item-text="name",
        dense,
        flat,
        hide-no-data,
        hide-selected,
        label="新增地點",
        color="#4d89a5",
        return-object,
        @input="inputHandler"
      )
        template(v-slot:append)
          svg(width="20", height="20")
            use(xlink:href="#search")

  //Places
  v-row.place-wrap.pa-4.mt-4
    EditedListPlaceHeader
    EditedListPlaceItem(
      v-for="(place, index) in list.places",
      :key="index",
      :place="place",
      :listId="listId"
      @showPlaceInfo="showPlaceInfo"
    )

  //Dialog
  v-dialog(persistent, v-model="dialog", width="30%")
    ListDialog(@close="closeDialog", @save="saveList", :listInfo="list.info")

  //PlaceInfo
  PlaceInfoDialog(
    :dialog="placeInfo",
    @update:dialog="placeInfo = $event",
    :setActive="isActive"
  )
</template>

<script>
import { mapState } from "vuex";
import ListInfo from "../list/ListInfo";
import EditedListPlaceHeader from "./EditedListPlaceHeader";
import EditedListPlaceItem from "./EditedListPlaceItem";
import ListDialog from "../editingdesk/ListDialog";
import PlaceInfoDialog from "../exploreplace/PlaceInfoDialog";
export default {
  components: {
    ListInfo,
    EditedListPlaceHeader,
    EditedListPlaceItem,
    ListDialog,
    PlaceInfoDialog,
  },
  data() {
    return {
      dialog: false,
      listId: this.$route.params.listId,
      model: null,
      search: null,
      isLoading: false,
      items: null,
      placeInfo: false,
      // list: {
      //   info: {
      //     id: 0,
      //     creator_id: 0,
      //     creator_name: "牟牟牟",
      //     name: "某某某咖啡清單",
      //     coverImageURL: "string",
      //     creator_username: "Coffee Lover",
      //     privacy: 1,
      //     description:
      //       "公告中提到，因應未來CITY系列現調飲品寄杯雲端化，今年12月1日起，CITY CAFE、CITY PRIMA精品咖啡、CITY TEA現萃茶。",
      //     createdTime: 0,
      //     updatedTime: 0,
      //   },
      //   places: [
      //     {
      //       id: 0,
      //       gmap_id: "aaa",
      //       name: "ＡＡＡ",
      //       phone: "0987654321",
      //       address: "string",
      //       type: "string",
      //       photo:
      //         "https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg",
      //     },
      //     {
      //       id: 0,
      //       gmap_id: "aaa",
      //       name: "未央咖啡",
      //       phone: "02-22334455",
      //       address: "string",
      //       type: "string",
      //       photo:
      //         "https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg",
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
      // listInfo: {
      //   info: {
      //     id: 1,
      //     creator_id: 0,
      //     name: "list name",
      //     coverImageURL: "string",
      //     creator_username: "string",
      //     privacy: 1,
      //     description: "lsit info over here",
      //     createdTime: 0,
      //     updatedTime: 0,
      //   },
      // },
    };
  },
  computed: {
    ...mapState(["selectTags"]),
    ...mapState("common", ["list"]),
  },
  watch: {
    selectTags: function () {
      this.$store.dispatch("common/getListDetail", {
        list_id: this.$route.params.listId,
        filter: this.selectTags.map((tag) => tag.id),
      });
    },
    search(text) {
      if (text === null) return;
      this.isLoading = true;
      this.$store
        .dispatch("user/searchUserPlaces", {
          list_id: this.$route.params.listId,
          text: text,
        })
        .then((response) => {
          this.items = response.data.data.places;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  methods: {
    showDialog: function () {
      this.$store
        .dispatch("user/getListInfo", { list_id: this.list.info.id })
        .then(() => (this.dialog = true));
    },
    saveList: function () {
      this.dialog = false;
      this.$store.dispatch("common/getListDetail", {
        list_id: this.$route.params.listId,
        filter: this.selectTags,
      });
    },
    closeDialog: function () {
      this.dialog = false;
    },
    inputHandler(newplace) {
      this.$store.dispatch("common/addListPlaces", {
        list_id: this.$route.params.listId,
        place: newplace,
      });
      this.items = [];
    },
    showPlaceInfo: function ({ placeId, setActive }) {
      this.isActive = setActive;
      this.$store
        .dispatch("place/getDialogDetail", {
          place_id: placeId,
        })
        .then(() => (this.placeInfo = true));
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
*
  // outline: 1px red solid
.info-wrap
  position: relative
  border: 1px solid #4d89a5
#edit
  position: absolute
  right: 5%
  top: 12%
  span
    color: white
</style>