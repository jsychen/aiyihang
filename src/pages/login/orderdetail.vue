<template>
<div id="box">
    <div class="wrap">
        <label>钻石VIP：</label>
        <span>可洗5次</span>
    </div>
    <div class="input">
        <label>车牌号:</label>
        <input type="text" placeholder="请输入车牌号，如:粤QQ1234"/>
    </div>
    <span class="note">注：如果绑定多个车牌号，请用逗号分割</span>
    <div class="text">
        <span>次卡</span>
        <span>有效时间30天</span>
        <span>一卡多车</span>
    </div>
    <mt-button type="danger" class="button" @click="submit">提交订单</mt-button>
</div>

</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        submit(){
            let that = this
            this.$ajax({
               method: 'get',
               url: '/box/start',
               data:{
                  fboxUid:that.$route.params.id,
                  washType:''
               }
            }).then((res) => {
               console.log(res)
               // 获取的sessionid
               // localStorage.setItem('sessionId',res.data.data)
               // localStorage.setItem('openid',res.data.data)
            
            }).catch(err => {
               

            });
        }
    },
}
</script>
<style lang="scss" scoped>
@import "../../assets/common.scss";
#box{
    width:100%;
    height:100%;
    background-color:#F5F5F5;
    .wrap{
        height:px2rem(45px);
        background:#fff;
        padding-left:px2rem(12px);
        margin-bottom:px2rem(10px);
        display:flex;
        align-items: center;
        border-bottom:1px solid #E0E0E0;
        label{
            color:#333;
            font-size:px2rem(16px);
        }
        span{
            color:#FF394C;
            font-size:px2rem(16px);
        }
    }
    .input{
        height:px2rem(45px);
        background:#fff;
        padding-left:px2rem(12px);
        display:flex;
        align-items: center;
        label{
            color:#333;
            font-size:px2rem(16px);
        }
        input{
            color:#999999;
            font-size:px2rem(16px);
            border:none;
            width:px2rem(250px);
            outline:none;
            
        }
    }
    .note{
        font-size:px2rem(12px);
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,57,76,1);
        line-height:px2rem(20px);
        display:block;
        margin-left:px2rem(12px);
        height:px2rem(20px);
    }
    .text{
        height:px2rem(99px);
        background:#fff;
        display:flex;
        flex-direction:column;
        justify-content:center;
        span{
            display:block;
            color:#FF394C;
            font-size:px2rem(18px);
            margin-left:px2rem(12px);
        }
    }
}
.button{
    position:fixed;
    bottom:0px;
    background:#DB1E30;
    height:px2rem(49px);
    width:100%;
}
</style>