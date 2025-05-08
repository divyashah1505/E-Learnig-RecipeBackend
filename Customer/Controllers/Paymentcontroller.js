// Customer/Controllers/Paymentcontroller.js
const stripe = require('stripe')('sk_test_...'); // Replace with your Stripe Secret Key

const createCheckoutSession = async (req, res) => {
  try {
    const { planName, price } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: planName,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ error: 'Failed to create Stripe checkout session' });
  }
};

module.exports = {
  createCheckoutSession,
};
