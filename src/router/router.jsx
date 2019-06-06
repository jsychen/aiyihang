import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Bundle from './Bundle.jsx';
import Loading from 'components/Loading/Loading.jsx';
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home.jsx';
import User from 'bundle-loader?lazy&name=page1!pages/user/user.jsx';
import Car from 'bundle-loader?lazy&name=page1!pages/car/car.jsx';
import Message from 'bundle-loader?lazy&name=page1!pages/message/message.jsx';
import ShareCard from 'bundle-loader?lazy&name=page1!pages/shareCard/shareCard.jsx';
import Suggestion from 'bundle-loader?lazy&name=page1!pages/suggestion/suggestion.jsx';
import Help from 'bundle-loader?lazy&name=page1!pages/help/help.jsx';
import Order from 'bundle-loader?lazy&name=page1!pages/order/order.jsx';
import MyOrder from 'bundle-loader?lazy&name=page1!pages/myOrder/myOrder.jsx';
import Open from 'bundle-loader?lazy&name=page1!pages/open/open.jsx';

import Coupon from 'bundle-loader?lazy&name=page1!pages/coupon/coupon.jsx';
import MyCoupon from 'bundle-loader?lazy&name=page1!pages/myCoupon/myCoupon.jsx';




import ChangeTel from  'bundle-loader?lazy&name=page1!pages/changeTel/changeTel.jsx';
import ChangeName from  'bundle-loader?lazy&name=page1!pages/changeName/changeName.jsx';
import ChangeNickname from  'bundle-loader?lazy&name=page1!pages/changeNickname/changeNickname.jsx';
import ChangeSex from  'bundle-loader?lazy&name=page1!pages/changeSex/changeSex.jsx';
import ChooseCartype from  'bundle-loader?lazy&name=page1!pages/chooseCartype/chooseCartype.jsx';
import Certification from  'bundle-loader?lazy&name=page1!pages/certification/certification.jsx';
import MyCar from  'bundle-loader?lazy&name=page1!pages/myCar/myCar.jsx';
import Fund from  'bundle-loader?lazy&name=page1!pages/fund/fund.jsx';
import Balance from  'bundle-loader?lazy&name=page1!pages/balance/balance.jsx';


import Saomahou from 'bundle-loader?lazy&name=page1!pages/saomahou/saomahou.jsx'
import Saomahoutwo from 'bundle-loader?lazy&name=page1!pages/saomahoutwo/saomahoutwo.jsx'
import Bubiaozhun from 'bundle-loader?lazy&name=page1!pages/bubiaozhun/bubiaozhun.jsx'
import Pingjia from 'bundle-loader?lazy&name=page1!pages/pingjia/pingjia.jsx'
import Pingjiahou from 'bundle-loader?lazy&name=page1!pages/pingjiahou/pingjiahou.jsx'

import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter.jsx';
import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/UserInfo/UserInfo.jsx';
import NotFound from 'bundle-loader?lazy&name=notFound!components/NotFound/NotFound.jsx';


const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/user" component={createComponent(User)}/>
            <Route path="/car" component={createComponent(Car)}/>
            <Route path="/order" component={createComponent(Order)}/>
            <Route path="/shareCard" component={createComponent(ShareCard)}/>
            <Route path="/chooseCartype" component={createComponent(ChooseCartype)}/>
            <Route path="/message" component={createComponent(Message)}/>
            <Route path="/changeTel" component={createComponent(ChangeTel)}/>
            <Route path="/changeName" component={createComponent(ChangeName)}/>
            <Route path="/changeNickname" component={createComponent(ChangeNickname)}/>
            <Route path="/changeSex" component={createComponent(ChangeSex)}/>
            <Route path="/myCar" component={createComponent(MyCar)}/>
            <Route path="/certification" component={createComponent(Certification)}/>
            <Route path="/fund" component={createComponent(Fund)}/>
            <Route path="/balance" component={createComponent(Balance)}/>
            <Route path="/myOrder" component={createComponent(MyOrder)}/>
            <Route path="/coupon" component={createComponent(Coupon)}/>
            <Route path="/myCoupon" component={createComponent(MyCoupon)}/>
          

            
            <Route path="/counter" component={createComponent(Counter)}/>
            <Route path="/userInfo" component={createComponent(UserInfo)}/>
             
            <Route path="/saomahou" component={createComponent(Saomahou)}/>
            <Route path="/saomahoutwo" component={createComponent(Saomahoutwo)}/>
            <Route path="/bubiaozhun" component={createComponent(Bubiaozhun)}/>
            <Route path="/pingjia" component={createComponent(Pingjia)}/>
            <Route path="/pingjiahou" component={createComponent(Pingjiahou)}/>

            <Route path="/suggestion" component={createComponent(Suggestion)}/>
            <Route path="/help" component={createComponent(Help)}/>
            <Route path="/open" component={createComponent(Open)}/>
            <Route path="/myOrder" component={createComponent(MyOrder)}/>
            <Route path="/coupon" component={createComponent(Coupon)}/>
            <Route path="/myCoupon" component={createComponent(MyCoupon)}/>
          


            <Route path="/notfound" component={createComponent(NotFound)}/>
        </Switch>
)

export default getRouter;
