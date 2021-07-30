import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import {CheckoutForm} from './HookCheckOutForm';
import './index.css'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JG00dE2Ts4LItHZKtX7hxYhinxe0mOys99eAjBi6OR9xq5erxRy7x6UKYcB3pft4cmQcJt1EbK4TKzJGNgD2mSu00BdxHJjor');

const StripeContainer = ({setLogger,model}) => {
  return (
      <div className={'StripeContainer_component'}>
        <Elements stripe={stripePromise}>
            <div className={'StripeContainer_element'}>
                <CheckoutForm />
            </div>
        </Elements>
      </div>
  );
};

export default StripeContainer
