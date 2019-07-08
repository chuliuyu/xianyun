<template>
  <div class="box">
    <div id="container" @click="handleIsShow"></div>
    <div id="panel" v-show="isShow"></div>
    <div>
      城市：
      <select name id v-model="city">
        <option value="广州">广州</option>
        <option value="深圳">深圳</option>
        <option value="南京">南京</option>
        <option value="成都">成都</option>
        <option value="杭州">杭州</option>
      </select>
      起点：
      <input type="text" placeholder="请输入出发的位置" v-model="start" />
      终点：
      <input type="text" placeholder="请输入目的地" v-model="end" />
      <button @click="handleSearch">驾驶路线</button>
      <button @click="handleHotel">酒店</button>
    </div>
     <div id="panel2" class="scrollbar1">
            <div id="searchBar">
                <input id="searchInput" placeholder="输入关键字搜素附近美食" v-model="beautifulFood"/>
            </div>
            <div id="searchResults"></div>
      </div>
  </div>
</template>

<script>
// 获取已经添加的marker

export default {
  data() {
    return {
      city: "",
      start: "",
      end: "",
      map: null,
      id: 37,
      // 输入的美食地点
      beautifulFood:"",
      isShow: true
    };
  },
  props: {
    location: {
      type: Object,
      default: {}
    }
  },
  methods: {
    getMapPage(){
      var map = new AMap.Map("container", {
           resizeEnable: true,
          // 添加配置
          zoom: 20, //级别
          center: [this.location.longitude, this.location.latitude], //中心点坐标
          viewMode: "3D" //使用3D视图
        });
        this.map = map;
        // toolbar插件
        AMap.plugin("AMap.ToolBar", function() {
          //异步加载插件
          var toolbar = new AMap.ToolBar();
          map.addControl(toolbar);
        });
       
       var marker = new AMap.Marker({
        position: [this.location.longitude, this.location.latitude],
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        offset: new AMap.Pixel(-13, -30),
      
        // 设置是否可拖拽
        draggable: false,
        cursor: 'move'
        });
         map.add(marker)
        // marker.setMap(map);
        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');
        
        
        // 搜索附近美食
         AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) => {
        var poiPicker = new PoiPicker({
            input: 'searchInput',
            city:this.beautifulFood,
            placeSearchOptions: {
                map: map,
                pageSize: 10
            },
            searchResultsContainer: 'searchResults'
        });

        poiPicker.on('poiPicked', function(poiResult) {

            poiPicker.hideSearchResults();

            var source = poiResult.source,
                poi = poiResult.item;

            if (source !== 'search') {
                //suggest来源的，同样调用搜索
                poiPicker.searchByKeyword(poi.name);
            } else {
            }
        });

        poiPicker.onCityReady(function() {
            poiPicker.searchByKeyword('美食');
        });
    });
    },
    handleIsShow() {
      this.isShow = !this.isShow;
    },
    handleSearch() {
      this.map = new AMap.Map("container", {
        // 添加配置
        zoom: 16 //级别
      });
      var driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME,
        map: this.map,
        panel: "panel"
      });
      var points = [
        { keyword: this.start, city: this.city },
        { keyword: this.end, city: this.city }
      ];
      driving.search(points, function(status, result) {
        // 未出错时，result即是对应的路线规划方案
      });
    },
    handleHotel(){
        var map = new AMap.Map("container", {
           resizeEnable: true,
          // 添加配置
          zoom: 20, //级别
          center: [this.location.longitude, this.location.latitude], //中心点坐标
          viewMode: "3D" //使用3D视图
        });
        this.map = map;
        // toolbar插件
        AMap.plugin("AMap.ToolBar", function() {
          //异步加载插件
          var toolbar = new AMap.ToolBar();
          map.addControl(toolbar);
        });
       
       var marker = new AMap.Marker({
        position: [this.location.longitude, this.location.latitude],
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        offset: new AMap.Pixel(-13, -30),
      
        // 设置是否可拖拽
        draggable: false,
        cursor: 'move'
        });
         map.add(marker)
        // marker.setMap(map);
        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');
    }
   
  },
  mounted(){
    setTimeout(() => {
      window.onLoad = () => {
        this.beautifulFood=this.location.city
        this.getMapPage()
      };
      var url = `https://webapi.amap.com/maps?v=1.4.15&key=4bbcab3db124d1d3927ece5b700e091a&callback=onLoad&plugin=AMap.Driving,AMap.PlaceSearch`;
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);

      var url2 = `https://webapi.amap.com/ui/1.0/main.js?v=1.0.11`;
      var jsapi2 = document.createElement("script");
      jsapi2.charset = "utf-8";
      jsapi2.src = url2;
      document.head.appendChild(jsapi2);

    }, 1000);
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
   z-index: 999;
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
 #panel2 {
        position: absolute;
        top: 840px;
        
        left: 0;
        height: 666px;
        overflow: auto;
        width: 255px;
        z-index: 999;
        border-left: 1px solid #eaeaea;
        /* background-color: #ddd; */
    }
    
    #searchBar {
        height: 30px;
        background: #ccc;
    }
    
    #searchInput {
        width: 100%;
        height: 30px;
        line-height: 30%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 0 5px;
    }
    
    #searchResults {
        overflow: auto;
        height: calc(100% - 30px);
    }
    
    .amap_lib_placeSearch,
    .amap-ui-poi-picker-sugg-container {
        border: none!important;
    }
    
    .amap_lib_placeSearch .poibox.highlight {
        background-color: #CAE1FF;
    }
    
    .poi-more {
        display: none!important;
    }

     .amap-marker:first-child .amap-icon img {
            width: 12px;
            height: 24px;
        }
</style>
