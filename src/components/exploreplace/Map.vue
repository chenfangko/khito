<template lang="pug">
v-container(fluid, py-0)
  v-row.search-box 
    v-autocomplete.ma-0.pa-0(
      v-model="model",
      :list-index.sync="index",
      :search-input.sync="search",
      :items="items",
      :loading="isLoading",
      item-text="description",
      hide-no-data,
      solo,
      :rounded="rounded",
      :menu-props="{ rounded: 'lg' }",
      @focus="rounded = false",
      @blur="rounded = true",
      return-object,
      @input="handleInput",
      @keydown="handleKeydown"
    )
      template(v-slot:append)
        svg(width="30", height="30")
          use(xlink:href="#search")
  v-row
    .map 
  v-row
    PlaceInfoDialog(:dialog="dialog", @update:dialog="dialog = $event")
</template>

<script>
import gmapsInit from "@/utils/gmaps";
import PlaceInfoDialog from "@/components/exploreplace/PlaceInfoDialog";
import pin from "@/assets/pin.png";
import { mapState } from "vuex";
//import mapStyle from "@/plugins/mapstyle.js";

export default {
  data() {
    return {
      model: null,
      isLoading: false,
      items: [],
      index: null,
      search: null,
      google: null,
      map: null,
      dialog: false,
      makersOnMap: [],
      rounded: true,
      placeDetails: {
        gmap_id: null,
        name: null,
        lon: null,
        lat: null,
        photo_url: null,
        address: null,
        type: null,
        phone: null,
      },
    };
  },
  computed: {
    ...mapState("map", ["marks", "addMarksID", "removeMarksID"]),
    ...mapState(["selectTags"]),
  },
  components: {
    PlaceInfoDialog,
  },
  watch: {
    search(input) {
      if (input == null) return;
      if (input == "") return;
      const bounds = this.map.getBounds();
      const request = { input, bounds };
      this.isLoading = true;
      const AutocompleteService = new this.google.maps.places.AutocompleteService();
      AutocompleteService.getPlacePredictions(request, (prediction) => {
        this.items = prediction;
        this.isLoading = false;
      });
    },
    selectTags() {
      const bounds = this.map.getBounds();
      const from = bounds.getSouthWest();
      const to = bounds.getNorthEast();
      this.$store
        .dispatch("map/getMarks", {
          from: { lon: from.lng(), lat: from.lat() },
          to: { lon: to.lng(), lat: to.lat() },
          filter: this.selectTags.map((t) => t.id),
        })
        .then((response) => {
          const bounds = this.setMarkers(this.marks);
          const center = bounds.getCenter();
          if (
            !bounds.contains({ lat: center.lat() + 0.1, lng: center.lng() })
          ) {
            bounds.extend({
              lat: center.lat() + 0.01,
              lng: center.lng() + 0.01,
            });
            bounds.extend({
              lat: center.lat() - 0.01,
              lng: center.lng() - 0.01,
            });
          }
          if (response.data.data.marks.length) {
            this.map.fitBounds(bounds);
          }
        });
    },
  },
  methods: {
    handleClick(event) {
      if (event.placeId) {
        event.stop();
      }
    },
    handleIdle() {
      const bounds = this.map.getBounds();
      const from = bounds.getSouthWest();
      const to = bounds.getNorthEast();

      this.$store
        .dispatch("map/getMarks", {
          from: { lon: from.lng(), lat: from.lat() },
          to: { lon: to.lng(), lat: to.lat() },
          filter: this.selectTags.map((t) => t.id),
        })
        .then(() => {
          this.setMarkers(this.marks);
        });
    },
    async handleInput(input) {
      await this.getPlaceInformation(input.place_id);
      const response = await this.$store.dispatch(
        "place/addNewPlace",
        this.placeDetails
      );
      this.map.fitBounds(this.placeDetails.geometry.viewport);

      if (response.data.status == 1) {
        await this.$store.dispatch("place/getDialogDetail", {
          place_id: response.data.data.place_id,
        });
      }
      this.items = [];
      setTimeout(() => {
        this.dialog = true;
      }, 300);
    },
    handleKeydown(e) {
      setTimeout(() => {
      }, 500);
      if (e.keyCode == 13) {
        this.handleInput(this.items[this.index]);
        this.model = this.items[this.index].description;
      }
    },

    getPlaceInformation(placeId) {
      const placesService = new this.google.maps.places.PlacesService(this.map);
      return new Promise((resolve, reject) => {
        placesService.getDetails({ placeId: placeId }, (place, status) => {
          if (status === "OK") {
            this.placeDetails.geometry = place.geometry;
            this.placeDetails.lon = place.geometry.location.lng();
            this.placeDetails.lat = place.geometry.location.lat();
            this.placeDetails.photo_url = place.photos
              ? place.photos[0].getUrl()
              : null;
            this.placeDetails.name = place.name;
            this.placeDetails.gmap_id = place.place_id;
            this.placeDetails.address = place.formatted_address;
            this.placeDetails.type = place.types ? place.types[0] : null;
            this.placeDetails.phone = place.international_phone_number
              ? place.international_phone_number
              : null;
            resolve();
          }
          reject();
        });
      });
    },
    setMarkers() {
      const map = this.map;
      const image = {
        url: pin,
        size: new this.google.maps.Size(46, 57),
        origin: new this.google.maps.Point(0, 0),
        anchor: new this.google.maps.Point(23, 57),
      };
      const shape = {
        coords: [23, 29, 30],
        type: "circle",
      };
      const bounds = new this.google.maps.LatLngBounds();

      for (let i = 0; i < this.removeMarksID.length; i++) {
        const index = this.makersOnMap
          .map((m) => m.place_id)
          .indexOf(this.removeMarksID[i]);
        if (index > -1) {
          this.makersOnMap[index].setMap(null);
          this.makersOnMap.splice(index, 1);
        }
      }

      for (let i = 0; i < this.marks.length; i++) {
        bounds.extend(
          new this.google.maps.LatLng(
            parseFloat(this.marks[i].location.lat),
            parseFloat(this.marks[i].location.lon)
          )
        );
        if (
          this.makersOnMap
            .map((m) => m.place_id)
            .includes(this.marks[i].place_id)
        ) {
          continue;
        }
        const marker = new this.google.maps.Marker({
          position: {
            lat: this.marks[i].location.lat,
            lng: this.marks[i].location.lon,
          },
          map,
          icon: image,
          shape: shape,
          place_id: this.marks[i].place_id,
        });

        this.makersOnMap.push(marker);

        marker.addListener("click", () => {
          this.$store
            .dispatch("place/getDialogDetail", {
              place_id: marker.place_id,
            })
            .then(() => (this.dialog = true));
        });
      }
      return bounds;
    },
  },

  async mounted() {
    this.google = await gmapsInit();
    this.map = new this.google.maps.Map(this.$el.querySelector(".map"), {
      disableDefaultUI: true,
      mapId: "9524df6228dc9370",
      useStaticMap: true,
      center: new this.google.maps.LatLng(
        parseFloat(25.033795),
        parseFloat(121.543202)
      ),
      zoom: 6,
    });

    this.map.addListener("click", this.handleClick);
    this.map.addListener("idle", this.handleIdle);

    await this.$store.dispatch("map/getMarks", {
      from: { lon: 117.08797285742689, lat: 20.312130507214118 },
      to: { lon: 126.04402767903734, lat: 27.559374641180497 },
      filter: this.selectTags.map((t) => t.id),
    });

    if (this.marks) {
      const bounds = this.setMarkers(this.marks);
      this.map.fitBounds(bounds);
    }
  },
};
</script>

<style scoped lang="sass">
html,
body
  margin: 0
  padding: 0

.map-container
  position: relative
  width: 100%
  height: 100vh

.map
  position: relative
  width: 100%
  height: 100vh

.input
  position: fixed
  background-color: aliceblue
  z-index: 5

.search-box
  position: absolute
  top: 30px
  left: 60px
  z-index: 5
  width: 50%
  ::v-deep
    .v-text-field__details
      display: none
</style>