<template>
    <div class="wrap">
        <div class="yuyin">
            <img src="../../assets/yuyin.png" alt="">
        </div>
      <div class="inner">
            <div class="state">
                <div class="one">1</div>
                <div class="two"></div>
                <div class="tree"></div>
                <div class="four">2</div>
                <div class="five"></div>
                <div class="six">3</div>
            </div>
            <div class="tip-title">
                确认车辆是否已停到指定位置
            </div>
            <div class="tip-title-bottom">
                通过洗车机两侧辅助镜查看
            </div>
            <div class="che">
                <img src="../../assets/enter.png" alt="">
            </div>
            <div class="phone"><span class="label">服务热线</span> 400-000-0000</div>
      </div>
        <div class="fixed">
            <div class="tips">车头还未到绿色区域，请继续缓慢前进</div>
            <div class="bottom-btn">
                下一步
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        position:relative;
        height:100%;
        background:#f5f5f5;
    }
    .tip-title{
        font-size:px2rem(16px);
        text-align:center;
    }
    .tip-title-bottom{
        font-size:px2rem(12px);
        display:flex;
        justify-content: center;
        align-items: center;
        height:px2rem(37px);
    }
    .inner{
        width:px2rem(355px);
        margin:0 auto;
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
        margin:0 auto;
    }
    .state{
        display:flex;
        margin:0 auto;
        width:px2rem(220px);
        height:px2rem(68px);
        font-size:px2rem(14px);
        justify-content: space-around;
        align-items: center;
    }
    .one{
        display:flex;
        justify-content: center;
        align-items: center;
        width:px2rem(20px);
        height:px2rem(20px);
        background:#ecc246;
        border-radius:50%;
    }
    .two{
        width:px2rem(40px);
        height:px2rem(5px);
        background:#ecc246;
    }
    .tree{
        width:px2rem(40px);
        height:px2rem(5px);
        background:#d8d8d8;
    }
    .four{
        display:flex;
        justify-content: center;
        align-items: center;
        width:px2rem(20px);
        height:px2rem(20px);
        border-radius:50%;
        background:#d8d8d8;
    }
    .five{
        width:px2rem(80px);
        height:px2rem(5px);
        background:#d8d8d8;
    }
    .six{
        display:flex;
        justify-content: center;
        align-items: center;
        width:px2rem(20px);
        height:px2rem(20px);
        background:#d8d8d8;
        border-radius:50%;
    }
    .dingdan-info{
        border:px2rem(1px) solid #e0e0e0;
        border-radius: px2rem(6px);
        padding:0 px2rem(12px);
        display:flex;
        justify-content: space-between;
        align-items: center;
        height:px2rem(60px);
        background:#fff;
        margin-top:px2rem(17px)
    }
    .dingdan-info .top{
        font-size:px2rem(15px);
    }
    .dingdan-info .place{
        font-size:px2rem(13px);
    }
    .right{
        font-size:px2rem(28px);
        color:#ff0000;
    }
    .type{
        display:flex;
        color:#999;
        align-items: center;
        height:px2rem(55px);
        font-size:px2rem(14px);
    }
    .che{
        width:px2rem(126px);
        margin:0 auto;
    }
    .che img{
        width:100%;
    }
    .phone{
      font-size:px2rem(11px);
      text-align: center;
      margin:px2rem(30px) 0;
    }
    .label{
        color:#999;
    }
    .fixed{
        padding:px2rem(12px) 0;
        background:#fff;
    }
    .tips{
        font-size:px2rem(12px);
        color:#ecc246;
        text-align: center;
        padding-bottom:px2rem(15px);
    }
    .yuyin{
        width:px2rem(30px);
        height:px2rem(30px);
        position:absolute;
        right:px2rem(13px);
        top:px2rem(9px);
    }
    .yuyin img{
        height:100%;
    }
</style>