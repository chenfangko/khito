<template lang="pug">
v-container
  v-row
    v-col(
      cols="12",
      xs="12",
      sm="6",
      md="4",
      lg="4",
      xl="3",
      v-for="(list, index) in userLists.lists",
      :key="index"
    )
      ListItem(
        :list="list",
        :clearInput="clearInput",
        @showDialog="showDialog(list)",
        @setListId="setListId(list.id)"
      )

  v-dialog(persistent, v-model="dialog", width="30%")
    ListDialog(@close="closeDialog", @save="saveList", :listInfo="listInfo")

  v-dialog(persistent, v-model="photoDialog", width="30%")
    UploadPhotoDialog(
      :photoUrl="photoUrl",
      :listId="selectedListId",
      @setListCover="setListCover",
      @closeUpload="closePhotoDialog"
    )
</template>

<script>
import { url } from "@/services/Const";
import { mapState } from "vuex";
import ListItem from "./ListItem.vue";
import ListDialog from "./ListDialog.vue";
import UploadPhotoDialog from "./UploadPhotoDialog";
export default {
  components: {
    ListItem,
    ListDialog,
    UploadPhotoDialog,
  },
  data() {
    return {
      dialog: false,
      listInfo: null,
      photoDialog: false,
      selectedListId: null,
      url: url.baseUrl,
      clearInput: false,
      // userLists: {
      //   lists: [
      //     {
      //       id: 1,
      //       creator_id: 1,
      //       name: "台北復古時髦街區散步地圖",
      //       coverImageURL: null,
      //       privacy: 1,
      //       description: "AAAAAA",
      //     },
      //     {
      //       id: 2,
      //       creator_id: 1,
      //       name: "新北復古時髦街區散步地圖",
      //       coverImageURL: null,
      //       privacy: 2,
      //       description: "BBBBB",
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
      this.$store.dispatch("user/getUserLists", {
        filter: this.selectTags.map((tag) => tag.id),
      });
    },
    isActive: function (isActive) {
      if (isActive) this.photoDialog = true;
      else this.photoDialog = false;
    },
  },
  computed: {
    ...mapState(["selectTags"]),
    ...mapState("user", ["userLists"]),
    ...mapState("user", ["photoUrl"]),
    ...mapState("user", ["isActive"]),
  },
  methods: {
    showDialog: function (list) {
      this.$store
        .dispatch("user/getListInfo", { list_id: list.id })
        .then(() => (this.dialog = true));
      // this.listInfo = list;
    },
    saveList: function () {
      this.dialog = false;
      this.$store.dispatch("user/getUserLists", { filter: this.selectTags });
    },
    closeDialog: function () {
      this.dialog = false;
      this.$store.dispatch("user/getUserLists", { filter: this.selectTags });
    },
    setListId: function (listId) {
      this.selectedListId = listId;
    },
    setListCover: function(){
      this.photoDialog = false;
      this.clearInput = true;
      this.$store.dispatch("user/getUserLists", { filter: this.selectTags });
      this.$store.commit("user/DISACTIVE");
    },
    closePhotoDialog: function () {
      this.photoDialog = false;
      this.clearInput = true;
      this.$store.commit("user/REMOVE_PHOTOURL");
      this.$store.commit("user/DISACTIVE");
    },
  },
  mounted() {
    this.$store.dispatch("user/getUserLists", { filter: [] });
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: red 1px solid
</style>