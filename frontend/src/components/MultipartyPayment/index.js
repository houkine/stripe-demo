import React, { useState,useRef,useEffect } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {instance,GET,POST,PUT} from "../../utils/axiosInstance"
import './MultipartyPayment.css'
import '../index.css'


const MultipartyPayment = () => {

  //----------------------------card A
  const [Anumber,setANumber]=useState()
  const [Aexp_month,setAExp_month]=useState()
  const [Aexp_year,setAExp_year]=useState()
  const [Acvc,setACvc]=useState()
  const handlePayOnClick = () =>{
    instance.post(
      '/multipartyPayment/collectPayment',
      {
        Anumber,
        Aexp_month,
        Aexp_year,
        Acvc,
      }
    )
    .then((res) => {
      // status error
      if (res.status !== 200) {
        console.log(res)
      }else{
        console.log(res)
      }
    })  
    .catch(error=>console.log('error:',error))
  }
  //----------------------------card B
  const [Bnumber,setBNumber]=useState()
  const [Bexp_month,setBExp_month]=useState()
  const [Bexp_year,setBExp_year]=useState()
  const [Bcvc,setBCvc]=useState()

  //---------------------------test
  const handleTestOnClick = () =>{
    instance.get(
      '/multipartyPayment/createAccountLinks',
      {
        params:{
          id:'acct_1JKbto2R6lpi0msH'
        }
      }
    )
    .then((res) => {
      // status error
      if (res.status !== 200) {
        console.log(res)
      }else{
        console.log(res.data)

      }
    })  
    .catch(error=>console.log('error:',error))
  }

  const handleReceiveOnClick = () =>{
    instance.post(
      '/directCharge/customerUI',
      {
      }
    )
    .then((res) => {
      // status error
      if (res.status !== 200) {
        console.log(res)
      }else{
        console.log(res.data)

      }
    })  
    .catch(error=>console.log('error:',error))
  }
  return (
    <div className={'MultipartyPayment_container'}>
      <div className={'MultipartyPayment_item'}>
        <div className={'MultipartyPayment_form'}>
          <div className={'MultipartyPayment_title'} >Customer UI</div>
          <div className={'MultipartyPayment_cardName'}>Card A</div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Anumber">card A number:&nbsp;</label>
            <input type='text' value={Anumber} name='Anumber' onChange={e=>setANumber(e.target.value)}></input>
            &nbsp;(no gap)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Aexp_month">expire month:&nbsp;</label>
            <input type='text' value={Aexp_month} name={'Aexp_month'} onChange={e=>setAExp_month(e.target.value)}></input>
            &nbsp;(1-2 number)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Aexp_year">expire year:&nbsp;</label>
            <input type='text' value={Aexp_year} name={'Aexp_year'} onChange={e=>setAExp_year(e.target.value)}></input>
            &nbsp;(2 number)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Acvc">CVC:&nbsp;</label>
            <input type='text' value={Acvc} name={'Acvc'} onChange={e=>setACvc(e.target.value)}></input>
            &nbsp;(3 number)
          </div>
          <div className={'MultipartyPayment_button'} onClick={handlePayOnClick}>pay</div>
          <div className={'MultipartyPayment_button'} onClick={handleTestOnClick}>testing</div>
          <div className={'MultipartyPayment_cardName'}>Card B</div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Bnumber">card B number:&nbsp;</label>
            <input type='text' value={Bnumber} name='Bnumber' onChange={e=>setBNumber(e.target.value)}></input>
            &nbsp;(no gap)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Bexp_month">expire month:&nbsp;</label>
            <input type='text' value={Bexp_month} name={'Bexp_month'} onChange={e=>setBExp_month(e.target.value)}></input>
            &nbsp;(1-2 number)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Bexp_year">expire year:&nbsp;</label>
            <input type='text' value={Bexp_year} name={'Bexp_year'} onChange={e=>setBExp_year(e.target.value)}></input>
            &nbsp;(2 number)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="Bcvc">CVC:&nbsp;</label>
            <input type='text' value={Bcvc} name={'Bcvc'} onChange={e=>setBCvc(e.target.value)}></input>
            &nbsp;(3 number)
          </div>
          <div className={'MultipartyPayment_button'} onClick={handleReceiveOnClick}>receive</div>
        </div>
        <div className={'MultipartyPayment_description'}>
          {description_MultipartyPayment.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export {MultipartyPayment}

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      // margin:'10px auto',
      // backgroundColor: '#00000060',
      iconColor: "#0000FF",
      // color: "#fff",
      fontWeight: 500,
      fontSize: "16px",
    },
  }
};

const description_MultipartyPayment = [
  
]