import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "First 10 Companies Enrollment Deal (Monthly)",
    price: 50,
    productBy: "NetworkZen"
  })

  const makePayment = token => {
    const body ={
      token, 
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8282/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE ", response)
      const {status} = response;
      console.log("STATUS ", status)
    })
    .catch(error => console.log(error));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="row">
        <div>
    <h4 class="center-align">First 20 Sign-Ups Discount for the NetworkZen Platform</h4>
  </div>
</div>

<h6 class="center-align">*By pre-ordering early access to our platform, we only charge you 50% of the actual
cost for <br></br>the first 12 months, which saves you almost $1500 in cybersecurity costs.  </h6>

<h6 class="center-align">Your access to the platform will begin at the date of launch, which is October 25th, 2020.
<br></br> Do not be alarmed of the amount of time you have wait between you pre-ordering our platform,<br></br> and the actual platform launch date.
In between the time of purchase and time of launch,<br></br> we will still take care of your cybersecurity needs, we will just be doing it <br>
</br> via our team of cybersecuirty engineers
</h6>

        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
         
        </a>
        <br></br>
        <StripeCheckout 
        stripeKey="pk_live_51HSZgBEFjB8SbJCIEaRbjphURYkZeGbM0brbf1Iyhex0q9d7rG1khptf2IuzES2bHFuK4z2ORCB3DD5E07HxGbrx00vszVWrVR"
        token={makePayment}
        name="Purchase Membership to the NetworkZen Platform"
        >
          <button className="btn-large blue">Pre-Order Platform Access for ${product.price}/month</button>

        </StripeCheckout>
      </header>
      
    </div>

  
  );
}

export default App;
