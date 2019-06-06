import React, {Component} from "react";
import {Link} from "react-router-dom";
// import {InputItem } from 'antd-mobile';
import './myCoupon.sass'
import '../../css/fonts.css'


class MyCoupon extends Component {
    render() {
        return (<div className='pageWrap'>
            <section className='shareCard-main'>
                <h3 style={{fontSize:'14px',lineHeight:'40px'}}>兑换优惠券</h3>
                <input placeholder='请输入车牌号' className='shareCard-input' />
                <input placeholder='请输入兑换码' className='shareCard-input' />
                <button className='pageButton'>确认兑换</button>
              
                <Link to='/fund' style={{color:'#FF0000',borderTop:'1px solid rgba(231,231,231,1)',borderBottom:'1px solid rgba(231,231,231,1)',padding:'20px 0',display:'block',textAlign:'center'}}>扫码领取</Link>
                <Link to='/fund' style={{color:'#FF0000',borderBottom:'1px solid rgba(231,231,231,1)',padding:'20px 0',display:'block',textAlign:'center'}}>扫码领取</Link>
            </section>
            <p style={{textAlign: 'center',margin:'20px 0'}}>爱义行：让洗车变得简单快乐</p>
           
          
        </div>)
    }    
}
export default MyCoupon;


