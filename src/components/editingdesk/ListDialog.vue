<template lang="pug">
v-card
  v-card-title.justify-center 編輯清單
  v-card-text 
    | 清單名稱
    v-row
      v-text-field(
        required,
        outlined,
        color="#4d89a5",
        v-model="listInfo.info.name"
      )
    | 隱私設定
    v-row
      v-select(
        required,
        outlined,
        v-model="listInfo.info.privacy",
        :items="[ { text: '公開', value: 1 }, { text: '私人', value: 2 }, ]",
        color="#4d89a5"
      )
    | 新增共編成員
    v-row
      v-combobox(
        v-model="listInfo.editors_email",
        listInfo.editors_email,
        clearable,
        outlined,
        label="請輸入完整email",
        multiple,
        solo,
        flat,
        color="#4d89a5"
      )
        template(v-slot:selection="{ item }")
          v-chip.my-3(:input-value="selected", close, label, @click:close="remove(item)") {{ item }}

    | 清單描述
    v-row
      v-textarea(
        counter="100",
        outlined,
        color="#4d89a5",
        rows="3",
        v-model="listInfo.info.description"
      )

    v-row
      v-btn.btn.cancel(@click="cancel") 取消
      v-btn.btn.save(@click="save") 儲存
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["listInfo"]),
  },
  data(){
    return {
      
    }
  },
  methods: {
    save: function () {
      this.$store.dispatch("user/editList", {
        list_id: this.listInfo.info.id,
        name: this.listInfo.info.name,
        description: this.listInfo.info.description,
        privacy: this.listInfo.info.privacy,
        editors_email: this.listInfo.editors_email
      });
      this.$emit("save");
    },
    cancel: function () {
      this.$emit("close");
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: 1px solid red
  font-size: 16px
  span
    margin: auto
  .btn
    box-shadow: none
    width: 45%
    margin: 0 auto
  .cancel
    color: #7e7e7e
  .save
    background-color: #4d89a5 !important
    color: #ffffff
</style>
