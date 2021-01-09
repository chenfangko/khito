<template lang="pug">
v-container.fill-height.rounded-lg.align-content-start.w-100
  v-row.px-3
    //autocomplete
    v-autocomplete(
      v-model="model",
      :items="items",
      :search-input.sync="search",
      :loading="isLoading",
      background-color="#fcfcfc",
      dense,
      flat,
      hide-no-data,
      hide-selected,
      item-text="name",
      solo,
      label="輸入標籤，新增進篩選器",
      return-object,
      @input="inputHandler"
    )
      template(v-slot:append)
        svg(width="20px", height="20px")
          use(xlink:href="#search")

  v-row.px-3.chipBox
    .kingTags.mt-3
      .d-flex.justify-space-around.align-center.w-100
        v-chip.px-5.py-3(
          v-for="(tag, index) in GetterKingTag",
          :key="index",
          :color="tag.isActive ? 'active-chip' : 'unactive-chip'",
          :text-color="tag.isActive ? 'blue' : 'grey darken-1'",
          @click="kingChipClickHandler(tag)"
        ) 
          svg.mr-2
            use(:xlink:href="icon(index)")
          span {{ tag.name }}

    v-chip-group.commonTags.mt-1(column)
      v-chip(
        v-for="(tag, index) in my_tags",
        :key="index",
        color="#e7c99e",
        close,
        @click:close="chipCloseHandler(tag, index)"
      ) {{ tag.name }}
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      model: null,
      nameLimit: 10,
      entries: [],
      search: null,
      isLoading: false,
      kingTags: [
        {
          id: 101,
          type: 1,
          name: "想去",
        },
        {
          id: 102,
          type: 1,
          name: "喜歡",
        },
        {
          id: 103,
          type: 1,
          name: "暫存",
        },
      ],
    };
  },
  computed: {
    ...mapState("place", ["placeInfo"]),
    ...mapState("place", ["my_tags", "king_tags", "place_tags"]),
    ...mapGetters("place", ["GetterKingTag"]),
    //autocomplete
    fields() {
      if (!this.model) return [];
      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    //autocomplete
    items() {
      return this.entries.map((entry) => {
        const name =
          entry.name.length > this.nameLimit
            ? entry.name.slice(0, this.nameLimit) + "..."
            : entry.name;
        return Object.assign({}, entry, { name });
      });
    },
  },
  //autocomplete
  watch: {
    //autocomplete
    search(text) {
      if (text === null) return;
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store
        .dispatch("user/searchTag", {
          place_id: this.placeInfo.place_id,
          text: text,
        })
        .then((response) => {
          this.entries = response.data.data.filter(
            (tag) =>
              !this.my_tags
                .concat(this.kingTags)
                .map((tag) => tag.id)
                .includes(tag.id)
          );
          if (response.data.data.length == 0) {
            if (!text == "") {
              const tag = {
                id: -1,
                type: 2,
                name: this.search,
              };
              this.entries.unshift(tag);
            }
          }
          if (response.data.data[0].name == this.search) return;
        })
        .catch(() => {})
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    chipCloseHandler(tag, index) {
      this.$store.commit("place/DELETE_MY_TAG", index);
      this.$store.commit("place/ADD_PLACE_TAG", tag);
    },
    kingChipClickHandler({ id, name, type, isActive }) {
      if (!isActive) {
        this.$store.commit("place/ADD_KING_TAG", { id, name, type });
      } else {
        this.$store.commit("place/DELETE_KING_TAG", { id, name, type });
      }
    },
    //autocomplete
    inputHandler(tag) {
      if (this.place_tags.map((tag) => tag.name).includes(tag.name)) {
        this.$store.commit(
          "place/DELETE_PLACE_TAG",
          this.place_tags.map((tag) => tag.name).indexOf(tag.name)
        );
      }
      this.$store.commit("place/ADD_MY_TAG", tag);
      const index = this.entries.map((e) => e.id).indexOf(tag.id);
      this.entries.splice(index, 1);
    },
    icon(index) {
      if (index == 0) {
        return "#want";
      } else if (index == 1) {
        return "#love";
      } else {
        return "#tempsave";
      }
    },
  },
};
</script>

<style scoped lang="sass">
svg
  width: 18px
  height: 18px
  fill: #4d89a5
.container
  background-color: #eeeeee
.chipBox
  height: 150px
  overflow-y: scroll
  -ms-overflow-style: none
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none
::v-deep
  .v-label
    font-family: TaipeiSansTCBeta
    font-size: 10.5px
    letter-spacing: 0.95px
    color: #818181
  .v-input__append-inner
    cursor: pointer
  .v-text-field__details
    display: none !important
  .v-input__control
    min-height: 35px !important
    height: 35px !important
  .v-autocomplete__content::-webkit-scrollbar
    width: 10px !important

  .kingTags
    height: 30%
    width: 100%
    overflow-y: scroll
    -ms-overflow-style: none
    scrollbar-width: none
    &::-webkit-scrollbar
      display: none
    .v-chip
      height: 22px !important
      border-radius: 6px !important
      box-shadow: 0 1px 4px 0 rgba(212, 212, 212, 0.5) !important
      .v-chip__content
        font-family: TaipeiSansTCBeta !important
        font-weight: bold !important
        letter-spacing: 1.05px !important

  .v-chip-group.commonTags
    .v-chip
      height: 22px !important
      border-radius: 6px !important
      box-shadow: 0 1px 4px 0 rgba(212, 212, 212, 0.5) !important

      .v-chip__content
        font-family: TaipeiSansTCBeta !important
        font-weight: bold !important
        letter-spacing: 1.05px !important
        color: #617283 !important
</style>