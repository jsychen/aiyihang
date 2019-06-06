<template>
    <div class="wrap">
        <div class="item-wrap">
            <div class="image-wrap left">

            </div>
            <div class="right">
                <div class="price">5</div>
                <div class="desc">满99元可使用</div>
                <div class="time">有效期至2018.09.30</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        height:100%;
        background:#f5f5f5;
    }
    .item-wrap{
        box-sizing: border-box;
        padding:px2rem(17px) px2rem(62px) px2rem(16px) px2rem(52px);
        width:px2rem(335px);
        height:px2rem(120px);
        background:#fbb782;
        margin:0 auto;
    }
    .image-wrap{
        width:px2rem(87px);
        height:px2rem(87px);
        background:red;
    }
    .price{
        font-size:px2rem(44px);
        color:#fff;
    }
    .desc{
        font-size:px2rem(14px);
        color:#fff;
    }
    .time{
        font-size:px2rem(8px);
        color:#fff;
    }
</style>

