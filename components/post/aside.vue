<template>
  <div>
    <ul class="aside">
      <h4 class="aside_title">相关攻略</h4>
      <div class="aside_list">
        <nuxt-link to="/post/detail?id=100" class="a">
          <div class="list">
            <el-row type="flex" class="list_left">
              <img
                src="http://157.122.54.189:9093/post/detail?id=229"
                style="width:100px; height:'80px'"
              />
              <el-row class="list_right" type="flex">
                <p class="beijing">北京</p>
                <p class="time">2019-07-07 8:50 阅读 2</p>
              </el-row>
            </el-row>
            <el-row type="flex" class="list_left">
              <img
                src="http://157.122.54.189:9093/post/detail?id=229"
                style="width:100px; height:'80px'"
              />
              <el-row class="list_right" type="flex">
                <p class="beijing">北京</p>
                <p class="time">2019-07-07 8:50 阅读 2</p>
              </el-row>
            </el-row>
          </div>
        </nuxt-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang='less'>
.aside {
  width: 280px;
  .aside_title {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  .aside_list {
    .a {
      display: block;
      padding: 10px 0;
      .list {
        .list_left {
          border-bottom: 1px solid #ddd;
          padding: 10px 0;
          img {
            display: block;
            width: 100px;
            height: 80px;
          }
        }
        .list_right {
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          .beijing {
            font-size: 16px;
            padding-bottom: 40px;
          }
          .time {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
