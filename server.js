const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51Px2C2RqPHDu2Fqac2MyGCQNjZ3nLfpU0LZ689ZRQ7GVzJN8JPkExIOPgknjp06579zedhK0guwSIdIzVQWm4DGb00kDRMrey6'); // استبدل المفتاح السري الخاص بك

const app = express();
const path = require('path');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint لمعالجة المدفوعات
app.post('/charge', async (req, res) => {
    const { token, amount } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: amount * 100, // Stripe يستخدم أصغر وحدة من العملة
            currency: 'USD',
            source: token,
            description: 'Test Charge'
        });

        res.json({
            message: 'Payment successful',
            charge
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// تشغيل الخادم على المنفذ 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
