<template>
  <div class="daily">
    <div class="daily-menu">
      <!-- 每日推荐 -->
      <div class="daily-menu-item" :class="{on:type==='recommend'}" @click="handleToRecommend">每日推荐</div>
      <!-- 主题日报有子菜单 -->
      <div class="daily-menu-item" :class="{on:type==='daily'}" @click="showThemes=!showThemes">主题日报</div>
      <ul v-show="showThemes">
        <li v-for="item in GET_THEMES" :key="item.id">
          <a :class="{on:item.id===themeId &&type==='daily'}" @click="handleToTheme(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>

    <div class="daily-list" ref="list" @scroll="handleScroll">
      <!-- 每日推荐 -->
      <template v-if="type==='recommend'">
        <div class="daily-date">{{formatDay(GET_RECOMMENDLIST.date)}}</div>
        <Item @click.native="handleClick(item.id)" v-for="item in GET_RECOMMENDLIST.stories" :data="item" :key="item.id"></Item>
      </template>
      <!-- 主题日报 -->
      <template v-if="type==='daily'">
        <Item @click.native="handleClick(item.id)" v-for="item in list" :data="item" :key="item.id"></Item>
      </template>
    </div>
    <daily-article :id="articleId"></daily-article>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Item from "@/components/item.vue";
import dailyArticle from "@/components/daily-article.vue";
import $ from "@/libs/util";

export default {
  name: "daily",
  components: {
    Item,
    dailyArticle
  },
  computed: {
    ...mapGetters(["GET_THEMES", "GET_RECOMMENDLIST", "GET_ISLOADING"])
  },
  data() {
    return {
      showThemes: false,
      themeId: 0,
      type: "recommend",
      list: [],
      dailyTime: $.getTodayTime(),
      articleId: 0
    };
  },
  methods: {
    handleClick(id) {
      this.articleId = id;
    },
    getThemes() {
      this.$store.dispatch("FETCH_THEMES");
    },
    handleToTheme(id) {
      this.themeId = id;
      this.type = "daily";
      this.list = [];
      this.$store.dispatch("FETCH_THEMES");
    },
    handleToRecommend() {
      this.type = "recommend";
      this.recommendList = [];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },
    getRecommendList() {
      this.$store.commit("MODIFY_ISLOADING");
      // const prevDay = $.prevDay(this.dailyTime);
      // 因为使用的是before/日期  从而得到日期的前一天的数据
      const prevDay = $.prevDay(this.dailyTime + 86400000);
      this.$store.dispatch("FETCH_RECOMMENDLIST", prevDay);
    },
    handleScroll() {
      const $list = this.$refs.list;
      console.log($list.scrollTop + $list.clientHeight); // 1311.3636474609375
      console.log($list.scrollHeight); // 1312
      if (this.type === "daily" || this.GET_ISLOADING) return;
      if ($list.scrollHeight - ($list.scrollTop + $list.clientHeight) <= 0.7) {
        this.dailyTime -= 86400000;
        this.getRecommendList();
        // 重新获取列表后记得滚回到顶部
        $list.scrollTop = 0;
      }
    },
    formatDay(date) {
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      if (month.substr(0, 1) === "0") month = month.substr(1, 1);
      if (day.substr(0, 1) === "0") day = day.substr(1, 1);
      return `${month}月${day}日`;
    }
  },
  mounted() {
    this.getRecommendList();
    this.getThemes();
  }
};
</script>
