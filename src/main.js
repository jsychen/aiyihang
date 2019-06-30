import Vue from 'vue';
import App from './App.vue';
import Mint from 'mint-ui';
import qs from 'qs';
Vue.prototype.$qs = qs;
import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.min.css';
import './assets/iconfont.css';
import axios from 'axios';
/**
 * 正式服务器
 */
// axios.defaults.baseURL = 'http://47.107.97.208:8010/';
// Vue.prototype.saomaurl=''http://wx1.aiyihang.com/#/saomahou/'
// Vue.prototype.loginurl=''http://wx1.aiyihang.com/#/login'
// Vue.prototype.myindex=''http://wx1.aiyihang.com/#/myindex'
// Vue.prototype.appid='wx50621d59914730a8'
// Vue.prototype.erweima='http://47.107.97.208:8010/'

axios.defaults.baseURL = 'http://221.122.47.116:8010/';
Vue.prototype.saomaurl='http://wx1.aiyihang.com/#/saomahou/'
Vue.prototype.loginurl='http://wx1.aiyihang.com/#/login'
Vue.prototype.daohangurl='http://wx1.aiyihang.com/#/daohang'
Vue.prototype.myindex='http://wx1.aiyihang.com/#/myindex'
Vue.prototype.appid='wx50621d59914730a8'
Vue.prototype.erweima='http://221.122.47.116:8010/'

// http://h5.yima.ymxc168.com/#/myindex
/**
 * 测试服务器
 */
// axios.defaults.baseURL = 'http://106.14.8.190:8010/';
// Vue.prototype.myindex='http://test.52shuzhe.cn/#/myindex'
// Vue.prototype.saomaurl='http://test.52shuzhe.cn/#/saomahou/'
// Vue.prototype.erweima='http://106.14.8.190:8010/'
// Vue.prototype.loginurl='http://test.52shuzhe.cn/#/login'
// Vue.prototype.appid='wx7e3b8dcb00dc1920'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
Vue.prototype.$ajax= axios
Vue.filter('timeparse',function(value){
  let str='未知'
  if(value){
    str = value.substring(0,10).replace(/\-/g, "/");
  }
  return str
  });
import router from './router'
Vue.use(Mint);

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
   beforeRouteLeave: function(to, from, next){
       if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank)
       {//此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
           if (this.$vnode && this.$vnode.data.keepAlive)
           {
               if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
               {
                   if (this.$vnode.componentOptions)
                   {
                       var key = this.$vnode.key == null
                                   ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                   : this.$vnode.key;
                       var cache = this.$vnode.parent.componentInstance.cache;
                       var keys  = this.$vnode.parent.componentInstance.keys;
                       if (cache[key])
                       {
                           if (keys.length) {
                               var index = keys.indexOf(key);
                               if (index > -1) {
                                   keys.splice(index, 1);
                               }
                           }
                           delete cache[key];
                       }
                   }
               }
           }
           this.$destroy();
       }
       next();
   },
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
