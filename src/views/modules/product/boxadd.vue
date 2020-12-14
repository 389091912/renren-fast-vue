<template>
  <box-add-leave :boxType="boxType"></box-add-leave>
</template>

<script>
import BoxAddLeave from "./boxaddleave";
export default {
  data () {
    return {
      boxType: 1
    };
  },
  components: {
    BoxAddLeave
  },
  methods: {
  }
}
</script>

