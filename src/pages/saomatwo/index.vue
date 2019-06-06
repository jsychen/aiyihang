<template>
  <div class="wrap">
    <audio preload id="music" src="http://wx1.aiyihang.com/dist/start.mp3"></audio>
    <div class="inner">
      <div class="state">
        <div class="one">√</div>
        <div class="two"></div>
        <div class="tree"></div>
        <div class="four">2</div>
        <div class="five"></div>
        <div class="six"></div>
        <div class="seven">3</div>
      </div>
      <div class="tip-title">确认完成下列操作</div>
      <div class="tip-title-bottom">保障洗车过程车辆安全</div>
      <div class="img-wrap bottom-margin">
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/shousha.png" alt>
            </div>
            <div class="desc-wenzi">拉手刹</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/guadang.png" alt>
            </div>
            <div class="desc-wenzi">挂P档</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/yugua.png" alt>
            </div>
            <div class="desc-wenzi">关雨刮（含感应）</div>
          </div>
        </div>
      </div>
      <div class="img-wrap">
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/tianxian.png" alt>
            </div>
            <div class="desc-wenzi">收天线</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/fanguang.png" alt>
            </div>
            <div class="desc-wenzi">收后视镜</div>
          </div>
        </div>
        <div class="item">
          <div class="desc">
            <div class="img">
              <img src="../../assets/chechuang.png" alt>
            </div>
            <div class="desc-wenzi">关车窗</div>
          </div>
        </div>
      </div>
      <div class="tips">注意事项：洗车过程中禁止移动车辆和上下车</div>
      <div class="xieyi" @click="picChange">
        <img class="onoff" :src="url">我已阅读并同意《服务协议》的相关规定，我已知晓相关风险并自行承担相关责任
      </div>
      <div class="bottom-btn" @click="next">下一步</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      url: '../../dist/select.png'
    }
  },
  methods: {
    next() {
      if (this.url !== '../../dist/select.png') {
        Toast('未勾选服务协议');
        return;
      }
      let that = this
      this.$router.push({        name: 'saomastart', params: {
          id: that.$route.params.id
        }      })
    },
    picChange() {
      if (this.url == "../../dist/nosel.png") {
        this.url = "../../dist/select.png"
      } else {
        this.url = "../../dist/nosel.png"
      }
    }
  },
  mounted() {
    document.getElementById('music').play();
  },
  beforeRouteLeave(to, from, next) {
    document.getElementById('music').pause();
    next()
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/common.scss";
.bottom-margin {
  margin-top: px2rem(10px);
  margin-bottom: px2rem(27px);
}
.onoff {
  height: px2rem(12px);
  display: inline-block;
  margin-right: px2rem(10px);
  width: px2rem(12px);
  border-radius: 50%;
}
.wrap {
  height: 100%;
  background: #f5f5f5;
}
.tip-title {
  font-size: px2rem(16px);
  text-align: center;
}
.xieyi {
  font-size: px2rem(12px);
  color: #cca758;
  margin-top: px2rem(49px);
}
.tip-title-bottom {
  font-size: px2rem(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: px2rem(37px);
}
.inner {
  width: px2rem(355px);
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
  margin: px2rem(20px) auto 0 auto;
}
.state {
  display: flex;
  margin: 0 auto;
  width: px2rem(220px);
  height: px2rem(68px);
  font-size: px2rem(14px);
  justify-content: space-around;
  align-items: center;
}
.one {
  width: px2rem(20px);
  height: px2rem(20px);
  background: #00ce27;
  border-radius: 50%;
  line-height: px2rem(20px);
  text-align: center;
  color: #fff;
}
.two {
  width: px2rem(40px);
  height: px2rem(5px);
  background: #00ce27;
}
.tree {
  width: px2rem(40px);
  height: px2rem(5px);
  background: #D81618;
}
.four {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: px2rem(20px);
  height: px2rem(20px);
  background: #D81618;
}
.five {
  width: px2rem(40px);
  height: px2rem(5px);
  background: #D81618;
}
.six {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(40px);
  height: px2rem(5px);
  background: #d8d8d8;
}
.seven {
  display: flex;
  justify-content: center;
  align-items: center;
  width: px2rem(20px);
  height: px2rem(20px);
  background: #d8d8d8;
  border-radius: 50%;
}
.dingdan-info {
  border: px2rem(1px) solid #e0e0e0;
  border-radius: px2rem(6px);
  padding: 0 px2rem(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(60px);
  background: #fff;
  margin-top: px2rem(17px);
}
.dingdan-info .top {
  font-size: px2rem(15px);
}
.dingdan-info .place {
  font-size: px2rem(13px);
}
.right {
  font-size: px2rem(28px);
}
.type {
  display: flex;
  color: #999;
  align-items: center;
  height: px2rem(55px);
  font-size: px2rem(14px);
}
.img-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: px2rem(12px);
}
.img-wrap .item {
  flex: 1;
}
.img {
  width: px2rem(40px);
  justify-content: center;
  align-items: center;
  display: flex;
  height: px2rem(40px);
  margin: 0 auto;
}
.img img {
  height: 100%;
}
.desc-wenzi {
  text-align: center;
}
.tips {
  border-radius: px2rem(10px);
  display: flex;
  margin: 0 auto;
  margin-top: px2rem(39px);
  width: px2rem(304px);
  justify-content: center;
  align-items: center;
  font-size: px2rem(11px);
  color: #fff;
  height: px2rem(20px);
  background: #D81618;
}
</style>