<template>
  <div id="protocol">
    <iframe src="./protocol.txt"></iframe>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'protocol'
}
</script>

<style lang="scss" scoped>
#protocol {
  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
}
</style>
