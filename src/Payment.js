import React, { useEffect } from 'react';

import './Payment.css';

import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";

import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './Axios';
import { db } from './firebase';

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();

	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generate special stripe secret to charge customer

		const getClientSecret = async () => {
			const response = await axios({
				method: 'post',
				//Stripe expects total in a currencies subunits
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`
			});
			setClientSecret(response.data.clientSecret)
		}

		getClientSecret();
	}, [basket])

	console.log('The secret is >>>', clientSecret)

	const handleSubmit = async (event) => {
		//stripe
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		}).then(({ paymentIntent }) => {
			// paymentIntent  = payment confirmation

			db
				.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created
				})

			setSucceeded(true);
			setError(null)
			setProcessing(false)

			dispatch({
				type: 'EMPTY_BASKET'
			})

			history.replace('/orders')
		})
	}

	const handleChange = event => {
		//Listen Card Element
		// Display Customer Card Errors
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "")
	}

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>

				{/* Payment Section - Delivery Address*/}
				<div className='payment__section'>
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>

					<div className="payment__address">
						<p>{user?.email}</p>
						<p>LBS Marg, Ghatkopar</p>
						<p>Mumbai, Maharashtra</p>
					</div>

				</div>
				{/* Payment Section - Review Items*/}
				<div className='payment__section'>
					<div className="payment__title">
						<h3>Review Items and Delivery</h3>
					</div>

					<div className="payment__items">
						{basket.map(item => (
							<CheckoutProduct
								id={item.id}
								image={item.image}
								title={item.title}
								price={item.price}
								rating={item.rating}
							/>
						))}

					</div>
				</div>
				{/* Payment Section - Payment Method*/}
				<div className='payment__section'>
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>

					<div className="payment__details">
						{/* Stripe Magic */}
						<form on onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<h3>Order Total: {value}</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₹ "}
								/>

								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p> Processing </p> : "Buy Now"}</span>
								</button>
							</div>

							{/* Errors */}
							{error && <div>{error}</div>}

						</form>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Payment
