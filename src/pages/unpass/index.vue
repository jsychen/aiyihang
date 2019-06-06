<template>
    <div class="wrap">
        <div class="inner">
            <img src="../../assets/unpass.png" alt="">
            <p class="unpass">审核未通过</p>
            <p class="again">请重新认证</p>
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
        width:px2rem(68px);
        margin:0 auto;
        height:px2rem(68px);
    }
    p{
        margin:0;
        font-size:px2rem(15px);
        text-align: center;
    }
    .again{
        font-size:px2rem(12px);
        color:#9B9B9B;
    }
    .unpass{
        margin-top:px2rem(3px);
        margin-bottom:px2rem(5px);
        color:#333333;
    }
</style>