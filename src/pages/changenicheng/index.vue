<template>
    <div class="wrap">
       <mt-field label="原昵称" :disabled="true"  v-model="username"></mt-field>
       <mt-field label="新昵称" placeholder="请输入新昵称" v-model="alias"></mt-field>
        <div class="bottom-btn" @click="submit">
            确定
        </div>
      <footer>爱义行，让洗车变得简单快乐</footer>
    </div>

</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
        username: '',
        openid:'',
        alias:''
        }
    },
    methods:{
        submit(){
            if(!this.alias){
                Toast('昵称不能为空')
                return;
            }
            let that=this
            this.$ajax({
                method: 'post',
                url:'member/update',
                data:this.$qs.stringify({openId:that.openid,alias:that.alias})
            }).then((res)=>{
                //  that.$router.push({ name: 'selfinfo'}) // -> /user
                 that.$router.back(-1)
            }).catch((err)=>{
                let data=err.response.data
                switch(data.code){
                    case '4001':
                    Toast(data.msg);
                    break;
                }
            });
        }
    },
    created(){
        this.openid=localStorage.getItem('openid')
        this.username=this.$route.params.value
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        height:100%;
        background:#f5f5f5;
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
        margin:px2rem(198px) auto 0 auto;
    }
    footer
    {
     margin-top:px2rem(30px);
      width:100%;
      height:px2rem(15px);
      font-size: px2rem(13px);
      text-align: center;
      font-weight: 500;
      color: #6d6d6d;

    }
</style>
