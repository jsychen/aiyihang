<template>
  <div class="wrap">
    <mt-cell title="洗车帮助" value is-link to="https://mp.weixin.qq.com/s/kZcg3lmpEtATp3nryt60Kg"></mt-cell>
    <mt-cell title="次卡分享帮助" value is-link to="https://mp.weixin.qq.com/s/3hyHH6sWXYbGAnzf9PCM-g"></mt-cell>
    <mt-cell title="洗车券帮助" value is-link to="https://mp.weixin.qq.com/s/bPJRunIdirEwesl1cFoWyQ"></mt-cell>
    <!--<div class="phone" @click="boda"> <mt-cell title="客服中心" value="" is-link><a class="kefu" href="wtai://wp//mc;10086">15871317679</a></mt-cell></div>-->
    <!--</div>-->
    <div class="xia">
      <div class="img"></div>
      <div class="wirte">请拨打客服热线</div>
      <div class="bai">
        <a class="kefu" href="tel:4001175658">400-885-6600</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      data: ''
    }
  },
  methods: {



  },
  created() {
    this.openId = localStorage.getItem('openid')
    if (!this.openId) {
      Toast("未登录,3秒后跳转");
      setTimeout(() => {
        this.$router.replace({ name: 'myindex' })
      }, 3000)
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
  },
}
</script>
<style scoped lang="scss">
@import "../../assets/common.scss";
.wrap {
  height: 100%;
  background: #f5f5f5;
}
.kefu {
  text-decoration: none;
  color: #7a7979;
}
.xia {
  margin-top: 60%;
  text-align: center;
}
.img {
  background: url(../../assets/kefu.png) no-repeat;
  background-size: 100%;
  height: px2rem(36px);
  width: px2rem(36px);
  margin-left: 45%;
}
.wirte {
  font-size: px2rem(14px);
}
.bai {
  width: 100%;
  height: px2rem(30px);
  background: white;
  font-size: px2rem(13px);
  color: #6d6d6d;
  margin-top: px2rem(10px);
  padding-top: px2rem(12px);
}
</style>
