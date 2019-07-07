<template>
    <div class="contain">
        <div class="meta">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/hotel' }">南京酒店</el-breadcrumb-item>
            <el-breadcrumb-item>{{dataList.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <!-- 头部酒店地址 -->
        <div class="userDetail">
                <div><h4>{{dataList.name}}
                    <i v-for="(item,index) in crown"
                :key="index"> <span v-html="item"></span></i>
                    </h4>
                </div>
                <div><h5>{{dataList.alias}}</h5></div>
                <div><h5><span class="iconfont iconlocation"></span>{{dataList.address}}</h5></div>
        </div>
        <!-- 酒店图片 -->
        <el-row class="hotelPicture" type="flex" justify="space-between">
            <el-col class="picture-left">
                <img :src='urlPicture1' alt="" class="picture-left-target">
            </el-col>
            <el-col class="picture-right">
                <span v-for="(item,index) in urlPictureSmall"
                :key="index"> 
                    <img :src="item.src" alt="" @click="handleChangPic(item.src)"> 
                </span>
            </el-col>
        </el-row >
        <!-- <el-row class="hotelPrice" type="flex" justify="space-between">
            <el-col >价格来源</el-col>
            <el-col >低价房型</el-col>
            <el-col >最低价格</el-col>
        </el-row > -->
        <!-- 床位价格 -->
        <el-row type="flex" class="eachHotel">
           <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                label="价格来源"
                width="420">
                <template slot-scope="scope">
                    <i class="el-icon-office-building"></i>
                    <span style="margin-left: 0px">{{ scope.row.name }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="低价房源"
                width="420">
                <template slot-scope="scope">
                    <span style="margin-left: 0px">{{ scope.row.bestType }}</span>
                </template>
                </el-table-column>
                 <el-table-column
                label="最低房价/每晚"
                width="160">
                <div slot-scope="scope" class="hotelPrice">
                        <span style="margin-left: 0px" >￥ {{ scope.row.price }} </span><i>起</i>
                    <span class="el-icon-arrow-right"></span>
                </div>
                </el-table-column>
         
        </el-table>
        </el-row>

        <!-- 地图组件 -->
       <div class="location"> 
           <div class="map"><Map :location='location'/> </div>
           <span class="trafficView">
               <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="风景" name="first">
                        <div class="viewLocation">
                            <ul>
                                <li>123</li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="交通" name="second">
                        <div class="trafficLocation">
                            <ul>
                                <li>789</li>
                            </ul>
                        </div>
                    </el-tab-pane>
               </el-tabs>
               
           </span>
       </div>
       <!--酒店基本信息 -->
        <div class="hotleBase">
            <el-row>
                <el-col :span="4">
                    <div class="">
                        <div class="title">基本信息</div>
                        <div class="title">主要设施</div>
                        <div class="title">停车服务</div>
                        <div class="title">品牌信息</div>
                    </div>
                </el-col>
                <el-col :span="20" >
                    <div class="message1">
                        <span>入住时间: 14:00之后</span>
                        <span>离店时间: 12:00之前</span>
                        <span>1978年开业 / 2012年装修</span>
                        <span>　　酒店规模: {{this.dataList.roomCount}}间客房</span>
                    </div>
                    <div class="message2" >
                        <el-tag type="info"  v-for="(item,index) in hotelassets"
                        :key="index">{{item.name}}</el-tag>
                    
                    </div>
                    <div class="message3">免费停车;可以，大巴都可以;门口</div>
                    <div class="message">-</div>
                </el-col>
            </el-row>
        
        </div>
        <!-- 酒店评论 -->
        <div class="hotelComment">
            <h4>4条真实用户评论</h4>
            <el-row >
                <el-col :span="4"><div class="grid-content bg-purple">
                    <p>总评数：195</p>
                    <p>好评数：53</p>
                    <p>差评数：12</p>
                  </div>
                </el-col>
                <el-col :span="5"><div class="grid-abc bg-purple-light">
                    评分：<el-rate
                        v-model="stars"
                        disabled
                        show-score
                        text-color="#ff9900"
                        >
                        </el-rate></div>
                </el-col>
                <el-col :span="3"><div class="grid-content bg-purple">
                    <div class="yuan"><span><p>环境</p><p>{{scores.environment}}</p></span></div></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">
                    <div class="yuan"><span><p>产品</p><p>{{scores.product}}</p></span></div></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">
                    <div class="yuan"><span><p>服务</p><p>{{scores.service}}</p></span></div></div></el-col>
            </el-row>
        </div>
        <!-- 用户评论 -->
        <div class="commit">
             <Commit/>
        </div>
        <div class="commit">
             <Commit/>
        </div>
        <div class="commit">
             <Commit/>
        </div>
       
    </div>
</template>

<script>
import Map from '@/components/hotel/map'
import Commit from '@/components/hotel/commit'
  

export default {
    components:{
        Map,
        Commit,
    },
      methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
    handleChangPic(src){
            this.urlPicture1=src
        }
    },
    mounted(){
        const {id}=this.$route.query
        this.$axios({
            url:'/hotels?id='+id,
            method:'GET',
        }).then(res => {
            // console.log(res.data.data)
            this.dataList=res.data.data[0]
            this.stars=this.dataList.stars
            this.tableData=this.dataList.products
            this.hotelassets=this.dataList.hotelassets
            this.scores=this.dataList.scores
            this.location=this.dataList.location
            this.crownLength=this.dataList.hotellevel.level

            // 添加皇冠的数量
            let crown = this.crown[0]
            let newArr=[]
            for(var i=0;i<this.crownLength;i++){
                newArr.push(crown);
            }
            this.crown=newArr
        })
    },
    data() {
      return {
        //   皇冠数量
        crownLength:null,
        //   酒店等级皇冠图标
        crown:['<span class="iconfont iconhuangguan"></span>'],
        //   地图坐标
        location:{},
        // 用户评论酒店等级
        scores:{},
        //   第一张酒店大图的url
        urlPicture1:'http://157.122.54.189:9093/images/hotel-pics/1.jpeg',
        // 小图片的url
        urlPictureSmall:[
            {src:"http://157.122.54.189:9093/images/hotel-pics/1.jpeg"},
            {src:"http://157.122.54.189:9093/images/hotel-pics/2.jpeg"},
            {src:"http://157.122.54.189:9093/images/hotel-pics/3.jpeg"},
            {src:"http://157.122.54.189:9093/images/hotel-pics/4.jpeg"},
            {src:"http://157.122.54.189:9093/images/hotel-pics/5.jpeg"},
            {src:"http://157.122.54.189:9093/images/hotel-pics/6.jpeg"},
        ],
        //   返回的大数据
        dataList:[],
        //   酒店评分
        stars:null,
        // 酒店的价格来源
        products:[],
        // 酒店服务项目
        hotelassets:[],
        //  风景和交通切换
          activeName: 'second',
        //   酒店大床数据
        tableData: []
      }
    },
  
}
</script>

<style scoped lang='less'>
    .contain{
         width: 1000px;
            margin: 0 auto;
        .meta{
           
            padding: 20px 0;
            
             .el-icon-arrow-right{
                 
        }
        }
       .userDetail{
           h4{
               color: #333;
               font-weight: 400;
               font-size: x-large;
               span{
                   color: #f90;
                   
               }
           }
           h5{
               color: #666;
               font-size: 14px;
               font-weight: 400;
           }
       }
    //    酒店图片
       .hotelPicture{
           box-sizing: border-box;
           height: 360px;
           margin: 40px 0;
           .picture-right{
               box-sizing: border-box;
               flex-direction: column;
               flex-wrap: wrap;
               width: 360px;
               box-sizing: border-box;
               cursor: pointer;
               img{
                   float: left;
                   display: inline-block;
                   width: 160px;
                   height: 110px;
                   margin:0 0 15px 15px;
               }
           }
           .picture-left{
            //    box-sizing: border-box;
            //    background-color: yellow;
               width: 640px;
               margin-right: 10px;
               img{
                 display: block;
                 width: 100%;
                 height: 100%;
               }
           }
       }
    //    酒店的最低房价
    .eachHotel .hotelPrice{
        span{
            color: #f90;
            
        }
    }
    //    酒店附近的地图
       .location{
           margin: 40px 0;
           height: 380px;
        .map{
               float: left;
        }
           .trafficView{
               box-sizing: border-box;
               width: 330px;
               height: 360px;
               float: left;
               margin-left: 20px;
               .viewLocation{
                   width: 300px;
                   height: 330px;
                   
                   overflow: auto;
               }
           }
       }
       .hotleBase{
           margin: 40px 0;
           .title , .message,.message1,.message2,.message3{
                border-bottom: 1px solid #ddd;
               padding: 10px 10px;
              line-height: 40px;
               height: 40px;
               font-size: 14px;
               
           }
           .message1{
               span{
                   display: inline-block;
                   width: 24.5%;
                   color: #666;
               }
           }
           .message3{color: #666;}
       }
    //    酒店评论
       .hotelComment{
           padding: 20px 0;
           border-bottom: 1px dashed #ddd;
           .grid-abc{
               color: #f90;
           }
           .yuan{
               width: 70px;
               height: 70px;
               border: 1px solid orange;
               border-left: none;
               border-radius:50%;
               line-height: 3 0px;
               text-align: center;
               position: relative;
               float: left;
                span{
                    position: absolute;
                    top: 10px;
                    left: 20px;
                }
           }
       }
       .commit{
           height: 202px;
       }
       
    }
</style>
