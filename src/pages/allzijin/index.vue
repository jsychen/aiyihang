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
        <div class="desc">
          <div class="huiyuan">
            <div class="left">会员余额</div>
          </div>
          <div class="num">
            <div class="left">{{yue}}</div>
          </div>
        </div>
        <mt-navbar class="tab-wrap" v-model="selected">
          <mt-tab-item id="3">所有</mt-tab-item>
          <mt-tab-item id="2">服务支出</mt-tab-item>
          <mt-tab-item id="1">充值转入</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="3">
            <div class="item" v-for="(item,index) in list" :key="index">
              <div class="left">
                <div class="desc-chongzhi">{{item.type==1?'充值':'洗车'}}</div>
                <div class="time">{{item.dtCreate}}</div>
              </div>
              <div class="right">{{item.type==1?'+':'-'}}{{item.amount}}</div>
            </div>
            <div v-if="list.length==0" class="none">暂无记录</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="item" v-for="(item,index) in list" :key="index">
              <div class="left">
                <div class="desc-chongzhi">{{item.type==1?'充值':'洗车'}}</div>
                <div class="time">{{item.dtCreate}}</div>
              </div>
              <div class="right">{{item.type==1?'+':'-'}}{{item.amount}}</div>
            </div>
            <div v-if="list.length==0" class="none">暂无记录</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <div class="item" v-for="(item,index) in list" :key="index">
              <div class="left">
                <div class="desc-chongzhi">{{item.type==1?'充值':'洗车'}}</div>
                <div class="time">{{item.dtCreate}}</div>
              </div>
              <div class="right">{{item.type==1?'+':'-'}}{{item.amount}}</div>
            </div>
            <div v-if="list.length==0" class="none">暂无记录</div>
          </mt-tab-container-item>
        </mt-tab-container>
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
      yue: '',
      selected: '3',
      openId: '',
      nowpage: 2,
      total: 0,
      list: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      //wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0
    };
  },
  watch: {
    selected(newName, oldName) {
      this.nowpage = 2
      this.getData('new')
    }
  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getData(val) {
      let that = this
      let data = { openId: that.openId, pageNum: 1, pageSize: 10 }
      if (that.selected != 3) {
        data.type = that.selected
      }
      this.$ajax({
        method: 'post',
        url: 'capitalFlow/listPage',
        data: this.$qs.stringify(data)
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
      }).catch((err) => {
        let data = err.response.data
        switch (data.code) {
          case '4001':
            Toast(data.msg);
            break;
        }
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
        url: 'capitalFlow/listPage',
        data: this.$qs.stringify({ pageNum: that.nowpage++, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
          that.list.push(res.data.data[i])
        }
        that.$refs.loadmore.onBottomLoaded();
        that.total = res.data.total
      }).catch(err => {

      });
    },
    getinfo() {
      let that = this
      this.$ajax.get('member/getInfo', {
        params: {
          openId: that.openId
        }
      }).then((res) => {
        that.yue = res.data.data.balance
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
      this.getData('top');
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
      this.getinfo()
      this.getData()
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
.wrap {
  background: #f5f5f5;
  height: 100%;
}
.bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(348px);
  background: #cca758;
  font-size: px2rem(15px);
  color: #fff;
  height: px2rem(40px);
  border-radius: px2rem(8px);
  margin: px2rem(20px) auto 0 auto;
}
.desc {
  box-sizing: border-box;
  padding: px2rem(26px) px2rem(14px) 0 px2rem(14px);
  height: px2rem(148px);
  background: #e1be70 url(../../assets/yuebg.png) no-repeat;
  background-size: contain;
}
.num {
  padding-top: px2rem(13px);
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: px2rem(36px);
}
.num .right,
.huiyuan .right {
  font-size: px2rem(12px);
}
.num .right {
  border: px2rem(1px) solid #fff;
  display: flex;
  align-items: center;
  height: px2rem(20px);
  border-radius: px2rem(8px);
  width: px2rem(69px);
  justify-content: center;
}
.huiyuan .right {
  display: flex;
  align-items: center;
  height: px2rem(20px);
  border-radius: px2rem(8px);
  width: px2rem(69px);
  justify-content: center;
  border: px2rem(1px) solid #fff;
}
.desc-content {
  color: #fff;
  font-size: px2rem(13px);
  display: flex;
  align-items: center;
}
.huiyuan .left {
  height: px2rem(21px);
}
.huiyuan {
  color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: px2rem(14px);
}
.desc-content {
  padding-top: px2rem(8px);
}
.title {
  display: flex;
  padding-left: px2rem(14px);
  align-items: center;
  height: px2rem(37px);
  font-size: px2rem(13px);
}
.jine-wrap {
  background: #f0f0f0;
  border-radius: px2rem(6px);
}
.bottom-wrap {
  background: #fff;
  padding: 0 px2rem(14px);
}
.mint-cell:last-child {
  background: none;
}
.mint-cell-wrapper {
  background: none;
}
.btn-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(14px);
  height: px2rem(74px);
  background: #fff;
}
.btn-group div {
  display: flex;
  color: #979797;
  border-radius: px2rem(6px);
  border: px2rem(1px) solid #979797;
  width: px2rem(108px);
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(14px);
  height: px2rem(40px);
  background: #fff;
}
.type {
  display: flex;
  height: px2rem(38px);
  align-items: center;
  font-size: px2rem(14px);
  padding: 0 px2rem(14px);
}
.zhifu {
  font-size: px2rem(9px);
  height: px2rem(46px);
  background: #fff;
}
.item {
  align-items: center;
  padding: 0 px2rem(15px) 0 px2rem(12px);
  margin-bottom: px2rem(1px);
  display: flex;
  justify-content: space-between;
  font-size: px2rem(9px);
  background: #fff;
  height: px2rem(67px);
}
.none {
  text-align: center;
  padding: 20px 0;
  font-size: px2rem(18px);
}
.tab-wrap {
  margin-bottom: px2rem(8px);
}
.desc-chongzhi {
  font-size: px2rem(14px);
  margin-bottom: px2rem(9px);
}
.time {
  font-size: px2rem(11px);
  color: #999;
}
.right {
  font-size: px2rem(18px);
}
</style>
<style>
.jine-wrap input {
  background: #f0f0f0;
}
</style>