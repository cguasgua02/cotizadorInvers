const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  try {
    const { amount, email, nombre_empresa } = JSON.parse(event.body);

    console.log("📦 Payload recibido:", { amount, email, nombre_empresa });

    if (!amount || !email || !nombre_empresa) {
      throw new Error("Faltan datos obligatorios.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Proyecto IA para ${nombre_empresa}`,
            },
            unit_amount: Math.round(amount * 100), // Stripe espera centavos
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: "https://tupagina.netlify.app/exito.html",
      cancel_url: "https://tupagina.netlify.app/error.html",
    });

    console.log("✅ Session creada:", session);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error("❌ Error al crear sesión de pago:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al crear sesión de pago", detail: error.message }),
    };
  }
};
