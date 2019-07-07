<template>
  <div>
    旅游攻略首页
    <el-button @click="handlePush(item)" v-for="(item,index) in arr" :key="index">{{item}}</el-button>
    <el-button @click="handleClick">游记</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [4, 5, 6, 7]
    };
  },
  methods: {
    handlePush(id) {
      this.$router.push({
        path: "/post/travelDetail",
        query: {
          id
        }
      });
    },
    handleClick() {
      this.$router.push("/post/create");
    }
  }
};
</script>

<style>
</style>