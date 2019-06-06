<template>
    <div class="wrap">
        <img src="../../assets/5yuanyong.png" alt="">
        <img src="../../assets/5yuanyong.png" alt="">
        <img src="../../assets/5yuanyong.png" alt="">
        <img src="../../assets/5yuanyong.png" alt="">
        <img src="../../assets/5yuanyong.png" alt="">
        <img src="../../assets/5yuanyong.png" alt="">
    </div>
</template>
<script>
export default {
    created(){
        this.getdata()
    },
    methods:{
        getdata(){
            let that=this
            this.$ajax({
                method: 'post',
                url:'coupon/listUsable',
                data:this.$qs.stringify({number:that.zimu+that.please+that.username,type:that.type,openId:that.openId})
            }).then((res)=>{
                that.openId=res.data.data
            }).catch(err=>{
                
            });
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .wrap{
        box-sizing: border-box;
        height:100%;
        background:#f5f5f5;
    }
    img{
        width:100%;
        padding-top:px2rem(12px);
        display: block;
        box-sizing: border-box;
        width:px2rem(335px);
        height:px2rem(120px);
        margin:0 auto;
    }
</style>

