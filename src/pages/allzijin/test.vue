<template>
  <div class="wrap">
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
        <div class="item" v-for="item in datalist" :key="item.amount">
          <div class="left">
            <div class="desc-chongzhi">{{item.type==1?'充值':'洗车'}}</div>
            <div class="time">{{item.dtCreate}}</div>
          </div>
          <div class="right">{{item.type==1?'+':'-'}}{{item.amount}}</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="item" v-for="item in datalist" :key="item.amount">
          <div class="left">
            <div class="desc-chongzhi">{{item.type==1?'充值':'洗车'}}</div>
            <div class="time">{{item.dtCreate}}</div>
          </div>
          <div class="right">{{item.type==1?'+':'-'}}{{item.amount}}</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div class="item" v-for="item in datalist" :key="item.amount">
          <div class="left">
            <div class="desc-chongzhi">{{item.type==1?'充值':'洗车'}}</div>
            <div class="time">{{item.dtCreate}}</div>
          </div>
          <div class="right">{{item.type==1?'+':'-'}}{{item.amount}}</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      yue: '',
      datalist: [],
      selected: '3',
      openid: ''
    };
  },
  watch: {
    selected(newName, oldName) {
      this.getData()
    }
  },
  methods: {
    getinfo() {
      let that = this
      this.$ajax.get('member/getInfo', {
        params: {
          openId: that.openid
        }
      }).then((res) => {
        that.yue = res.data.data.balance
      });
    },
    getData() {
      let that = this
      let data = { openId: that.openid, pageNum: 1, pageSize: 10 }
      if (that.selected != 3) {
        data.type = that.selected
      }
      this.$ajax({
        method: 'post',
        url: 'capitalFlow/listPage',
        data: this.$qs.stringify(data)
      }).then((res) => {
        that.datalist = res.data.data
      }).catch((err) => {
        let data = err.response.data
        switch (data.code) {
          case '4001':
            Toast(data.msg);
            break;
        }
      });
    }
  },
  created() {
    this.openid = localStorage.getItem('openid')
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
    }
    this.getinfo()
    this.getData()
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



