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

  //----------------------------card B
  const [Bnumber,setBNumber]=useState()
  const [Bexp_month,setBExp_month]=useState()
  const [Bexp_year,setBExp_year]=useState()
  const [Bcvc,setBCvc]=useState()

  const handleProcessOnClick = () =>{
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
      <div className={'HookCheckOutForm_item'}>
        <div className={'HookCheckOutForm_form'}>
          <div className={'HookCheckOutForm_title'} >Stripe Element,token</div>
          <div className={'HookCheckOutForm_card'}>
            <CardElement options={CARD_OPTIONS}/>
          </div>
          <div className={'HookCheckOutForm_button'} onClick={handleProcessOnClick}>Pay</div>
        </div>
        <div className={'HookCheckOutForm_description'}>
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