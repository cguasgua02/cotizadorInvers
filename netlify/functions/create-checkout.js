
const stripe = require('stripe')('sk_test_TU_CLAVE_SECRETA'); // Cambia por tu clave secreta real

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { amount, email, empresa } = data;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Setup IA para ${empresa || 'tu empresa'}`
          },
          unit_amount: Math.round(parseFloat(amount) * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      customer_email: email,
      success_url: 'https://tusitio.netlify.app/gracias',
      cancel_url: 'https://tusitio.netlify.app/error'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error("Error en Stripe:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al crear sesión de pago' })
    };
  }
};
