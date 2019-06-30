<template>
  <div class="wrap">
    <!-- <audio preload id="music" src="http://yima.52shuzhe.cn/dist/start.wav"></audio> -->
    <img class="voice" src="../../assets/images/icon-voice.svg" alt>
    <div class="inner">
      <div class="state">
         <span class="active">1</span>
         <div class="line active"></div>
         <span>2</span>
         <div class="line"></div>
         <span>3</span>
      </div>
      <div class="tip-title">确认车辆是否已停到指定位置</div>
      <div class="tip-title-bottom">通过洗车机两侧辅助镜查看</div>
      <div class="che">
        <img src="../../assets/enter.png" alt>
      </div>
      <div class="phone">
        <span class="label">服务热线：</span>400-885-6600
      </div>
    </div>
    <button class="handleNext" @click="next">下一步</button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      openId: '',
      wxopenid: '',
      idle: true
    }
  },
  methods: {
    next() {
      let that = this
      // if (this.openId == null) {
      //   Toast('未登录,3秒后跳转');
      //   setTimeout(function () {
      //     that.$router.replace({
      //       name: 'myindex'
      //     })
      //   }, 3000)
      //   return;
      // }

      if (that.idle) {
       
        return false;
      }
     
      this.$router.push({        
        name: 'saomatwo', 
        params: {
          id: that.$route.params.id
        }      
      })
    },
    usestate() {
      let that = this
      this.$ajax.get('box/canWash', {
        params: { openId: that.openId, fboxUid: that.$route.params.id }
      }).then((res) => {
        
        if (res.data.code == '0000') {
          if (res.data.data == 'idle') {
            Toast('空闲中')
            that.idle = false;
          } else {
            that.idle = true;
            Toast('正在洗车,3秒后跳转');
            setTimeout(function () {
              that.$router.replace({
                name: 'myindex'
              })
            }, 3000)
            return;
          }
          
        } else {
          that.idle = true;
          
          Toast(JSON.stringify(res.data.msg))
          if (!that.openId) {
            Toast('未登录,3秒后跳转');
            setTimeout(function () {
              that.$router.replace({
                name: 'myindex'
              })
            }, 3000)
            return;
          }
        }
      }).catch(err => {
        Toast(JSON.stringify(err.response.data.msg))
      });
    },
  },
  created() {
    this.openId = localStorage.getItem("openid"); //sessionId
    this.wxopenid = localStorage.getItem('wxopenid');//openid
    // var resultStr = 'http://h5.yima.ymxc168.com/#/saomahou/11'
    //     console.log(resultStr.split('#')[1].split('/')[2])
  },
  mounted() {
    // document.addEventListener("WeixinJSBridgeReady", function () {
    //   document.getElementById('music').play();
    // }, false);
    this.usestate();
    if (this.openId != null) {
      this.$ajax({
        method: 'post',
        url: "member/isLogin",
        data: this.$qs.stringify({ openId: this.openId })
      }).then(res => {
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
*{
   margin: 0;
   padding: 0;
}
html, body{
   width: 100%;
   height: 100%;
}
.wrap {
  height: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
}
.tip-title {
  font-size: px2rem(16px);
  text-align: center;
}
.tip-title-bottom {
  font-size: px2rem(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: px2rem(37px);
}
.inner {
  width: px2rem(355px);
  margin: 0 auto;
}
.bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(348px);
  background: -moz-linear-gradient( top,#FF8586,#D81618);
  background:  -webkit-linear-gradient( top,#FF8586,#D81618);
  background: -o-linear-gradient( top,#FF8586,#D81618);
  background: linear-gradient( top,#FF8586,#D81618);
  font-size: px2rem(15px);
  color: #fff;
  height: px2rem(40px);
  border-radius: px2rem(8px);
  margin: 0 auto;
}
.state {
   width: px2rem(290px);
  overflow: hidden;
  clear: both;
  margin: 0 auto;
  padding: px2rem(20px) 0;
  *{
     float: left;
  }
  span{
     width: px2rem(20px);
     height: px2rem(20px);
     border-radius: 50%;
     background: #d8d8d8;
     border: px2rem(5px) solid transparent;
     font-size: px2rem(14px);
     color: #fff;
     text-align: center;
     line-height: px2rem(20px);
     background-clip: padding-box;
     &.active{
        background: #44ceef;
        border: px2rem(5px) solid rgba(73,204,243,0.3);
        background-clip: padding-box;
     }
  }
  .line{
     width: px2rem(80px);
     height: px2rem(4px);
     font-size: 0;
     background: #d8d8d8;
     border-radius: px2rem(2px);
     margin-top: px2rem(12px);
     margin: px2rem(12px) px2rem(10px);
     position: relative;
     &.active{
        &:before{
           content: '';
           position: absolute;
           width: px2rem(40px);
           height: px2rem(4px);
           border-radius: px2rem(2px);
           background-image:url(../../assets/images/btnBg2.svg);
           background-size: cover;
           left: 0;
           top: 0;
        }
     }
  }
}
.handleNext{
   position: fixed;
   width: px2rem(300px);
   height: px2rem(40px);
   border-radius: px2rem(5px);
   background-image: url(../../assets/images/btnBg2.svg);
   font-size: px2rem(16px);
   box-shadow: 0 5px 10px rgba(70,127,157,0.3);
   margin-top: px2rem(60px);
   border: 0;
   left: 50%;
   margin-left: px2rem(-150px);
   bottom: px2rem(30px);
   color: #fff;
}
.dingdan-info {
  border: px2rem(1px) solid #e0e0e0;
  border-radius: px2rem(6px);
  padding: 0 px2rem(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(60px);
  background: #fff;
  margin-top: px2rem(17px);
}
.dingdan-info .top {
  font-size: px2rem(15px);
}
.dingdan-info .place {
  font-size: px2rem(13px);
}
.right {
  font-size: px2rem(28px);
  color: #ff0000;
}
.type {
  display: flex;
  color: #999;
  align-items: center;
  height: px2rem(55px);
  font-size: px2rem(14px);
}
.che {
  width: px2rem(126px);
  margin: 0 auto;
}
.che img {
  width: 100%;
}
.phone {
   width: 100%;
  font-size: px2rem(14px);
  text-align: center;
  line-height: px2rem(30px);
  color: #5dcefc;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: px2rem(90px);
  white-space: nowrap;
  span{
     padding-left: px2rem(20px);
     background-image: url(../../assets/images/icon-phone.svg);
     background-size: px2rem(16px) px2rem(16px);
     background-position: left center;
     background-repeat: no-repeat;
     font-size: px2rem(14px);
     line-height: px2rem(30px);
     color: #999;
  }
}
.voice {
  width: px2rem(30px);
  height: px2rem(30px);
  position: absolute;
  right: px2rem(10px);
  top: px2rem(80px);
}
</style>