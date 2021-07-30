import React, { useState,useRef,useEffect } from "react";

import StripeContainer from '../components';
import './css/index.css'

const Index = () => {
  const models = [
    'account',
    'direct charge',
    'subscribe',
    'multipart payments',
    'refund',
  ]
  const [model,setModel]=useState(models[0])

  const [logger,setLogger]=useState(null)
  return (
    <div className={'index_container'}>
      <div className={'index_header'}>
        <div className={'index_header_title'}>{'Stripe demoes'}</div>
      </div>
      <div className={'index_body'}>
        <div className={'index_body_left'}>
          {models.map((thisModel,index)=>(<div
              className={thisModel==model?'index_body_leftItem_selected':'index_body_leftItem_unselected'}
              onClick={()=>setModel(thisModel)}
            >{thisModel}</div>))}
        </div>
        <div className={'index_body_mid'}><StripeContainer 
          setLogger={setLogger}
          model={model}
        /></div>
        <div className={'index_body_right'}></div>
      </div>
      <div className={'index_footer'}>
        <div className={'index_footer_test'}>{'created by Pan'}</div>
        <div className={'index_footer_test'}><a href="https://stripe.com/docs/payments">stripe official doc</a></div>
        <div className={'index_footer_test'}><a href="https://stripe.com/docs/api">stripe official api</a></div>
      </div>
    </div>
  );
};

export default Index