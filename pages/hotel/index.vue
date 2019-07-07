<template>
<<<<<<< HEAD
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hotel/details' }">酒店</el-breadcrumb-item>
            <button @click="handleSummit">提交</button>
       </el-breadcrumb>
=======
    <div class="container">
        <!-- 地图模块 -->
        <Map @setHotelList="setHotelList"/>
        <!-- 酒店模块 -->
        <HotelModel :hotelList="hotelList"/>
>>>>>>> 6a89c55cc2ff4893df8f265cd6c6f4e63a4f6a9d
    </div>
</template>

<script>
import Map from "@/components/hotel/map.vue"
import HotelModel from "@/components/hotel/hotelModel.vue"
export default {
    data(){
        return{
<<<<<<< HEAD
            // city:,
            hotelList:[
                // {
                // id:18,
                
                // price_in:'',
                // scenic:'',
                // name_contains:'',
                // hotellevel:'',
                // hoteltype:'',
                // hotelbrand:'',
                // hotelasset:'',
                // enterTime:'',
                // person:'',
                // _sort:'',
                // _limit:'',
                // _start:''
                // }
            ]
        }
    },
    methods:{
        handleSummit(){
            this.$axios({
                url:'/cities',
                method:'GET',
                params:{
                    name:'南京市'
                }
            }).then( res => {
                // console.log(res.data);
                const {id}=res.data.data[0]
                this.$router.push({
                    path:'/hotel/detail',
                    query:{
                        id:2
                    }
                })
            })
        }
    }
    
=======
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
>>>>>>> 6a89c55cc2ff4893df8f265cd6c6f4e63a4f6a9d
}
</script>

<style lang="less" scoped>
    .container {
        width: 1000px;
        margin: 0 auto;
    }
</style>