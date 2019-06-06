<template>
    <div class="wrap">
       <div class="inner">
            <div class="title tx-center">长按可复制该兑换码</div>
            <div class="btn tx-center">GUYHBKGFJHBU</div>
            <div class="desc tx-center">该兑换码<span class="active">2018.09.29</span>到期</div>
            <div class="jianyi tx-center">请尽快使用哦~</div>
       </div>
      <footer>爱义行，让洗车变得简单快乐</footer>
    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        background:#f5f5f5;
    }
    .title{
        font-size:px2rem(12px);
        color:#9b9b9b;
        line-height:px2rem(36px);
    }
    .btn{
        color:#fff;
        width:px2rem(200px);
        display:flex;
        justify-content: center;
        align-items: center;
        height:px2rem(44px);
        border-radius:px2rem(6px);
        background:#cecdce;
        font-size:px2rem(14px);
        margin-bottom:px2rem(39px);
    }
    .desc{
      font-size:px2rem(16px);
      line-height:px2rem(25px);
      color:#9b9b9b;
    }
    .jianyi{
        font-size:px2rem(16px);
        line-height:px2rem(25px);
        color:#9b9b9b;
    }
    .active{
        color:#f7cc58;
    }
    footer
    {
     margin-top:px2rem(30px);
      top:70%;
      width:100%;
      height:px2rem(15px);
      font-size: px2rem(13px);
      text-align: center;
      font-weight: 500;
      color: #6d6d6d;

    }
</style>
