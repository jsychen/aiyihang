<template>
   <div id="vipLogin">
      <img src="../../assets/images/login_bg.png" alt>
      <div class="inner">
         <select v-model="cardNo" v-if="cardList.length>1">
            <option v-for="(item, index) in cardList" :key="index">{{item.cardNo}}</option>
         </select>
         <input type="text" v-model="cardNo" placeholder="会员卡号（或者开卡预留的手机号）" v-else/>
         <input type="password" placeholder="请输入密码" v-model.trim="password" />
         <div class="subbutton">
            <button class="button" :disabled="!cardNo || !password" @click="handleBind">登录</button>
         </div>
      </div>
      <div class="footer">
         <a href="tel:4008856600">拨打客服电话</a>
         <p>重置密码：<span>400-885-6600</span></p>
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
   >img{
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
   }
   .inner {
      position: absolute;
      left: px2rem(20px);
      right: px2rem(20px);
      top: px2rem(150px);
      padding: px2rem(20px);
      background: #fff;
      border-radius: px2rem(12px);   
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);   
      input, select{
         width: 100%;
         padding: px2rem(5px);
         height: px2rem(50px);
         border-radius: 5px;
         margin-bottom: px2rem(5px);
         background-color:#f1f1f1;
         border: 0;
         padding-left: px2rem(36px);
         background-repeat: no-repeat;
         background-size: px2rem(24px) px2rem(24px);
         background-position: 8px center;
      }
      input[type="text"]{
         background-image: url(../../assets/images/icon_user.png);
      }
      input[type="password"]{
         background-image: url(../../assets/images/icon_psw.png);
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
      background-image: linear-gradient(90deg, #fa5538, #fa3252);
      height: px2rem(50px);
      border-radius: px2rem(25px);
      color: #fff;
      border: 0;
      font-size: px2rem(16px);
   }
   button:disabled{
      filter:alpha(Opacity=80);
      -moz-opacity:0.5;
      opacity: 0.5;
   }
   .footer{
      width: 100%;
      padding: px2rem(20px);
      position: absolute;
      left: 0;
      bottom: 0;
      *{
         font-size: px2rem(14px);
      }
      a{
         width: 100%;
         height: px2rem(50px);
         display: block;
         border: 1px solid #eee;
         text-align: center;
         line-height: px2rem(50px);
         color: #618ab7;
         
         border-radius: px2rem(25px);
         text-decoration: none;
      }
      p{
         margin-top: px2rem(10px);
         text-align: center;
         span{
            color: #f15049;
         }
      }
   }
}
</style>
