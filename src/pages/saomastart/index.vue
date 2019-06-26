<template>
  <div class="wrap">
    <div class="inner">
      <div class="state">
         <span class="pass">1</span>
         <div class="line blue"></div>
         <span class="pass">2</span>
         <div class="line active"></div>
         <span class="active">3</span>
      </div>
      <div class="tips">
         <div class="tip-title">确认支付开启洗车机</div>
         <div class="tip-title-bottom">24小时智能洗车</div>
      </div>
      <div class="orderInfo">
         <div class="basic">
            <div class="left">
               <p>{{message}}</p>
               <span>{{name}}</span>
            </div>
            <div class="right">
               ￥<span>{{payfee}}</span>
            </div>
         </div>
         <div class="washType" @click="ShouPup">
            <label>洗车类型：</label>
            <span>{{message}}</span>
         </div>
      </div>
      <mt-popup
        class="popfont"
        v-model="popupVisible"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker :slots="slots" @change="onValuesChange" showToolbar>
          <div class="picker-toolbar-title">
            <div class="left" @click="popupVisible = !popupVisible">取消</div>
            <div class="right" @click="popupVisible = !popupVisible">确定</div>
          </div>
        </mt-picker>
      </mt-popup>
      <div class="type">支付方式</div>
      <div class="payTypes">
         <label>
            <span class="icon-wx">微信支付</span>
            <div class="radio">
               <input type="radio" value="weixin" v-model="type"/>
               <em></em>
            </div>
            
         </label>
         <label>
            <span class="icon-vip">会员卡</span>
            <div class="radio">
               <input type="radio" value="huiyuan" v-model="type"/>
               <em></em>
            </div>
         </label>
         <label>
            <span class="icon-code">8000m码核销</span>
            <div class="radio">
               <input type="radio" value="checkCode" v-model="type"/>
               <em></em>
            </div>
         </label>
      </div>
      <div v-if="false" class="title">请选择会员卡</div>
      <img v-if="false" class="youhui-img" src="../../assets/5yuanyong.png" alt>
      <router-link class="handleNext" tag="button" :to="{name: 'vipLogin', params:{ id: this.$route.params.id , washType: this.washType}}" v-if="type === 'huiyuan'">下一步</router-link>
      <!-- <div v-if="showbtn" class="bottom-btn" @click="next">马上启动</div> -->
      <button v-if="type === 'weixin'" class="handleNext" @click="next">马上启动</button>
      <div class="zhifuid" v-if="showhuiyuan">
        <div class="wraps" v-for="item in datalist3" :key="item.id" @click="clickid(item.id)">
          <div class="top-desc">
            <div class="desc-name">{{item.name}}</div>
            <div class="desc-date">
              <div class="left">
                <div class="top" v-if="item.comboType==1">可洗次数：{{item.washNum-item.washedNum}}</div>
                <div class="top" v-if="item.comboType==2">{{item.effectDays}}天</div>
              </div>
              <div class="right">有效期：{{item.dtCreate | timeparse}}-{{item.expireTime | timeparse}}</div>
            </div>
          </div>
          <div class="logo-bg"></div>
          <div class="chepaihao">
            <div class="text">
              <span class="yima-desc">爱义行，让洗车变得简单快乐！</span>
            </div>
            <div class="class-number">车牌号：{{item.number}}</div>
            <div class="class-number">请点击选择会员卡</div>
          </div>
        </div>
      </div>
    </div>
    <div class="zhifuid" v-if="showquan">
      <div class="wraps" v-for="item in datalist2" :key="item.id" @click="clickid(item.id)">
        <div class="top-desc1">
          <div class="desc-name">{{item.name}}</div>
          <div class="desc-date">
            <div class="left">可洗{{item.washNum-item.washedNum}}次</div>
            <div class="right">有效期：{{item.takeTime | timeparse}}-{{item.expireTime | timeparse}}</div>
          </div>
        </div>
        <div class="logo-bg"></div>
        <div class="chepaihao1">
          <div class="text">
            <span class="yima-desc">爱义行，让洗车变得简单快乐！</span>
          </div>
          <div class="class-number">车牌号：{{item.number}}</div>
          <div class="class-number">请点击选择洗车券</div>
        </div>
      </div>
    </div>
    <!-- 核销码弹框 -->
    <div class="modal" v-show="showModal">
       <div class="inner">
          <span class="close" @click="handleCloseModal"></span>
          <p>请输入以8000开头的核销码</p>
          <input type="text" v-model.trim="checkCode"/>
          <button class="handleNext" @click="handleCheck">点击核销</button>
       </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      isshow: false,
      hasquan: true,
      hashuiyuan: true,
      showbtn: true,
      showhuiyuan: false,
      showquan: false,
      popupVisible: true,
      nowid: '',
      showToolbar: true,
      message: "爱义行标准洗",
      datalist: [],
      datalist2: [],
      datalist3: [],
      slots: [{
        values: [],
      }],
      popupVisible: false,
      payType: 6,
      name: '',
      payfee: '',
      wasDes: '',
      value: '',
      type: 'weixin',
      openId: '',
      url1: '../../dist/nosel.png',
      url2: '../../dist/select.png',
      wxopenid: '',
      env: 0,
      washType:1,
      // chen
      showModal: false,
      checkCode: ''
    }
  },
  methods: {
    clickid(val) {
      this.nowid = val
      this.showhuiyuan = false
      this.showquan = false
      this.showbtn = true
    },
   //  获取洗车类型
    gettype() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'box/listWashType',
        // data:this.$qs.stringify({fboxUid:that.$route.params.id})
      }).then((res) => {
        that.datalist = res.data.data;
        console.log(res)
        for (let i = 0; i < that.datalist.length; i++) {
          that.slots[0].values.push(that.datalist[i].name)
          
        }
      }).catch(err => {

      });
    },
    ShouPup() {
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      // console.log(picker, values)
      this.message = values[0];
      this.payfee = '';
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].name === values[0]) {
          this.payfee = this.datalist[i].amount;
          this.washType = this.datalist[i].washType
        }
      }
    },
    getConfig() {
      let url = location.href.split('#')[0] //获取锚点之前的链接
      let that = this
      this.$ajax({
        method: 'post',
        url: 'wx/getJsapiSignature',
        data: this.$qs.stringify({ url })
      }).then((res) => {
        that.wxInit(res.data.data);
      });
    },
   //  微信支付
    alertpay(args, orderId) {
      let that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": args.appid,     //公众号名称，由商户传入
          "timeStamp": args.time_stamp,         //时间戳，自1970年以来的秒数
          "nonceStr": args.nonce_str, //随机串
          "package": args.packageStr,
          "signType": "MD5",         //微信签名方式：
          "paySign": args.sign //微信签名
        },
        function (res) {
          Indicator.close();
          if (res.err_msg == "get_brand_wcpay_request:ok") {
             this.handleOrder(orderId);
            that.$router.push({ name: 'qingxizhong', params: {
                id: that.$route.params.id
            }});
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast('已取消支付');
          } else {

          }
        }
      );
    },
   //  微信支付成功推送结算订单到erp
   handleOrder: function (orderId) {
      let data = {
         openId: this.openId,
         boxUid: this.$route.params.id,
         orderId: orderId
      };
      this.$ajax({
        method: 'post',
        url: 'erpcard/invoice',
        data: this.$qs.stringify(data)
      }).then((res) => {
         if(res.data.code === '0000') {
            console.log('微信支付成功推送结算订单到erp');
            return;
         }
         console.log(res.data.msg);
      })
   },
    wxInit(res) {
      let that = this
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ['chooseWXPay']
      });
      wx.ready(function () {

      });
      wx.error(function (err) {

      });
    },
    pay(orderId) {
      let that = this
      console.log(that.env == 1,that.env == 3,that.env, typeof that.env)
      if (that.env == 1) {
        var data = { openId2: that.wxopenid, openId: that.openId, orderId: orderId, env: that.env, amount: that.payfee };
      } else if (that.env == 3) {
        var data = { openId2: '', openId: that.openId, orderId: orderId, env: that.env, amount: that.payfee };
      }
      this.$ajax({
        method: 'post',
        url: 'wx/payment',
        data: this.$qs.stringify(data)
      }).then((res) => {
        if (that.env == 1) {
          // 微信内支付
          if (that.payType === 1) {
            that.alertpay(res.data.data, orderId)
          } else {
            Indicator.close();
          }
        } else if (that.env == 3) {
          // 外部浏览器支付
          window.location.href = res.data.data.mweb_url
          Indicator.close();
        }

        //that.$router.push({name:'qingxizhong'})
      }).catch(err => {
        Indicator.close();

      });
    },
    getboxinfo() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'box/getInfo',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id })
      }).then((res) => {
        that.wasDes = res.data.data.wasDes
        that.name = res.data.data.name
      });
    },
    next() {
      let washType = 1;
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].name === this.message) {
          washType = this.datalist[i].washType
        }
      }
      let that = this
      Indicator.open();
      // 插入订单记录
      this.$ajax({
        method: 'post',
        url: 'washRecord/submitWashRecord',
        data: this.$qs.stringify({ 
            boxUid: that.$route.params.id, 
            payType: that.payType, 
            washType,
            openId: that.openId,
            comboOrderId: that.nowid, 
            couponDetailId: that.nowid,
            amount: this.payfee, 
         })
      }).then((res) => {
        if (that.payType == 5 || that.payType == 6 || that.payType == 3) {
          Indicator.close();
          that.$router.push({            
             name: 'qingxizhong', 
             params: {
              id: that.$route.params.id
            }          
         })
          return;
        }
        that.pay(res.data.data)
      }).catch(err => {
        Indicator.close();
        Toast(err.response.data.msg);
      });
    },
    gethuiyuan2() {
      Indicator.open();
      let that = this
      this.$ajax({
        method: 'post',
        url: 'combo/listUsable',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId })
      }).then((res) => {
        Indicator.close();
        let data = res.data.data
        if (!data.length) {
          that.hashuiyuan = false

        } else {
          that.hashuiyuan = true

        }
        that.datalist3 = data
      }).catch(err => {

      });
    },
    gethuiyuan() {
      Indicator.open();
      let that = this
      this.$ajax({
        method: 'post',
        url: 'combo/listUsable',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId})
      }).then((res) => {
        Indicator.close();
        let data = res.data.data
        if (!data.length) {
          that.hashuiyuan = false
          that.type = 'weixin'
          that.payType = 1

        } else {
          that.hashuiyuan = true
          that.nowid = data[0].id
        }
        that.datalist3 = data
      }).catch(err => {

      });
    },
    getchequan() {
      Indicator.open();
      let that = this
      this.$ajax({
        method: 'post',
        url: 'coupon/listUsable',
        data: this.$qs.stringify({ fboxUid: that.$route.params.id, openId: that.openId})
      }).then((res) => {
        Indicator.close();
        let data = res.data.data

        if (!data.length) {
          //Toast('没有查询到信息，请换其他支付方式');
          that.hasquan = false
          that.type = 'huiyuan'
          that.payType = 5
          that.gethuiyuan()
        } else {
          that.hasquan = true
          that.nowid = data[0].id
        }

        that.datalist2 = data

      }).catch(err => {

      });
    },
    changePic(val) {
      this.payType = val
      switch (val) {
        case 1:
          this.type = "weixin";
          break;
        case 2:
          this.type = 'zhifu';
          break;
        case 3:
          this.type = "yue";
          break;
        case 5:
        this.type = 'huiyuan';
         this.showbtn = false;
           // -> /user
          // if (!this.hashuiyuan) {
          //   MessageBox.confirm('无可用会员卡，现在去购买？').then(action => {
          //     if (action === 'confirm') {
          //       this.$router.push({ name: 'chanpin' }) // -> /user
          //     } else {
          //       Toast('没有可用会员卡，请换其他支付方式');
          //     }
          //   })
          //   return
          // }
          // this.type = "huiyuan"
          // this.showhuiyuan = true
          // this.showbtn = false
          // this.gethuiyuan()
          break;
        case 6:
          if (!this.hasquan) {
            MessageBox.confirm('没有可用洗车券，现在去领取？').then(action => {
              if (action === 'confirm') {
                this.$router.push({ name: 'duihuan' }) // -> /user
              } else {
                Toast('没有可用洗车券，请换其他支付方式');
              }
            })
            return
          }
          this.type = "youhuiquan"
          this.showquan = true
          this.showbtn = false
          //this.getchequan()
          break;
      }
    },
   // 关闭弹框
   handleCloseModal: function () {
      this.showModal = false;
      this.checkCode = '';
      this.type = 'weixin';
   },
   // 8000码核销
   handleCheck: function () {
      let checkCode = this.checkCode;
      if(checkCode.indexOf('8000') !== 0) {
         Toast('核销码格式不正确');
         return;
      };
      Indicator.open();
      this.$ajax({
        method: 'post',
        url: 'erpcard/iss',
        data: this.$qs.stringify({ checkCode: this.checkCode, openId: this.openId})
      }).then((res) => {
        Indicator.close();
         if(res.data.code === '0000'){
            Toast('核销成功');
            this.addOrderRecord();
            return;
         };
         Toast(res.data.msg);
      }).catch(err => {

      });
   },
   // 生成订单
   addOrderRecord: function () {
      let boxId = this.$route.params.id;
      let data = {
         openId: this.openId,
         payType: 9,
         washType: this.washType,
         boxUid: boxId
      };
      Indicator.open('洗车机启动中...');
      this.$ajax.get('washRecord/submitWashRecord', {params: data}).then( res => {
         Indicator.close();
         if(res.data.code === '0000'){
            this.$router.push({name: 'qingxizhong', params: {id: boxId}});
            return;
         }
         Toast(res.data.msg);
      })
   },
  },

  created() {
    this.openId = localStorage.getItem("openid"); //sessionId
    this.wxopenid = localStorage.getItem('wxopenid');//openid
    this.getboxinfo()
    this.gettype()
    this.gethuiyuan2()
    this.getchequan()
  },
  mounted() {
    this.$nextTick(function () {
      this.getConfig()
    })
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true;
        this.env = 1
      } else {
        // 微信外
        this.isWeixin = false;
        this.env = 3
        console.log(this.env)
      }
  },
  watch: {
     'type': function (val) {
         this.showModal = val === 'checkCode';
     }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
*{
   padding: 0;
   margin: 0;
}
button{
   outline: none;
}
.chepaihao1 {
  color: #4c4c4cff;
  padding-top: px2rem(10px);
  text-align: center;
  font-size: px2rem(12px);
  background: url(../../assets/bottombg.png) no-repeat;
  background-size: cover;
}
.chepaihao {
  color: #4c4c4cff;
  padding-top: px2rem(10px);
  text-align: center;
  font-size: px2rem(12px);
  background: url(../../assets/bottom2bg.png) no-repeat;
  background-size: cover;
}
.class-number {
  padding-top: px2rem(10px);
  padding-bottom: px2rem(10px);
}
.desc-name {
  font-weight: 900;
  padding: px2rem(10px);
  color: #000;
  font-size: px2rem(16px);
}
.yima-desc {
  text-decoration: underline;
  font-weight: 900;
  color: #000;
  font-size: px2rem(16px);
}
.text {
  display: flex;
  justify-content: center;
}
.top-desc1 {
  background: url(../../assets/topbg.png) no-repeat;
  background-size: cover;
}
.top-desc {
  background: url(../../assets/top2bg.png) no-repeat;
  background-size: cover;
}
.desc-date {
  display: flex;
  justify-content: space-around;
  font-size: px2rem(14px);
}
.logo-bg {
  height: px2rem(50px);
  background: url(../../assets/logo.png) no-repeat #000 center;
  background-size: contain;
}
.popfont {
  width: 100%;
}
.picker-toolbar-title {
  font-size: px2rem(14px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.picker-toolbar-title .left,
.picker-toolbar-title .right {
  padding: px2rem(8px);
  font-size: px2rem(14px) !important;
}
.my-content-list {
  padding: 0 px2rem(10px);
  margin-top: px2rem(14px);
  height: 48px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border: px2rem(1px) solid #e0e0e0;
  border-radius: px2rem(4px);
  background: #fff;
}
.label {
  padding-left: px2rem(10px);
}
.line {
  height: px2rem(1px);
  background: #e0e0e0;
  width: 99%;
  margin: 0 auto;
}
.top-wrap {
  border-top-left-radius: px2rem(6px);
  border-top-right-radius: px2rem(6px);
}
.bottom-wrap {
  border-bottom-left-radius: px2rem(6px);
  border-bottom-right-radius: px2rem(6px);
}
.item-wrap .left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-wrap {
  padding: 0 px2rem(2px);
  height: px2rem(43px);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2rem(16px);
}
.youhui-img {
  width: px2rem(335px);
  display: block;
  margin: 0 auto;
  margin-top: px2rem(10px);
}
.title {
  font-size: px2rem(14px);
  padding-top: px2rem(10px);
  color: #999;
}
.radio {
  width: px2rem(18px);
  height: px2rem(18px);
}
.yue-zhifu .left,
.yue-zhifu .right {
  padding-left: px2rem(10px);
}
.wrap {
   padding: px2rem(15px);
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
  padding: px2rem(5px) 0;
}
.bottom-btn {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background: -moz-linear-gradient( top,#FF8586,#D81618);
  background:  -webkit-linear-gradient( top,#FF8586,#D81618);
  background: -o-linear-gradient( top,#FF8586,#D81618);
  background: linear-gradient( top,#FF8586,#D81618);
  font-size: px2rem(15px);
  color: #fff;
  height: px2rem(40px);
}
.yue-zhifu {
  border-radius: px2rem(6px);
  border: px2rem(1px) solid #e0e0e0;
}

.type {
  color: #999;
  font-size: px2rem(14px);
  margin: px2rem(20px) 0 px2rem(10px);
}
.xia {
  width: 100%;
  height: px2rem(32px);
  overflow: hidden;
}
.wrap {
  padding-top: px2rem(10px);
  box-sizing: border-box;
}
.wraps {
  border-radius: px2rem(6px);
  box-sizing: border-box;
  padding-top: px2rem(16px);
  margin: 0 auto;
  font-size: px2rem(18px);
  color: black;
  background-size: 100%;
  width: px2rem(355px);
}
.wraps1 {
  padding-left: px2rem(30px);
  border-radius: px2rem(6px);
  box-sizing: border-box;
  padding-top: px2rem(16px);
  margin: 0 auto;
  margin-bottom: px2rem(10px);
  font-size: px2rem(18px);
  color: black;
  background: url(../../assets/zhifu@2x.png) no-repeat;
  background-size: 100%;
  width: px2rem(355px);
  height: px2rem(200px);
}
.item {
  justify-content: space-around;
  /*align-items: center;*/
}
.cishu {
  font-size: px2rem(12px);
  width: px2rem(80px);
  /*margin-left: px2rem(2px);*/
}
.item .center {
  /*margin:0 px2rem(10px);*/
  flex: 1;
  display: flex;
  font-size: px2rem(13px);
  font-weight: 400;
}
.item .right {
  width: px2rem(200px);

  font-weight: bold;
}
.top {
  font-size: px2rem(12px);
  width: px2rem(100px);
  /*margin-left: px2rem(2px);*/
}
.item .center1 {
  /*margin:0 px2rem(10px);*/
  flex: 1;
  display: flex;
  font-size: px2rem(12px);
  /*font-weight: 400;*/
}
.item .right1 {
  /*width:px2rem(100px);*/

  font-weight: bold;
}
.left1 {
  padding-left: px2rem(15px);
}
.radio img {
  width: px2rem(18px);
  height: px2rem(18px);
}
.zhifuid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  padding-bottom: px2rem(140px);
}

.state {
   width: px2rem(290px);
   overflow: hidden;
   clear: both;
   margin: 0 auto;
   padding-top: px2rem(20px);
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
.orderInfo{
   // box-shadow: 0 0 5px rgba(0,0,0,0.05);
   background: #fff;
   border-radius: px2rem(5px);
   margin: 0 auto;
   
}
.basic{
   overflow: hidden;
   clear: both;
   .left{
      width: px2rem(200px);
      float: left;
      padding: px2rem(10px);
      *{
         line-height: px2rem(20px);
         float: left;
         width: 100%;
      }
      p{
         font-size: px2rem(14px);
      }
      span{
         font-size: px2rem(12px);
         color: #999;
      }
   }
   .right{
      width: px2rem(60rem);
      float: right;
      color: #f25455;
      margin-right: px2rem(10px);
      margin-top: px2rem(14px);
      font-size: px2rem(18px);
      span{
         color: #f25455;
         font-size: px2rem(24px);
      }
   }
}
.washType{
   border-top: 1px solid #eee;
   overflow: hidden;
   clear: both;
   padding: px2rem(10px);
   *{
      font-size: px2rem(14px);
   }
   label{
      float: left;
      color: #999;
   }
   span{
      float: right;
      padding-right: px2rem(10px);
      position: relative;
      &:before{
         content: '';
         position: absolute;
         width: px2rem(6px);
         height: px2rem(6px);
         border-top: 1px solid #333;
         border-right: 1px solid #333;
         transform: rotate(45deg);
         right: 0;
         top: px2rem(7px);
      }
   }
}
.tips{
   margin: px2rem(20px) 0;
}
.payTypes{
   label{
      display: block;
      overflow: hidden;
      clear: both;
      padding: px2rem(10px);
      background: #fff;
      border-radius: px2rem(5px);
      margin-bottom: px2rem(10px);
      span{
         float: left;
         font-size: px2rem(14px);
         padding-left: px2rem(25px);
         background-size: px2rem(20px) px2rem(20px);
         background-repeat: no-repeat;
         background-position: left center;
      }
      .icon-wx{
         background-image: url(../../assets/images/icon-wx.png);
      }
      .icon-vip{
         background-image: url(../../assets/images/icon-vip.png);
      }
      .icon-code{
         background-image: url(../../assets/images/icon-code.png);
      }
      .radio{
         width: px2rem(20px);
         height: px2rem(20px);
         position: relative;
         float: right;
         input,em{
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
         }
         em{
            border: 1px solid #999;
            border-radius: 50%;
            transform: scale(0.8);
         }
         input{
            opacity: 0;
            &:checked+em{
               background-image: url(../../assets/images/icon-checked.png);
               background-size: cover;
               border: 0;
               transform: scale(1);
            }
         }
      }
   }
}
.handleNext{
   display: block;
   width: px2rem(300px);
   height: px2rem(40px);
   border-radius: px2rem(5px);
   background-image: url(../../assets/images/btnBg2.svg);
   font-size: px2rem(16px);
   box-shadow: 0 5px 10px rgba(70,127,157,0.3);
   border: 0;
   color: #fff;
   margin: px2rem(60px) auto;
   &:disabled{
      background: #999;
      box-shadow: none;
   }
}
/* 弹框 */
.modal{
   width: 100%;
   height: 100%;
   position: fixed;
   left: 0;
   top: 0;
   background: rgba(0,0,0,.6);
   *{
      box-sizing: border-box;
   }
   .inner{
      width: px2rem(340px);
      padding: px2rem(50px) px2rem(35px) px2rem(20px);
      background: #fff;
      border-radius: px2rem(5px);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      >*{
         float: left;
         width: 100%;
      }
      .close{
         width: px2rem(30px);
         height: px2rem(30px);
         position: absolute;
         left: px2rem(10px);
         top: px2rem(10px);
         background-image: url(../../assets/images/icon-close.svg);
         background-size: 50% 50%;
         background-position: center center;
         background-repeat: no-repeat;
      }
      p{
         font-size: px2rem(14px);
         color: #999;
         line-height:px2rem(30px);
      }
      input{
         width: 100%;
         line-height: px2rem(20px);
         padding: px2rem(10px);
         border: 1px solid #e5e5e5;
         border-radius: px2rem(5px);
         outline: none;
      }
      button{
         width: 100%;
         margin: px2rem(30px) 0;
      }
   }
}
</style>
 