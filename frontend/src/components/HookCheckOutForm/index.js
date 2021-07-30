import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {instance,GET,POST,PUT} from "../../utils/axiosInstance"
import './HookCheckOutForm.css'


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
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

  return (
      <div className={'CheckoutForm_container'}>
        <div className={'CheckoutForm_title'}>use CardElement and Token</div>
        <CardElement options={CARD_OPTIONS}/>
        <div className={'CheckoutForm_button'} onClick={handleSubmit}>Pay 50 cent</div>
      </div>
  );
};

export {CheckoutForm}

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};