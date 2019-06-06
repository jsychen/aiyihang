<template>
    <div class="wrap">
       <mt-cell title="标题文字" value="已认证"></mt-cell>
       <mt-cell title="标题文字" value="审核中"></mt-cell>
       <mt-cell :class="{ 'active': isA}" title="标题文字" value="认证失败"  :is-link="true"></mt-cell>
       <mt-cell title="标题文字" value="说明文字"></mt-cell>
       <mt-cell title="标题文字" value="说明文字"></mt-cell>
       <mt-cell title="标题文字" value="说明文字"></mt-cell>
       <div class="add-btn">
           <i class="icon iconfont icon-tianjia" @click="addNew"></i>添加新认证
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isA:true
        }
    },
    methods:{
        addNew(){
           this.$router.push({ name: 'chezhurenzheng'}) // -> /user 
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .icon-tianjia{
        color:#969696;
        padding-right:px2rem(10px);
    }
    .wrap{
        height:100%;
        background:#f5f5f5;
    }
    .active{
        color:#f93951;
    }
    .add-btn{
        font-size:px2rem(14px);
        height:px2rem(48px);
        background:#fff;
        margin-top:px2rem(15px);
        justify-content: center;
        align-items: center;
        color:#969696;
        display:flex;
    }
</style>