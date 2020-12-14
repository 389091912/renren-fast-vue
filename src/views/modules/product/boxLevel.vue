<template>
  <box-add-leave :boxType="boxType"></box-add-leave>
</template>

<script>
  import BoxAddLeave from "./boxaddleave";
  export default {
    data () {
      return {
        boxType: 0
      };
    },
    components: {
      BoxAddLeave
    },
    methods: {
    }
  }
</script>
