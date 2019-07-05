<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <FlightsFilters :data="cacheflightsData"
                                    @setDataList="setDataList"/>
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem
                    v-for="(item,index) in dataList" 
                    :key="index"
                    :data="item"/>
                    <!-- 分页 -->
                    <el-row type="flex" justify="center" style="margin-top:10px;">
                        <!-- size-change：切换条数时候触发 -->
                        <!-- current-change：选择页数时候触发 -->
                        <!-- current-page: 当前页数 -->
                        <!-- page-size：当前条数 -->
                        <!-- total：总条数 -->
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </el-row>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from "@/components/air/fightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"
export default {
    data(){
        return {
            flightsListData:{
                flights: [],
                info: {},
                options: {}
            },
            cacheflightsData:{
                flights: [],
                info: {},
                options: {}
            },
            dataList:[],
            total:0,
            pageIndex:1,
            pageSize:5,
        }
    },
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    methods:{
        getData(){
            this.$axios({
            url: `airs`,
            params: this.$route.query,
            method:"GET"
        }).then(res=>{
            console.log(res.data);
            this.flightsListData=res.data;
            this.cacheflightsData={...res.data};
            this.total=this.flightsListData.total;
            this.setDataList();
        })
        },
        setDataList(arr){
            if(arr){
                this.pageIndex=1;
                this.flightsListData.flights = arr;
                this.flightsListData.total = arr.length;
            }
            const start=(this.pageIndex-1)*this.pageSize;
            const end=this.pageIndex*this.pageSize;
            this.dataList=this.flightsListData.flights.slice(start,end)
        },
        handleSizeChange(value){
            this.pageSize=value;
            this.setDataList();
        },
        handleCurrentChange(value){
            this.pageIndex=value;
            this.setDataList();
        }
    },
    mounted(){
        this.getData();
    },
     watch: {
        $route(){
             this.getData();
        }
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>