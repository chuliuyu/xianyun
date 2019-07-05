export const state=()=>{
    return {
        userInfo:{
            token:"",
            user:{
    
            }
        }
    }
}
export const mutations={
    setUserInfo(state,data){
        state.userInfo=data;
    },
    clearUserInfo(state){
        if(process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo={};
    }
}
export const actions={
    login({commit},data){
        return this.$axios({
            url:"/accounts/login",
            method:"POST",
            data: data
        }).then(res=>{
           const data=res.data;
           commit("setUserInfo",data)
           Promise.resolve();
        })
    },
    register({commit},data){
        return this.$axios({
            url: `/accounts/register`,
            method: "POST",
            data: data
           }).then(res=>{
               console.log(res.data);
               const data=res.data;
               commit("setUserInfo",data)
               Promise.resolve();
           })
    }
}