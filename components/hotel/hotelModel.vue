<template>
  <div>
    <!-- 酒店筛选 -->
    <el-row class="hotel-filter">
      <el-col :span="8">
        <div class="grid-content bg-purple">
             <el-row class="des" type="flex" justify="space-between">
                 <span>价格</span>
                 <span>0-4000</span>
             </el-row>
             <el-slider v-model="price" :max="4000" :step="500"></el-slider>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
            <el-row class="des" type="flex" justify="space-between">
                 <span>住宿类型</span>
                 <span></span>
            </el-row>
            <el-select
            v-model="value1"
            placeholder="不限"
            class="sel">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
            <el-row class="des" type="flex" justify="space-between">
                 <span>住宿等级</span>
                 <span></span>
             </el-row>
             <el-select
            v-model="value2"
            placeholder="不限"
            class="sel">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
            <el-row class="des" type="flex" justify="space-between">
                 <span>酒店品牌</span>
                 <span></span>
             </el-row>
             <el-select
            v-model="value3"
            placeholder="不限"
            class="sel">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
            <el-row class="des" type="flex" justify="space-between">
                 <span>酒店设施</span>
                 <span></span>
             </el-row>
             <el-select
            v-model="value4"
            placeholder="不限"
            class="sel">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- 酒店列表 -->
    <div class="hotel-list">
      <el-row type=flex justify="space-between" 
        v-for="(item,index) in hotelList"
        :key="index" 
        >
        <div class="photo">
          <img :src="item.photos" alt="">
        </div>
        <div class="des">
          <h2 @click="handleSubmit(index)">{{item.name}}</h2>
          <p>
            {{item.alias}}
            <i class="el-icon-medal color"/>
            <i class="el-icon-medal color"/>
            <i class="el-icon-medal color"/>
            <i class="el-icon-medal color"/>
            {{item.hoteltype.name}}
          </p>
          <el-row type="flex" justiify="space-between"  style="margin-top:20px"> 
            <div class="star">
              <el-rate
                v-model="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                >
              </el-rate>
              <span style="color:orange;font-size:14px">{{item.stars}}分</span>
            </div>
            <div style="font-size:14px;margin:0 30px;"><span style="color:orange">69</span>条评价</div>
            <div style="font-size:14px;"><span style="color:orange">69</span>篇游记</div>
          </el-row>
          <div class="position" style="margin-top:20px">
            <span style="color:#666;font-size:14px"><i class="el-icon-location"></i>位于: {{item.address}}</span>
          </div>
        </div>
        <div class="link">
          <div class="left-container">
            <div class="recommend" >
              <p > 
                携程
                <span style="color:orange;">￥ 485起</span>
          
                <i class="el-icon-arrow-right"></i>
              </p>
              <p >
                 艺龙
                <span style="color:orange;">￥ 512起</span>
                
                <i class="el-icon-arrow-right"></i>
              </p>
              <p > 
                hotels.com
                <span style="color:orange;">￥ 473起</span>
               
                <i class="el-icon-arrow-right"></i>
              </p>
            </div>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            price:50,
            value1: [],
            value2: [],
            value3: [],
            value4: [],
            options1: [],
            options2: [],
            options3: [],
            options4: [],
            // hotelList:[]
        }
    },
    props:{
      hotelList:{
        type:Array,
        default:[]
      }
    },
    mounted(){
      this.$axios({
        url:"/hotels/options",
        method:"GET"
      }).then(res=>{
        // console.log(res.data);
        const {data}=res.data;
        this.options1=data.types;
        this.options2=data.levels;
        this.options3=data.brands;
        this.options4=data.assets;
      })
      // this.$axios({
      //   url:"/hotels",
      //   method:"GET"
      // }).then(res=>{
      //   const {data}=res.data;
      //   console.log(data);
      //   this.hotelList=data;
      // })
    },
    methods:{
      handleSubmit(index){
        this.$router.push({
          path:"/hotel/detail",
          query:{
            id:this.hotelList[index].id
          }
        })
      }
    }
};
</script>

<style >
.hotel-filter {
    margin:20px 0;
    border: 1px solid #DCDFE6;
    height: 80px;
    padding: 5px;
}
.hotel-filter .el-col {
  border-radius: 4px;
  border-right: 1px solid #DCDFE6;
  height: 70px;
}
.hotel-filter .el-col .grid-content {
    padding: 5px 20px;
}
.hotel-filter .el-col .grid-content span{
    font-size: 14px;
    color: #666;
}
.hotel-filter .el-col:last-child{
    border-right: none;
}
.bg-purple {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 35px;
}
.sel {
  width: 140px;
  margin-top: 10px;
}
.sel input {
  height: 20px;
  outline: none;
  border: none;
}
.sel i {
  line-height: 20px;
}
.hotel-list{
  width: 1000px;
}
.hotel-list>.el-row{
  height: 265px;
  width: 100%;
  border-bottom: 1px solid #DCDFE6;
  padding: 25px 0;
}
.photo {
  width: 300px;
  margin-right: 20px;
}
.photo img {
  width: 100%;
  display: block;
  height: 100%;
}
.des{
  width: 425px;
}
.des p {
  font-size: 14px;
  color: #666;
}
.des .color {
  color: orange;
}
.link {
  flex:1;
}
.left-container{
    width: 260px;
}

.recommend {
  width: 260px;
  height: 160px;
  line-height: 40px;
  z-index: 2;
  margin-top:30px;
}

 .recommend  p {
    font-size: 14px;
    padding-left: 20px;
    color: #666;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 2;
    position: relative;
    height: 40px;
    }
    .recommend  p i {
      position: absolute;
      right: 10px;
      top: 15px;
    }
    .recommend  p span {
      position: absolute;
      right: 30px;
      top:2px;
    }
</style>
