<template>
  <div class="main-page">
    <div class="main-page__header">
      <button class="btn-gray" @click.prevent="addSidebar">
        <i class="material-icons">
          add
        </i>
        Добавить
      </button>
    </div>
    <div class="tabel-header" style="background: #061d3a;">
      <div class="tabel-header__name"></div>
      <div class="tabel-header__count text_white16">Обшее количество</div>
      <div class="tabel-header__action text_white16">Действия</div>
    </div>

    <div v-for="(division, index) in data" :key="index">
      <div class="tabel-body" style="background: #fffff;">
        <div class="tabel-header__name text_black16" @click="toggle(index)">
          {{ division.name }}
          <i
            v-if="division.children.length > 0"
            class="material-icons arrow_back_ico"
            :class="list_item.includes(index) == true ? 'active' : ''"
            >arrow_forward_ios</i
          >
        </div>
        <div class="tabel-header__count text_black16">
          {{ division.count }}
        </div>
        <div class="tabel-header__action text_black16">
          <div>
            <span class="icon" @click.prevent="addChildMain(index)">
              <i class="material-icons">add</i>
            </span>
            <span class="icon" @click.prevent="openModalMain(division, 0, index)">
              <i class="material-icons">create</i>
            </span>
            <span class="icon" @click="deleteSidebar(division.id, 0)">
              <i class="material-icons">cancel</i>
            </span>
          </div>
        </div>
      </div>
      <div v-show="list_item.includes(index)">
        <multilevel-accordion :tree="division" :paddingLeft="8" ref="child">
          <template slot-scope="{ tree, level, expanded, leaf }">
            <div
              class="tabel-body"
              :class="text_color ? 'text-white' : ''"
              style="transition: box-shadow 0.5s, background-color 0.5s, color 0.5s;"
              :style="{ backgroundColor: changeColor(level) }"
            >
              <div
                class="tabel-header__name text_black16"
                :class="text_color ? 'text-white' : ''"
              >
                {{ tree.name }}

                <i
                  v-if="!leaf"
                  class="material-icons arrow_back_ico"
                  :class="`${expanded ? 'active' : ''}`"
                  >arrow_forward_ios</i
                >
              </div>
              <div
                class="tabel-header__count text_black16"
                :class="text_color ? 'text-white' : ''"
              >
                {{ tree.count }}
              </div>
              <div
                class="tabel-header__action text_black16"
                :class="text_color ? 'text-white' : ''"
              >
                <div>
                  <span class="icon" @click="addChildIndex()">
                    <!-- @click.self="openModalCopypromo(promo_code)" -->
                    <i class="material-icons">add</i>
                  </span>
                  <span class="icon" @click="openModal(tree, 1)">
                    <i class="material-icons">create</i>
                  </span>
                  <span class="icon" @click="deleteSidebar(tree.id, 1)">
                    <i class="material-icons">cancel</i>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </multilevel-accordion>
      </div>
    </div>

    <Modal
      v-if="isModalOpen"
      :getOneDivision="division_one"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import MultilevelAccordion from "./MultilevelAccordion";
import Modal from "../modal/Modal";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: { MultilevelAccordion, Modal },
  data() {
    return {
      open: false,
      list_item: [],
      main_index: null,
      colorCache: {},
      text_color: false,
      isModalOpen: false,
      division_one: [],
    };
  },
  computed: {
    ...mapGetters(["getAllDivision", "getColors", "getIndex"]),
    data() {
      console.log(this.getAllDivision);
      return this.getAllDivision;
    },
    colors() {
      return this.getColors;
    },
    indexItem() {
      return this.getIndex;
    },
  },
  methods: {
    ...mapMutations([
      "ADD_MAIN_SIDEBAR",
      "ADD_CHILD_MAIN_SIDEBAR",
      "ADD_CHILD_INDEX_SIDEBAR",
      "DELETE_MAIN_SIDEBAR",
    ]),
    ...mapActions(["loadDivision", "loadColors"]),
    toggle(val) {
      // console.log(val);
      this.main_index = val;
      if (this.list_item.includes(val)) {
        var index = this.list_item.indexOf(val);
        this.list_item.splice(index, 1);
      } else {
        this.list_item.push(val);
      }
    },
    addSidebar() {
      this.ADD_MAIN_SIDEBAR({
        id: new Date().getTime(),
        name: "main",
        count: 0,
        children: [],
      });
    },
    addChildMain(index) {
      console.log(index);
      const payload = [
        {
          id: new Date().getTime(),
          name: "child",
          count: 0,
          children: [],
        },
        {
          index: index,
        },
      ];
      this.ADD_CHILD_MAIN_SIDEBAR(payload);
    },
    addChildIndex() {
      this.addColor();
      setTimeout(() => {
        console.log("index child 1 = ", this.main_index + "_" + this.indexItem);
        const payload = [
          {
            id: new Date().getTime(),
            name: "child",
            count: 0,
            children: [],
          },
          {
            index: this.main_index + "_" + this.indexItem,
          },
        ];
        this.ADD_CHILD_INDEX_SIDEBAR(payload);
      }, 700);
    },
    deleteSidebar(id, val) {
      setTimeout(() => {
        if (val == 0) {
          this.main_index = "0";
          var index = null;
        } else {
          index = this.getIndex;
        }
        var indexDivision;
        console.log("this.indexItem = ", this.indexItem);
        console.log("this.main_index = ", this.main_index);
        if (index != null) {
          indexDivision = this.main_index + "_" + index;
        } else {
          indexDivision = this.main_index;
        }
        const payload = [
          {
            id: id,
            index: indexDivision,
          },
        ];
        console.log(payload);
        this.DELETE_MAIN_SIDEBAR(payload);
      }, 700);
    },
    addColor() {
      const r = () => Math.floor(256 * Math.random());
      var rgb = `rgb(${r()}, ${r()}, ${r()})`;
      this.colors.push(rgb);
      // console.log(this.colors)
    },
    changeColor(level) {
      // if (this.colors[level]) {
      //   var r,
      //     g,
      //     b,
      //     rgb = this.colors[level].match(/\d+/g);
      //   r = parseInt(rgb[0], 16);
      //   g = parseInt(rgb[1], 16);
      //   b = parseInt(rgb[2], 16);
      //   var color = ((r*299) + (g*587) + (b*114))/1000
      //   if (color>=128) {
      //     this.text_color = false; // черный
      //   } else {
      //     this.text_color = true; // белый
      //   }
      // }

      return this.colors[level];
    },
    openModal(arr, val) {
      setTimeout(() => {
        if (val == 0) {
          this.main_index = "0";
          var index = null;
        } else {
          index = this.getIndex;
        }
        console.log("this.getIndex = ", this.getIndex);
        const data = [
          {
            data: arr,
          },
          {
            main_index: this.main_index,
            indexItem: index,
            val: val
          },
        ];
        console.log(data);
        this.division_one = data;
        this.isModalOpen = true;
      }, 700);
    },
    openModalMain(arr, val, main) {
      setTimeout(() => {
        if (val == 0) {
          this.main_index = main.toString();
          var index = null;
        } else {
          index = this.getIndex;
        }
        console.log("this.getIndex = ", this.getIndex);
        const data = [
          {
            data: arr,
          },
          {
            main_index: this.main_index,
            indexItem: index,
            val: val
          },
        ];
        console.log(data);
        this.division_one = data;
        this.isModalOpen = true;
      }, 700);
    },
  },
  async mounted() {
    this.loadDivision(1000);
    this.loadColors(1000);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/main.scss";
</style>
