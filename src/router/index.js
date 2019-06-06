import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path:"/indexsaoma",
        meta:'扫码领券',
        name:'indexsaoma',
        component: resolve => require(['../pages/indexsaoma/index.vue'], resolve)
    },
    {
        path:"/helpinfo",
        meta:'帮助中心',
        name:'helpinfo',
        component: resolve => require(['../pages/helpinfo/index.vue'], resolve)
    },
    {
        path:"/saomalingquan",
        meta:'扫码领券',
        name:'saomalingquan',
        component: resolve => require(['../pages/saoma/lingquan.vue'], resolve)
    },
    {
        path:"/saomaxiche",
        meta:'扫码洗车',
        name:'saomaxiche',
        component: resolve => require(['../pages/saoma/xiche.vue'], resolve)
    },
    {
        path:"/sharetaocan",
        meta:'次卡分享',
        name:'sharetaocan',
        component: resolve => require(['../pages/sharetaocan/index.vue'], resolve)
    },
    {
        path:"/taocandetail/:id",
        meta:'次卡详情',
        name:'taocandetail',
        component: resolve => require(['../pages/taocandetail/index.vue'], resolve)
    },
    {
        path:"/allchequan",
        meta:'我的洗车券',
        name:'allchequan',
        component: resolve => require(['../pages/allchequan/index.vue'], resolve)
    },
    {
        path:"/myshop",
        meta:'我的次卡',
        name:'myshop',
        component: resolve => require(['../pages/myshop/index.vue'], resolve)
    },
    {
        path:"/chanpinggoumai/:id",
        meta:'支付',
        name:'chanpinggoumai',
        component: resolve => require(['../pages/chanpinggoumai/index.vue'], resolve)
    },
    {
        path:"/myyaoqing",
        meta:'我的邀请',
        name:'myyaoqing',
        component: resolve => require(['../pages/myyaoqing/index.vue'], resolve)
    },
    {
        path:"/daohang",
        meta:'首页',
        name:'daohang',
        component: resolve => require(['../pages/daohang/index.vue'], resolve)
    },
    {
        path:"/myyouhui",
        meta:'我的优惠',
        name:'myyouhui',
        component: resolve => require(['../pages/myyouhui/index.vue'], resolve)
    },
    {
        path:"/pleacexuanze/:id",
        meta:'车辆选择',
        name:'pleacexuanze',
        component: resolve => require(['../pages/pleacexuanze/index.vue'], resolve)
    },
    {
        path:"/qingxizhong/:id",
        meta:'清洗中',
        name:'qingxizhong',
        component: resolve => require(['../pages/qingxizhong/index.vue'], resolve)
    },
    {
        path:"/fuwupingjia/:id",
        meta:'服务评价',
        name:'fuwupingjia',
        component: resolve => require(['../pages/fuwupingjia/index.vue'], resolve)
    },
    {
        path:"/weiguifan",
        meta:'',
        name:'weiguifan',
        component: resolve => require(['../pages/weiguifan/index.vue'], resolve)
    },
    {
        path:"/saomahou/:id",
        name:'saomahou',
        meta:'扫码确认',
        component: resolve => require(['../pages/saomahou/index.vue'], resolve)
    },
    {
        path:"/saomatwo/:id",
        name:'saomatwo',
        meta:'确认操作',
        component: resolve => require(['../pages/saomatwo/index.vue'], resolve)
    },
    {
        path:"/saomastart/:id",
        meta:'启动',
        name:'saomastart',
        component: resolve => require(['../pages/saomastart/index.vue'], resolve)
    },
    {
        path:"/yizhaninfo",
        meta:'驿站信息',
        name:'yizhaninfo',
        component: resolve => require(['../pages/yizhaninfo/index.vue'], resolve)
    },
    {
        path:"/allzijin",
        meta:'资金',
        name:'allzijin',
        component: resolve => require(['../pages/allzijin/index.vue'], resolve)
    },
    {
        path:"/chongzhi",
        meta:'现金充值',
        name:'chongzhi',
        component: resolve => require(['../pages/chongzhi/index.vue'], resolve)
    },
    {
        path:"/zijinmingxi",
        meta:'资金明细',
        name:'zijinmingxi',
        component: resolve => require(['../pages/zijinmingxi/index.vue'], resolve)
    },
    {
        path:"/login",
        meta:'登录',
        name:'login',
        component: resolve => require(['../pages/login/index.vue'], resolve)
    },
    {
        path:"/yijian",
        meta:'意见',
        name:'yijian',
        component: resolve => require(['../pages/yijian/index.vue'], resolve)
    },
    {
        path:"/mydingdan",
        meta:'订单列表',
        name:'mydingdan',
        component: resolve => require(['../pages/mydingdan/index.vue'], resolve)
    },
    {
        path:"/changeinfo/:value",
        meta:'修改手机号',
        name:'changeinfo',
        component: resolve => require(['../pages/changeinfo/index.vue'], resolve)
    },
    {
        path:"/selfinfo",
        meta:'个人信息',
        name:'selfinfo',
        component: resolve => require(['../pages/selfinfo/index.vue'], resolve)
    },
    {
        path:"/myindex",
        meta:'个人中心',
        name:'myindex',
        component: resolve => require(['../pages/myindex/index.vue'], resolve)
    },
    {
        path:"/changechenwei/:value",
        meta:'修改性别',
        name:'changechenwei',
        component: resolve => require(['../pages/changechenwei/index.vue'], resolve)
    },
    {
        path:"/changexingming/:value",
        meta:'修改姓名',
        name:'changexingming',
        component: resolve => require(['../pages/changexingming/index.vue'], resolve)
    },
    {
        path:"/changenicheng/:value",
        meta:'修改昵称',
        name:'changenicheng',
        component: resolve => require(['../pages/changenicheng/index.vue'], resolve)
    },
    {
        path:"/myche",
        meta:'我的车辆',
        name:'myche',
        component: resolve => require(['../pages/myche/index.vue'], resolve)
    },
    {
        path:"/chezhurenzheng",
        meta:'车主认证',
        name:'chezhurenzheng',
        component: resolve => require(['../pages/chezhurenzheng/index.vue'], resolve)
    },
    {
        path:"/youxiaoquan",
        meta:'有效券',
        name:'youxiaoquan',
        component: resolve => require(['../pages/youxiaoquan/index.vue'], resolve)
    },
    {
        path:"/wuxiaoquan",
        meta:'无效券',
        name:'wuxiaoquan',
        component: resolve => require(['../pages/wuxiaoquan/index.vue'], resolve)
    },
    {
        path:"/allma",
        meta:'兑换码',
        name:'allma',
        component: resolve => require(['../pages/allma/index.vue'], resolve)
    },
    {
        path:"/duihuanma",
        meta:'兑换码',
        name:'duihuanma',
        component: resolve => require(['../pages/duihuanma/index.vue'], resolve)
    },
    {
        path:"/duihuan/:id",
        meta:'兑换',
        name:'duihuan',
        component: resolve => require(['../pages/duihuan/index.vue'], resolve)
    },
    {
        path:"/renzhenlist",
        meta:'认证列表',
        name:'renzhenlist',
        component: resolve => require(['../pages/renzhenlist/index.vue'], resolve)
    },
    {
        path:"/chanpin",
        name:'chanpin',
        meta:'次卡列表',
        component: resolve => require(['../pages/chanpin/index.vue'], resolve)
    },
    {
        path:"/renzheng",
        name:'renzheng',
        meta:'认证',
        component: resolve => require(['../pages/renzheng/index.vue'], resolve)
    },
    {
        path:"/unpass",
        meta:'认证结果',
        name:'unpass',
        component: resolve => require(['../pages/unpass/index.vue'], resolve)
    },
    {
        path:"/success",
        meta:'认证结果',
        name:'success',
        component: resolve => require(['../pages/success/index.vue'], resolve)
    },
    {
        path:"/pingjia/:id",
        meta:'评价',
        name:'pingjia',
        component: resolve => require(['../pages/pingjia/index.vue'], resolve)
    },
    {
        path:"/qingxiwanbi/:id",
        meta:'清洗完毕',
        name:'qingxiwanbi',
        component: resolve => require(['../pages/qingxiwanbi/index.vue'], resolve)
    },
    {
        path:"/huiyuanlogin/:id",
        meta:'登录',
        name:'huiyuanlogin',
        component: resolve => require(['../pages/login/huiyuanlogin.vue'], resolve)
    },
    {
        path:"/orderdetail/:id",
        meta:'订单详情',
        name:'orderdetail',
        component: resolve => require(['../pages/login/orderdetail.vue'], resolve)
    },
    { path: '/', redirect: '/daohang' }
]

import vipLogin from '../pages/login/huiyuanlogin';
import vipOrderDetail from '../pages/login/vipOrderDetail';
let newRoutes = [
    {
        path: '/vipLogin',
        meta: '会员登录',
        name: 'vipLogin',
        component: vipLogin
    },
    {
        path: '/vip/order',
        meta: '订单确认',
        name: 'vipOrderDetail',
        component: vipOrderDetail
    }
]
for(let i=0;i<newRoutes.length;i++){
    routes.push(newRoutes[i]);
}
var router =  new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta
    next()
  })
export default router;
