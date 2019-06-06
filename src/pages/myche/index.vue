<template>
  <div class="wrap">
    <div
      v-infinite-scroll="getData"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div v-show="onoff">
        <div class="item-wrap" v-for="item in carlist" :key="item.id" @click="detail(item)">
          <div class="info">
            <div class="top">{{item.number}}</div>
            <div class="bottom">{{item.type}}</div>
          </div>
          <div class="del-wrap">
            <div class="btn">
              <div>{{item.classify==1?'普桥型':'SUV'}}</div>
            </div>
            <div class="del" @click.stop="del(item.id)">删除</div>
          </div>
        </div>
        <div class="add-btn" @click="next">添加车型</div>
      </div>
    </div>

    <div v-show="!onoff" class="nocar">
      <img class="mycarlist" src="../../assets/mycarlist.png" alt>
      <div class="desc">还没有添加车辆哦</div>
      <div class="add-btn" @click="next">添加车型</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      onoff: false,
      nowpage: 1,
      openId: '',
      carlist: [],
      total: 999
    }
  },
  methods: {
    detail(item) {
      if (!item.type) {
        localStorage.setItem('bigname', '')
        localStorage.setItem('chepai', item.number)
        localStorage.setItem('cheid', item.id)
        this.$router.push({ name: 'pleacexuanze' }) // -> /user
      }
    },
    del(id) {
      let that = this
      MessageBox.confirm('确定删除？').then(action => {
        if (action === 'confirm') {

          this.$ajax.get('car/del', {
            params: { openId: that.openId, id }
          }).then((res) => {
            location.reload()
          }).catch(err => {

          });;
        } else {

        }
      })
    },
    next() {
      console.log('1111')
      localStorage.setItem('bigname', '')
      localStorage.setItem('chepai', '')
      localStorage.setItem('cheid', '')
      this.$router.push({ name: 'pleacexuanze',params:{id:11} }) // -> /user
    },
    getData() {
      if (!this.openId) {
        return
      }
      if (this.total === this.carlist.length) {
        return
      }
      let that = this
      this.$ajax.get('car/listPage', {
        params: { openId: that.openId, pageNum: that.nowpage++, pageSize: 10 }
      }).then((res) => {
        console.log(res)
        let data = res.data.data
        that.total = res.data.total
        if (data.length) {
          that.onoff = true
        } else {
          that.onoff = false
        }
        for (let i = 0; i < data.length; i++) {
          that.carlist.push(data[i])
        }
      }).catch(err => {

      });;
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
      //this.getData();
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
.desc {
  color: #999;
  font-size: px2rem(17px);
  margin-top: px2rem(44px);
  text-align: center;
}
.mycarlist {
  width: px2rem(112px);
  height: px2rem(96px);
  display: block;
  margin: 0 auto;
  padding-top: px2rem(115px);
}
.nocar {
  height: 100%;
}
.wrap {
  height: 100%;
  background: #f5f5f5;
}
.img-wrap {
  width: px2rem(46px);
  border: none;
}
img {
  width: 100%;
}
.info {
  width: px2rem(237px);
  padding-left: px2rem(18px);
}
.item-wrap {
  border-top: px2rem(1px) solid #e7e7e7;
  border-bottom: px2rem(1px) solid #e7e7e7;
  padding: px2rem(18px) px2rem(20px) 0 px2rem(24px);
  display: flex;
  height: px2rem(84px);
  background: #fff;
  margin-bottom: px2rem(8px);
}
.top {
  font-size: px2rem(15px);
}
.bottom {
  margin-top: px2rem(14px);
  color: #9c9c9c;
  font-size: px2rem(12px);
}
.del {
  display: flex;
  margin-top: px2rem(20px);
  border-radius: px2rem(5px);
  justify-content: center;
  align-items: center;
  color: #005FDE;
  width: px2rem(48px);
  height: px2rem(18px);
  font-size: px2rem(11px);
  border: px2rem(1px) solid #005FDE;
}
.btn {
  display: flex;
  border-radius: px2rem(5px);
  justify-content: center;
  align-items: center;
  color: #D81618;
  width: px2rem(48px);
  height: px2rem(18px);
  font-size: px2rem(11px);
  border: px2rem(1px) solid #D81618;
}
.add-btn {
  display: flex;
  border: px2rem(1px) solid #e7e7e7;
  justify-content: center;
  align-items: center;
  border-radius: px2rem(5px);
  margin: px2rem(25px) auto 0 auto;
  width: px2rem(170px);
  height: px2rem(38px);
  font-size: px2rem(15px);
  background: #fff;
}
</style>
