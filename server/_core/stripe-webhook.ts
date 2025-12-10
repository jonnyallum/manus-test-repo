import Stripe from 'stripe';
import { Request, Response } from 'express';
import { updateOrderPaymentStatus } from '../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  if (!sig) {
    console.error('[Stripe Webhook] Missing signature');
    return res.status(400).json({ error: 'Missing signature' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (error) {
    console.error('[Stripe Webhook] Signature verification failed:', error);
    return res.status(400).json({ error: 'Signature verification failed' });
  }

  // Handle test events
  if (event.id.startsWith('evt_test_')) {
    console.log('[Stripe Webhook] Test event detected:', event.type);
    return res.json({ verified: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.client_reference_id ? parseInt(session.client_reference_id) : null;

        if (!orderId) {
          console.warn('[Stripe Webhook] No order ID in session');
          break;
        }

        console.log(`[Stripe Webhook] Payment completed for order ${orderId}`);

        // Update order status to succeeded
        await updateOrderPaymentStatus(
          orderId,
          'succeeded',
          session.payment_intent as string
        );

        // TODO: Send confirmation email to customer
        // TODO: Notify admin of new order
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment intent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment intent failed:', paymentIntent.id);

        // Find order by payment intent ID and mark as failed
        // This would require querying the database
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('[Stripe Webhook] Charge refunded:', charge.id);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error processing event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
