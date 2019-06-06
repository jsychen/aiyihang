<template>
    <div class="wrap">
        <div class="phone">
            当前手机号：{{phone}}
        </div>
       <mt-field label="手机号" placeholder="请输入新的手机号" v-model="newPhone"></mt-field>
        <mt-field label="验证码" v-model="code" placeholder="请输入验证码" class="getcode">
             <span  class="btn-code" @click="codeClick">{{tip}}</span>
        </mt-field>
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
            tip:'获取验证码',
            phone:'',
            openid:'',
            newPhone:'',
            onoff:false,
            code: ''
        }
    },
    methods:{
        submit(){
            if(!this.newPhone){
                Toast('手机号码不能为空');
                return;
            }
            if(!this.code){
                Toast('验证码不能为空');
                return;
            }
            let that=this
            this.$ajax({
                method: 'post',
                url:'member/update',
                data:this.$qs.stringify({phone:that.newPhone,smsCode:that.code,openId:that.openid})
            }).then((res)=>{
                if(res.data.code  == '0000'){
                   that.$router.back(-1) // -> /user
                }else{
                    Toast(res.data.msg);
                }
            });
        },
        codeClick(){
            if(!this.newPhone){
                Toast('手机号码不能为空');
                return;
            }
            if(this.onoff){
                return;
            }
            this.onoff=true
            let that=this
            this.$ajax({
                method: 'post',
                url:'captcha/sendSms',
                data:this.$qs.stringify({phone:that.newPhone,openId:that.openid})
            }).then((res)=>{
                let i =60
                let timer=setInterval(function(){
                    if(i==1){
                        that.tip="获取验证码"
                        that.onoff=false
                        clearInterval(timer)
                        return;
                    }
                   that.tip=--i+'秒后重新获取'
                },1000)
            });
        }
    },
    created(){
        this.phone=this.$route.params.value
        this.openid=localStorage.getItem('openid')
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
    .phone{
        height:px2rem(78px);
        font-size:px2rem(17px);
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .btn-code{
        color:#7a7979;
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
