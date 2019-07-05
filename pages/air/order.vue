<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm @setInfoData="setInfoData"
                @setAllPrice="setAllPrice"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
               <OrderAside :data="infoData" :allPrice="allPrice"/>            
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue"
import OrderAside from "@/components/air/orderAside.vue"
export default {
    data(){
        return{
            infoData: {
                seat_infos: {}
            },
            allPrice:123
        }
    },
    components:{
        OrderForm,
        OrderAside
    },
    methods:{
        setInfoData(data){
            this.infoData = data;
        },
        setAllPrice(price){
            console.log(price);
            this.allPrice = price;
        }
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>