<template lang="pug">
v-container#wrapper.pa-0
  v-row(no-gutters)
    //- tags
    v-col.tag.d-flex.justify-center.align-center(cols="auto") 
      svg#btnwant(@click="toggleSelect", :class="{ selected: selected }")
        use(xlink:href="#want")
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
    v-col.pin.d-flex.justify-center(cols="auto", align-self="center")
      a(
        :href="'https://www.google.com/maps/search/?api=1&query=' + place.name + '&query_place_id=' + place.gmap_id",
        target="_blank"
      ) 
        svg#btnpin
          use(xlink:href="#pin")
</template>

<script>
export default {
  props: {
    place: { type: Object },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    toggleSelect: function () {
      const want = {
        id: 101,
        type: 1,
        name: "想去",
      };

      let add, remove;
      if (this.selected) {
        add = [];
        remove = [want.id];
        this.selected = !this.selected
      } else {
        add = [want.id];
        remove = [];
        this.selected = !this.selected
      }
      this.$store
        .dispatch("user/modifyPlaceTag", {
          place_id: this.place.id,
          add,
          remove,
          newTags: [],
        })
    },
  },
  mounted(){
    this.selected = this.place.king_tags.includes(101);
  }
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

.tag, .pin
  width: $width-base * 1.5

.name
  overflow: auto
  white-space: nowrap
  letter-spacing: 1px

.photo
  width: $width-base*2
  height: $width-base*1.6
  img
    border-radius: 3px
    width: 100%
    height: 100%
    object-fit: cover

.phone
  width: $width-base*2

#wrapper
  background-color: transparent
  &:hover
    background-color: #f8f8f8
    cursor: default
#btnpin
  fill: #d1d5d9
  &:hover
    fill: #6a80a3
#btnwant
  fill: #d0dae4
  &:hover
    fill: #4d89a5
  &.selected
    fill: #4d89a5
</style>