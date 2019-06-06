<template>
    <div class="wraps">
        <div class="item">
            <div class="header">A</div>
            <div class="item-list" v-for="item in aresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">B</div>
            <div class="item-list" v-for="item in bresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">C</div>
            <div class="item-list" v-for="item in cresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">D</div>
            <div class="item-list" v-for="item in dresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">E</div>
            <div class="item-list" v-for="item in eresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">F</div>
            <div class="item-list" v-for="item in fresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">G</div>
            <div class="item-list" v-for="item in gresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">H</div>
            <div class="item-list" v-for="item in hresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">I</div>
            <div class="item-list" v-for="item in iresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">J</div>
            <div class="item-list" v-for="item in jresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">K</div>
            <div class="item-list" v-for="item in kresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">L</div>
            <div class="item-list" v-for="item in lresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">M</div>
            <div class="item-list" v-for="item in mresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">N</div>
            <div class="item-list" v-for="item in nresult" @click="next(item.big_ppname)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">O</div>
            <div class="item-list" v-for="item in oresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">P</div>
            <div class="item-list" v-for="item in presult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">Q</div>
            <div class="item-list" v-for="item in qresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">R</div>
            <div class="item-list" v-for="item in rresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">S</div>
            <div class="item-list" v-for="item in sresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">T</div>
            <div class="item-list" v-for="item in tresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">U</div>
            <div class="item-list" v-for="item in uresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">V</div>
            <div class="item-list" v-for="item in vresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">W</div>
            <div class="item-list" v-for="item in wresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
         <div class="item">
            <div class="header">X</div>
            <div class="item-list" v-for="item in xresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">Y</div>
            <div class="item-list" v-for="item in yresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div class="item">
            <div class="header">Z</div>
            <div class="item-list" v-for="item in zresult" @click="next(item)" :key="item.id">{{item.big_ppname}}</div>
        </div>
        <div id="next" v-if="onoff" @click="close" style="min-height:100%;">
            <div class="item bg-white" v-for="item in datalist" :key="item.ppid" style="min-height:100%;">
                <div class="header">{{item.ppname}}</div>
                <div class="item-list bg-white"  v-for="items in item.xilie" @click="nextpage(items)" :key="items.xlid">{{items.xlname}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data(){
        return {
            pinpai:'',
            chexing:'',
            onoff:false,
            datalist:[],
            aresult:[],
            bresult:[],
            cresult:[],
            dresult:[],
            eresult:[],
            fresult:[],
            gresult:[],
            hresult:[],
            iresult:[],
            jresult:[],
            kresult:[],
            lresult:[],
            mresult:[],
            nresult:[],
            oresult:[],
            presult:[],
            qresult:[],
            rresult:[],
            sresult:[],
            tresult:[],
            uresult:[],
            vresult:[],
            wresult:[],
            xresult:[],
            yresult:[],
            zresult:[]
        }
    },
    methods:{
        getDatapinpai(){ 
            Indicator.open();
            let that=this
            console.log(that.$route)
            this.$ajax.get('car/brand',{
                params:{}
            }).then((res)=>{
                let data=res.data
                Indicator.close();
                that.aresult=res.data.result.A
                that.bresult=res.data.result.B
                that.cresult=res.data.result.C
                that.dresult=res.data.result.D
                that.eresult=res.data.result.E
                that.fresult=res.data.result.F
                that.gresult=res.data.result.G
                that.hresult=res.data.result.H
                that.iresult=res.data.result.I
                that.jresult=res.data.result.J
                that.kresult=res.data.result.K
                that.lresult=res.data.result.L
                that.mresult=res.data.result.M
                that.nresult=res.data.result.N
                that.oresult=res.data.result.O
                that.presult=res.data.result.P
                that.qresult=res.data.result.Q
                that.rresult=res.data.result.R
                that.sresult=res.data.result.S
                that.tresult=res.data.result.T
                that.uresult=res.data.result.U
                that.vresult=res.data.result.V
                that.wresult=res.data.result.W
                that.xresult=res.data.result.X
                that.yresult=res.data.result.Y
                that.zresult=res.data.result.Z
               
            }).catch(err=>{
                
            });
        },
        close(){
            this.onoff=false
        },
        next(item){
            Indicator.open();
            let that=this
            this.$ajax.get('car/series',{
                params:{brand:item.id}
            }).then((res)=>{
                Indicator.close();
                localStorage.setItem('bigname',item.big_ppname)
                that.datalist=res.data.result.pinpai_list
                that.onoff=true
            }).catch(err=>{
                
            });
           
        },
        nextpage(item){
            localStorage.setItem('smallname',item.xlname)
            this.$router.push({ name: 'chezhurenzheng'})
        }
    },
    created(){
        this.getDatapinpai()
    },
    mounted(){
        
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/common.scss";
    .bg-white{
        background:#fff!important;
    }
    #next{
        position:fixed;
        left:0;
        padding-left:px2rem(72px);
        right:0;
        top:0;
        height:100%;
        z-index:999;
        overflow: auto;
    }
    #next .item{
        background:#fff;
    }
    .wraps{
        position:relative;
        background:#eee;
    }
    .all{
        background:#eee!important;
    }
    .header{
        height:px2rem(29px);
        background:#eeeeee!important;
        font-size:px2rem(14px);
        align-items: center;
        display: flex;
        padding-left:px2rem(16px);
        border-bottom:px2rem(1px) solid #ddd;
    }
    .item-list{
        font-size:px2rem(13px);
        height:px2rem(40px);
        align-items: center;
        background:#f5f5f5;
        display: flex;
        border-bottom:px2rem(1px) solid #ddd;
        padding-left:px2rem(16px);
    }
</style>

