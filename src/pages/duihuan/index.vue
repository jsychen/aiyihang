<template>
    <div class="wrap">
       <div class="inner">
           <div class="desc">兑换优惠券</div>
           <input type="text" placeholder="请输入车牌号" v-model="number">
           <input class="duihuanma" type="text" placeholder="请输入兑换码" v-model="couponNum">
           <div class="btn" @click="submit">
               确认兑换
           </div>
            <div class="line"></div>
         <div class="code" >
           <div class="code-saoma" id="code"> <span style="color:black;">扫码领取</span></div>
         </div>
            <div class="line"></div>
            <div class="line"></div>
         <div class="code" >
           <div class="code-saoma" id="saocode"> <span style="color:black;">扫码洗车</span></div>
         </div>

         <div class="line"></div>
           <div class="content">
               <div class="title">兑换说明</div>
               <div class="item">1.兑换码只能兑换一次，并在有效期内兑换</div>
               <div class="item">2.自动识别或输入兑换码兑换成相应的优惠劵或洗车劵</div>
               <div class="item">3.兑换的产品不支持退款，只能用于消费</div>
           </div>
       </div>
      <footer>爱义行，让洗车变得简单快乐</footer>
    </div>

</template>
<script>
import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            redirecturl:'',
            couponNum:'',
            appids:'',
            number:'',
            openId:'',
            boxid:''
        }
    },
    methods:{
        usestate(){
            let that=this
            this.$ajax.get('box/canWash',{
                params:{openId:that.openId,fboxUid:that.boxid}
            }).then((res)=>{
                window.location.href=that.redirecturl+that.boxid
            }).catch(err=>{
                alert(JSON.stringify(err.response.data.msg))
            });
        },
        getConfig() {
            let url = location.href.split('#')[0] //获取锚点之前的链接
            let that=this
            this.$ajax({
            method: 'post',
            url:'wx/getJsapiSignature',
            data:this.$qs.stringify({url})
            }).then((res)=>{
                that.wxInit(res.data.data);
            }).catch(err=>{
                console.log(err)
            });
        },
        wxInit(res) {
        let that=this
        let url = location.href.split('#')[0] //获取锚点之前的链接
        wx.config({
          debug: false,
          appId: that.appids,
          timestamp: res.timestamp,
          nonceStr: res.noncestr,
          signature: res.signature,
          jsApiList: ['scanQRCode']
        });
        wx.ready(function() {
          document.getElementById('saocode').onclick = function () {
              wx.scanQRCode({
                  needResult: 1,
                  desc: 'scanQRCode desc',
                  success: function (res) {
                    //   that.boxid=res.resultStr
                    //   that.usestate()
                    window.location.href = res.resultStr
                  }
              })
          };
          document.getElementById('code').onclick=function(){
            wx.scanQRCode({
              needResult: 1,
              desc: 'scanQRCode desc',
              success: function (res) {
                that.couponNum=res.resultStr
              }
            })
          }

        });
        wx.error(function(err) {

        });
      },
        submit(){
            let that=this
            if(!this.number){
                Toast('车牌号不能为空')
                return;
            }
            if(!this.couponNum){
                Toast('兑换码不能为空')
                return;
            }
            this.$ajax({
                method: 'post',
                url:'coupon/receiveCoupon',
                data:this.$qs.stringify({couponNum:that.couponNum,number:that.number.toUpperCase(),openId:that.openId})
            }).then((res)=>{
                Toast('兑换成功')
            }).catch(err=>{
                Toast(err.response.data.msg)
            });
        }
    },
    created(){
        this.appids=this.appid
        this.couponNum=this.$route.params.id
        this.openId=localStorage.getItem('openid')
    },
    mounted(){
        this.redirecturl=this.saomaurl
       this.getConfig()
       if (this.openId != null) {
      this.$ajax({
        method: 'post',
        url: "member/isLogin",
        data: this.$qs.stringify({ openId: this.openId })
      }).then(res => {
        console.log(res)
        if (res.data.code == '0000') {
          if (res.data.data == false) {
            Toast('未登录,3秒后跳转')
            setTimeout(() => {
              this.$router.replace({ name: 'myindex' })
            }, 3000)
          }
        } else {
          Toast(res.data.msg)
          setTimeout(() => {
            this.$router.replace({ name: 'myindex' })
          }, 3000)
        }
      }).catch(err => {
        setTimeout(() => {
          this.$router.replace({ name: 'myindex' })
        }, 3000)
      })
    }
    }
}
</script>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .code{
        height:px2rem(32px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .code-saoma{
      width:px2rem(120px);
      height:px2rem(32px);
      border: 1px #cca859 solid;
      border-radius:px2rem(80px);
      background: #cca859;
      text-align: center;
      line-height:px2rem(32px);
      font-size: px2rem(15px);
    }
    .duihuanma{
        margin-top:px2rem(8px);
    }
    .wrap{
        height:100%;
        background:#f5f5f5;
    }
    .inner{
        padding-bottom:px2rem(10px);
        font-size:px2rem(14px);
        background:#fff;
    }
    .desc{
        width:px2rem(349px);
        margin:0 auto;
        padding-top:px2rem(25px);
        padding-bottom:px2rem(23px);
    }
    input{
        display:block;
        width:px2rem(347px);
        margin:0 auto;
        height:px2rem(40px);
        border:px2rem(1px) solid #e7e7e7;
        outline: none;
        margin:0 auto;
        padding:0;
        font-size:px2rem(14px);
        padding-left:px2rem(12px);
    }
    .btn{
        height:px2rem(39px);
        background:#cca859;
        width:px2rem(347px);
        margin:0 auto;
        border-radius: px2rem(4px);
        color:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:px2rem(15px);
        margin-top:px2rem(24px);
    }
    .line{
        border-top:px2rem(1px) solid #e7e7e7;
        width:px2rem(350px);
        margin:0 auto;
        margin-top:px2rem(16px);
        margin-bottom:px2rem(20px);
    }
    .title{
        line-height:px2rem(22px);
        width:px2rem(336px);
        margin:0 auto;
    }
    .item{
        width:px2rem(336px);
        margin:0 auto;
        line-height:px2rem(20px);
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
