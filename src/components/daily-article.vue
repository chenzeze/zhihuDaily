<template>
    <div class="daily-article">
        <div class="daily-article-title">{{GET_ARTICLE.title}}</div>
        <div class="daily-article-content" v-html="GET_ARTICLE.body"></div>
        <div class="daily-comments" v-show="GET_COMMENTS.length">
            <span>评论{{GET_COMMENTS.length}}</span>
            <div class="daily-comment" v-for="comment in GET_COMMENTS" :key="comment.id">
                <div class="daily-comment-avatar">
                    <img :src="'/img?url='+comment.avatar">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{comment.author}}</div>
                    <div class="daily-comment-time" v-time="comment.time"></div>
                    <div class="daily-comment-text">{{comment.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "../libs/util";
import Time from "../directives/time";
import { mapGetters } from "vuex";
export default {
  directives: { Time },

  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["GET_COMMENTS", "GET_ARTICLE"])
  },

  methods: {
    replaceUrl: $.replaceUrl,
    //获取文章
    getArticle() {
      this.$store.dispatch("FETCH_ARTICLE", this.id);
    },
    // 获取评论
    getComments() {
      this.$store.dispatch("FETCH_COMMENTS", this.id);
    }
  },
  watch: {
    id(val) {
      if (val) {
        this.getArticle();
        this.getComments();
      }
    }
  }
};
</script>

<style>
</style>
