<template>
    <div class="header">
        <h1>知乎日报</h1>
        <ul>
            <router-link to="/daily"><li @click="clickHanlder(0)" :class="{on:activeId===0}">日报</li></router-link>
            <router-link to="/themes"><li @click="clickHanlder(1)" :class="{on:activeId===1}">专题</li></router-link>
            <router-link to="/description"><li @click="clickHanlder(2)" :class="{on:activeId===2}">关于</li></router-link>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 0
    };
  },
  methods: {
    clickHanlder(id) {
      this.activeId = id;
    }
  }
  //   watch: {
  //     activeId(val) {
  //       if (val) console.log(val);
  //     }
  //   }
};
</script>

<style>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 150px;
  background: #d5d5d5;
}
.header h1 {
  text-align: center;
}
.header li {
  float: left;
  width: 30%;
  height: 40px;
  margin: 5px;
  line-height: 40px;
  list-style: none;
  text-align: center;
  background: #fff;
}
.header li.on,
.header li:hover {
  background: red;
}
</style>
