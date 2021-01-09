<template lang="pug">
v-card
  v-card-title.justify-center 建立清單
  v-card-text 
    | 清單名稱
    v-row
      v-text-field(required, outlined, color="#4d89a5", v-model="listName", @input="checkName")
    | 隱私設定
    v-row
      v-select(
        required,
        outlined,
        v-model="listPrivacy",
        :items="[ { text: '公開', value: 1 }, { text: '私人', value: 2 }, ]",
        color="#4d89a5"
      ) 

    | 新增共編成員
    v-row
      v-combobox(
        v-model="chips",
        chips,
        clearable,
        outlined,
        label="請輸入完整email",
        multiple,
        solo,
        flat,
        color="#4d89a5"
        @change="modifyEmail"
      )
        template(v-slot:append="{ item }")
          v-chip.my-3(:input-value="selected", close, label, @click:close="remove(item)") {{item}}

    | 清單描述
    v-row
      v-textarea(
        counter="100",
        outlined,
        color="#4d89a5",
        rows="3",
        v-model="listDescription"
        @input="checkDescription"
      )
    v-row
      v-btn.btn.cancel(@click="cancel") 取消
      v-btn.btn.save(@click="save" :disabled="disabledSend" ) 儲存
</template>

<script>
export default {
  props: {
    placesId: { type: Array },
  },
  data() {
    return {
      listName: "",
      listPrivacy: 1,
      listDescription: "",
      listNameValid: false,
      listDescriptionValid: false,
      chips: []
    };
  },
  computed: {
    disabledSend() {
      return !(this.listNameValid && this.listDescriptionValid)
    }
  },
  methods: {
    modifyEmail: function(){
      
    },
    save: function () {
      this.$store.dispatch("user/createList", {
        name: this.listName,
        privacy: this.listPrivacy,
        description: this.listDescription,
        places: this.placesId,
        editors_email: this.chips
      });
      this.$emit("save");
      this.listName = '';
      this.listDescription = '';
    },
    cancel: function () {
      this.$emit("close");
    },
    checkName: function(input) {
      this.listNameValid = input.trim().length > 0
    },
    checkDescription: function(input) {
      this.listDescriptionValid = input.trim().length > 0
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
