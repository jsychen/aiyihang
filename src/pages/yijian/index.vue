<template>
  <div class="wrap">
    <div class="inner">
      <mt-field placeholder="请填写您宝贵的建议与反馈（100字以内）" type="textarea" rows="6" v-model="introduction"></mt-field>
    </div>
    <div class="bottom-btn" @click="submit">提交</div>
    <footer>爱义行，让洗车变得简单快乐</footer>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      introduction: '',
      openId: ''
    }
  },
  methods: {

    submit() {
      if (!this.introduction) {
        Toast('请输入您宝贵的意见~');
        return;
      }
      let that = this
      this.$ajax({
        method: 'post',
        url: 'suggest/add',
        data: this.$qs.stringify({ openId: that.openId, content: that.introduction })
      }).then((res) => {
        Toast('提交成功');
        // that.$router.push({ name: 'myindex'})
        that.$router.back(-1)
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
  padding-top: px2rem(15px);
  height: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
}
.inner {
  width: px2rem(347px);
  margin: 0 auto;
}
.bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(348px);
  background: -moz-linear-gradient( top,#FF8586,#D81618);
  background:  -webkit-linear-gradient( top,#FF8586,#D81618);
  background: -o-linear-gradient( top,#FF8586,#D81618);
  background: linear-gradient( top,#FF8586,#D81618);
  font-size: px2rem(15px);
  color: #fff;
  height: px2rem(40px);
  border-radius: px2rem(8px);
  margin: px2rem(35px) auto 0 auto;
}
footer {
  margin-top: px2rem(30px);
  width: 100%;
  height: px2rem(15px);
  font-size: px2rem(13px);
  text-align: center;
  font-weight: 500;
  color: #6d6d6d;
}
</style>
