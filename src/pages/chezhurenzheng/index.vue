<template>
    <div class="wrap">
        <div class="head" @click="seltype">
            <!--<img src="../../assets/aodi.png" alt="">-->
            <span>{{type}}</span>
        </div>
        <div class="top-wrap">
            <div class="form-group">
                <span class="place" @click="selpleace">{{pleace}}{{zimu}}</span>
                <span class="icon iconfont icon-xiala"></span>
                <!-- <mt-field class="number" placeholder="输入车牌号" v-model="username"></mt-field> -->
                <input class="number" v-model="username"  type="text" placeholder="输入车牌号">
            </div>
        </div>
        <div class="che-info">
            车辆信息
        </div>
        <div class="btn-group">
            <div class="label">车辆分类</div>
            <div @click="typeClick(1)" class="item-btn" :class="{ 'active': isA}">普轿型</div>
            <div @click="typeClick(2)" class="item-btn" :class="{ 'active': isB}">SUV型</div>
        </div>
        <div class="bottom-btn" @click="renzheng">
            确定
        </div>
        <div class="pleacedata" v-if="pleacedata">
            <div class="bottom-wrap">
                <div v-if="!first" class="item-wrap"  v-for="item in datapleace" :key="item">
                    <div class="item" @click="selp(items)" v-for="items in item" :key="items">{{items}}</div>
                </div>
                <div v-if="first" class="second-wrap" >
                    <div class="left"><span style="position:absolute;">{{pleace}}{{zimu}}</span></div>
                    <div class="right"></div>
                </div>
                <div v-if="first" class="second-wrap"  v-for="item in datazimu" :key="item" >
                    <div class="item" @click="selzimu(items)" v-for="items in item" :key="items">{{items}}</div>
                </div>
            </div>
        </div>
      <footer>爱义行，让洗车变得简单快乐</footer>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            cheid:'',
            openId:'',
            first:false,
            type:'点击选择型号',
            datapleace:[
                ['京','沪','浙','苏','粤','鲁','晋','冀'],
                ['豫','川','渝','吉','辽','黑','皖','鄂'],
                ['湘','赣','闽','陕','甘','宁','蒙','津'],
                ['桂','云','贵','琼','青','新','藏','']
            ],
            datazimu:[
                ['Q','W','E','R','T','Y','U',''],
                ['A','S','D','F','G','H','J',''],
                ['Z','X','C','V','B','N','M','']
            ],
            pleacedata:false,
            isA:true,
            zimu:'A',
            pleace:'浙',
            isB:false,
            popupVisible:false,
            username:'',
            slots: [
                {
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot1',
                textAlign: 'right'
                }
            ]
        };
  },
    methods: {
        seltype(){
            let id=''
            if(this.isA){
                id="passenger"
            }else{
                id="commercial"
            }
           this.$router.push({name:'pleacexuanze',params:{id}})
        },
        selzimu(val){
            this.zimu=val
            this.first=false
            this.pleacedata=false
        },
        selp(val){
            this.pleace=val
            this.first=true
        },
        selpleace(){
            this.pleacedata=true
        },
        updateche(){
            let that=this
            let classify
            if(this.isA){
                classify=1
            }else{
                classify=2
            }
            this.$ajax({
                method: 'post',
                url:'car/update',
                data:this.$qs.stringify({id:that.cheid,classify,number:that.pleace+that.zimu+that.username,type:that.type,openId:that.openId})
            }).then((res)=>{
                Toast('修改成功')
                that.$router.back(-2) // -> /user
            }).catch(err=>{

            });
        },
        renzheng(){
            if(!this.username){
                Toast('车牌号不能为空');
                return;
            }
            if(this.cheid){
                this.updateche()
                return;
            }
            let that=this
            let classify
            if(this.isA){
                classify=1
            }else{
                classify=2
            }
            this.$ajax({
                method: 'post',
                url:'car/add',
                data:this.$qs.stringify({classify,number:that.pleace+that.zimu+that.username,type:that.type,openId:that.openId})
            }).then((res)=>{
                Toast('保存成功')
                that.$router.push({ name:'myche'}) // -> /user
                // that.$router.back(-1)
            }).catch(err=>{
                alert(JSON.stringify(err.response.data.msg))
            });
            //this.$router.push({ name: 'success'}) // -> /user
        },
        typeClick(val){
            this.isA=false;
            this.isB=false;
            if(val===1){
                this.isA=true;
            }else{
                this.isB=true;
            }
        },
        onValuesChange(picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        }
  },
  created(){
    this.username=localStorage.getItem('chepai')
    this.cheid=localStorage.getItem('cheid')
      if(localStorage.getItem('bigname')){
        this.type=localStorage.getItem('bigname')+'-'+localStorage.getItem('smallname')
      }
      
      this.openId=localStorage.getItem('openid')
  },
  mounted() {
      if (this.openId != null) {
      this.$ajax({
        method: 'post',
        url: "member/isLogin",
        data: this.$qs.stringify({ openId: this.openId })
      }).then(res => {
        console.log(res)
        if (res.data.code == '0000') {
          if (res.data.data == false) {
            Toast('未登录,3秒后跳转')
            setTimeout(() => {
              this.$router.replace({ name: 'myindex' })
            }, 3000)
          }
        } else {
          Toast(res.data.msg)
          setTimeout(() => {
            this.$router.replace({ name: 'myindex' })
          }, 3000)
        }
      }).catch(err => {
        setTimeout(() => {
          this.$router.replace({ name: 'myindex' })
        }, 3000)
      })
    }
  },
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .item-wrap{
        display:flex;
        margin-top:px2rem(1px);
    }
    .second-wrap{
        display:flex;
        margin-top:px2rem(1px);
    }
    .left{
        position:relative;
        flex:7;
        font-size:px2rem(15px);
        padding-left:px2rem(16px);
        height:px2rem(50px);
        background:#fff;
        margin-right:px2rem(1px);
        display:flex;
        align-items: center;
    }
    .right{
        flex:1;
        height:px2rem(50px);
        background:#fff;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .item{
        flex:1;
        height:px2rem(50px);
        background:#fff;
        margin-right:px2rem(1px);
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .bottom-wrap{
        position:absolute;

        width:100%;
        bottom:0;
    }
    .pleacedata{
        font-size:px2rem(13px);
        position:fixed;
        bottom:0;
        height:100%;
        width:100%;
        background:rgba($color: #000000, $alpha: .1);
    }
    .active{
        border-color:#d4b265!important;
    }
    .wrap{
        background:#f5f5f5;
        height:100%;
    }
    .bottom-select{
        width:100%;
    }
    .head{
        height:px2rem(81px);
        background:#fff;
        font-size:px2rem(15px);
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .head img{
        width:px2rem(46px);
        height:px2rem(21px);
        margin-right:px2rem(5px);
    }
    .top-wrap{
        height:px2rem(75px);
        display:flex;
        justify-content: center;
        align-items: start;
        background:#fff;
    }
    .form-group{
        display:flex;
        border:px2rem(1px) solid #e7e7e7;
        width:px2rem(267px);
        box-sizing: border-box;
        align-items: center;
        height:px2rem(50px);
        border-radius:px2rem(8px);
    }
    .number{
        width:px2rem(188px);
        border:none;
        outline: none;
        padding-left:px2rem(11px);
        font-size:px2rem(18px);
        display:flex;
        color:#9b9b9b;
        align-items: center;
        height:99%;
        box-sizing: border-box;
    }
    .place{
        justify-content: center;
        display:flex;
        align-items: center;
        height:px2rem(38px);
        box-sizing: border-box;
        width:px2rem(53px);
        font-size:px2rem(18px);
    }
    .bottom-wrap{
       margin:0 px2rem(1px);
    }
    .che-info{
        display:flex;
        align-items: center;
        height:px2rem(40px);
        font-size:px2rem(14px);
        padding-left:px2rem(20px);
    }
    .btn-group{
        display:flex;
        padding-left:px2rem(14px);
        align-items: center;
        height:px2rem(47px);
        background:#fff;
        font-size:px2rem(13px);
    }
    .item-btn{
        height:px2rem(29px);
        border:px2rem(1px) solid #cfcfcf;
        border-radius: px2rem(5px);
        justify-content: center;
        margin-left:px2rem(12px);
        display:flex;
        align-items: center;
        box-sizing: border-box;
        width:px2rem(118px);
    }
    .label{
        margin-right:px2rem(12px);
    }
    .icon{
        border-right:px2rem(1px) solid #e7e7e7;
        padding-right:px2rem(10px)
    }
    .bottom-btn{
        display:flex;
        justify-content: center;
        align-items: center;
        width:px2rem(348px);
        background: -moz-linear-gradient( top,#FF8586,#D81618);
        background:  -webkit-linear-gradient( top,#FF8586,#D81618);
        background: -o-linear-gradient( top,#FF8586,#D81618);
        background: linear-gradient( top,#FF8586,#D81618);
        font-size:px2rem(15px);
        color:#fff;
        height:px2rem(40px);
        border-radius:px2rem(8px);
        margin:px2rem(20px) auto 0 auto;
    }
    footer
    {
     margin-top:px2rem(30px);
      width:100%;
      height:px2rem(15px);
      font-size: px2rem(13px);
      text-align: center;
      font-weight: 500;
      color: #6d6d6d;

    }
</style>


