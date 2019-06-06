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
        <div v-if="list.length" class="item-wrap" v-for="item in list" :key="item.amount">
          <div class="left">
            <div class="place">{{item.address}}</div>
            <div class="time">{{item.dtCreate}}</div>
          </div>
          <div class="right">{{item.amount}}</div>
        </div>
        <div v-if="!onoff">数据已加载完毕...</div>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
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
<script type="text/babel">
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      list: [],
      nowpage: 1,
      openId: '',
      onoff: true,
      total: 0,
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      //wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0
    };
  },
  methods: {
    getdata3() {
      let that = this
      console.log('***********3**************')
      this.$ajax({
        method: 'post',
        url: 'washRecord/listPage',
        data: this.$qs.stringify({ pageNum: 1, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        that.list = data
        that.nowpage = 1
        that.total = res.data.total
        that.$refs.loadmore.onTopLoaded();
      }).catch(err => {

      });
    },
    getdata() {
      let that = this
      console.log('***********1**************')
      this.$ajax({
        method: 'post',
        url: 'washRecord/listPage',
        data: this.$qs.stringify({ pageNum: 1, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
          that.list.push(res.data.data[i])
        }

        that.total = res.data.total
      }).catch(err => {

      });
    },
    getdata2() {
      console.log('***********2**************')
      console.log(this.list.length, this.total)
      if (this.list.length == this.total) {
        if (this.total !== 0) {//this.allLoaded = true;
        }
        return;
      }
      let that = this
      this.$ajax({
        method: 'post',
        url: 'washRecord/listPage',
        data: this.$qs.stringify({ pageNum: that.nowpage, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        that.nowpage++
        for (let i = 0; i < data.length; i++) {
          that.list.push(res.data.data[i])
        }
        //that.$refs.loadmore.onBottomLoaded();
      }).catch(err => {

      });
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1];
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i);
          }
        } else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
      //this.getdata2()
      // setTimeout(() => {
      //   let lastValue = this.list[this.list.length - 1];
      //   if (lastValue < 40) {
      //     for (let i = 1; i <= 10; i++) {
      //       this.list.push(lastValue + i);
      //     }
      //   } else {
      //     this.allLoaded = true;
      //   }
      //   this.$refs.loadmore.onBottomLoaded();
      // }, 1500);
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
      this.getdata3()
    },

  },
  created() {
    this.openId = localStorage.getItem('openid')
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
    }
    this.getdata()
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
<style scoped lang="scss">
@import "../../assets/common.scss";
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
.right {
  font-size: px2rem(18px);
}
</style>