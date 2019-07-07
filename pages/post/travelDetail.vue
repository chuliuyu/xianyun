<template>
  <div class="container el-row is-justify-space-between el-row--flex">
    <el-row class="main">
      <!-- 面包屑 -->
      <Mianbao />
      <h1 v-for="(item,index) in data" :key="index">{{item.title}}</h1>
      <div class="post-info">
        <span>攻略：2019-05-22 10:57</span>
        <span v-for="(item,index) in data" :key="index">阅读：{{item.watch}}</span>
      </div>
      <div class="post-content" v-for="(item,index) in data" :key="index" v-html="item.content"></div>
      <Comment />
    </el-row>
    <!-- 相关攻略 -->
    <Aside />
  </div>
</template>

<script>
import Mianbao from "~/components/post/miaobao.vue";
import Comment from "~/components/post/comment.vue";
import Aside from "~/components/post/aside.vue";
export default {
  data() {
    return {     
      data: [],
      id:"",
    };
  },
  components: {
    Comment,
    Mianbao,
    Aside
  },
  methods: {},
  mounted() {
    // console.log(this.$route);
    this.id=this.$route.query.id;
    this.$axios({
      url: "/posts?id=" + this.id,
      method: "GET"
    }).then(res => {
      const { data } = res.data;
      this.data = [...data];
      // console.log(this.data);
    });
  }
};
</script>
<style scoped lang='less'>
.container {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  width: 1000px;
  margin: 0 auto;
  .main {
    width: 700px;
    .crumbs {
      flex-wrap: wrap;
    }
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .post-info {
      color: #999;
      text-align: right;
      padding: 20px;
      span {
        &:first-child {
          margin-left: 12px;
        }
        &:last-child {
          margin-left: 52px;
        }
      }
    }
    .post-content {
      line-height: 1.5;
      width: 100%;
      /deep/ img{
        max-width: 700px;;
      }
    }
    .cmt-wrapper {
      margin-bottom: 20px;
      .cmt-title {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .cmt-input {
        resize: none;
        min-height: 33px;
        .el-textarea {
          display: inline-block;
          width: 100%;
          vertical-align: bottom;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
