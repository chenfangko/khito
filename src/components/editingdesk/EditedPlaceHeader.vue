<template lang="pug">
v-container.wrapper.pa-0.pb-3
  v-row#info(no-gutters)
    //- pen
    v-col(cols="auto")
      .pen.fill-height.d-flex.justify-center.align-center 編輯
    //- photo
    v-col(cols="auto")
      .photo.fill-height.d-flex.justify-center.align-center 照片
    //- name
    v-col 
      .fill-height.d-flex.justify-center.align-center 地點
    //- phone
    v-col(cols="auto")
      .phone.fill-height.d-flex.justify-center.align-center 聯絡電話
    //- pin
    v-col(cols="auto")
      .pin.fill-height.d-flex.justify-center.align-center 導航
    //- select
    v-col(cols="auto" @click="toggleSelectAll")
      .select.fill-height.d-flex.justify-center.align-center
        span(:class="{allSelected: highlighted}") 全選
</template>

<script>
export default {
  props: {
    highlighted: {type: Boolean}
  },
  methods:{
    toggleSelectAll(){
      this.$emit("selectAllToggled")
    }
  },
};
</script>


<style lang="sass" scoped>

$width-base: 60px

*
  // outline: 1px red solid
  font-size: 16px
v-col
  background-color: grey
.wrapper
  border-bottom: solid 1px #afb4b9
svg
  width: 20px
  height: 20px
.tag, .pen, .pin, .select
  width: $width-base * 1.5
.photo
  width: $width-base * 2
.phone 
  width: $width-base * 2
.select
  cursor: pointer
span
  padding: 4px
  border-radius: 5px
  background-color: #eeeeee
  &.allSelected
    background-color: #e7c99e

</style>