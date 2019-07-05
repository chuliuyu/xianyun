<template>
    <div class="header">
        <!-- 中间部分 -->
        <el-row type="flex" justify="space-between" class="container">
            <!-- logo -->
            <div class="logo">
                <nuxt-link to="/">
                    <img src="/images/logo.jpg" alt="">
                </nuxt-link>
            </div>
            <!-- 导航栏 -->
            <el-row type="flex" class="nav">
                <nuxt-link to="/">首页</nuxt-link>
                <nuxt-link to="/post">旅游攻略</nuxt-link>
                <nuxt-link to="/hotel">酒店</nuxt-link>
                <nuxt-link to="/air">国内机票</nuxt-link>
            </el-row >
            <!-- 登录状态 -->
            <el-row>
                <el-dropdown v-if="$store.state.user.userInfo.token">
                    <el-row type="flex" align="middle" class="el-dropdown-link">
                        <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">
                        <span>{{$store.state.user.userInfo.user.nickname}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-row>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>用户中心</el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="handleLogout">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div v-else class="login">
                    <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
                </div>
            </el-row>
        </el-row>
    </div>
</template>

<script>
export default {
    methods:{
        handleLogout(){
            const  {commit}=this.$store;
            commit("user/clearUserInfo");
            this.$message.success("退出成功...")
        }
    }
}
</script>

<style lang="less" scoped>
    .container {
        width: 1000px;
        height: 60px;
        margin: 0 auto;
        .logo {
            width: 156px;
            height: 60px;
            padding-top: 9px;
            img {
                width:100%;
                display: block;
            }
        }
        .nav {
            line-height: 60px;
            flex: 1;
            a {
                display: block;
                padding: 0 20px;
                &:hover {
                    border-bottom: 5px solid #409eff;
                    color: #409eff;
                }
            }
            .nuxt-link-exact-active {
                background-color: #409eff;
                color: #fff;
                &:hover {
                    color: #fff;
                    border: none;
                }
            }
        }
        .el-dropdown-link {
            cursor: pointer;
            height: 60px;
            img {
                width: 36px;
                height: 36px;
                border-radius:50%;
                vertical-align: middle;
                border: 2px solid #fff;
                &:hover {
                    border: 2px solid #409eff;
                }
            }
        }
        .login {
            line-height: 60px;
            a:hover {
                color: #409eff;
            }
        }
    }
</style>

