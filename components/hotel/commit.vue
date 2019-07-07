<template>
    <div class="bigBox">
        <el-row class="userPinglun">
    <el-col :span="3">
      <div class="demo-basic--circle">
        <div class="block">
            <img class="block" :src="circleUrl" alt=""><span>LV.8</span>
        </div>
        <h4>2019-6-26</h4>
      </div>
    </el-col>  
    <!-- 文本域 -->
    <!-- <div style="margin: 20px 0;"></div> -->
    <el-col :span="21" >
        <div class="textArea">
            <p>badwoman</p>
        <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
        </el-input>
        <el-button type="primary" icon="el-icon-edit" class="textCommit" size="mini ">提交</el-button>
        </div>
    </el-col>  
        </el-row>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        circleUrl: "https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90",
        // circleUrl: "@/components/static/images/AllMight.jpg",
        // sizeList: ["large", "medium", "small"]
         textarea2: '',
      }
    }
  }
</script>

<style scoped lang='less'>
.userPinglun{
    padding: 10px 0;
    border-bottom: 1px dashed #ddd;
}
.demo-basic--circle{
    padding: 20px 0;
    .block{
        height: 55px;
        width: 55px;
        /* background-color: skyblue; */
        
        position: relative;
        img{
        border-radius: 50%;
        border: 1px solid orange;
        }
        span{
            color:red;
            position: absolute;
            top: 3px;
            left: 68px;
            font-size: 14px;
        }
    }
    
    h4{
        color: #666;
        font-weight: 500;
        padding: 8px 0;
    }
}
    .textArea{
        height: 55px;
        position: relative;
        box-sizing: border-box;
        padding: 10px 0;
        p{
            padding: 6px 0;
            color: #666;
        }
        .textCommit{
           position: absolute;
           top: 97px;
           left: 800px;
        }
    }

    
</style>
