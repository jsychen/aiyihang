<template>
   <div class="wrap">
      <div class="inner">
         <div class="photo" v-show="onoff" @click="showInfo">
            <div class="img-wraps" @click="showInfo">
               <img class="photo-show" v-if="userinfo.url != null" :src="userinfo.url" alt>
            <img class="photo-show" v-else src="../../assets/anvator.jpg" alt>
            </div>
            <div class="name">
               <div class="top">{{userinfo.alias}}</div>
               <div class="state">
                  会员
                  <img class="photo-go" src="../../assets/Group4.png" alt>
               </div>
            </div>
         </div>
         <!-- <div class="photo" v-show="!onoff" @click="getpermit"> -->
          <div class="photo" v-show="!onoff">
            <div class="img-wraps">
               <img class="photo-show" src="../../assets/anvator.jpg" alt>
            </div>
            <div class="name">
               <!-- <button class="login">去登录</button> -->
               <router-link tag="button" :to="{name: 'login'}">去登录</router-link>
            </div>
         </div>
         <div class="nine-graid">
            <div class="item" @click="myDingdan">
               <div class="img-wrap">
                  <img src="../../assets/images/icon-order.png" alt>
               </div>
               <div class="desc">洗车订单</div>
            </div>
            <!-- <div class="item" @click="myChe">
               <div class="img-wrap">
                  <img src="../../assets/chemenu.png" alt>
               </div>
               <div class="desc">我的车辆</div>
            </div>
            <div class="item" @click="ziJin">
               <div class="img-wrap">
                  <img src="../../assets/yuemenu.png" alt>
               </div>
               <div class="desc">我的余额</div>
            </div> -->
            <router-link class="item" :to="{path: '/yijian'}">
               <div class="img-wrap">
                  <img src="../../assets/images/icon-opinion.png" alt>
               </div>
               <div class="desc">意见反馈</div>
            </router-link>
         </div>
         <router-link class="saoma" :to="{path: '/saomaxiche'}"></router-link>
         <div class="item-list">
            <!-- <mt-cell title="扫码洗车" is-link to="/saomaxiche"></mt-cell> -->
            <!-- <mt-cell title="现金充值" is-link to="/chongzhi"></mt-cell> -->
            <!-- <mt-cell title="我的优惠" is-link to="/#/myyouhui"></mt-cell> -->

            <!-- <mt-cell title="次卡列表" is-link to="/chanpin"></mt-cell>
        <mt-cell title="我的次卡" is-link to="/myshop"></mt-cell>

        <mt-cell title="次卡分享" is-link to="/sharetaocan"></mt-cell>
        <mt-cell title="我的洗车券" is-link to="/allchequan"></mt-cell>
        <mt-cell title="兑换优惠" is-link to="/indexsaoma"></mt-cell> -->
            <!-- <mt-cell title="邀请好友免费洗" is-link to="/#/myyaoqing"></mt-cell> -->
         </div>
         <!-- <div class="option-item">
            <mt-cell title="意见箱" is-link to="/yijian"></mt-cell>
            <mt-cell title="帮助中心" is-link to="/helpinfo"></mt-cell>
         </div> -->
      </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      onoff: false,
      appids: "",
      loginurls: "",
      userinfo: {
        alias: "",
        name: "",
        phone: "",
        sex: "",
        url: "",
        id: "",
        balance: "",
        isWeixin: false
      },
      openid: ""
    };
  },
  methods: {
    getpermit() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true;
        // 在微信内获取code
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
        window.location.href = url;
      } else {
        // 微信外
        this.isWeixin = false;
        this.$router.push({
          path: "/login"
        });
      }
    },

    getinfo(openId) {
      let that = this;
      this.$ajax
        .get("member/getInfo", {
          params: {
            openId
          }
        })
        .then(res => {
          console.log(res, "我是登录的信息");
          // alert(JSON.stringify(res.data.data))
          that.userinfo = res.data.data;
        });
    },
    ziJin() {
      this.$router.push({ name: "allzijin" });
    },
    myChe() {
      this.$router.push({ name: "myche" });
    },
    myDingdan() {
      this.$router.push({ name: "mydingdan" });
    },
    showInfo() {
      this.$router.push({ name: "selfinfo" });
    },
    // 判断用户是否登录
    checkUserLogin: function () {}
  },
  created() {
    this.loginurls = this.loginurl;
    this.appids = this.appid;
    this.openid = localStorage.getItem("openid");
    if (this.openid) {
      this.onoff = true;
      this.getinfo(this.openid);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.name{
  width: px2rem(260px);
  overflow: hidden;
  clear: both;
}
.login {
  width: px2rem(100px);
  height: px2rem(30px);
  background: #d63030;
  border-radius: 5px;
  border: 0;
  float: left;
  font-size: px2rem(14px);
  color: #fff;
}
*{
   margin: 0;
   padding: 0;
}
.wrap {
  padding-top: px2rem(65px);
  height: 100%;
  background:url(../../assets/images/index-bg.png) no-repeat;
  background-size: contain;
}
.inner {
  width: px2rem(351px);
  margin: 0 auto;
}
.photo {
  display: flex;
  align-items: center;
  height: px2rem(80px);
  /*background:#fff;*/
  margin: px2rem(-50px) auto px2rem(12px) auto;
  color: white;
}
.photo-go {
  margin-left: px2rem(200px);
}
.photo .top {
  font-size: px2rem(16px);
}
.photo .state {
  font-size: px2rem(13px);
  color: #999;
}
.photo-show {
  height: px2rem(58px);
  width: px2rem(58px);
  border-radius: 50%;
  border: px2rem(5px) solid rgba(255, 255, 255, 0.4);
  margin-right: px2rem(10px);
}
.img-wraps {
  margin: 0 px2rem(12px) 0 px2rem(25px);
  height: px2rem(58px);
  width: px2rem(58px);
  border-radius: 50%;
}
.nine-graid {
  width: px2rem(200px);
  overflow: hidden;
  clear: both;
  position: fixed;
  bottom: px2rem(60px);
  left: 0;
  left: 50%;
  margin-left: px2rem(-100px);
  &::before{
     position: absolute;
     width: 1px;
     height: px2rem(60px);
     background: #e5e5e5;
     content: '';
     left: 50%;
     top: 0;
  }
  .item{
     float: left;
     width: px2rem(60px);
     font-size: px2rem(14px);
     text-align: center;
     &:nth-child(1){
        float: left;
     }
     &:nth-child(2){
        float: right;
     }
     img{
        width: px2rem(24px);
     }
  }
  a{
     text-decoration: none;
     color: #000;
  }
}
.img-wrap {
  width: px2rem(27px);
  height: px2rem(27px);
}
.item div {
  margin: 0 auto;
}
.desc {
  padding-top: px2rem(12px);
}
.item-list {
  margin: px2rem(9px) 0 px2rem(12px) 0;
}
.saoma{
   width: px2rem(300px);
   height: px2rem(300px);
   background-image: url(../../assets/images/saoma.png);
   background-size: cover;
   position: fixed;
   top: px2rem(130px);
   left: px2rem(40px);
}
.name{
   margin-left: px2rem(10px);
   padding-top: px2rem(5px);
}
</style>
