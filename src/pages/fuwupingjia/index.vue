<template>
   <div class="wrap">
      <img class="banner" src="../../assets/images/evaluate-banner.png" alt="">
      <div class="container">
         <img class="car" src="../../assets/images/car.png" alt="">
         <div class="evaluate">
            <p>对本次服务进行评价</p>
            <ul>
               <li :class="{'active': i < current}" v-for="i in 5" @click="scoreClick(i)" :key="i"></li>
            </ul>
            <textarea v-model="comment" rows="5" placeholder="洗的是否干净，速度快吗，停车方便？评价一下吧~"></textarea>
            <button @click="pinjia">提交服务评价</button>
         </div>
      </div>
      <!-- <div class="pin-title">
            对本次服务进行评价
        </div>
       <div class="star">
            <i class="icon iconfont icon-start" @click="scoreClick(1)" :class="{ activeone: activeone }"></i>
            <i class="icon iconfont icon-start" @click="scoreClick(2)" :class="{ activetwo: activetwo }"></i>
            <i class="icon iconfont icon-start" @click="scoreClick(3)" :class="{ activetree: activetree }"></i>
            <i class="icon iconfont icon-start" @click="scoreClick(4)" :class="{ activefour: activefour }"></i>
            <i class="icon iconfont icon-start" @click="scoreClick(5)" :class="{ activefive: activefive }"></i>
        </div> -->
      <!-- <div class="rate">
            {{desc}}
        </div>
        <div class="form-wrap">
            <div class="tx-wrap">
                <mt-field placeholder="洗的是否干净，速度快吗，停车方便？评价一下吧~" type="textarea" rows="6" v-model="comment"></mt-field>
            </div>
            <div class="bottom-btn" @click="pinjia">
                评价
            </div>
        </div> -->
   </div>
</template>
<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      openId: "",
      introduction: "",
      score: 5,
      comment: "",
      current: 6
    };
  },
  methods: {
    scoreClick(val) {
      this.score = val;
      this.current = val + 1;
    },
    pinjia() {
      let that = this;
      this.$ajax({
        method: "post",
        url: "washRecord/comment",
        data: this.$qs.stringify({
          comment: that.comment,
          score: that.score,
          openId: that.openId,
          orderId: that.$route.params.id
        })
      }).then(res => {
          Toast(res.data.msg);
          // that.$router.push({
          //   name: "qingxiwanbi",
          //   params: {
          //     id: that.$route.params.id
          //   }
          // });
        }).catch(err => {});
    },
    next() {
      this.$router.push({
        name: "pingjia",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },
  mounted() {
    this.openId = localStorage.getItem("openid");
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrap {
  height: 100%;
  padding-bottom: px2rem(10px);
  background-image: url(../../assets/images/evaluate-bg.png);
  background-size: cover;
  padding-top: px2rem(20px);
  overflow: hidden;
}
.banner {
  width: px2rem(240px);
  display: block;
  margin: 0 auto;
}
.container {
  width: px2rem(300px);
  min-height: px2rem(200px);
  border-radius: px2rem(20px);
  background: #fff;
  padding: px2rem(20px);
  margin: px2rem(20px) auto;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 90%;
    height: px2rem(50px);
    left: 5%;
    bottom: px2rem(-15px);
    background: rgba(255, 255, 255, 0.3);
    border-radius: px2rem(20px);
    z-index: 1;
  }
  &::after {
    position: absolute;
    content: "";
    width: 80%;
    height: px2rem(50px);
    left: 10%;
    bottom: px2rem(-25px);
    background: rgba(255, 255, 255, 0.3);
    border-radius: px2rem(20px);
    z-index: 1;
  }
  .car {
    display: block;
    width: px2rem(260px);
    margin: 0 auto;
  }
}
.evaluate {
  border-top: 1px dashed #3b95ff;
  margin-top: px2rem(20px);
  position: relative;
  z-index: 2;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: px2rem(20px);
    height: px2rem(20px);
    border-radius: 50%;
    background: #041357;
    top: px2rem(-10px);
  }
  &::before {
    left: px2rem(-30px);
  }
  &::after {
    right: px2rem(-30px);
  }
  p {
    font-size: px2rem(14px);
    text-align: center;
    color: #999;
    margin: px2rem(10px) 0;
  }
  ul {
    overflow: hidden;
    clear: both;
    list-style: none;
    width: px2rem(200px);
    margin: 0 auto;
    li {
      width: px2rem(30px);
      height: px2rem(30px);
      margin: 0 px2rem(5px);
      float: left;
      background-image: url(../../assets/images/star.png);
      background-size: cover;
      &.active {
        background-image: url(../../assets/images/star-active.png);
      }
    }
  }
  textarea {
    width: 100%;
    padding: px2rem(5px);
    border: 1px solid #e9e9e9;
    border-radius: px2rem(5px);
    color: #999;
    margin-top: px2rem(10px);
  }
  button {
    width: 100%;
    height: px2rem(40px);
    color: #fff;
    background: #0c2aab;
    font-size: px2rem(16px);
    box-shadow: 0 px2rem(5px) px2rem(5px) #0c2aab;
    border: 0;
    border-radius: px2rem(5px);
  }
}
</style>
