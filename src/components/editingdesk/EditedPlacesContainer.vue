<template lang="pug">
v-container.pa-3.pt-10
  v-row
    EditedPlaceHeader(
      @selectAllToggled="selectAllToggled",
      :highlighted="userPlaces.places.length == selectedPlaces.length && selectedPlaces.length != 0"
    )
    EditedPlaceItem(
      v-for="(place, index) in userPlaces.places",
      :key="index",
      :place="place",
      :itemSelected="selectedPlaces.includes(place.id)",
      @selectItem="selectItem",
      @showPlaceInfo="showPlaceInfo"
    )

  v-btn.btnselect.ma-14(
    fab,
    right,
    bottom,
    fixed,
    elevation="0",
    x-large,
    :color="outputIsSelected ? '#e7c99e' : '#ede8df'",
    @click="showDialog()"
  )
    svg(width="35")
      use(xlink:href="#output")

  v-dialog(persistent, v-model="dialog", width="30%", height="70%")
    NewListDialog(
      width="30%",
      :placesId="selectedPlaces",
      @save="closeDialog",
      @close="closeDialog"
    )
  PlaceInfoDialog(
    :dialog="placeInfo",
    @update:dialog="placeInfo = $event",
    :setActive="isActive"
  )
</template>

<script>
import { mapState } from "vuex";
import EditedPlaceHeader from "./EditedPlaceHeader.vue";
import EditedPlaceItem from "./EditedPlaceItem.vue";
import NewListDialog from "./NewListDialog.vue";
import PlaceInfoDialog from "../exploreplace/PlaceInfoDialog";
export default {
  components: {
    EditedPlaceHeader,
    EditedPlaceItem,
    NewListDialog,
    PlaceInfoDialog,
  },
  data() {
    return {
      dialog: false,
      count: 0,
      selectedPlaces: [],
      outputIsSelected: false,
      placeInfo: false,
      isActive: false,
      // userPlaces: {
      //   places: [
      //     {
      //       id: 1,
      //       photo_url:
      //         "https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg",
      //       name: "某某某某某咖啡廳",
      //       phone: "02-23456789",
      //     },
      //     {
      //       id: 2,
      //       photo_url:
      //         "https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg",
      //       name: "哈囉咖啡廳",
      //       phone: "0987654321",
      //     },
      //   ],
      // },
    };
  },
  computed: {
    ...mapState(["selectTags"]),
    ...mapState("user", ["userPlaces"]),
  },
  watch: {
    selectTags: function () {
      this.$store.dispatch("user/getUserPlaces", {
        filter: this.selectTags.map((tag) => tag.id),
      });
    },
  },
  methods: {
    selectItem: function (item) {
      if (item.isSelected) {
        this.selectedPlaces.push(item.placeId);
        this.count++;
      } else {
        this.selectedPlaces = this.selectedPlaces.filter(
          (value) => value != item.placeId
        );
        this.count--;
      }
      this.outputIsSelected = this.count > 0;
    },
    selectAllToggled: function () {
      if (this.selectedPlaces.length < this.userPlaces.places.length) {
        this.selectedPlaces = this.userPlaces.places.map((place) => place.id);
        this.count = this.selectedPlaces.length
      } else {
        this.selectedPlaces = [];
        this.count = 0
      }
      this.outputIsSelected = this.count > 0;
    },
    showDialog: function () {
      this.dialog = true;
    },
    closeDialog: function () {
      this.dialog = false;
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
    this.$store.dispatch("user/getUserPlaces", {
      filter: [],
    });
  },
};
</script>

<style lang="sass" scoped>
</style>


