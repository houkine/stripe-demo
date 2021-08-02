import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import {HookDirectElement} from './HookDirectElement';
import {MultipartyPayment} from './MultipartyPayment';
import logger from '../utils/logger';
import './index.css'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JG00dE2Ts4LItHZKtX7hxYhinxe0mOys99eAjBi6OR9xq5erxRy7x6UKYcB3pft4cmQcJt1EbK4TKzJGNgD2mSu00BdxHJjor');

const StripeContainer = ({setLogger,model}) => {
  let result = {
    'account':{
      header: 'actions on user and stripe account',
    },
    'direct charge':{
      header: 'one time payment',
    },
    'subscribe':{},
    'multipart payments':{},
    'refund':{},
  }[model]
  return (
      <div className={'StripeContainer_component'}>
        <div className={'Form_container'}>
          <div className={'Form_header'}>
            {result.header}
          </div>
          <div className={'Form_body'}>
            <Elements stripe={stripePromise}>
              {{
                  'account':<div>haha</div>,
                  'direct charge':<HookDirectElement/>,
                  'subscribe':<div />,
                  'multipart payments':<MultipartyPayment />,
                  'refund':<div />,
              }[model]}
            </Elements>
          </div>
        </div>
      </div>
  );
};

export default StripeContainer

