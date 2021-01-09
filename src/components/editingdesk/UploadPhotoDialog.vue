<template lang="pug">
v-card
  v-card-title.justify-center 上傳照片
    v-row.photo
      v-img.img(:src="url + photoUrl" :aspect-ratio="100/80")
    input#reupload(
      type="file",
      accept="image/*",
      @change="uploadImage($event)"
    ) 
    v-row
      v-col.d-flex.justify-start 
        v-btn.btn.cancel(@click="cancel") 取消
      v-col.d-flex.justify-end
        v-btn.btn.redo.mx-2(@click="redo") 重傳
        v-btn.btn.save(@click="save") 儲存
</template>

<script>
import { url } from "@/services/Const";
export default {
  props: {
    photoUrl: { type: String },
    listId: {type: Number},
  },
  data() {
    return {
      url: url.baseUrl,
    };
  },
  methods: {
    uploadImage(event) {
      let data = new FormData();
      data.append("file", event.target.files[0]);
      this.$store.dispatch("user/saveListPhoto", data);
    },
    cancel: function () {
      this.$emit("closeUpload",false);
    },
    redo: function () {
      document.getElementById("reupload").click();
    },
    save: function(){
      this.$store.dispatch("user/setListCover", {list_id: this.listId, cover_image_url: this.photoUrl })
      this.$emit("setListCover",true);
    },
  },
};
</script>

<style lang="sass" scoped>
.photo
  width: 100%
  height: 80%
.img
  // width: 100%
  // height: 100%
  object-fit: cover

input[type="file"]
  display: none
</style>