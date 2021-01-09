<template lang="pug">
v-container(fluid, py-0)
  v-row
    .map 
  v-row
    PlaceInfoDialog(:dialog="dialog", @update:dialog="dialog = $event")
</template>
<script>
import pin from "@/assets/pin.png";
import gmapsInit from "@/utils/gmaps";
import { mapState } from "vuex";
export default {
  data() {
    return {
      google: null,
      map: null,
      marks: [],
    };
  },
  computed: {
    ...mapState("common", ["list"]),
  },
  watch: {
    list() {
      this.marks.forEach((mark) => mark.setMap(null));
      const marks = this.list.places.map((place) => {
        return {
          place_id: place.id,
          location: place.location,
        };
      });
      const bounds = this.setMarkers(marks);
      this.map.fitBounds(bounds);
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

    const marks = this.list.places.map((place) => {
      return {
        place_id: place.id,
        location: place.location,
      };
    });
    const bounds = this.setMarkers(marks);
    this.map.fitBounds(bounds);
  },
  methods: {
    setMarkers(marks) {
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

      for (let i = 0; i < marks.length; i++) {
        bounds.extend(
          new this.google.maps.LatLng(
            parseFloat(marks[i].location.lat),
            parseFloat(marks[i].location.lon)
          )
        );

        const newmark = new this.google.maps.Marker({
          position: {
            lat: marks[i].location.lat,
            lng: marks[i].location.lon,
          },
          map,
          icon: image,
          shape: shape,
          place_id: marks[i].place_id,
        });
        this.marks.push(newmark);
      }
      return bounds;
    },
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
  height: 60vh

.map
  position: relative
  width: 100%
  height: 60vh

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