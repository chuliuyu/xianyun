<template>
  <div>
    <!-- 面包屑 -->
    <el-row class="head">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{form.destCity}}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <!-- 筛选 -->
    <el-form ref="form">
      <el-row :gutter="20" class="filter">
      <el-col :span="5">
        <div class="grid-content bg-purple">
           <el-autocomplete
                placeholder="目的地"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                :trigger-on-focus="false"
                v-model="form.destCity">
            </el-autocomplete>
        </div>
      </el-col>
      <el-col :span="10">
        <el-row type="flex" class="grid-content bg-purple">
          <el-date-picker
            v-model="form.enterTime"
            type="date"
            placeholder="入住时间"
            @change="handleEnter">
          </el-date-picker>
          -
          <el-date-picker
            v-model="form.leftTime"
            type="date"
            placeholder="离店时间"
            @change="handleLeft">
          </el-date-picker>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input  v-model="input" placeholder="人数未定" @focus="handleShow">
            <i slot="suffix" class="el-input__icon el-icon-user"></i>
          </el-input>
          <div class="person" v-show="isShow">
              <div class="content">
                  每间
                  <div class="inp">
                      <el-select size="mini" v-model="mold1" placeholder="请选择"
                                  @change="handleMold1">
                        <el-option
                        v-for="(item,index) in type1"
                        :key="index"
                        :label="item.value1"
                        :value="item.value1"
                        >
                        </el-option>
                    </el-select>
                    <el-select size="mini" v-model="mold2" placeholder="请选择"
                               @change="handleMold2">
                        <el-option 
                        v-for="(item,index) in type2"
                        :key="index"
                        :label="item.value1"
                        :value="item.value1"
                        >
                        </el-option>
                    </el-select>
                  </div>
              </div>
              <div class="btn">
                  <el-button type="primary" @click="handlePush">确定</el-button>
              </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleCheck" >查看价格</el-button>
        </div>
      </el-col>
    </el-row>
    </el-form>

    <el-row type="flex">
        <el-row class="search">
            <el-row :gutter="10" class="chunk">
                <el-col :span="3"><div class="grid-content bg-purple link">区域：</div></el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple" :class={hidden:isA}>
                        <nuxt-link to="/hotel">全部</nuxt-link>
                        <nuxt-link to="/hotel" 
                           v-for="(item,index) in scenic"
                           :key="index">
                           {{item.name}}
                        </nuxt-link>
                    </div>
                    <span @click="handleClick"><i class="el-icon-d-arrow-right rotate"></i>等{{scenic.length}}个区域</span>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="chunk">
                <el-col :span="3"><div class="grid-content bg-purple">攻略：</div></el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple">
                        <p>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</p>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="chunk">
                <el-col :span="3"><div class="grid-content bg-purple">均价：</div></el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple">
                        <span><i class="el-icon-medal color"></i> 
                            <i class="el-icon-medal color"></i>
                            <i class="el-icon-medal color"></i>
                            ￥332
                        </span>
                        <span><i class="el-icon-medal color"></i> 
                            <i class="el-icon-medal color"></i>
                            <i class="el-icon-medal color"></i>
                            <i class="el-icon-medal color"></i>
                            ￥512
                        </span>
                        <span><i class="el-icon-medal color"></i> 
                            <i class="el-icon-medal color"></i>
                            <i class="el-icon-medal color"></i>
                            <i class="el-icon-medal color"></i>
                            <i class="el-icon-medal color"></i>
                            ￥768
                        </span>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <div id="map">

        </div>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      isShow:false,
      isA:true,
      input:[],
      mold1:"",
      mold2:"",
      type1:[
        {
          value1:"1成人"
        },
        {
          value1:"2成人"
        },
        {
          value1:"3成人"
        },
        {
          value1:"4成人"
        },
        {
          value1:"5成人"
        },
        {
          value1:"6成人"
        },
        {
          value1:"7成人"
        },
      ],
      type2:[
        {
          value1:"1儿童"
        },
        {
          value1:"2儿童"
        },
        {
          value1:"3儿童"
        },
        {
          value1:"4儿童"
        },
        {
          value1:"5儿童"
        },
        {
          value1:"6儿童"
        },
        {
          value1:"7儿童"
        },
      ],
      scenic:[],
      form:{
        destCity:"南京市",
        city:74,
        enterTime:"",
        leftTime:""
      },
      locations:[],
      data:[]
    };
  },
  mounted(){
     
      this.$axios({
        url:"/hotels",
        method:"GET"
      }).then(res=>{
        const {data}=res.data;
        // console.log(data[0].scenic);
        this.data=data;
        this.scenic=data[0].scenic;
        this.$emit("setHotelList",data)
      })
      setTimeout(() => {
        let locations=[];
        for(var i=0;i<this.data.length;i++){
          locations.push(this.data[i].location);
        }
          this.locations=locations;
      }, 500);
      this.getMap();
        // 引入高德地图的js文件
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${"763aebf096e7824f4d4e14237beddac0"}&callback=onLoad&plugin=AMap.ToolBar`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
  },
  methods:{
    handleClick(){
      // console.log(123);
      this.isA=!this.isA;
    },
    handleEnter(value1){
           this.form.enterTime = moment(value1).format(`YYYY-MM-DD`);
          //  console.log(this.form.enterTime);
    },
    handleLeft(value1){
           this.form.leftTime = moment(value1).format(`YYYY-MM-DD`);
    },
    handleCheck(){
      this.$router.push({
        path:"/hotel",
        query:this.form
      })
    },
    handleMold1(value){
      this.mold1=value;
    },
    handleMold2(value){
      this.mold2=value;
    },
    handleShow(){
      this.isShow=true;
      this.input=[];
    },
    handlePush(){
      const arr=[];
      arr.push(this.mold1);
      arr.push(this.mold2);
      this.input=arr;
      this.isShow=false;
    },
    handleSelect(item){
      this.form.destCity=item.name;
      this.form.city=item.id;
       this.$router.push({
        path:`/hotel?city=${this.form.city}`,
       })
      this.$axios({
        url:"/hotels",
        method:"GET",
        params:{
          city:this.form.city
        }
      }).then(res=>{
        const {data}=res.data;
        // console.log(data[0].scenic);
        this.data=data;
        this.scenic=data[0].scenic;
        this.$emit("setHotelList",data)
      })
    },
    querySearch(value, cb){
      if(!value){
                return;
            }
            this.$axios({
                url:'/cities?name='+value,
                method:"GET"
            }).then(res=>{
                const {data}=res.data;
                const newData=data.map(v=>{
                    return {
                        ...v,
                        value:v.name
                    }
                })
                cb(newData)
        })
    },
    getMap(value){
      window.onLoad =()=>{
        // console.log(this.locations);
            var map = new AMap.Map('map', {
                zoom:11,//放大级别
                center: [ this.locations[0].longitude,this.locations[0].latitude],//中心点坐标
                viewMode:'3D'//使用3D视图
            });
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar)
            var arr=[];
            for(var i=0;i<this.locations.length;i++){
              const {longitude,latitude}=this.locations[i]
              var marker = new AMap.Marker({
                  position: new AMap.LngLat(longitude,latitude),   
                  title: '南京'
              });
              arr.push(marker);
               
            }
            // console.log(arr);
            map.add(arr);

        }
    }
  }
};
</script>

<style scope lang="less">
.head {
  margin: 10px 0;
  .breadcrumb {
    font-size: 16px;
    margin: 5px 0;
  }
}
.filter {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 35px;
  position: relative;
  .person {
      position: absolute;
      width: 300px;
      height: 150px;
      background-color: #fff;
      z-index: 999;
      top: 50px;
      border-radius: 5px;
      border: 1px solid #DCDFE6;
      box-sizing: border-box;
      padding: 10px;
      .content {
          height: 75px;
          width: 100%;
          border-bottom: 1px solid #DCDFE6;
          line-height: 75px;
          .inp {
              float:right;
              input {
                  width: 100px;
              }
          }
      }
      .btn {
          float:right;
          margin-top:10px;
      }
  }
  .nuxt-link-active{
    &:active{
    background: #eee;
    cursor: auto;
    text-decoration: none;
    color: #999;
    }
    &:hover {
      text-decoration: underline;
      color: #09f;
    }
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.search {
    width: 600px;
    color:#666;
    font-size: 14px;
    .chunk{
        margin-bottom: 30px;
        .link {        
            a {
                color: inherit;
                font-size: inherit;
                margin-right: 15px;
            }
        }
        .hidden {
                height: 37px!important;
                overflow: hidden;
            }
        .rotate{
            transform: rotate(90deg);
            color: #f90;
        }
    }
    span {
        margin-right: 30px;
        .color {
        color: orange;
        font-size: 20px;
    }
    }
}
#map {
    width: 500px;
    height: 250px;
}
</style>
