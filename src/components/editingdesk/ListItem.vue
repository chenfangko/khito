<template lang="pug">
v-container.wrap
  v-row
    v-col.photo.pa-0
      router-link(:to="{ name: 'EditList', params: { listId: list.id } }") 
        img(
          :src="list.coverImageURL ? (url + list.coverImageURL) : 'https://doqvf81n9htmm.cloudfront.net/data/Luke1226_165/2020-02/%E5%92%96%E5%95%A1%E5%BB%B3/%E5%8F%B0%E5%8C%97%E7%99%AE%E5%92%96%E5%95%A1_40a.jpg'"
        )

      svg.copy(@click="copyLink")
        use(xlink:href="#copy")

      svg.camera(@click="openFile")
        use(xlink:href="#camera")
      input#file-input(
        type="file",
        accept="image/*",
        @change="uploadImage($event)"
      )

      svg.pen(@click="showDialog")
        use(xlink:href="#pen")
  v-row.list-name {{ list.name }}

  v-snackbar(v-model="snackbar", :timeout="timeout", color="#4d89a5") 複製連結成功
  input#hideinput(type="hidden", :value="fullUrl")
</template>

<script>
import { url } from "@/services/Const";
export default {
  props: {
    list: { type: Object },
    clearInput: {type: Boolean},
  },
  data() {
    return {
      snackbar: false,
      timeout: 1000,
      url: url.baseUrl,
      fullUrl: null,
    };
  },
  methods: {
    showDialog: function () {
      this.$emit("showDialog");
    },
    openFile: function () {
      document.getElementById("file-input").click();
      this.$emit("setListId");
    },
    uploadImage: function (event) {
      let data = new FormData();
      data.append("file", event.target.files[0]);
      this.$store.dispatch("user/saveListPhoto", data);
    },
    copyLink: function () {
      const path = this.$router.resolve({
        name: "List",
        params: { listId: this.list.id },
      }).route.fullPath;
      const fullUrl = window.location.origin + path;
      this.fullUrl = fullUrl;

      //https 才能用
      navigator.clipboard
        .writeText(fullUrl)
        .then((this.snackbar = true))
        .catch((err) => console.log("Something went wrong", err));

      //input version
      // let testingCodeToCopy = document.querySelector("#hideinput");
      // testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      // testingCodeToCopy.select();
      // document.execCommand("copy");
      // testingCodeToCopy.setAttribute("type", "hidden");
      // this.snackbar = true;
      // window.getSelection().removeAllRanges();
    },
  },
};
</script>

<style lang="sass" scoped>
*
  font-size: 18px
  // outline: 1px solid blue

.wrap
  cursor: pointer

.photo
  position: relative
  width: 200px
  height: 160px
  &:hover
    img
      filter: brightness(.8)
    svg
      visibility: visible

input[type="file"]
  display: none

img
  width: 100%
  height: 100%
  object-fit: cover
  border-radius: 16px

svg
  visibility: hidden
  position: absolute
  width: 15px
  height: 15px
  &:hover
    filter: brightness(.9)
.copy
  right: 0.5rem
  top: 0.5rem
.camera
  right: 0.5rem
  bottom: 2rem
.pen
  right: 0.5rem
  bottom: 0.5rem

.list-name
  padding: 5px
  font-weight: bold
</style>