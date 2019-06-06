<template>
   <div id="vipLogin">
      <div class="inner">
         <img class="yubg" src="../../assets/anvator.jpg" alt>
         <p>亲爱的爱义行会员，请输入您的会员卡号、密码</p>
         <select v-model="cardNo" v-if="cardList.length>1">
            <option v-for="(item, index) in cardList" :key="index">{{item.cardNo}}</option>
         </select>
         <input type="text" v-model="cardNo" placeholder="会员卡号（或者开卡预留的手机号）" v-else/>
         <input type="password" placeholder="请输入会员卡密码" v-model.trim="password" />
         <div class="subbutton">
            <mt-button type="danger" class="button" @click="handleBind">登录</mt-button>
         </div>
      </div>

   </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
   data() {
      return {
         cardList: [
         ],
         cardNo: '',
         password: "",
         openId: ''
      };
   },
   mounted: function () {
      this.openId = localStorage.getItem('openid');
      this.params = this.$route.params;
      this.cardNo = localStorage.getItem('vipPhone') || '';
      this.getCardList();
   },
   methods: {
      // 获取会员卡列表
      getCardList: function () {
         this.$ajax.get('erpcard/list',{
            params:{
               openId: this.openId
            }
         }).then( res => {
            if (res.data.code === '0000') {
               this.cardList = res.data;
               return;
            }
            Toast(res.data.msg);
         });
      },
      // 绑定会员卡
      handleBind: function() {
         let phone = this.cardNo;
         let password = this.password;
         if (!phone || !password) {
            Toast("会员卡号或密码不能为空");
            return;
         }
         let data = {
            openId: this.openId,
            password: password
         };
         if (this.testPhone(phone)) {
            data.erpPhone = phone;
         } else {
            data.erpCard = phone;
         }
         localStorage.setItem('vipPhone', data.erpPhone ? data.erpPhone : data.erpCard);
         let params = this.params;
         this.$ajax.get('erpcard/bind/info', {
            params: data
         }).then( res =>{
            let data = res.data;
            if (res.data.code === '0000') {
               this.$router.push({
                  name: "vipOrderDetail",
                  params: { id: params.id, erpCard: data.data.erpCard, washType: params.washType }
               });
               return;
            }
            Toast(res.data.msg);
         }).catch( err => {
            Toast(err.response.data.msg);
         });
      },
      // 手机号校验
      testPhone: function (val) {
         let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
         return reg.test(val);
      }
   }
};
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
*{
   margin: 0;
   padding: 0;
}
input, select {
   outline: none;
}
#vipLogin {
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   * {
      box-sizing: border-box;
   }
   .inner {
      width: 100%;
      position: absolute;
      left: 0;
      top: px2rem(40px);
      padding: px2rem(20px);
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
      input, select{
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
