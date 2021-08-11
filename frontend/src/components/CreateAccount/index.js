import React, { useState,useRef,useEffect } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {instance,GET,POST,PUT} from "../../utils/axiosInstance"
import './CreateAccount.css'
import '../index.css'


const CreateAccount = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState('')

  const handleCreateNewAccountButtonOnClick = async () => {
    // 1 same thing with direct charge, create a token with user's card
    if (!stripe || !elements) return
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    const stripeToken = await stripe.createToken(cardElement);
    if (!error) {
      instance.post(
        '/user',
        {
          name,
          token:stripeToken.token.id
        },
      )
      .then((res) => {
            // status error
            if (res.status !== 200) {
              console.log(res)
            }else{
              alert('account id:'+res.data.cus_id);
            }
      })
      .catch(error=>console.log('error:',error))
    }
  }

  return (
    <div className={'CreateUser_container'}>
      <div className={'CreateUser_item'}>
        <div className={'CreateUser_form'}>
          <div className={'CreateUser_title'} >Stripe Element,token</div>
          <div className={'CreateUser_text'} >
            <label for="name">account name:&nbsp;</label>
            <input type='text' value={name} name='name' onChange={e=>setName(e.target.value)}></input>
            &nbsp;(any value you like)
          </div>
          <div className={'CreateUser_card'}>
            <CardElement options={CARD_OPTIONS}/>
          </div>
          <div className={'HookCheckOutForm_button'} onClick={handleCreateNewAccountButtonOnClick}>Create New Account</div>
        </div>
        <div className={'HookCheckOutForm_description'}>
          {description_account.map((record,index)=>(
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

export {CreateAccount}

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
  'this page is for user to regist as an account',
  'user is opinional to put their [email,name,address,description...] into this account, front end will collect these details first',
  'front-end will also need to get card detals. Here use token, it can be any payment method (token is most popular), which can be refered in stripe api/resource',
  'all account datails are optional and can be updated later. Once created, stripe will give a account id which should be saved in backend',
  'account is useful, can be used in all kinds of payment system/platform, in different kinds of payment (direct/subscribe/connect)',
]