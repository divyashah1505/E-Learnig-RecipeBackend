const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
        });

        res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
};

exports.paymentSuccess = (req, res) => {
    res.send('Payment successful');
};

exports.paymentCancel = (req, res) => {
    res.send('Payment cancelled');
};
