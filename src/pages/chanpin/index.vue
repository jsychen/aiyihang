<template>
  <div class="wrap">
    <div class="wraps" v-for="item in datalist" :key="item.id" @click="next(item.id)">
      <div class="top-desc">
        <div class="desc-name">{{item.name}}</div>
        <div class="desc-date">
          <div class="left">销量：{{item.salesVolume}}</div>
          <div class="right">
            <span class="cishu" v-if="item.comboType==1">次数：{{item.washNum}}次</span>
            <span class="money">金额：{{item.price}}元</span>
          </div>
        </div>
      </div>
      <div class="logo-bg"></div>
      <div class="chepaihao">
        <div class="text">
          <span class="yima-desc">爱义行，让洗车变得简单快乐！</span>
        </div>
        <div class="class-number">请点击购买</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      datalist: [],
      openId: ''
    }
  },
  methods: {
    next(id) {
      localStorage.setItem('bigname', '')
      this.$router.push({ name: 'chanpinggoumai', params: { id } }) // -> /user
    },
    // 宋获取所有套餐列表
    getData() {
      let that = this
      this.$ajax.get('combo/listAll').then((res) => {
        let data = res.data
        that.datalist = data.data
      }).catch(err => {

      });;
    },
  },
  created() {
    this.openId = localStorage.getItem("openid"); //sessionId
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
    }
    this.getData();
  },
  mounted() {
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
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.wrap {
  height: auto;
  padding-bottom: px2rem(10px);
}
.chepaihao {
  color: #4c4c4cff;
  padding-top: px2rem(10px);
  /*padding-left: px2rem(80px);*/
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
.item {
  justify-content: space-around;
  /*align-items: center;*/
}
.xiaoliang {
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
.left {
  padding-left: px2rem(58px);
  display: flex;
}
/*.cishu{*/
/*margin-left: px2rem(115px);*/
/*}*/

.money {
  padding-left: px2rem(8px);
}
/*.xia{*/
/*padding-left:px2rem(40px);*/
/*padding-top:px2rem(70px);*/
/*font-weight:600;*/

/*}*/

/*.dianji{*/
/*padding-top:px2rem(5px);*/
/*width:px2rem(100px);*/
/*padding-left:px2rem(100px);*/
/*color: #4C4C4CFF;*/
/*}*/
/*.item .right{*/
/*width:px2rem(100px);*/
/*}*/
</style>

