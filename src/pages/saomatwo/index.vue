<template>
  <div class="wrap">
    <audio preload id="music" src="http://wx1.aiyihang.com/dist/start.mp3"></audio>
    <img class="voice" src="../../assets/images/icon-voice.svg" alt>
    <div class="inner">
      <div class="state">
         <span class="pass">1</span>
         <div class="line blue"></div>
         <span class="active">2</span>
         <div class="line active"></div>
         <span>3</span>
      </div>
      <div class="tip-title">确认完成下列操作</div>
      <div class="tip-title-bottom">保障洗车过程车辆安全</div>
      <div class="img-wrap bottom-margin">
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/shousha.png" alt>
            </div>
            <div class="desc-wenzi">拉手刹</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/guadang.png" alt>
            </div>
            <div class="desc-wenzi">挂P档</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/yugua.png" alt>
            </div>
            <div class="desc-wenzi">关雨刮（含感应）</div>
          </div>
        </div>
      </div>
      <div class="img-wrap">
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/tianxian.png" alt>
            </div>
            <div class="desc-wenzi">收天线</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/fanguang.png" alt>
            </div>
            <div class="desc-wenzi">收后视镜</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/chechuang.png" alt>
            </div>
            <div class="desc-wenzi">关车窗</div>
          </div>
        </div>
      </div>
      <div class="tips">注意事项：洗车过程中禁止移动车辆和上下车</div>
      <div class="agreement" @click="agree = !agree">
         <div class="radio" :class="{'agree': agree}"></div>
         <span>我已阅读并同意《服务协议》的相关规定，我已知晓相关风险并自行承担相关责任</span>
      </div>
      <button class="handleNext" @click="next" :disabled="!agree">下一步</button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      url: '../../dist/select.png',
      agree: false
    }
  },
  methods: {
    next() {
      if (this.url !== '../../dist/select.png') {
        Toast('未勾选服务协议');
        return;
      }
      let that = this
      this.$router.push({        name: 'saomastart', params: {
          id: that.$route.params.id
        }      })
    },
   //  picChange() {
   //    if (this.url == "../../dist/nosel.png") {
   //      this.url = "../../dist/select.png"
   //    } else {
   //      this.url = "../../dist/nosel.png"
   //    }
   //  }
  },
  mounted() {
    document.getElementById('music').play();
  },
  beforeRouteLeave(to, from, next) {
    document.getElementById('music').pause();
    next()
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.bottom-margin {
  margin-top: px2rem(20px);
  margin-bottom: px2rem(27px);
}
.onoff {
  height: px2rem(12px);
  display: inline-block;
  margin-right: px2rem(10px);
  width: px2rem(12px);
  border-radius: 50%;
}
.wrap {
  height: 100%;
  background: #f5f5f5;
}
.tip-title {
  font-size: px2rem(16px);
  text-align: center;
}
.agreement {
   position: fixed;
   left: 0;
   bottom: px2rem(90px);
   padding: 0 px2rem(40px);
   .radio{
      width: px2rem(14px);
      height: px2rem(14px);
      float: left;
      margin-right: px2rem(10px);
      border-radius: 50%;
      border: px2rem(1px) solid #999;
      position: relative;
      margin-top: px2rem(1px);
      &.agree{
         border-color: #48ccf2;
         &:before{
            width: px2rem(9px);
            height: px2rem(9px);
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            background: #48ccf2;
            border-radius: 50%;
            transform: translateX(-50%) translateY(-50%);
         }
      }
   }
   span{
      float: left;
      font-size: px2rem(12px);
      width: px2rem(260px);
   }
  
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
   &:disabled{
      background: #999;
      box-shadow: none;
   }
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
        background-color: #44ceef;
        border: px2rem(5px) solid rgba(73,204,243,0.3);
        background-clip: padding-box;
     }
     &.pass{
        background-color: #44ceef;
        background-clip: adding-box;
     }
  }
  .line{
     width: px2rem(80px);
     height: px2rem(4px);
     font-size: 0;
     background-color: #d8d8d8;
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
     &.blue{
        background-image:url(../../assets/images/btnBg2.svg);
         background-size: cover;
     }
  }
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
}
.type {
  display: flex;
  color: #999;
  align-items: center;
  height: px2rem(55px);
  font-size: px2rem(14px);
}
.img-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(12px);
}
.img-wrap .item {
  flex: 1;
}
.img {
  width: px2rem(60px);
  justify-content: center;
  align-items: center;
  display: flex;
  height: px2rem(60px);
  margin: 0 auto;
}
.img img {
  height: 100%;
}
.desc-wenzi {
  text-align: center;
}
.tips {
  display: flex;
  margin: 0 auto;
  margin-top: px2rem(39px);
  width: px2rem(304px);
  justify-content: center;
  align-items: center;
  font-size: px2rem(12px);
  height: px2rem(20px);
  color: #D81618;
}
.voice {
  width: px2rem(30px);
  height: px2rem(30px);
  position: absolute;
  right: px2rem(10px);
  top: px2rem(80px);
}
</style>