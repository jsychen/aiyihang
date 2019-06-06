<template>
    <div class="wrap">
        <div class="top-wrap">
            <div class="form-group">
                <span class="place">浙A</span>
                <span class="icon iconfont icon-xiala"></span>
                <!-- <mt-field class="number" placeholder="输入车牌号" v-model="username"></mt-field> -->
                <input class="number"  type="text" placeholder="输入车牌号">
            </div>
        </div>
        <div class="bottom-wrap">
            <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
            <mt-field label="验证码" placeholder="请输入验证码" v-model="captcha" class="getcode">
                <span  class="btn-code">获取验证码</span>
            </mt-field>
        </div>
        <div class="submit">
            提交审核
        </div>
        <mt-popup
        class="bottom-select"
        v-model="popupVisible"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
      <footer>爱义行，让洗车变得简单快乐</footer>
    </div>
</template>
<script>
export default {
    methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  },
  data() {
    return {
        phone:'',
        captcha:'',
        popupVisible:false,
        username:'',
      slots: [
        {
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }
      ]
    };
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        background:#f5f5f5;
        height:100%;
    }
    .bottom-select{
        width:100%;
    }
    .top-wrap{
        height:px2rem(130px);
        display:flex;
        justify-content: center;
        align-items: center;
        background:#fff;
        margin-bottom:px2rem(10px);
    }
    .form-group{
        display:flex;
        border:px2rem(1px) solid #e7e7e7;
        width:px2rem(267px);
        box-sizing: border-box;
        align-items: center;
        height:px2rem(50px);
        border-radius:px2rem(8px);
    }
    .number{
        width:px2rem(188px);
        border:none;
        outline: none;
        padding-left:px2rem(11px);
        font-size:px2rem(18px);
        display:flex;
        color:#9b9b9b;
        align-items: center;
        height:99%;
        box-sizing: border-box;
    }
    .icon{
        border-right:px2rem(1px) solid #e7e7e7;
        padding-right:px2rem(10px)
    }
    .place{
        justify-content: center;
        display:flex;
        align-items: center;
        height:px2rem(38px);
        box-sizing: border-box;
        width:px2rem(53px);
        font-size:px2rem(18px);
    }
    .getcode{
        border-bottom:px2rem(1px) solid #dcdcdc;
        border-top:px2rem(1px) solid #dcdcdc;
    }
    .btn-code{
        color:#8a8a8a;
    }
    .bottom-wrap{
       margin:0 px2rem(1px);
    }
    .submit{
        width:px2rem(347px);
        height:px2rem(39px);
        font-size:px2rem(15px);
        background:#ba9a53;
        display:flex;
        justify-content: center;
        align-items: center;
        margin:0 auto;
        border-radius:px2rem(6px);
        color:rgba(225,225,225,.93);
        margin-top:px2rem(20px)
    }
    footer
    {
     margin-top:px2rem(30px);
      width:100%;
      height:px2rem(15px);
      font-size: px2rem(13px);
      text-align: center;
      font-weight: 500;
      color: #6d6d6d;

    }
</style>
<style lang="scss">
    .number input,.bottom-wrap input{
        border:none;
    }
    .bottom-wrap .mint-cell{
        border:none;
    }
    .mint-cell:last-child,.mint-cell-wrapper{
        background-image:none!important;
    }

</style>


