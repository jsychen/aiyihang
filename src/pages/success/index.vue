<template>
    <div class="wrap">
        <div class="inner">
            <img src="../../assets/pass.png" alt="">
            <p>审核提交成功</p>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        height:100%;
        background:#f5f5f5;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    img{
        display:block;
        width:px2rem(48px);
        margin:0 auto;
        height:px2rem(50px);
    }
    p{
        margin-top:px2rem(12px);
        font-size:px2rem(15px);
        text-align: center;
        color:#333;
    }
</style>