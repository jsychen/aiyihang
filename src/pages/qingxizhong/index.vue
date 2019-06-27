<template>
  <div class="wrap">
    <audio preload id="fenggan" src="http://wx1.aiyihang.com/dist/fenggan.mp3"></audio>
    <audio preload id="shauxi" src="http://wx1.aiyihang.com/dist/shaxi.mp3"></audio>
    <audio preload id="dala" src="http://wx1.aiyihang.com/dist/dala.mp3"></audio>
    <div class="white">
      <div class="qixibg">
        <p>{{datadingdan.boxName}}</p>
        <!-- <img class="car" src="../../assets/car1.gif" alt v-if="startxi=='正在风干'">
         <img class="car" src="../../assets/car.gif" alt v-else>
         <img src="../../assets/line.png" alt class="lines"/>
         <span class="startxi">{{startxi}}</span>
         <span class="xi">{{startxi}},请勿操作</span> -->

<div class="circle">
          <div class="pie-right"> 
            <div class="rights" v-bind:style="{ transform: rotateR  }"></div>
          </div>
          <div class="pie-left">
            <div class="lefts" v-bind:style="{ transform: rotateL }"></div>
          </div>
          <div class="mask">
            <!-- <img src="../../assets/rec.png" style="display:block;width:100%;height:100%;" v-if="isImg">
            <img src="../../assets/rect.png" style="display:block;width:100%;height:100%;" v-else> -->
            <img src="../../assets/images/shutDown.png"/>
          </div>
        </div>
        <div class="tops">
            <span class="startxi">{{startxi}}</span>
         <span class="xi">{{startxi}},请勿操作</span>
        </div>

      </div>
      <div class="ad">
         <img src="../../assets/images/wash-ad.png" alt="">
      </div>
      <div class="videos">
         <p></p>
         <div class="scroll">
            <ul>
               <li>
                  <video src="http://wx1.aiyihang.com/yetiboli.mp4" poster="../../assets/cover.png" x5-playsinline="" playsinline="" webkit-playsinline=""></video>
                  <h2>德国最新技术</h2>
                  <p>液体玻璃，渡在车身形成透明保护壳，让爱车能够防污渍，抗划痕，外观更靓丽。</p>
               </li>
               <li>
                  <video src="http://wx1.aiyihang.com/yetiboli.mp4" poster="../../assets/cover.png" x5-playsinline="" playsinline="" webkit-playsinline=""></video>
                  <h2>轮胎养护保养找我们</h2>
                  <p>专业技术，给您贴心服务</p>
               </li>
            </ul>
         </div>
      </div>
      <!-- <div class="inner">
        <div class="banner">
          
        </div>
      </div> -->
      <!-- <div class="desc">改变你的洗车方式</div>
      <div class="two-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="state">深度洗刷</div>
      <div class="tuichu">有效提升清洁度</div>
      <div class="bg"></div> -->
      <!--<div class="reset" @click="reset">一键复位</div>-->
      <!--<div class="bg-white"></div>-->
      <!--<div id="map"></div>-->
      <div class="dingdan-info">
        <div class="head">
          <div class="left"></div>
          <div class="center">订单信息</div>
          <div class="right"></div>
        </div>
        <div class="item">
          <div class="left">服务车辆:</div>
          <div class="right"></div>
        </div>
        <div class="item">
          <div class="left">服务站点:</div>
          <div class="right">{{datadingdan.boxName}}</div>
        </div>
        <div class="item">
          <div class="left">服务时间:</div>
          <div class="right">{{datadingdan.dtCreate}}</div>
        </div>
        <div class="item white">
          <div class="left">已支付:</div>
          <div class="right">{{datadingdan.amount}}元</div>
        </div>
        <div class="line"></div>
        <div class="xieyi white">我已阅读并同意《服务协议》的相关约定，我已知晓相关风险并自行承担相关责任</div>
        <div class="right-time white">签署日期：{{datadingdan.dtCreate}}</div>
        <div class="line-shixiang"></div>
      </div>
      <div class="two-line-bottom">
        <div class="left"></div>
        <div>注意事项</div>
        <div class="right"></div>
      </div>
      <div class="clear">
        <div class="left">
          <img src="../../assets/chenmen.png" alt>
        </div>
        <div class="right">洗车期间禁止移动车辆、上下车或伸出窗外张望，因机器移动容易发生危险。</div>
      </div>
      <div class="clear bg-gray">
        <div class="left">
          <img src="../../assets/luntai.png" alt>
        </div>
        <div class="right">不要站在洗车机门口或内部，误挡感应探头发生错误判断。</div>
      </div>
      <div class="clear">
        <div class="left">
          <img src="../../assets/chelun.png" alt>
        </div>
        <div class="right">轮胎停在黄线内并回正方向盘，使轮胎与毛刷更贴合，洗的更干净。</div>
      </div>
      <div class="clear bg-gray">
        <div class="left">
          <img src="../../assets/stop.png" alt>
        </div>
        <div class="right">紧急停止洗车机后，本次服务结束，请谨慎操作，需重新扫码，才能再次服务。</div>
      </div>
      <div class="line-shixiang"></div>
      <div class="phone">
        <span style="color:#999">报警求助</span>
        <span>
          400-885-6600
          <i class="icon iconfont icon-jinru"></i>
        </span>
      </div>
      <div class="line-shixiang"></div>
      <div class="liaojie">
        <div class="title">了解我们</div>
        <div class="inner" style="background:#FF8586">
          <div class="bannerwri">
            北京爱义行汽车服务有限责任公司是一家以智能洗车设备为线下应用场景，通过线上
            线下的科技技术真正服务于广大车主，智能洗车的优势就是用科技的力量，提
            供高效、便捷和优质的洗车体验，爱义行真正为用户考虑，在多个用车场景里面
            设置洗车站点，24小时洗车，无人值守，5分钟左右时间清洗养护完成，智能+
            快捷+优质都是无人化规模运营，从硬件搭配到软件搭载，爱义行采用的是全球最
            先进的洗车机，节能环保，洗车液获欧洲天鹅认证标志，爱义行软件系统嵌入微
            信公众号，方便客户直接进入扫码启动洗车机。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      datadingdan: {},
      username: '',
      openId: '',
      newusername: '',
      timer: null,
      startxi:'预洗状态',
      timers:null,
      timeCount:0,
      rotateL:0,
      rotateR:0,
      isImg:true
    }
  },
  methods: {
    reset() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'box/reset',
        data: this.$qs.stringify({ openId: that.openId, fboxUid: that.$route.params.id })
      }).then((res) => {
        Toast(res.data.msg);
      }).catch(err => {
        Toast('无复位功能');
      });
    },
    getdingdaninfo() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'washRecord/getNewest',
        data: this.$qs.stringify({ openId: that.openId, fboxUid: that.$route.params.id })
      }).then((res) => {
        that.orderid = res.data.data.orderId
        that.datadingdan = res.data.data
      }).catch(err => {

      });
    },
    watchstate() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'box/refreshWashStatus',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId })
      }).then((res) => {
         
        switch (res.data.data) {
          case '洗车已完成':
            that.startxi  =  res.data.data
            clearInterval(that.timer);
            that.$router.push({ name: 'fuwupingjia', params: { id: that.orderid }})
            break;
          case '正在刷洗':
            that.startxi  =  res.data.data
            // document.getElementById('shuaxi').play();
            break;
          case '正在打蜡':
            that.startxi  =  res.data.data
            // Toast(res.data.data);
            // document.getElementById('dala').play();
            break;
          case '正在风干':
            that.startxi  =  res.data.data
            // Toast(res.data.data);
            // document.getElementById('fenggan').play();
            break;
          case '洗车机已开闸':
            Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
          case '正在喷泡沫':
            // Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
          case '洗车机已关闸':
            Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
          case '洗车机已停止':
            Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
          case '正在洗车中':
            Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
          case '车辆已停车到位':
            Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
          case '准备洗车中':
            Toast(res.data.data);
            that.startxi  =  res.data.data
            //document.getElementById('fenggan').play();
            break;
        }

      }).catch(err => {
        // alert(JSON.stringify(err.response.data.msg))
      });
    },
    changeProcess(value) {
      var num = value * 1.2414
      if (num < 180) {
        this.rotateR = 'rotate(' + num + 'deg)'
      
      } else {
        this.rotateL = 'rotate(' + (num-180) + 'deg)'
        this.rotateR = 'rotate(' + 180 + 'deg)'
       
      }
    
      if(this.timeCount>=360){
         clearInterval(this.timers);
         this.isImg = false;
        
      }
    }
  },

  created() {
     return;
    let that = this
    let isplay=true
    let isplay1 = true
    let isplay2 = true
    this.openId = localStorage.getItem('openid')
    this.getdingdaninfo()
    this.timer = setInterval(function () {
      that.watchstate()
    }, 5000)
    if(this.startxi=='正在刷洗'){
      if(isplay){
           document.getElementById('dala').pause();
            document.getElementById('fenggan').pause();
            document.getElementById('shuaxi').play();
            isplay = false;
        }
            
             }else if(this.startxi=='正在打蜡'){
               if(isplay1){
                document.getElementById('fenggan').pause();
                 document.getElementById('shuaxi').pause();
               document.getElementById('dala').play();
               isplay1 = false;
               }
            
             }else if(this.startxi=='正在风干'){
               if(isplay2){
                 document.getElementById('shuaxi').pause();
                document.getElementById('dala').pause();
                document.getElementById('fenggan').play();
                isplay2 = false;
               }
            
             }
   
  },
  mounted() {
    var that =  this;
   this.timers= setInterval(function(){
   ++that.timeCount 
  //  that.timeCount+=60 
   console.log(that.timeCount)
   that.changeProcess(that.timeCount)
    },1000)
    var map = new BMap.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]    }));
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.liaojie .title {
  display: flex;
  align-items: center;
  padding-left: px2rem(10px);
  height: px2rem(45px);
  font-size: px2rem(13px);
}
.icon-jinru {
  padding-left: px2rem(20px);
  color: #d4b265;
}
.phone {
  padding: 0 px2rem(10px);
  height: px2rem(35px);
  font-size: px2rem(12px);
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.bg-gray {
  background: #f8f8f8;
}
.yimaqingxi{
  width:px2rem(340px);
  height: px2rem(160px);
  margin-top:px2rem(15px);
}
.car{
  width:px2rem(83px);
  height: px2rem(113px);
  margin-top:px2rem(30px);
}
.lines{
  width: px2rem(165px);
  height: px2rem(2px);
  margin-top: px2rem(18px);
}
.startxi{
  color: #d0ebff;
  font-size: px2rem(16px);
  margin-top: px2rem(11px);
}
.xi{
  color: #3f8adc;
  font-size: px2rem(13px);
  margin-top:px2rem(2px);
}
.qixibg{
  width:100%;
  height: px2rem(280px);
  background-image: url(../../assets/images/wash-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items:center;
  position: relative;
  p{
     font-size: px2rem(18px);
     color: #fff;
     line-height: px2re(20px);
  }
}
.clear img {
  width: 100%;
}
.clear {
  height: px2rem(130px);
  font-size: px2rem(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clear .left {
  width: px2rem(105px);
  padding-right: px2rem(38px);
  padding-left: px2rem(20px);
  justify-content: center;
  align-items: center;
  display: flex;
}
.right-time {
  height: px2rem(38px);
  display: flex;
  font-size: px2rem(14px);
  align-items: center;
  justify-content: flex-end;
}
.line-shixiang {
  width: 400%;
  margin-left: -100%;
  height: px2rem(10px);
  background: #f5f5f5;
}
.line {
  width: 400%;
  margin-left: -100%;
  height: px2rem(1px);
  background: #e0e0e0;
  margin-bottom: px2rem(10px);
}
.xieyi {
  line-height: px2rem(24px);
  font-size: px2rem(14px);
}
.wrap {
  overflow-x: hidden;
  background: #f5f5f3;
}
.inner {
  height: px2rem(220px);
  background: #d81618;
  padding: px2rem(10px) px2rem(11px);
  box-sizing: border-box;
}
.banner {
  background: #d81618;
  background-size: 100%;
  height: 100%;
  width: 100%;
}
.bannerwri {
  background-size: 100%;
  height: 100%;
  width: 100%;
  font-size: px2rem(12px);
  color: black;
  /*text-align: center;*/
}
.desc {
  font-size: px2rem(12px);
  height: px2rem(38px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81618;
}
.two-line-bottom {
  background: #fff;
  font-size: px2rem(14px);
  display: flex;
  justify-content: space-between;
  padding: 0 px2rem(100px);
  align-items: center;
  height: px2rem(45px);
}
.two-line-bottom .left {
  height: px2rem(1px);
  width: px2rem(30px);
  background: #e0e0e0;
}
.two-line-bottom .right {
  height: px2rem(1px);
  width: px2rem(30px);
  background: #e0e0e0;
}
.two-line {
  height: px2rem(34px);
  display: flex;
  justify-content: space-between;
  padding: 0 px2rem(63px);
  align-items: center;
  background: #d81618;
}
.two-line .left {
  height: px2rem(3px);
  width: px2rem(105px);
  background: #fff;
}
.two-line .right {
  height: px2rem(3px);
  width: px2rem(105px);
  background: #fff;
}
.state {
  font-size: px2rem(16px);
  height: px2rem(23px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81618;
  color: #fff;
}
.tuichu {
  font-size: px2rem(13px);
  height: px2rem(23px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81618;
  color: #fff;
}
.bg {
  height: px2rem(37px);
  border-bottom-left-radius: px2rem(254px) px2rem(64px);
  border-bottom-right-radius: px2rem(254px) px2rem(64px);
  background: #d81618;
}
.bg-white {
  height: px2rem(31px);
  background: #fff;
}
#map {
  height: px2rem(120px);
}
.dingdan-info {
  font-size: px2rem(13px);
  padding: px2rem(4px) px2rem(11px) 0 px2rem(11px);
  background: #fff;
}
.reset {
  font-size: px2rem(18px);
  height: px2rem(48px);
  background: #30d426;
  color: #fff;
  width: px2rem(351px);
  margin: 0 auto;
  border-radius: px2rem(6px);
  display: flex;
  margin-top: px2rem(18px);
  justify-content: center;
  align-items: center;
}
.head {
  font-size: px2rem(14px);
  height: px2rem(47px);
  display: flex;
  width: px2rem(157px);
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
}
.head .left {
  height: px2rem(1px);
  width: px2rem(30px);
  background: #e0e0e0;
}
.head .right {
  height: px2rem(1px);
  width: px2rem(30px);
  background: #e0e0e0;
}
.item {
  font-size: px2rem(14px);
  height: px2rem(47px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item .left {
  color: #999;
}
.item .right {
  text-align: right;
}

// 环形进度条
//css
.circle {
  //这个元素可以提供进度条的颜色
  position: absolute;
  height: px2rem(140px);
  width: px2rem(140px);
  border-radius: 50%;
  background-image: linear-gradient(0deg, #4a6ff4 0%,#00d1ff 100%); //注意这是表示当前进度的颜色
  top: px2rem(55px);
}
.pie-right,
.pie-left {
  //这俩元素主要是为了分别生成两个半圆的，所以起作用的地方在于clip裁掉另一半
  position: absolute;
  top: 0;
  left: 0;
  height: px2rem(150px);
  width: px2rem(150px);
  border-radius: 50%;
}
.rights,
.lefts {
  position: absolute;
  top: 0;
  left: 0;
  height: px2rem(140px);
  width: px2rem(140px);
  border-radius: 50%;
  background: #183891; //注意这个才不是当前进度的颜色
}
// .rights {
//   transform: rotate(30deg);
// }
.pie-right,
.rights {
  //裁掉左边一半
  clip: rect(0, auto, auto, px2rem(70px));
}
.pie-left,
.lefts {
  //裁掉右边一半
  clip: rect(0, px2rem(70px), auto, 0);
}
.mask {
  //我是遮罩 mask不用改 好欣慰
  height: px2rem(115px);
  width: px2rem(115px);
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-image: url(../../assets/images/circle.png);
  background-color: #17174a;
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
  img{
     width: 46%;
     height:46%;
     position: absolute;
     left: 28%;
     top: 28%;
  }
}
.tops{
  position:absolute;
  bottom:px2rem(25px);
  display:flex;
  flex-direction:column;
  align-items:center;
}

/* chen */
.ad{
   overflow: hidden;
   clear: both;
   img{
      width: 100%;
      float: left;
   }
}
.videos{
   padding: 0 px2rem(15px);
   margin-bottom: px2rem(15px);
   overflow: hidden;
   *{
      margin: 0;
      padding: 0;
   }
   >p{
      font-size: px2rem(20px);
      position: relative;
      height: px2rem(40px);
      margin: 0;
      &:before{
         // width: px2rem(60px);
         height: px2rem(10px);
         position: absolute;
         left: 0;
         bottom:0;
         background: #49ccf4;
         content: '为您优选';
         line-height:0;
      }
   }
   .scroll{
      width: px2rem(360px);
      overflow-x: scroll;
   }
   ul{
      width: px2rem(540px);
      list-style: none;
      overflow: hidden;
      clear: both;
      li{
         float: left;
         width: px2rem(250px);
         height: px2rem(210px);
         background: #fff;
         border-radius: px2rem(5px);
         overflow:hidden;
         margin-right: px2rem(20px);
         margin-top:px2rem(10px);
         video{
            width: px2rem(250px);
            float: left;
         }
         h2,p{
            padding: 0 px2rem(10px);
         }
         h2{
            font-size: px2rem(14px);
            line-height: px2rem(30px);
            color: #000;
         }
         p{
            font-size:  px2rem(12px);
            line-height: px2re(24px);
            color: #999;
         }
      }
   }
}
</style>
