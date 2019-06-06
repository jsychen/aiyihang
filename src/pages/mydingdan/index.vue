<template>
  <div class="page-loadmore">
    <div
      v-infinite-scroll="getdata2"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    ></div>
    <div v-if="list.length>0">
      <div class="item-wrap" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div class="place">{{item.boxName}}</div>
          <div class="time">{{item.dtCreate}}</div>
        </div>
        <div class="right">{{item.amount}}</div>
      </div>
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
      total: 999,
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

  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getdata2() {
      if (!this.openId) {
        return
      }
      if (this.total === this.list.length) {
        return
      }
      let that = this
      this.$ajax({
        method: 'post',
        url: 'washRecord/listPage',
        data: this.$qs.stringify({ pageNum: that.nowpage++, pageSize: 10, openId: that.openId })
      }).then((res) => {
        let data = res.data.data
        that.total = res.data.total
        for (let i = 0; i < data.length; i++) {
          that.list.push(res.data.data[i])
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
      //this.getdata()
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