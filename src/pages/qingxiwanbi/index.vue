<template>
  <div class="wrap">
    <audio preload id="music" src="http://wx1.aiyihang.com/dist/wanbi.mp3"></audio>
    <div class="white">
        <div class="qixibg">
          <a href="https://shop2759212.youzan.com/v2/showcase/goods?alias=3nsuepjh1st9g&banner_id=f.77875445~image_ad.3~1~1DSYXfUz&index=0&reft=1559557494450&spm=f.77875445">
            <img class="yimaqingxi" src="../../assets/yimaqingxi.png" alt/>
          </a>
          <img src="../../assets/line.png" alt class="lines"/>
          <span class="startxi">洗车已完毕</span>
          <span class="xi">请退出洗车区域</span>
        </div>
      <!-- <div class="inner">
        <div class="banner">
          <img style="width:100%" src="http://yima.52shuzhe.cn/dist/yimaqingxi.png" alt>
        </div>
      </div> -->
      <!-- <div class="desc">改变你的洗车方式</div>
      <div class="two-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="state">洗车已完毕</div>
      <div class="tuichu">请退出洗车区域</div>
      <div class="bg"></div> -->
      <!--<div class="bg-white"></div>-->
      <!--<div id="map"></div>-->
      <div class="dingdan-info">
        <div class="head">
          <div class="left"></div>
          <div class="center">订单信息</div>
          <div class="right"></div>
        </div>
        <div class="item">
          <div class="left">服务车辆:{{datadingdan.carNumber}}</div>
          <div class="right"></div>
        </div>
        <div class="item">
          <div class="left">服务站点:</div>
          <div class="right">{{datadingdan.name}}</div>
        </div>
        <div class="item">
          <div class="left">服务时间:</div>
          <div class="right">{{datadingdan.dtCreate}}</div>
        </div>
        <div class="item white">
          <div class="left">已支付:</div>
          <div class="right">{{datadingdan.amount}}元</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="service">
        <div class="header">服务照片</div>
        <div class="item-wrap top-bottom">
          <div class="title">
            <div class="left"></div>
            <div class="xiche">洗车前</div>
            <div class="right"></div>
          </div>
          <div class="img-wrap">
            <div class="left">
              <img class="img-comm" v-if="datadingdan.preWashImg" :src="datadingdan.preWashImg" alt>
              <img
                class="img-comm"
                v-if="!datadingdan.preWashImg"
                src="http://yima.52shuzhe.cn/dist/xicheqian.png"
                alt
              >
            </div>
            <div class="right"></div>
          </div>
        </div>
        <div class="item-wrap">
          <div class="title">
            <div class="left"></div>
            <div class="xiche">洗车后</div>
            <div class="right"></div>
          </div>
          <div class="img-wrap">
            <div class="left">
              <img class="img-comm" v-if="datadingdan.aftWashImg" :src="datadingdan.aftWashImg" alt>
              <img
                class="img-comm"
                v-if="!datadingdan.aftWashImg"
                src="http://yima.52shuzhe.cn/dist/xichehou.png"
                alt
              >
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
      <div class="xieyi white">我已阅读并同意《服务协议》的相关约定，我已知晓相关风险并自行承担相关责任</div>
      <div class="right-time white">签署日期：{{datadingdan.dtCreate}}</div>
      <div class="line-shixiang"></div>
      <div class="pingjia">
        <div class="title">
          <div class="label">服务评价</div>
          <div class="star">
            <i class="icon iconfont icon-start" :class="{ activeone: activeone }"></i>
            <i class="icon iconfont icon-start" :class="{ activetwo: activetwo }"></i>
            <i class="icon iconfont icon-start" :class="{ activetree: activetree }"></i>
            <i class="icon iconfont icon-start" :class="{ activefour: activefour }"></i>
            <i class="icon iconfont icon-start" :class="{ activefive: activefive }"></i>
            <span>{{desc}}</span>
          </div>
        </div>
        <div class="desc-word">{{datadingdan.comment}}</div>
      </div>
      <div class="line-shixiang"></div>
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
        <div class="right">洗车期间禁止移动车辆、上下车或伸出窗外张望，因机器移动容易发生危险。</div>
      </div>
      <div class="clear">
        <div class="left">
          <img src="../../assets/chelun.png" alt>
        </div>
        <div class="right">洗车期间禁止移动车辆、上下车或伸出窗外张望，因机器移动容易发生危险。</div>
      </div>
      <div class="clear bg-gray">
        <div class="left">
          <img src="../../assets/stop.png" alt>
        </div>
        <div class="right">洗车期间禁止移动车辆、上下车或伸出窗外张望，因机器移动容易发生危险。</div>
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
        <div class="inner" style="background: rgb(255, 133, 134);">
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
      desc: '很满意',
      activeone: false,
      activetwo: false,
      activetree: false,
      activefour: false,
      activefive: false,
      score: 5,
      username: '',
      openId: '',
      datadingdan: {},
      newusername: ''
    }
  },
  methods: {
    getdingdaninfo() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'washRecord/getByOrderId',
        data: this.$qs.stringify({ openId: that.openId, orderId: that.$route.params.id })
      }).then((res) => {
        that.orderid = res.data.data.orderId
        that.datadingdan = res.data.data
        console.log(res.data.data.score)
        switch (res.data.data.score) {
          case '1':
            that.activeone = false
            that.activetwo = true
            that.activetree = true
            that.activefour = true
            that.activefive = true
            that.desc = '失望'
            break;
          case '2':
            that.activeone = false
            that.activetwo = false
            that.activetree = true
            that.activefour = true
            that.activefive = true
            that.desc = '一般'
            break;
          case '3':
            that.activeone = false
            that.activetwo = false
            that.activetree = false
            that.activefour = true
            that.activefive = true
            that.desc = '一般'
            break;
          case '4':
            that.activeone = false
            that.activetwo = false
            that.activetree = false
            that.activefour = false
            that.activefive = true
            that.desc = '满意'
            break;
          case '5':
            that.activeone = false
            that.activetwo = false
            that.activetree = false
            that.activefour = false
            that.activefive = false
            that.desc = '很满意'
            break;
        }
        setTimeout(function () {
           that.$router.push({name:'myindex'})
        },5000)
      }).catch(err => {

      });
    }
  },
  created() {
    this.openId = localStorage.getItem('openid')
    Toast('10秒后自动跳转到主页');
  },
  mounted() {
    document.addEventListener("WeixinJSBridgeReady", function () {
      document.getElementById('music').play();
    }, false);
    this.getdingdaninfo()

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.img-comm {
  width: 100%;
}
.star .activeone {
  color: #a5a5a5 !important;
}
.star .activetwo {
  color: #a5a5a5 !important;
}
.star .activetree {
  color: #a5a5a5 !important;
}
.star .activefour {
  color: #a5a5a5 !important;
}
.star .activefive {
  color: #a5a5a5 !important;
}
.desc-word {
  font-size: px2rem(14px);
  line-height: px2rem(28px);
}
.item-wrap {
  padding-left: px2rem(10px) !important;
}
.star i {
  color: #d4b265 !important;
}
.star span {
  font-size: px2rem(12px);
}
.pingjia {
  padding: px2rem(10px);
}
.yimaqingxi{
  width:px2rem(340px);
  height: px2rem(160px);
  margin-top:px2rem(15px);
}
.lines{
  width: px2rem(165px);
  height: px2rem(2px);
  margin-top: px2rem(18px);
}
.startxi{
  color: #FFFFFF;
  font-size: px2rem(16px);
  margin-top: px2rem(11px);
}
.xi{
  color: #fff;
  font-size: px2rem(13px);
  margin-top:px2rem(2px);
}
.qixibg{
  width:100%;
  height: px2rem(256px);
  background-image: url(../../assets/qixibg.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items:center;
}
.pingjia .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2rem(15px);
  height: px2rem(37px);
}
.pingjia .desc {
  font-size: px2rem(12px);
  line-height: px2rem(30px);
}
.top-bottom {
  padding: px2rem(24px) 0;
}
.service .header {
  display: flex;
  padding-left: px2rem(10px);
  align-items: center;
  height: px2rem(32px);
  font-size: px2rem(15px);
}
.clear .left {
  justify-content: center;
  align-items: center;
  display: flex;
}
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
.clear img {
  width: 100%;
}
.xiche {
  font-size: px2rem(12px);
  padding: 0 px2rem(9px);
  color: #999;
}
.clear {
  font-size: px2rem(12px);
  height: px2rem(130px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clear .left {
  width: px2rem(105px);
  padding-right: px2rem(38px);
  padding-left: px2rem(20px);
}
.right-time {
  height: px2rem(38px);
  display: flex;
  font-size: px2rem(14px);
  align-items: center;
  justify-content: flex-end;
  padding-right: px2rem(10px);
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
  margin-top: px2rem(10px);
  font-size: px2rem(14px);
  padding: 0 px2rem(10px);
}
.wrap {
  overflow-x: hidden;
  background: #fff;
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
.service .title {
  display: flex;
  margin-bottom: px2rem(8px);
  justify-content: center;
  align-items: center;
}
.service .img-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.service .img-wrap .left {
  width: px2rem(144px);
  height: px2rem(72px);
  background: gray;
}
.service .title .left {
  height: px2rem(1px);
  width: px2rem(30px);
  background: #e0e0e0;
}
.service .title .right {
  height: px2rem(1px);
  width: px2rem(30px);
  background: #e0e0e0;
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
.white {
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
</style>
