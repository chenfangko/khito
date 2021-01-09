<template lang="pug">
v-container#wrapper.pa-0
  v-row(no-gutters @click="showPlaceInfo(false)")
    //- tag
    v-col.tag.d-flex.justify-center.align-center(cols="auto") 
      svg#btntag(@click.stop="showPlaceInfo(true)")
        use(xlink:href="#tag")
    //- photo
    v-col.photo.fill-height.d-flex.justify-center.align-center.pa-2(
      cols="auto"
    )
      img(
        :src="place.photo_url ? place.photo_url : 'https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg'"
      )
    //- name
    v-col.name.d-flex.justify-center.px-8(align-self="center") {{ place.name }}
    //- phone
    v-col.phone.d-flex.justify-center(cols="auto", align-self="center") {{ place.phone }}
    //- pin
    v-col.pin.d-flex.justify-center(cols="auto", align-self="center" @click.stop="openNewTab") 
        svg#btnpin
          use(xlink:href="#pin")
    //- delete
    v-col.select.d-flex.justify-center(
      cols="auto",
      align-self="center",
      @click.stop="deletePlace"
    )
      svg#btntrash()
        use(xlink:href="#trash")
</template>

<script>
export default {
  props: {
    place: { type: Object },
    listId: { type: Number },
  },
  data() {
    return {
      setActive: false,
    };
  },
  methods: {
    deletePlace: function () {
      this.$store.dispatch("user/removeListPlaces", {
        list_id: this.listId,
        places: [this.place.id],
      });
      this.$store.commit("common/MODIFY_LISTDETAIL", this.place.id)
    },
    showPlaceInfo: function(isActive){
      this.setActive = isActive;
      this.$emit("showPlaceInfo", {
        placeId: this.place.id,
        setActive: this.setActive,
      });
    },
    openNewTab: function(){
      let googleUrl = 'https://www.google.com/maps/search/?api=1&query=' + this.place.name +'&query_place_id=' + this.place.gmap_id
      window.open(googleUrl, '_blank')
    }
  },
};
</script>



<style lang="sass" scoped>
$width-base: 60px
$margin-base: 12px

*
  // outline: 1px red solid
  font-size: 16px

svg
  width: 18px
  height: 18px

  cursor: pointer

.tag, .pin, .select, .first-space
  width: $width-base * 1.5

#btntrash, #btnpin
  fill: #d1d5d9
  &:hover
    fill: #6a80a3
#btntag
  fill: #d1d5d9
  &:hover
    fill: #f6e18e

.name
  overflow: auto
  white-space: nowrap
  letter-spacing: 1px

.photo
  width: $width-base * 2
  height: $width-base * 1.6
  img
    border-radius: 3px

.phone
  width: $width-base * 2

#wrapper
  background-color: transparent
  &:hover
    background-color: #f8f8f8
    cursor: default
  &.rowChosen
    background-color: #f8f8f8

img
  width: 100%
  height: 100%
  object-fit: cover
</style>