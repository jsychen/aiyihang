<template>
    <div class="wrap">
        <div class="mianban">
            <div class="img">
                <img src="../../assets/myyaoqing.png" alt="">
            </div>
            <div class="info"><span class="color-red">智能洗车</span>已成功邀请<span class="color-red">20</span>位好友</div>
            <div class="desc">请继续加油哦~</div>
            <div class="getuser">再邀请<span class="color-red">XX</span>位好友，即可获得XXXXXX</div>
        </div>
        <div class="ruler">
            <div class="title">
                <div class="left"></div>
                <div class="center">
                    邀请规则
                </div>
                <div class="right"></div>
            </div>
            <div class="content">
                <div class="item">1.每成功邀请1人可以XXXXXXXX</div>
                <div class="item">2.每成功邀请5人可以XXXXXXXX</div>
                <div class="item">3.每成功邀请30人可以XXXXXXXXX请30人可XXXXXXXXXXX请30人可XXXXXXXXXXXXXX请30人可XXXXXXXXXXXX</div>
                <div class="item">4.每成功邀请60人可以XXXXXXXX</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .item{
        line-height:px2rem(24px);
        padding-left:px2rem(15px);
        color:#fff;
    }
    .ruler{
        background:#f5da8f;
        width:px2rem(327px);
        margin:0 auto;
        margin-top:px2rem(20px);
        padding:px2rem(10px) 0;
    }
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        height:px2rem(28px);
    }
    .center{
        width:px2rem(68px);
        text-align:center;
    }
    .left,.right{
        height:px2rem(12px);
        width:px2rem(12px);
        background:#fda159;
        transform:rotate(45deg);
    }
    img{
        width:100%;
    }
    .img{
        position:relative;
        top:px2rem(-90px);
        width:px2rem(203px);
        margin:0 auto;
    }
    .getuser{
        text-align:center;
        margin-top:px2rem(60px);
        color:#fff;
    }
    .color-red{
        color:#ff7b68;
    }
    .wrap{
        font-size:px2rem(12px);
        background:#f5f5f5;
    }
    .info{
        margin-top:px2rem(-58px);
        text-align:center;
        color:#fff;
    }
    .desc{
        text-align:center;
        margin-top:px2rem(16px);
        color:#fff; 
    }
    .mianban{
        width:px2rem(327px);
        height:px2rem(270px);
        background:url(../../assets/mianban.png) no-repeat center px2rem(96px);
        background-size:contain;
        display:block;
        margin:0 auto;
        padding-top:px2rem(96px);
    }
</style>