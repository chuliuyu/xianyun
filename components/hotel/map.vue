<template>
  <div class="box">
    
    <div id="container"></div>

    <div id="panel"></div>

    <div>
        城市：<select name="" id="" v-model="city">
        <option value="广州" >广州</option>
        <option value="深圳" >深圳</option>
    </select>
    起点：<input type="text" placeholder="请输入出发的位置" v-model="start">
    终点：<input type="text" placeholder="请输入目的地" v-model="end">
    <button @click="handleSearch">驾驶路线</button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            city:'',
            start:'',
            end:'',
            map:null,
            id:37,
            // 传递过来的酒店坐标
            longitude:'',
            latitude:'',
        }
    },
    props:{
      location:{
        type:Object,
        default:{}
      }
    },
    methods:{
        handleSearch(){
         this.map = new AMap.Map("container", {
        // 添加配置
        zoom: 16, //级别
      
      }); 
        var driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: this.map,
                panel: "panel"
            })
            var points = [
                { keyword: this.start, city:this.city },
                { keyword: this.end, city:this.city }
            ]
            driving.search(points, function (status, result) {
                // 未出错时，result即是对应的路线规划方案
                })
       
        }
    },
  mounted() {
    setTimeout(() => {
        
      console.log(this.location);
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        // 添加配置
        zoom: 20, //级别
        
        // center: [this.location.longitude,this.location.latitude], //中心点坐标
        center: [ 118.92251,31.75561], //中心点坐标
        viewMode: "3D", //使用3D视图
        
      });
      this.map=map
      // toolbar插件
        AMap.plugin('AMap.ToolBar',function(){//异步加载插件
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar);
        });
   

    //   var marker1 = new AMap.Marker({
    //     // 自定义图片内容
    //     icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
    //     position: new AMap.LngLat(113.3245904,23.1066805), // 经纬度对象
    //     title: "广州塔"
    //   });
    //   var marker2 = new AMap.Marker({
    //     // 自定义图片内容
    //     icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
    //     position: new AMap.LngLat(113.318977, 23.114155), // 经纬度对象
    //     title: "体育西(地铁)"
    //   });
    //   map.add([marker1, marker2]);
     var markers = [{
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
        position: [113.3245904,23.1066805]
    }, {
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
        position: [113.318977, 23.114155]
    }, {
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
        position: [113.318977, 23.118155]
    }];

    // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
    markers.forEach(function(marker) {
        new AMap.Marker({
            map: map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30)
        });
    });
// map.add([marker])
      
      
    };
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=4bbcab3db124d1d3927ece5b700e091a&callback=onLoad&plugin=AMap.Driving`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    },2000)
  
  }
};
</script>

<style scoped>
.box {
  width: 100%;
}
#container {
  /* margin: 0 auto; */
  width: 650px;
  height: 360px;
}
#panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
}
#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
</style>
