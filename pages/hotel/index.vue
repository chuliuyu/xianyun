<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hotel/details' }">酒店</el-breadcrumb-item>
            <button @click="handleSummit">提交</button>
       </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return{
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
    
}
</script>

<style>

</style>