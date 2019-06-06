<template>
    <div class="wrap">
        <div class="banner">

        </div>
        <div class="item-wrap">
            <div class="item">
                <div class="img-wrap"></div>
                <div class="title">免费停车</div>
                <div class="desc">不限时长</div>
            </div>
            <div class="item">
                <div class="img-wrap"></div>
                <div class="title">免费停车</div>
                <div class="desc">闸道自动开启</div>
            </div>
            <div class="item">
                <div class="img-wrap"></div>
                <div class="title">免费停车</div>
                <div class="desc">无人智能洗车</div>
            </div>
        </div>
        <mt-cell title="标题文字">
            <img slot="icon" src="" width="24" height="24">
        </mt-cell>
        <div class="gaide gaide-border">
            园区内指引
        </div>
        <div class="gray-bg">

        </div>
        <div class="gaide">
            XXXXXXXXXXXXXXX
        </div>
        <div class="tips">
            <div class="tip-title">温馨提示</div>
            <div class="item-content">111111111111111111111111111</div>
            <div class="item-content">111111111111111111111111111</div>
        </div>
        <div class="bottom">
            <div class="bottom-desc">
                <div class="top">3分钟</div>
                <div>快速自动洗车</div>
            </div>
            <div class="bottom-desc">
                <div class="top">10元钱</div>
                <div>超级便宜</div>
            </div>
            <div class="bottom-desc">
                <div class="top">极干净</div>
                <div>全车自动风干</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            introduction:''
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        padding-top:px2rem(15px);
        height:100%;
    }
    .banner{
        height:px2rem(220px);
        background:#d8d8d8;
    }
    .gaide-border{
       border-top:solid #e7e7e7 px2rem(10px)
    }
    .item-wrap{
        display:flex;
        justify-content: space-around;
        align-items: center;
        height:px2rem(150px);
        background:#fff;
        font-size:px2rem(14px);
        margin-bottom:px2rem(1px);
    }
    .img-wrap{
        width:px2rem(52px);
        height:px2rem(52px);
        background:red;
        margin:0 auto;
    }
    .item{
        position:relative;
        flex:1;
    }
    .desc{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:px2rem(12px);
        color:#9c9c9c;
    }
    .title{
        height:px2rem(32px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .gaide{
        height:px2rem(48px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:px2rem(14px);
        background:#fff;
    }
    .gray-bg{
        height:px2rem(250px);
        background:#d8d8d8;
    }
    .tips{
        padding-top:px2rem(10px);
        padding-bottom:px2rem(13px);
        padding-left:px2rem(15px);
        height:px2rem(104px);
        font-size:px2rem(12px);
        background:#fff;
        border-top:solid #e7e7e7 px2rem(1px)
    }
    .item-content{
        display: flex;
        align-items: center;
        height:px2rem(17px);
    }
    .tip-title{
        font-size:px2rem(14px);
        display: flex;
        align-items: center;
        height:px2rem(34px);
    }
    .bottom{
        text-align:center;
        height:px2rem(75px);
        background:#f6f6f6;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size:px2rem(14px);
        color:#a3a3a3;
    }
    .bottom .top{
        margin:px2rem(8px) 0;
    }
</style>