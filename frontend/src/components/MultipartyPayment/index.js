import React, { useState,useRef,useEffect } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {instance,GET,POST,PUT} from "../../utils/axiosInstance"
import './MultipartyPayment.css'
import '../index.css'


const MultipartyPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  //---------------------------- all accounts
  const [accounts,setAccounts] = useState([])
  const getAccounts = () => {
    instance.get(
      '/multipartyPayment/getAll',
      {}
    )
    .then((res) => {
      // status error
      if (res.status !== 200) {
        console.log(res)
      }else{
        setBalanceFlag(!balanceFlag)
        setAccounts(res.data)
      }
    })  
    .catch(error=>console.log('error:',error))
  }
  useEffect(() => {
    getAccounts()
  }, [])
  const [balanceFlag, setBalanceFlag] = useState(true)
  //---------------------------- new account
  const [email,setEmail] = useState('')
  const [BSB,setBSB] = useState('110000')
  const [account_number,setAccount_number] = useState('000123456')
  const handleCreateCustomAccountOnClick = () =>{
    instance.post(
      '/multipartyPayment/createCustomerAccount',
      {email,BSB,account_number}
    )
    .then((res) => {
      // status error
      if (res.status !== 200) {
        console.log(res)
      }else{
        console.log(res.data)
        window.open(res.data)
      }
    })  
    .catch(error=>console.log('error:',error))
  }

  //---------------------------- pay to an account immidirately using payment intent and payment method
  const [PayToAccountNow_money,setPayToAccountNow_money]=useState(1000)
  const [PayToAccountNow_accountId,setPayToAccountNow_accountId]=useState('')
  const handlePayToAccountNow = async () => {
    if (!stripe || !elements) return
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if(error) return alert('card verify failed...')

    instance.post(
      '/multipartyPayment/payToAccountNoDelay',
      {
        PayToAccountNow_money,paymentMethod,
        id:PayToAccountNow_accountId,
      },
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
  };
  //----------------------------card A
  const [Anumber,setANumber]=useState('4242424242424242')
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
      {/* -----------------------------------list all stripe accounts connected to this stripe connect */}
      <div className={'MultipartyPayment_item'}>
        <div className={'MultipartyPayment_form'}>
          <div className={'MultipartyPayment_title'} >all accounts connected to the platform</div>
          <div className={'MultipartyPayment_accountList'} >
            {accounts.map((account,index)=>(
              <div className={'MultipartyPayment_accountItem'} >
                <div className={'MultipartyPayment_accountItemLabel'} >account:</div>
                <div className={'MultipartyPayment_accountItemContent'} >{account.id}</div>
                <div className={'MultipartyPayment_accountItemLabel'} >{'email: '}</div>
                <div className={'MultipartyPayment_accountItemContent'} >{account.email}</div>
                <div className={'MultipartyPayment_accountItemLabel'} >{'balance: '}</div>
                {/* <div className={'MultipartyPayment_accountItemContent'} >{()=>getBalance(account.id)}</div> */}
                <Balance id={account.id} freshFlag={balanceFlag}/>
              </div>
            ))}
          </div>
          <div className={'MultipartyPayment_button'} onClick={getAccounts}>refresh</div>
        </div>
        <div className={'MultipartyPayment_description'}>
          {description_listAll.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------add an account to current connect */}
      <div className={'MultipartyPayment_item'}>
        <div className={'MultipartyPayment_form'}>
          <div className={'MultipartyPayment_title'} >create a stripe account linked to this connect</div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="email">email:&nbsp;</label>
            <input type='text' value={email} name={'email'} onChange={e=>setEmail(e.target.value)}></input>
            &nbsp;(any email you like)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="BSB">BSB:&nbsp;</label>
            <input type='text' value={BSB} name={'BSB'} onChange={e=>setBSB(e.target.value)}></input>
            &nbsp;(Compulsory)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="account_number">account number:&nbsp;</label>
            <input type='text' value={account_number} name={'account_number'} onChange={e=>setAccount_number(e.target.value)}></input>
            &nbsp;(no gap needed)
          </div>
          <div className={'MultipartyPayment_button'} onClick={handleCreateCustomAccountOnClick}>create custom account</div>
        </div>
        <div className={'MultipartyPayment_description'}>
          {description_AddCustomerAccount.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------pay to an account */}
      <div className={'MultipartyPayment_item'}>
        <div className={'MultipartyPayment_form'}>
          <div className={'MultipartyPayment_title'} >pay to a connected account, money transfers right now</div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="money">money:&nbsp;</label>
            <input type='text' value={PayToAccountNow_money} name='money' onChange={e=>setPayToAccountNow_money(e.target.value)}></input>
            &nbsp;(cent, integer, min 50)
          </div>
          <div className={'MultipartyPayment_cardDetail'} >
            <label for="money">account id:&nbsp;</label>
            <input type='text' value={PayToAccountNow_accountId} name='money' onChange={e=>setPayToAccountNow_accountId(e.target.value)}></input>
            &nbsp;(account id from above)
          </div>
          <div className={'MultipartyPayment_card'}>
            <CardElement options={CARD_OPTIONS}/>
          </div>
          <div className={'MultipartyPayment_button'} onClick={handlePayToAccountNow}>pay</div>
        </div>
        <div className={'MultipartyPayment_description'}>
          {description_PayToAnAccount.map((record,index)=>(
              <div className={'HookCheckOutForm_description_item'}>
                <div className={'HookCheckOutForm_descriptionIndex'}>{(index+1)+'.'}&nbsp;</div>
                <div className={'HookCheckOutForm_descriptionContent'}>{record}</div>
              </div>
          ))}
        </div>
      </div> 
      {/* ------------------------------------pay to a transfer_group */}


      {/* <div className={'MultipartyPayment_item'}>
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
      </div> */}
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

const description_listAll = [
  
]
const description_AddCustomerAccount = [
  'usable fake customer account details are available at https://stripe.com/docs/connect/testing#account-numbers'
]
const description_PayToAnAccount = []

const Balance = ({id,freshFlag}) =>{
  const [balance, setbalance] = useState()
  const getBalance = () =>{
    instance.get('/multipartyPayment/balance',{
      params:{stripeAccount:id},
    })
    .then((res) => {
      // status error
      if (res.status !== 200) {
        console.log(res)
      }else{
        setbalance(res.data) 
      }
    })  
    .catch(error=>console.log('error:',error))
  }
  useEffect(() => {
    getBalance()
  }, [freshFlag])
  return(<div className={'MultipartyPayment_accountItemContent'} >{balance}</div>)
}