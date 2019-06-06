<template>
  <div class="wrap">
    <!--<div class="gundong">-->
    <!--<marquee>-->
    <!--通过线上线下的科技技术真正服务于广大车主，智能洗车的优势就是用科技的力量，提供高效-->
    <!--</marquee>-->
    <!--</div>-->
    <audio preload id="music" autoplay="autoplay" src="http://wx1.aiyihang.com/dist/huanying.mp3"></audio>
    <div class="box">
      <span class="animate">{{gundongdesc}}</span>
    </div>
    <div id="desc" v-if="onoff">
      <div class="left">
        <div class="name name-size">{{name}}</div>
        <div class="stopDes name-size">{{stopDes}}</div>
      </div>
      <div class="right">
        <img src="http://yima.52shuzhe.cn/dist/dingweidaohang.png" @click="openlocation">
      </div>
    </div>
    <div id="map"></div>
    <div class="footer">
      <div class="item" @click="next('mydingdan')">
        <img class="yubg" src="../../assets/el-icon-custom-order2x.png" alt>
        <div>订单</div>
      </div>
      <div class="item" id="saocode" v-if="isWeixin">
        <div class="erweima"></div>
      </div>
      <div class="item" @click="createBarcodes()" v-else>
        <div class="erweima"></div>
      </div>
      <div class="item" @click="next('myindex')">
        <img class="mybg" src="../../assets/mybg.png" alt>
        <div>我的</div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      redirecturl: '',
      loginurls: '',
      gundongdesc: '',
      appids: '',
      yanzhengcode: '',
      boxid: '',
      address: '',
      clat: '',
      clon: '',
      nowlat: '',
      nowlon: '',
      stopDes: '',
      onoff: false,
      name: '',
      number: '',
      popupVisible: false,
      username: '',
      openId: '',
      mapData: [],
      isWeixin: false,
      barcode: null,
      map: null,
      isEven: '',
      daohangurls: '',
      wxopenid: ''
    };
  },
  methods: {
    usestate() {
      let that = this
      this.$ajax.get('box/canWash', {
        params: { openId: that.openId, fboxUid: that.boxid }
      }).then((res) => {
        window.location.href = that.redirecturl + that.boxid
      }).catch(err => {
        alert(JSON.stringify(err.response.data.msg))
      });
    },
    // 初始化地图 腾讯地图
    // mapInit() {
    //   var latlngs = [];
    //   let that = this
    //   for (let i = 0; i < this.mapData.length; i++) {
    //     latlngs.push(new qq.maps.LatLng(this.mapData[i].latitude, this.mapData[i].longitude))
    //   }
    //   var center = new qq.maps.LatLng(that.clat, that.clon);
    //   var map = new qq.maps.Map(document.getElementById("map"), {
    //     center: center,
    //     zoom: 8,
    //     disableDefaultUI: true
    //   });
    //   var infoWin = new qq.maps.InfoWindow({
    //     map: map
    //   });
    //   for (var i = 0; i < latlngs.length; i++) {
    //     (function (n) {
    //       var anchor = new qq.maps.Point(6, 6);
    //       var size = new qq.maps.Size(22, 28);
    //       var origin = new qq.maps.Point(0, 0);
    //       var icon = new qq.maps.MarkerImage('http://yima.52shuzhe.cn/dist/keyong.png', size, origin, anchor);
    //       /**
    //        *
    //        * 根据状态加载不同图标
    //        * 1:有效  2:停用  3:在建  4:维护
    //       */
    //       if (that.mapData[n].status == 2 || that.mapData[n].status == 3 || that.mapData[n].status == 4) {
    //         icon = new qq.maps.MarkerImage('http://yima.52shuzhe.cn/dist/aijian.png', size, origin, anchor);
    //       }
    //       var desc = '';
    //       switch (that.mapData[n].status) {
    //         case 1:
    //           desc = "正常服务"
    //           break;
    //         case 2:
    //           desc = "停用"
    //           break;
    //         case 3:
    //           desc = "在建"
    //           break;
    //         case 4:
    //           desc = "维护"
    //           break;
    //       }
    //       var marker = new qq.maps.Marker({
    //         position: latlngs[n],
    //         map,
    //         icon,
    //         name: that.mapData[n].name,
    //         address: that.mapData[n].address,
    //         longitude: that.mapData[n].longitude,
    //         latitude: that.mapData[n].latitude,
    //         stopDes: desc,
    //         boxUid: that.mapData[n].boxUid
    //       });
    //       qq.maps.event.addListener(marker, 'click', function () {
    //         if (!localStorage.getItem('openid')) {
    //           MessageBox.confirm('登录使用,现在登录？').then(action => {
    //             if (action === 'confirm') {
    //               localStorage.setItem('nowpath', 'daohang')
    //               that.getpermit()
    //             }
    //           })
    //           return;
    //         }
    // console.log(marker,'')
    //         that.stopDes = marker.stopDes
    //         that.name = marker.name
    //         that.nowlat = marker.latitude
    //         that.nowlon = marker.longitude
    //         that.onoff = true
    //         that.address = marker.address
    //         that.boxid = marker.boxUid
    //         //that.usestate()
    //       });
    //     })(i);
    //   }
    // },
    mapInit() {
      // 当前用户地理位置  this.clat, this.clon
      console.log(this.clat, this.clon)
      this.map = new BMap.Map("map"); // 创建Map实例
      this.map.centerAndZoom(new BMap.Point(this.clon, this.clat), 8); // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom();
      this.map.enableDragging();
      var latlngs = [];
      let that = this
      console.log(this.mapData)
      for (let i = 0; i < this.mapData.length; i++) {
        latlngs.push(new BMap.Point(this.mapData[i].longitude, this.mapData[i].latitude))
      }

      for (var i = 0; i < latlngs.length; i++) {
        (function (n) {
          // var point = new BMap.Point(this.mapData[i].longitude, this.mapData[i].latitude)
          var myIcon = new BMap.Icon("http://wx1.aiyihang.com/dist/keyong.png", new BMap.Size(26, 33), {
            anchor: new BMap.Size(6, 6)
          })
          if (that.mapData[n].status == 2 || that.mapData[n].status == 3 || that.mapData[n].status == 4) {
            myIcon = new BMap.Icon('http://wx1.aiyihang.com/dist/bukeyong.png', new BMap.Size(26, 33), {
              anchor: new BMap.Size(6, 6)
            });
          }

          var desc = '';
          switch (that.mapData[n].status) {
            case 1:
              desc = "正常服务"
              break;
            case 2:
              desc = "停用"
              break;
            case 3:
              desc = "在建"
              break;
            case 4:
              desc = "维护"
              break;
          }

          var marker = new BMap.Marker(latlngs[n], { icon: myIcon });
          var content = {
            name: that.mapData[n].name,
            address: that.mapData[n].address,
            longitude: that.mapData[n].longitude,
            latitude: that.mapData[n].latitude,
            stopDes: desc,
            boxUid: that.mapData[n].boxUid
          }
          that.map.addOverlay(marker);
          marker.setAnimation(BMAP_ANIMATION_BOUNCE)
          // 点击事件
          marker.addEventListener("click", that.getInfo.bind(this, content));

        })(i)
      }
      // this.map.setViewport(latlngs);
    },
    getInfo(e) {
      var that = this;
      if (that.isWeixin) {
        // 微信内
        if (!localStorage.getItem('wxopenid')) {
          MessageBox.confirm('登录使用,现在登录？').then(action => {
            if (action === 'confirm') {
              localStorage.setItem('nowpath', 'daohang')
              that.getpermit()
            }
          })
          return;
        }
        console.log(e)
        that.stopDes = e.stopDes
        that.name = e.name
        that.nowlat = e.latitude
        that.nowlon = e.longitude
        that.onoff = true
        that.address = e.address
        that.boxid = e.boxUid

      } else {
        if (!localStorage.getItem('openid')) {
          MessageBox.confirm('登录使用,现在登录？').then(action => {
            if (action === 'confirm') {
              localStorage.setItem('nowpath', 'daohang')
              that.getpermit()
            }
          })
          return;
        }
        // 微信外
        that.stopDes = e.stopDes
        that.name = e.name
        that.nowlat = e.latitude
        that.nowlon = e.longitude
        that.onoff = true
        that.address = e.address
        that.boxid = e.boxUid

      }

    },

    // 调起地图
    openlocation() {
      let that = this
      if (that.isWeixin) {
        wx.openLocation({
          latitude: parseFloat(that.nowlat), // 纬度，浮点数，范围为90 ~ -90
          longitude: parseFloat(that.nowlon), // 经度，浮点数，范围为180 ~ -180。
          name: that.address, // 位置名
          address: that.name, // 地址详情说明
          scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: 'liuyangyang.xyz' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      } else {
        window.open(`http://api.map.baidu.com/marker?location=${that.nowlat},${that.nowlon}&title=${that.name}&content=&output=html`);
      }

    },
    getData() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'boxes/listAll',
      }).then((res) => {
        console.log(res)
        let data = res.data
        that.mapData = data.data
        that.mapInit()
      });
    },
    next(val) {
      this.$router.push({ name: val }) // -> /user
    },
    getopenid() {
      let that = this
      Indicator.open({
        text: '登录初始化...',
        spinnerType: 'fading-circle'
      });
      this.$ajax({
        method: 'post',
        url: 'wx/getOpenId',
        data: this.$qs.stringify({ code: that.yanzhengcode })
      }).then((res) => {
        that.openId = res.data.data
        localStorage.setItem('wxopenid', res.data.data)
        Indicator.close();
      }).catch(err => {
        Indicator.close();
      });
    },
    getpermit() {
      var pageUrl = this.loginurls
        .replace(/[/]/g, "%2f")
        .replace(/[:]/g, "%3a")
        .replace(/[#]/g, "%23")
        .replace(/[&]/g, "%26")
        .replace(/[=]/g, "%3d");
      var url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        this.appids +
        "&redirect_uri=" +
        pageUrl + //这里放当前页面的地址
        "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
      window.location.href = url
    },
    getConfig() {
      let url = location.href.split('#')[0] //获取锚点之前的链接
      let that = this
      this.$ajax({
        method: 'post',
        url: 'wx/getJsapiSignature',
        data: this.$qs.stringify({ url })
      }).then((res) => {
        console.log(res)
        if (that.isWeixin) {
          that.wxInit(res.data.data);
        } else {
          // 获取浏览器
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              that.clat = r.point.lat
              that.clon = r.point.lng
              that.getData()
            } else {
              alert('failed' + geolocation.getStatus());
            }
          }, { enableHighAccuracy: true })


        }
      }).catch(err => {
        console.log(err)
      });
    },
    getnote() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'notices/listEffectNotices',
      }).then((res) => {
        let data = res.data.data
        that.gundongdesc = ''
        for (let i = 0; i < data.length; i++) {
          that.gundongdesc += ' ' + data[i].content
        }

      }).catch(err => {


      });
    },
    // 判断是否为微信环境
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true;
        // 在微信内获取code
        // var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        // var r = window.location.search.substr(1).match(reg);
        // if (r) {
        //   this.yanzhengcode = r[2]
        //   this.getopenid()
        // }

      } else {
        // 微信外
        this.isWeixin = false;
      }

      // var browser = navigator.userAgent.toLowerCase();
      // if(browser.match(/Alipay/i)=="alipay"){
      //    this.isEven = 1;
      // }else if(browser.match(/MicroMessenger/i)=="micromessenger"){
      //     this.isEven = 2;
      // }else{
      // 	this.isEven = 3;
      // }

    },
    wxInit(res) {
      console.log(res)
      let that = this
      let url = location.href.split('#')[0] //获取锚点之前的链接
      wx.config({
        debug: false,
        appId: that.appids,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ['scanQRCode', 'openLocation', 'getLocation']
      });
      wx.ready(function () {
        document.getElementById('saocode').onclick = function () {
          if (!localStorage.getItem('wxopenid')) {
            MessageBox.confirm('登录使用,现在登录？').then(action => {
              if (action === 'confirm') {
                that.getpermit()
              } else {

              }
            })
            return;
          }
          wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
              // that.boxid = res.resultStr
              // that.usestate()
              window.location.href = res.resultStr
            }
          })
        };
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            that.clat = res.latitude
            that.clon = res.longitude
            that.getData()
            //res.latitude,res.longitude
          },
          fail: function (e) {
            console.log(e);
          },
        });

      });
      wx.error(function (err) {
        alert(JSON.stringify(err));
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    document.getElementById('music').pause();
    next()
  },
  created() {
    this.is_weixin()
    this.openId = localStorage.getItem('openid')
    this.wxopenid = localStorage.getItem('wxopenid')
    this.getnote()
    // this.getAppid()
    // var reg = new RegExp("(^|&)"+ 'code' +"=([^&]*)(&|$)");
    // var r = window.location.search.substr(1).match(reg);
    // if(r){
    //     this.yanzhengcode=r[2]
    //     this.getopenid()
    // }
    //       
  },
  mounted() {
    this.redirecturl = this.saomaurl
    document.getElementById('music').play();
    // document.addEventListener("WeixinJSBridgeReady", function () {
    //   document.getElementById('music').play();
    // }, false);
    this.loginurls = this.loginurl
    this.daohangurls = this.daohangurl
    this.appids = this.appid
    var that = this;
    this.$nextTick(function () {
      if (that.isWeixin) {
        this.getConfig()
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        console.log(r, 'r')
        if (r) {
          console.log(JSON.stringify(r))
          this.yanzhengcode = r[2]
          this.getopenid()
        }
      } else {
        this.getConfig()
      }
    })
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
/*滚动*/
.box {
  top: 0;
  background: red;
  height: px2rem(34px);
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  z-index: 9999;
  position: fixed;
}

.animate {
  font-size: px2rem(15px);
  color: #000;
  width: 100%;
  display: inline-block;
  color: #fff;
  white-space: nowrap;
  animation: 8s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}

@-webkit-keyframes wordsLoop {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}
.name-size {
  font-size: px2rem(12px) !important;
}
.stopDes {
  color: #909399;
  font-size: px2rem(12px);
}
#desc {
  z-index: 9999;
  padding: px2rem(10px) px2rem(20px);
  border-radius: px2rem(6px);
  background: #fff;
  position: fixed;
  top: px2rem(50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: px2rem(10px);
  font-size: px2rem(18px);
  right: px2rem(10px);
}
.yubg {
  width: px2rem(22px);
  height: px2rem(20px);
}
.mybg {
  width: px2rem(17px);
  height: px2rem(20px);
}
.wrap {
  background: #f5f5f5;
  height: 100%;
}
#map {
  height: 100%;
}
.footer {
  height: px2rem(49px);
  background: #f9f9f9;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(10px);
  color: #4b4b4b;
}
.erweima {
  height: px2rem(73px);
  width: px2rem(73px);
  background: url(../../assets/saomabg.png);
  background-size: contain;
  border-radius: 50%;
  margin-top: px2rem(-50px);
  z-index: 999999;
}
/*.gundong{*/
/*background: white;*/
/*color: black;*/
/*font-size: px2rem(13px);*/
/*width:100%;*/
/*height:px2rem(14px);*/
/*top:0;*/
/*position: absolute;*/
/*}*/
</style>
<style>
.jine-wrap input {
  background: #f0f0f0;
}
</style>



