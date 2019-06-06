<template>
  <div class="container">
    <template v-if="info.surplusTimes>0">
      <p>您的会员卡内还剩 <b>{{info.surplusTimes}}</b> 次洗车服务</p>
      <button @click="handlePay">确认支付</button>
    </template>
    <template v-else>
      <p>您的会员卡内已无洗车服务，请选择其他支付方式</p>
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
         params: {},
         info: {}
      };
   },
   mounted: function() {
      this.params = this.$route.params;
      this.params.id = parseInt(this.params.id);
      this.openId = localStorage.getItem('openid');
      this.getDetail();
   },
   methods: {
      // 获取套餐详情
      getDetail: function () {
         this.$ajax.get('erpcard/laborset/account',{
            params:{
               openId: this.openId,
               erpCard: this.params.erpCard,
               boxId: this.params.id
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
            erpCard: this.params.erpCard,
            plateNo: info.carList,
            boxId: this.params.id
         };
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
            washType: this.params.washType,
            boxUid: this.params.id
         };
         
         this.$ajax.get('washRecord/submitWashRecord', {params: data}).then( res => {
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
               fboxUid: this.params.id,
               washType: this.params.washType,
               openId: this.openId
            }
         }).then( res => {
            Indicator.close();
            if(res.data.code === '0000'){
               this.$router.push({name: 'qingxizhong', params: {id: this.params.id}});
               return;
            }
            Toast(res.data.msg);
         })
      }
   }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.container {
  padding: px2rem(50px) px2rem(20px) 0;
  p {
    font-size: px2rem(18px);
    padding: 0;
    margin: 0;
    text-align: center;
    b {
      color: #d81618;
      padding: 0 10px;
      font-size: px2rem(24px);
    }
  }
  button {
    width: 100%;
    height: px2rem(40px);
    background-color: #d81618;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: px2rem(16px);
  }
}
#vipLogin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: px2rem(20px);
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  .inner {
    position: absolute;
    left: px2rem(20px);
    top: px2rem(40px);
    overflow: hidden;
    clear: both;
    img {
      width: px2rem(120px);
      display: block;
      margin: 0 auto px2rem(30px);
    }
    p {
      font-size: px2rem(14px);
      padding: 0;
      margin: 0;
    }
    input {
      width: 100%;
      padding: px2rem(5px);
      height: px2rem(40px);
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: px2rem(5px);
    }
  }
  .subbutton {
    display: flex;
    justify-content: center;
    margin-top: px2rem(30px);
  }
  .button {
    width: 100%;
    background-color: #d81618;
  }
}
</style>