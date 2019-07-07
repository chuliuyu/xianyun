<template>

    <div class="container">
        <!-- 地图模块 -->
        <Map @setHotelList="setHotelList"/>
        <!-- 酒店模块 -->
        <HotelModel :hotelList="hotelList"/>
    </div>
</template>

<script>
import Map from "@/components/hotel/map.vue"
import HotelModel from "@/components/hotel/hotelModel.vue"
export default {
    data(){
        return{

            hotelList:[]
        }
    },
    components:{
        Map,
        HotelModel
    },
    mounted(){
        this.$router.push({
        path:"/hotel?city=74",
      })
    },
    methods:{
        setHotelList(data){
            this.hotelList=data;
        }
    }
}
</script>

<style lang="less" scoped>
    .container {
        width: 1000px;
        margin: 0 auto;
    }
</style>