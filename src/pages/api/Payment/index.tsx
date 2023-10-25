/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import PlansServices from '../../../../services/PlansServices';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});
/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function User(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST' && req.query.pay) {
    try {
      const { email, amount, currency } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
        receipt_email: email,
      });

      res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      res.status(504).json({ message: 'Server Error', error });
    }
  } else if (req.method === 'POST' && req.query.sub) {
    const { email, payment_method, priceId } = req.body;

    const customer = await stripe.customers.create({
      payment_method,
      email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.json(subscription);
  } else if (req.method === 'GET') {
    try {
      const data = await PlansServices.getPaymentHistory(
        req?.query?.username as string,
        req?.query?.schoolSlug as string,
      );

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not Payment History' });
    }
  }
}

export default User;
