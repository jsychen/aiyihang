<template>
  <div class="wrap">
    <div v-if="!data.length" class="no-data">暂无订单</div>
    <div v-if="data.length" class="item-wrap" v-for="item in data" :key="item.amount">
      <div class="left">
        <div class="place">{{item.address}}</div>
        <div class="time">{{item.dtCreate}}</div>
      </div>
      <div class="right">￥{{item.amount}}</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      openid: '',
      data: []
    }
  },
  methods: {
    getdata() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'washRecord/listPage',
        data: this.$qs.stringify({ openId: that.openId })
      }).then((res) => {
        console.log(res)
        that.data = res.data.data
      }).catch(err => {

      });
    }
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
