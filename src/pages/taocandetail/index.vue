<template>
    <div class="wrap">
        <mt-cell title="会员卡" :value="orderinfo.name"></mt-cell>
        <mt-cell title="洗车类型" :value="orderinfo.washTypeName"></mt-cell>
        <mt-cell title="购买日期" :value="orderinfo.dtCreate"></mt-cell>
        <mt-cell title="到期时间" :value="orderinfo.expireTime"></mt-cell>

      <div class="left"> 车牌号:{{orderinfo.number}}</div>

        <img class="erweima" v-if="url" :src="url+orderinfo.shareImg" alt="">
      <div class="but-cil">
        <mt-button type="danger" @click="InsertClick">添加车牌</mt-button>
        <mt-button type="danger" @click="DeleteClick">删除车牌</mt-button>
      </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            url:'',
            orderId:'',
            orderinfo:{},
            appids:'',
            number:'',
            openId:''
        }
    },
    methods:{
        getdata(){
            let that=this
            this.$ajax({
                method: 'post',
                url:'combo/getComboOrder',
                data:this.$qs.stringify({orderId:that.orderId})
            }).then((res)=>{
              console.log(res)
                that.orderinfo=res.data.data
            }).catch(err=>{

            });
        },
      InsertClick(){
        MessageBox.prompt('请输入要添加的车牌号').then(({ value,action })=>{
          if(value) {
               let that=this
              this.$ajax({
                 method:'post',
                 url:'combo/addNumberToComboOrder',
                data:this.$qs.stringify({orderId:that.orderId,number:value.toUpperCase(),openId:that.openId})
              }).then((res)=>{
                console.log(res)

                MessageBox.alert(`你添加的车牌号是${value}`,'添加成功');
                this.getdata()

              }).catch(err=>{
                Toast(err.response.data.msg)
              });
          }
          else {
            MessageBox.alert('请输入要添加的车牌号');
          }

        });

      },//添加
      DeleteClick(){
        MessageBox.prompt('请输入要删除的车牌号').then(({ value,action })=>{

              if(value) {
              let that=this
              this.$ajax({
              method:'post',
              url:'combo/delComboOrderNumber',
              data:this.$qs.stringify({orderId:that.orderId,number:value.toUpperCase(),openId:that.openId})
            }).then((res)=>{
              MessageBox.alert(`你删除的车牌号是${value}`,'删除成功');
              this.getdata()
            }).catch(err=>{
              Toast(err.response.data.msg)
            });
              }
          else {
            MessageBox.alert('请输入要删除的车牌号');
          }

        });
      }//删除
    },
    created(){
        this.url=this.erweima
        this.orderId=this.$route.params.id
        this.openId=localStorage.getItem('openid')
        this.getdata()

    },
    mounted(){
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
    }
}
</script>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .erweima{
        display:block;
        margin:0 auto;
        margin-top:px2rem(60px);
    }
    .code{
        height:px2rem(26px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .duihuanma{
        margin-top:px2rem(8px);
    }
    .wrap{
        height:100%;
        background:#f5f5f5;

    }
    .inner{
        height:px2rem(427px);
        font-size:px2rem(14px);
        background:#fff;
    }
    .but-cil{
      padding-left:px2rem(85px);
      padding-top:px2rem(40px);


    }
    .left{
      word-break: break-all;
      font-size:px2rem(17px);
      padding-left:px2rem(9px);
      background: white;
      padding-right:px2rem(8px) ;



    }

    .desc{
        width:px2rem(349px);
        margin:0 auto;
        padding-top:px2rem(25px);
        padding-bottom:px2rem(23px);
    }

    input{
        display:block;
        width:px2rem(347px);
        margin:0 auto;
        height:px2rem(40px);
        border:px2rem(1px) solid #e7e7e7;
        outline: none;
        margin:0 auto;
        padding:0;
        font-size:px2rem(14px);
        padding-left:px2rem(12px);
    }
    .btn{
        height:px2rem(39px);
        background:#cca859;
        width:px2rem(347px);
        margin:0 auto;
        border-radius: px2rem(4px);
        color:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:px2rem(15px);
        margin-top:px2rem(24px);
    }
    .line{
        border-top:px2rem(1px) solid #e7e7e7;
        width:px2rem(350px);
        margin:0 auto;
        margin-top:px2rem(16px);
        margin-bottom:px2rem(20px);
    }
    .title{
        line-height:px2rem(22px);
        width:px2rem(336px);
        margin:0 auto;
    }
    .item{
        width:px2rem(336px);
        margin:0 auto;
        line-height:px2rem(20px);
    }
</style>
