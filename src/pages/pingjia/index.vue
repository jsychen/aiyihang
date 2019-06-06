<template>
  <div class="wrap">
    <div class="title">对本次服务进行评价</div>
    <div class="star">
      <i class="icon iconfont icon-start" @click="scoreClick(1)" :class="{ activeone: activeone }"></i>
      <i class="icon iconfont icon-start" @click="scoreClick(2)" :class="{ activetwo: activetwo }"></i>
      <i
        class="icon iconfont icon-start"
        @click="scoreClick(3)"
        :class="{ activetree: activetree }"
      ></i>
      <i
        class="icon iconfont icon-start"
        @click="scoreClick(4)"
        :class="{ activefour: activefour }"
      ></i>
      <i
        class="icon iconfont icon-start"
        @click="scoreClick(5)"
        :class="{ activefive: activefive }"
      ></i>
    </div>
    <div class="rate">{{desc}}</div>
    <div class="form-wrap">
      <div class="tx-wrap">
        <mt-field placeholder="洗的是否干净，速度快吗，停车方便？评价一下吧~" type="textarea" rows="4" v-model="comment"></mt-field>
      </div>
      <!-- <div class="photo">
                <img src="../../assets/upload.png" alt="">
      </div>-->
      <div class="bottom-btn" @click="pinjia">评价</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
//a5a5a5
export default {
  data() {
    return {
      desc: '很满意',
      activeone: false,
      activetwo: false,
      activetree: false,
      activefour: false,
      activefive: false,
      openId: '',
      introduction: '',
      score: 5,
      comment: ''
    }
  },
  methods: {
    scoreClick(val) {
      this.score = val
      switch (val) {
        case 1:
          this.activeone = false
          this.activetwo = true
          this.activetree = true
          this.activefour = true
          this.activefive = true
          this.desc = '失望'
          break;
        case 2:
          this.activeone = false
          this.activetwo = false
          this.activetree = true
          this.activefour = true
          this.activefive = true
          this.desc = '一般'
          break;
        case 3:
          this.activeone = false
          this.activetwo = false
          this.activetree = false
          this.activefour = true
          this.activefive = true
          this.desc = '一般'
          break;
        case 4:
          this.activeone = false
          this.activetwo = false
          this.activetree = false
          this.activefour = false
          this.activefive = true
          this.desc = '满意'
          break;
        case 5:
          this.activeone = false
          this.activetwo = false
          this.activetree = false
          this.activefour = false
          this.activefive = false
          this.desc = '很满意'
          break;
      }
    },
    pinjia() {
      let that = this
      this.$ajax({
        method: 'post',
        url: 'washRecord/comment',
        data: this.$qs.stringify({ comment: that.comment, score: that.score, openId: that.openId, orderId: that.$route.params.id })
      }).then((res) => {
        Toast(res.data.msg);
        that.$router.push({          name: 'qingxiwanbi', params: {
            id: that.$route.params.id
          }        })
      }).catch(err => {

      });
    }
  },
  created() {
    this.openId = localStorage.getItem('openid')
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
.activeone {
  color: #a5a5a5 !important;
}
.activetwo {
  color: #a5a5a5 !important;
}
.activetree {
  color: #a5a5a5 !important;
}
.activefour {
  color: #a5a5a5 !important;
}
.activefive {
  color: #a5a5a5 !important;
}
.wrap {
  background: #f5f5f5;
  padding-top: 1rem;
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
  margin: px2rem(26px) auto 0 auto;
}
.title {
  font-size: px2rem(14px);
  height: px2rem(62px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.star {
  height: px2rem(38px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.rate {
  height: px2rem(33px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2rem(14px);
  padding-bottom: px2rem(36rem);
}
.form-wrap {
  width: 90%;
  margin: 0 auto;
}
.photo {
  height: px2rem(60px);
  width: px2rem(60px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: px2rem(20px);
}
.photo img {
  height: 100%;
}
.icon-start {
  font-size: px2rem(28px);
  color: #cca758;
}
</style>
<style lang="scss">
@import "../../assets/common.scss";
.form-wrap textarea {
  background: #f5f5f5;
}
.is-textarea {
  background: #f5f5f5;
}
.is-textarea {
  background: #f5f5f5;
  border: px2rem(1px) solid #bebdbd !important;
  border-radius: px2rem(8px);
}
</style>


