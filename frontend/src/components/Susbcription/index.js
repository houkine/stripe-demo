import React, { useState,useRef,useEffect } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {instance,GET,POST,PUT} from "../../utils/axiosInstance"
import './Susbcription.css'
import '../index.css'


const Susbcription = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [stripeAccount, setstripeAccount] = useState('')
  const [SubscriptionStatus, setSubscriptionStatus] = useState('')

  const [CreateSubscriptionAccount, setCreateSubscriptionAccount] = useState('')
  const [CancelSubscriptionAccount, setCancelSubscriptionAccount] = useState('')


  const handleCheckOnClick = () =>{
    instance.get(
      '/subscribe',
      {
        params:{customerId:stripeAccount},
      },
    )
    .then((res) => {
          // status error
          if (res.status !== 200) {
            console.log(res)
          }else{
            setSubscriptionStatus(res.data)
          }
    })
    .catch(error=>console.log('error:',error))
  }

  const handleCreateSubscriptionOnClick = () =>{
    instance.post(
      '/subscribe',
      {
        customerId:CreateSubscriptionAccount,
      },
    )
    .then((res) => {
          // status error
          if (res.status !== 200) {
            console.log(res)
          }else{
            alert('successed!')
          }
    })
    .catch(error=>console.log('error:',error))
  }

  const handleCancelSubscriptionOnClick = () =>{
    instance.delete(
      '/subscribe',
      {
        data:{customerId:CancelSubscriptionAccount},
      },
    )
    .then((res) => {
          // status error
          if (res.status !== 200) {
            console.log(res)
          }else{
            alert('canceled')
          }
    })
    .catch(error=>console.log('error:',error))
  }

  return (
    <div className={'Susbcription_container'}>
      {/* --------------------------------------------------Check Subscription Status */}
      <div className={'Susbcription_item'}>
        <div className={'Susbcription_form'}>
          <div className={'Susbcription_title'} >Check Subscription Status</div>
          <div className={'Susbcription_text'} >
            <label for="stripeAccount">stripe account number:&nbsp;</label>
            <input type='text' value={stripeAccount} id='stripeAccount' onChange={e=>setstripeAccount(e.target.value)}></input>
            &nbsp;('sub_***')
          </div>
          <div className={'Susbcription_text'} >{'subscription.status='+SubscriptionStatus}</div>
          <div className={'HookCheckOutForm_button'} onClick={handleCheckOnClick}>Check</div>
        </div>
        <div className={'Form_body_right'}>
          {description_account.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------add Subscription  */}
      <div className={'Susbcription_item'}>
        <div className={'Susbcription_form'}>
          <div className={'Susbcription_title'} >Create Subscription</div>
          <div className={'Susbcription_text'}>
            <label for="CreateSubscriptionAccount">stripe customer id:&nbsp;</label>
            <input type='text' value={CreateSubscriptionAccount} id='CreateSubscriptionAccount' onChange={e=>setCreateSubscriptionAccount(e.target.value)}></input>
            &nbsp;('sub_***')
          </div>
          <div className={'HookCheckOutForm_button'} onClick={handleCreateSubscriptionOnClick}>Create</div>
        </div>
        <div className={'Form_body_right'}></div>
      </div>

      {/* --------------------------------------------------cancel Subscription  */}
      <div className={'Susbcription_item'}>
        <div className={'Susbcription_form'}>
          <div className={'Susbcription_title'} >Cancel Subscription</div>
          <div className={'Susbcription_text'}>
            <label for="CancelSubscriptionAccount">stripe customer id:&nbsp;</label>
            <input type='text' value={CancelSubscriptionAccount} id='CancelSubscriptionAccount' onChange={e=>setCancelSubscriptionAccount(e.target.value)}></input>
            &nbsp;('sub_***')
          </div>
          <div className={'HookCheckOutForm_button'} onClick={handleCancelSubscriptionOnClick}>Delete</div>
        </div>
        <div className={'Form_body_right'}></div>
      </div>
    </div>
  );
};

export {Susbcription}

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

const description_account = [
  '',
]