import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Icon } from "antd-mobile";
import './user.sass'
import '../../css/fonts.css'
const img = '../../images/timg.jpg'

class User extends Component {
    
    render() {
        return (<div className='pageWrap'>
            <div className="user-header">
        
                <div className='user-header-img'><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                
                <div className="user-header-name">
                    <p>名字</p>
                    <p>等级</p>
                </div>
                <Link  to="/message" className="user-header-icon"><Icon type="right" /></Link>
                
            </div>
            <div className='user-center'>
                <section style={{ padding: '16px 0',display: 'flex',textAlign:'center',background: '#ffffff',borderRadius:'4px' }}>
                <Link to="/myOrder" className='user-icon-list'>  <img src={require('../../images/user-order.png')} alt=""/><p>我的订单</p></Link>
                    <Link to="/myCar" className='user-icon-list'>  <img src={require('../../images/user-car.png')} alt=""/><p>我的车辆</p></Link>
                    <Link to="/balance" className='user-icon-list'>  <img src={require('../../images/user-coupon.png')} alt=""/><p>我的余额</p></Link>
                </section>
                <section  style={{margin: '15px 0',background: '#ffffff',borderRadius:'4px'  }}>
                    <Link to="/index" className='user-list'>扫码洗车 <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/balance" className='user-list'>现金充值  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/coupon" className='user-list'>次卡列表  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/coupon" className='user-list'>我的次卡  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/shareCard" className='user-list'>次卡分享  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/coupon" className='user-list'>我的洗车卷  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/index" className='user-list'>兑换优惠  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/certification" className='user-list'>车主认证  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/myCoupon" className='user-list'>扫码领券  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                </section>
                <section  style={{margin: '15px 0',background: '#ffffff',borderRadius:'4px'  }}>
                    <Link to="/suggestion" className='user-list'>意见箱  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                    <Link to="/help" className='user-list'>帮助中心  <Icon type="right"  style={{float:'right', verticalAlign: 'bottom'}}/></Link>
                </section>
            </div>
          
        </div>)
    }
}
export default User;




