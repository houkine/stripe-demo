import React, { useState,useRef,useEffect } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {instance,GET,POST,PUT} from "../../utils/axiosInstance"
import './HookDirectElement.css'
import '../index.css'


const HookDirectElement = () => {
  const stripe = useStripe();
  const elements = useElements();

  //----------------------------for customer card
  const [number,setNumber]=useState()
  const [exp_month,setExp_month]=useState()
  const [exp_year,setExp_year]=useState()
  const [cvc,setCvc]=useState()

  //------------------------------------------------------------------------------by token
  const handleSubmitByToken = async () => {

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how to find your CardElement because there can only ever be one of each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // const card = elements.getElement(CardElement);
    const stripeToken = await stripe.createToken(cardElement);

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[stripeToken]', stripeToken);
      instance.post(
        '/directCharge/token',
        {stripeToken},
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
  };
  //------------------------------------------------------------------------------by stripe check out
  const handleCheckOutOnClick = () =>{
    instance.post(
      '/directCharge/checkout',
    )
    .then((res) => {
      // status error
      if (res.status !== 200) {
          console.log(res)
      }else{
        window.open(res.data)
      }
    })  
    .catch(error=>console.log('error:',error))
  }
  //------------------------------------------------------------------------------customer UI
  const handleCustomerUIOnClick = () =>{
    instance.post(
      '/directCharge/customerUI',
      {
        card: {
          number,exp_month,exp_year,cvc,
        },
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
    <div className={'HookCheckOutForm_container'}>
      {/* -------------------------------------------------------------------- Stripe Element,token*/}
      <div className={'HookCheckOutForm_item'}>
        <div className={'HookCheckOutForm_form'}>
          <div className={'HookCheckOutForm_title'} >Stripe Element,token</div>
          <div className={'HookCheckOutForm_card'}>
            <CardElement options={CARD_OPTIONS}/>
          </div>
          <div className={'HookCheckOutForm_button'} onClick={handleSubmitByToken}>Pay</div>
        </div>
        <div className={'HookCheckOutForm_description'}>
          {description_CardToken.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------------- check out*/}
      <div className={'HookCheckOutForm_item'}>
        <div className={'HookCheckOutForm_form'}>
          <div className={'HookCheckOutForm_title'} >check out</div>
          <div className={'HookCheckOutForm_button'} onClick={handleCheckOutOnClick}>Pay</div>
        </div>
        <div className={'HookCheckOutForm_description'}>
          {description_Checkout.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------------- customer UI*/}
      <div className={'HookCheckOutForm_item'}>
        <div className={'HookCheckOutForm_form'}>
          <div className={'HookCheckOutForm_title'} >customer UI</div>
          <div className={'HookCheckOutForm_cardDetail'} >
            <label for="number">card number:&nbsp;</label>
            <input type='text' value={number} name='number' onChange={e=>setNumber(e.target.value)}></input>
            &nbsp;(no gap)
          </div>
          <div className={'HookCheckOutForm_cardDetail'} >
            <label for="exp_month">expire month:&nbsp;</label>
            <input type='text' value={exp_month} name={'exp_month'} onChange={e=>setExp_month(e.target.value)}></input>
            &nbsp;(1-2 number)
          </div>
          <div className={'HookCheckOutForm_cardDetail'} >
            <label for="exp_year">expire year:&nbsp;</label>
            <input type='text' value={exp_year} name={'exp_year'} onChange={e=>setExp_year(e.target.value)}></input>
            &nbsp;(2 number)
          </div>
          <div className={'HookCheckOutForm_cardDetail'} >
            <label for="cvc">CVC:&nbsp;</label>
            <input type='text' value={cvc} name={'cvc'} onChange={e=>setCvc(e.target.value)}></input>
            &nbsp;(3 number)
          </div>
          <div className={'HookCheckOutForm_button'} onClick={handleCustomerUIOnClick}>Pay</div>
        </div>
        <div className={'HookCheckOutForm_description'}>
          {description_CustomerUI.map((record,index)=>(
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

export {HookDirectElement}

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
const description_CardToken = [
  'wait user import their card detail. For demo here, card number can be 4242424242424242, other fields can be valid date, random CVV , and random 5 digital postcode.',
  'once click pay, it will first send detail to stripe, to get a valid token',
  'once get the token, send token to backend, backend will charge by token plus money (cents)',
  'backend will and is supposed to send payment result back to frontend, and write related records to dataset',
  'this is direct charge. No account/anything else will be created. token will be expired after payment',
]
const description_Checkout = [
  'backend send payment request to stripe',
  'backend send payment url to front-end and front-end open a new tab for stripe payment web page. This url and payment page is from stripe official page, we do not need to make it, just call apis.',
  'payment status will be send as a link/request. Both front-end/backend can deal with it. Normally it will be front-end page, here send to backend',
  'backend cannot get access to card detail, as whole payment process is controlled by stripe',
  'this is direct charge. No account/anything else will be created. token will be expired after payment',
]
const description_CustomerUI = [
  'just like normal form submit, front-end collect details and send to backend',
  'backend will first create a token, then use this token to charge, then send response back to front-end',
  'this is direct charge. No account/anything else will be created. token will be expired after payment',
  'this way is not safe, as backend can access to user cards, but can create customer UI, so for complex design can consider this',
]