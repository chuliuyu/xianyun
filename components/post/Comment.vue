<template>
  <div class="comment">
    <!-- 图标 -->
    <div class="post-ctrl">
      <el-row type="flex" justify="center">
        <div class="ctrl-item">
          <i class="iconfont iconpinglun"></i>
          <p>评论：100</p>
        </div>

        <div class="ctrl-item">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>

        <div class="ctrl-item">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>

        <div class="ctrl-item">
          <i class="el-icon-thumb"></i>
          <p>点赞(5)</p>
        </div>
      </el-row>
    </div>

    <!-- 评论 -->
    <div class="cmt-wrapper">
      <h4 class="cmt-title">评论</h4>
      <!-- 文本域 -->
      <div class="cmt-input">
        <el-input autocomplete="off" type="textarea" placeholder="请输入内容" v-model="textarea" />
      </div>
      <!-- 照片墙 -->
      <el-row class="cmt-input-ctrls" type="flex" justify="space-between">
        <div class="cmt-pics">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <div>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
      </el-row>
      <!-- 文章评论 -->
      <div class="cmt-list">
        <!-- <div class="cmt-item">
          <div class="cmt-info" v-for='(item,index) in data' :key='index'>
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />aaa
            <i>2019-07-05 4:43</i>
            <span>1</span>
          </div>
          <div class="cmt-content">
              <div class="cmt-new">
                  <p class="cmt-message" v-for='(item,index) in data' :key='index'>{{item.content}}</p>
              </div>
          </div>
        </div> -->
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="margin-top:10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      pageIndex: 1,
      data: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/comments",
      method: "GET"
    }).then(res => {
      const { data } = res.data;
      this.data = data;
      // console.log(data);
    });
  },
  methods: {
    onSubmit() {
      // this.$axios({
      //   url:'/comments',
      //   method:'POST'
      // }).then(res=>{
      //   console.log(res);
      //   // const {content} =res.data;
      // })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
};
</script>

<style scoped lang='less'>
.comment {
  .post-ctrl {
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        font-size: 28px;
        color: orange;
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .cmt-wrapper {
    margin-bottom: 20px;
    .cmt-title {
      padding-bottom: 20px;
      font-weight: 400;
      font-size: 18px;
    }
    .cmt-input {
      margin-bottom: 10px;
    }
    .cmt-input-ctrls {
      margin-bottom: 30px;
    }
    .cmt-list {
      border: 1px solid #ddd;
      .cmt-item {
        border-bottom: 1px dashed #ddd;
        padding: 20px 20px 5px;
        .cmt-info {
          margin-bottom: 10px;
          font-size: 12px;
          color: #666;
          img {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
          span {
            float: right;
          }
        }
      }
      .cmt-content {
        padding: 0 0 0 30px;
        .cmt-message {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
