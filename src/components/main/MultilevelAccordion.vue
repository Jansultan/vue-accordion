<template>
  <div class="accordion-root">
    <ul class="list-root">
      <multilevel-accordion-children
        v-for="(child, index) in tree.children"
        :key="index"
        :tree="child"
        :position="index"
        :interleaveOffset="1"
        :reference="`${index}`"
        :level="0"
        :indexId="index"
        :marginLeft="marginLeft"
        :paddingLeft="paddingLeft"
      >
        <template slot-scope="_">
          <slot
            :tree="_.tree"
            :interleaved="_.interleaved"
            :expanded="_.expanded"
            :level="_.level"
            :leaf="_.leaf"
          ></slot>
        </template>
      </multilevel-accordion-children>
    </ul>
  </div>
</template>

<script>
import MultilevelAccordionChildren from "./MultilevelAccordionChildren.vue";
import { mapMutations } from "vuex";

export default {
  props: {
    tree: {
      type: Object
    },
    marginLeft: {
      type: Number,
      default: 0
    },
    paddingLeft: {
      type: Number,
      default: 0
    }
  },
  components: {
    MultilevelAccordionChildren
  },
  methods:{
      ...mapMutations(["ADD_CHILD_INDEX_SIDEBAR"]),
      addChildIndex(index){
      console.log('index child = ', index)
    //   const payload = [{
    //     name: "child",
    //     count: 0,
    //     children: []
    //   },
    //   {
    //     index: index
    //   }]
    //   this.ADD_CHILD_INDEX_SIDEBAR(payload);
    }
  }
};
</script>