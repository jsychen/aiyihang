<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :top-method="loadTop"
        @translate-change="translateChange"
        @top-status-change="handleTopChange"
        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <div class="wraps" v-for="item in list" :key="item.id" @click="nextpage(item.orderId)">
          <div class="item">
            <div class="right">
              <div class="desc">{{item.name}}</div>
            </div>
            <div class="center">
              <div class="cishu">
                <div class="top" v-if="item.comboType==1">可洗次数：{{item.washNum-item.washedNum}}</div>
                <div class="top" v-if="item.comboType==2">{{item.effectDays}}天</div>
              </div>
              <div class="left">
                <div>有效期：{{item.dtCreate | timeparse}}-{{item.expireTime | timeparse}}</div>
              </div>
            </div>
          </div>

          <div class="chepaihao">车牌号：{{item.number}}</div>
        </div>

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }"></span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ 'is-rotate': bottomStatus === 'drop' }"
          >↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<style>
.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
}

.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-desc {
  text-align: center;
  color: #666;
  padding-bottom: 5px;
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
  border-bottom: 1px solid #eee;
}

.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}

.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>

<script type="text/babel">
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      nowpage: 1,
      total: 0,
      list: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      translate: 0,
      moveTranslate: 0
    };
  },

  methods: {
    nextpage(id) {
      this.$router.push({ name: 'taocandetail', params: { id } })
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getdata(val) {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'combo/listOrderPage',
        data: this.$qs.stringify({ pageNum: 1, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        if (val) {
          that.nowpage = 2
          that.list = res.data.data
          that.$refs.loadmore.onTopLoaded();
        } else {
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
      if (that.nowpage * 10 === that.total) {
        this.$refs.loadmore.onBottomLoaded()
      }
      if (that.total == 0) {
        this.allLoaded = true
      } else {
        this.allLoaded = false
      }
      this.$ajax({
        method: 'post',
        url: 'combo/listOrderPage',
        data: this.$qs.stringify({ pageNum: that.nowpage++, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
          that.list.push(res.data.data[i])
        }
        that.$refs.loadmore.onBottomLoaded();
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
      this.getdata()
    }

  },

  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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
/*.no-data{*/
/*display:flex;*/
/*justify-content: center;*/
/*align-items: center;*/
/*height:100%;*/
/*font-size:px2rem(14px);*/
/*color:gray;*/
/*}*/
/*.wrap{*/
/*background:#f5f5f5;*/
/*}*/
/*.item-wrap{*/
/*border-bottom:px2rem(1px) solid #e7e7e7;*/
/*height:px2rem(65px);*/
/*padding:0  px2rem(34px) 0 px2rem(30px);*/
/*background:#fff;*/
/*display:flex;*/
/*justify-content: space-between;*/
/*align-items: center;*/
/*}*/

/*.xia{*/
/*width:100%;*/
/*height:px2rem(32px);*/
/*overflow: hidden;*/
/*}*/

.wraps {
  padding-left: px2rem(30px);
  border-radius: px2rem(6px);
  box-sizing: border-box;
  padding-top: px2rem(16px);
  margin: 0 auto;
  margin-bottom: px2rem(10px);
  font-size: px2rem(18px);
  color: black;
  background: url(../../assets/jingkagou2.png) no-repeat;
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
.left {
  padding-left: px2rem(30px);
  display: flex;
}

/*.xia {*/

/*padding-top: px2rem(70px);*/
/*font-weight:600;*/
/*padding-left:px2rem(40px);*/

/*}*/

.chepaihao {
  color: #4c4c4cff;
  padding-top: px2rem(105px);
  /*padding-left: px2rem(80px);*/
  text-align: center;
  font-size: px2rem(12px);
}

/*.dianji{*/
/*width: px2rem(100px);*/
/*font-size: px2rem(13px);*/
/*padding-left:px2rem(120px);*/
/*color: #4C4C4CFF;*/
/*}*/
</style>
