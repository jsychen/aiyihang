<template>
    <div class="wrap">
        <div class="inner">
           <div class="title">退款明细</div>
           <div class="yue">账户余额 50</div>
           <div class="tuikuan">退款金额</div>
           <div class="num">￥50</div>
        </div>
        <div class="bottom-btn">
            确定退款
        </div>
        <footer>客服热线：4001175658</footer>
    </div>
</template>
<script>
export default {
    data(){
        introduction:''
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    footer{
        margin-top:px2rem(60px);
        display: flex;
        justify-content: center;
        align-items: center;
        color:#6d6d6d;
    }
    .wrap{
        font-size:px2rem(14px);
        padding-top:px2rem(20px);
        height:100%;
        background:#f5f5f5;
    }
    .inner{
        width:px2rem(355px);
        margin:0 auto;
        padding-bottom:px2rem(12px);
        background:#fff;
    }
     .bottom-btn{
        display:flex;
        justify-content: center;
        align-items: center;
        width:px2rem(348px);
        background:#cca758;
        font-size:px2rem(15px);
        color:#fff;
        height:px2rem(40px);
        border-radius:px2rem(8px);
        margin:px2rem(35px) auto 0 auto;
    }
    .title{
        display:flex;
       height:px2rem(59px); 
       justify-content: center;
       align-items: center;
    }
    .yue{
        width:px2rem(315px); 
        display:flex;
       height:px2rem(28px); 
       margin:0 auto;
       padding-bottom:px2rem(6px);
       align-items: center; 
       border-bottom:px2rem(1px) solid #e7e7e7;
    }
    .num{
        display:flex;
        margin:0 auto;
        padding-bottom:px2rem(9px);
        align-items: center;
        font-size:px2rem(36px);
        height:px2rem(52px); 
        width:px2rem(315px); 
        border-bottom:px2rem(1px) solid #e7e7e7;
    }
    .tuikuan{
        width:px2rem(315px); 
         display:flex;
        height:px2rem(44px); 
       align-items: center;
       margin:0 auto; 
    }
</style>