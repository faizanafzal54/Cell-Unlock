const config = require("../config");

const stripe = require("stripe")(`${config.development.stripeSecretKeys}`);

const createPaymentMethod = async (expiry, cardNumber, cvc) => {
  try {
    const splitedExpiry = expiry.split("/");
    const exp_month = splitedExpiry[0];
    const exp_year = splitedExpiry[1];

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardNumber,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });

    return paymentMethod;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const createCustomer = async (email) => {
  try {
    const customer = await stripe.customers.create({
      email,
    });
    return customer;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const attachPaymentMethod = async (paymentMethodId, customerId) => {
  try {
    const attachedPaymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createPaymentIntent = async (chargeObj) => {
  try {
    const payment = await stripe.paymentIntents.create(chargeObj);
    return payment;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const confirmPaymentIntent = async (paymentIntentId, optionalObj = {}) => {
  try {
    const payment = await stripe.paymentIntents.confirm(paymentIntentId, optionalObj);
    return payment;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getPaymentMethodsOfCustomer = async (customerId) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });
    return paymentMethods;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  attachPaymentMethod,
  createCustomer,
  createPaymentMethod,
  createPaymentIntent,
  confirmPaymentIntent,
  getPaymentMethodsOfCustomer,
};
