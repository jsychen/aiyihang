<template>
  <div class="page-loadmore">
    <div
      v-infinite-scroll="getdata2"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="wraps" v-for="item in list" :key="item.id">
        <div class="top-desc">
          <div class="desc-name">{{item.name}}</div>
          <div class="desc-date">
            <div class="left">可洗{{item.washNum-item.washedNum}}次</div>
            <div class="right">有效期：{{item.takeTime | timeparse}}-{{item.expireTime | timeparse}}</div>
          </div>
        </div>
        <div class="logo-bg"></div>
        <div class="chepaihao">
          <div class="text">
            <span class="yima-desc">爱义行，让洗车变得简单快乐！</span>
          </div>
          <div class="class-number">车牌号：{{item.number}}</div>
        </div>
      </div>
    </div>
    <div class="nodata" v-show="info">
      <div style="font-size: 14px; color:#7a7979">还没有兑换记录哦</div>
      <div class="goumai" @click="$router.push('/indexsaoma')">点我兑换</div>
    </div>
  </div>
</template>


<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      nowpage: 1,
      total: 999,
      list: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      //wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
      info: false
    };
  },

  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getdata(val) {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'coupon/listDetailPage',
        data: this.$qs.stringify({ pageNum: 1, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data

        if (val) {
          that.nowpage = 2
          that.list = res.data.data
          that.$refs.loadmore.onTopLoaded();

        } else {
          if (data.length) {
            that.info = false
          }
          else {
            that.info = true
          }
          for (let i = 0; i < data.length; i++) {
            that.list.push(res.data.data[i])
          }
        }
        that.total = res.data.total

      }).catch(err => {

      });
    },
    getdata2() {
      let that = this

      if (this.total === this.list.length) {
        return
      }
      if (!this.openId) {
        return
      }
      this.$ajax({
        method: 'post',
        url: 'coupon/listDetailPage',
        data: this.$qs.stringify({ pageNum: that.nowpage++, pageSize: 10, openId: that.openId })
      }).then((res) => {

        let data = res.data.data
        that.total = res.data.total
        if (data.length) {
          that.info = false
        }
        else {
          that.info = true
        }
        for (let i = 0; i < data.length; i++) {
          if(res.data.data[i].status == 1){
              that.list.push(res.data.data[i])
          }
          console.log(that.list)
        }

      }).catch(err => {

      });
    },
    loadBottom() {
      this.getdata2()
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
      this.getdata('top');
    },

  },
  created() {
    this.openId = localStorage.getItem('openid')
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
    } else {
      // this.getdata()
    }
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
  }
};
</script>


<style scoped lang="scss">
@import "../../assets/common.scss";
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
  background: url(../../assets/topbg.png) no-repeat;
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
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: px2rem(14px);
  color: gray;
}
.wrap {
  background: #f5f5f5;
}
.item-wrap {
  border-bottom: px2rem(1px) solid #e7e7e7;
  height: px2rem(65px);
  padding: 0 px2rem(34px) 0 px2rem(30px);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.place {
  margin-bottom: px2rem(4px);
  font-size: px2rem(14px);
}
.time {
  color: #888;
  font-size: px2rem(12px);
}
/*.right{*/
/*font-size:px2rem(18px);*/
/*}*/
.xia {
  width: 100%;
  height: px2rem(32px);
  overflow: hidden;
}
.wrap {
  padding-top: px2rem(10px);
}
.wraps {
  border-radius: px2rem(6px);
  box-sizing: border-box;
  padding-top: px2rem(16px);
  margin: 0 auto;
  font-size: px2rem(18px);
  color: black;
  width: px2rem(355px);
}
.item {
  justify-content: space-around;
  /*align-items: center;*/
}
.top {
  font-size: px2rem(12px);
  width: px2rem(100px);
}
.item .center {
  flex: 1;
  display: flex;
  font-size: px2rem(12px);
}
.item .right {
  font-weight: bold;
}
.left {
  padding-left: px2rem(15px);
}

.chepaihao {
  color: #4c4c4cff;
  padding-top: px2rem(10px);
  /*padding-left: px2rem(80px);*/
  text-align: center;
  font-size: px2rem(12px);
  background: url(../../assets/bottombg.png) no-repeat;
  background-size: cover;
}
.nodata {
  width: 100%;
  text-align: center;
  display: inline;
  justify-content: center;
  margin-top: px2rem(280px);
  position: absolute;
}
.goumai {
  margin: px2rem(8px) auto;
  width: px2rem(100px);
  height: px2rem(30px);
  line-height: px2rem(30px);
  background: #D81618;
  border-radius: px2rem(8px);
  font-size: px2rem(14px);
}
</style>
