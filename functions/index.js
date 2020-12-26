const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51I2DLUAziYXgPMYAAubn5lQmG35TSgIvY1nOwwI4yAAUlflJvkUAaRUxgbJu4LzMJfUEeMSiuxvqMIUO8QmOskHz00DHio0kTo')


// API

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received! for the amount of', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Subunits of Currency
        currency: "inr",
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen Command
exports.api = functions.https.onRequest(app)

// Example Endpoint
// http://localhost:5001/clone-5c1a3/us-central1/api


