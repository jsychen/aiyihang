<template>
    <div class="wrap">
      <div class="inner">
            <div class="item-list">
              <mt-cell title="头像">
                  <img v-if="userinfo.url" :src="userinfo.url" width="24" height="24">
                  <img v-else src="../../assets/anvator.jpg" width="24" height="24">
              </mt-cell>
              <mt-cell  title="昵称"  is-link :value="userinfo.alias" :to="'/changenicheng/'+userinfo.alias">

              </mt-cell>
            </div>
            <div class="option-item">
              <mt-cell title="姓名" is-link :value="userinfo.name" :to="'/changexingming/'+userinfo.name"></mt-cell>
              <mt-cell title="称谓" is-link :value="userinfo.sex==1?'男':'女'" :to="'/changechenwei/'+userinfo.sex"></mt-cell>
              <mt-cell title="手机号" is-link :value="userinfo.phone" :to="'/changeinfo/'+userinfo.phone"></mt-cell>
            </div>
            <div class="bottom-btn" @click="logout">
                退出登录
            </div>
      </div>
      <footer>爱义行，让洗车变得简单快乐</footer>
    </div>

</template>
<script>
export default {
    data(){
        return {
            userinfo:{
                alias:'',
                name:'',
                phone:'',
                sex:'',
                url:'',
                id:'',
                balance:'',
                defaultUrl:''
            }
        }
    },
    methods:{
         getinfo(openId){
            let that=this
            this.$ajax.get('member/getInfo',{
               params:{
                   openId
               }
            }).then((res)=>{
                console.log(res,'res获取用户信息')
                that.userinfo=res.data.data
                console.log(userinfo.url)
            });
        },
        logout(){
            localStorage.removeItem('openid');//sessionid
            localStorage.removeItem('wxopenid');//openid
            this.$router.push({ name: 'myindex'})
        }
    },
    mounted(){
        this.defaultUrl = '../../assets/Group4.png'
        if(localStorage.getItem('openid')){
            this.onoff=true
            console.log(this.onoff)
            this.getinfo(localStorage.getItem('openid'))
        }
    }
}
</script>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        height:100%;
        background:#f5f5f5;
    }
    .item-list{
        margin-bottom:px2rem(20px);
    }
    .option-item{
        margin-bottom:px2rem(30px);
    }
    .bottom-btn{
        display:flex;
        justify-content: center;
        align-items: center;
        width:px2rem(348px);
        background: -moz-linear-gradient( top,#FF8586,#D81618);
        background:  -webkit-linear-gradient( top,#FF8586,#D81618);
        background: -o-linear-gradient( top,#FF8586,#D81618);
        background: linear-gradient( top,#FF8586,#D81618);
        font-size:px2rem(15px);
        color:#fff;
        height:px2rem(40px);
        border-radius:px2rem(8px);
        margin:px2rem(20px) auto 0 auto;
    }
    footer
    {
      margin-top:px2rem(30px);
      top:80%;
      width:100%;
      height:px2rem(15px);
      font-size: px2rem(13px);
      text-align: center;
      font-weight: 500;
      color: #6d6d6d;

    }
</style>
