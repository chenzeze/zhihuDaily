<template>
  <div>
    <Header></Header>
    <div class="body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
.body {
  position: absolute;
  top: 150px;
}
</style>
