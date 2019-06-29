<template>
  <div class="container">
     <div class="card">
        <p>卡内剩余</p>
        <b>{{info.surplusTimes || 0}} 次</b>
        <p>洗车服务</p>
     </div>
    <template v-if="info.surplusTimes>0">
      <button :class="{'active': active}" @click="handlePay" @touchstart="touchStart" @touchend="touchEnd">确认支付</button>
    </template>
    <template v-else>
      <router-link tag="button" :to="{'name': 'saomastart', 'params': {id: params.id}}">选择其它支付方式</router-link>
    </template>
  </div>
</template>
<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
   data: function() {
      return {
         orderId: 0,
         query: {},
         info: {},
         active: false
      };
   },
   mounted: function() {
      this.query = this.$route.query;
      this.query.id = parseInt(this.query.id);
      this.openId = localStorage.getItem('openid');
      this.getDetail();
   },
   methods: {
      // 获取套餐详情
      getDetail: function () {
         this.$ajax.get('erpcard/laborset/account',{
            params:{
               openId: this.openId,
               erpCard: this.query.erpCard,
               boxId: this.query.id
            }
         }).then( res => {
            let data = res.data;
            if (res.data.code === '0000') {
               this.info = data.data.laborsetAccount;
               return;
            }
            Toast(res.data.msg);
         });
      },
      // 确认支付
      handlePay: function () {
         let info = this.info;
         if(!info.carList) return;
         let data = {
            openId: this.openId,
            subAccountId: info.id, 
            laborsetId: info.laborsetId,  
            laborId: info.laborId,
            erpCard: this.query.erpCard,
            plateNo: info.carList,
            boxId: this.query.id
         };
         Indicator.open('正在连接洗车机...');
         this.$ajax.post('erpcard/submitFastSettleBill', data).then( res => {
            if(res.data.code === '0000'){
               this.addOrderRecord();
               return;
            }
            Toast(res.data.msg);
         })
      },
      // 生成订单
      addOrderRecord: function () {
         let info = this.info;
         if(!info.carList) return;
         let data = {
            openId: this.openId,
            payType: 8,
            washType: this.query.washType,
            boxUid: this.query.id
         };
         this.$ajax.get('washRecord/submitWashRecord', {params: data}).then( res => {
            Indicator.close();
            if(res.data.code === '0000'){
               this.handleStart();
               return;
            }
            Toast(res.data.msg);
         })
      },
      
      // 启动洗车机
      handleStart: function () {
         Indicator.open('洗车机启动中...');
         this.$ajax.get('box/start', {
            params: {
               fboxUid: this.query.id,
               washType: this.query.washType,
               openId: this.openId
            }
         }).then( res => {
            Indicator.close();
            if(res.data.code === '0000'){
               this.$router.push({name: 'qingxizhong', params: {id: this.query.id}});
               return;
            }
            Toast(res.data.msg);
         })
      },
      // 按钮按下
      touchStart: function () {
         this.active = true;
      },
      // 按钮松开
      touchEnd: function () {
         this.active = false;
      }
   }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
*{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}
.container {
  .card{
     width: px2rem(360px);
     height: px2rem(195px);
     margin: px2rem(20px) auto;
     padding-left: px2rem(100px);
     padding-top: px2rem(50px);
     background-image:url(../../assets/images/card_bg.png);
     background-size: cover;
     overflow: hidden;
     clear: both;
     *{
        line-height: px2rem(30px);
        width: 100%;
        float: left;
     }
     p{
        font-size:px2rem(14px);
        color: #917548;
     }
     b{
        font-size: px2rem(24px);
        color: #594222;
        margin: px2rem(10px) 0;
     }
  }
  
  button {
    width: px2rem(330px) !important;
    height: px2rem(50px);
    border: 1px solid #df4242;
    border-radius: 5px;
    color: #df4242;
    font-size: px2rem(18px);
    border-radius: px2rem(25px);
    background:#fff;
    padding: 0;
    display: block;
    margin: px2rem(60px) auto 0;
    letter-spacing: 2px;
    &:active{
      background: #d81618;
      color: #fff;
   }
  }
}
</style>