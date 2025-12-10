import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getBookings, createOrder, getOrderById } from "./db";
import { notifyOwner } from "./_core/notification";
import { PACKAGES, MENU_OPTIONS } from "@shared/packages";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const COOKIE_NAME = "session";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bookings: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          phone: z.string().min(1, "Phone is required"),
          eventType: z.string().min(1, "Event type is required"),
          eventDate: z.string().min(1, "Event date is required"),
          guestCount: z.number().min(1, "Guest count must be at least 1"),
          venue: z.string().min(1, "Venue is required"),
          serviceType: z.string().min(1, "Service type is required"),
          dietaryRequirements: z.string().optional(),
          additionalDetails: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const booking = await createBooking({
            name: input.name,
            email: input.email,
            phone: input.phone,
            eventType: input.eventType,
            eventDate: input.eventDate,
            guestCount: input.guestCount,
            venue: input.venue,
            serviceType: input.serviceType,
            dietaryRequirements: input.dietaryRequirements || null,
            additionalDetails: input.additionalDetails || null,
            status: "new",
          });

          await notifyOwner({
            title: `New Booking Inquiry from ${input.name}`,
            content: `Event Type: ${input.eventType}\nDate: ${input.eventDate}\nGuests: ${input.guestCount}\nEmail: ${input.email}\nPhone: ${input.phone}`,
          });

          return { success: true, message: "Booking inquiry submitted successfully!" };
        } catch (error) {
          console.error("[Bookings] Failed to create booking:", error);
          throw new Error("Failed to submit booking inquiry");
        }
      }),
    list: publicProcedure.query(async () => {
      try {
        return await getBookings();
      } catch (error) {
        console.error("[Bookings] Failed to fetch bookings:", error);
        return [];
      }
    }),
  }),

  packages: router({
    list: publicProcedure.query(() => {
      return Object.values(PACKAGES).map(pkg => ({
        id: pkg.id,
        type: pkg.type,
        name: pkg.name,
        priceType: pkg.priceType,
        priceGBP: pkg.priceGBP,
        description: pkg.description,
        includesFixed: pkg.includesFixed,
        selectionRules: pkg.selectionRules,
        bonus: (pkg as any).bonus,
      }));
    }),

    getPackage: publicProcedure
      .input(z.object({ packageId: z.string() }))
      .query(({ input }) => {
        const pkg = PACKAGES[input.packageId as keyof typeof PACKAGES];
        if (!pkg) throw new Error("Package not found");
        return {
          ...pkg,
          menuOptions: MENU_OPTIONS,
        };
      }),

    getMenuOptions: publicProcedure.query(() => MENU_OPTIONS),

    createCheckoutSession: publicProcedure
      .input(
        z.object({
          packageId: z.string(),
          guestCount: z.number().min(1),
          selections: z.array(
            z.object({
              category: z.string(),
              itemName: z.string(),
            })
          ),
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().optional(),
          eventDate: z.string().optional(),
          venue: z.string().optional(),
          specialRequirements: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const pkg = PACKAGES[input.packageId as keyof typeof PACKAGES];
          if (!pkg) throw new Error("Package not found");

          let totalAmountPence = 0;
          if (pkg.priceType === "perPerson") {
            totalAmountPence = pkg.priceGBP * 100 * input.guestCount;
          } else {
            totalAmountPence = pkg.priceGBP * 100;
          }

          const orderId = await createOrder(
            {
              userId: ctx.user?.id || 0,
              packageId: input.packageId,
              packageName: pkg.name,
              packageType: pkg.type,
              pricePerPerson: pkg.priceGBP * 100,
              guestCount: input.guestCount,
              totalAmountPence,
              paymentStatus: "pending",
              eventDate: input.eventDate || null,
              venue: input.venue || null,
              specialRequirements: input.specialRequirements || null,
              customerName: input.customerName,
              customerEmail: input.customerEmail,
              customerPhone: input.customerPhone || null,
            },
            input.selections
          );

          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "gbp",
                  product_data: {
                    name: pkg.name,
                    description: `${input.guestCount} guests`,
                  },
                  unit_amount: pkg.priceType === "perPerson" ? pkg.priceGBP * 100 : pkg.priceGBP * 100,
                },
                quantity: pkg.priceType === "perPerson" ? input.guestCount : 1,
              },
            ],
            mode: "payment",
            customer_email: input.customerEmail,
            client_reference_id: orderId.toString(),
            metadata: {
              orderId: orderId.toString(),
              packageId: input.packageId,
              guestCount: input.guestCount.toString(),
            },
            success_url: `${ctx.req.headers.origin}/order-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
            cancel_url: `${ctx.req.headers.origin}/packages`,
          });

          return {
            sessionId: session.id,
            url: session.url,
            orderId,
          };
        } catch (error) {
          console.error("[Packages] Failed to create checkout session:", error);
          throw new Error("Failed to create checkout session");
        }
      }),

    getOrder: publicProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        const order = await getOrderById(input.orderId);
        if (!order) throw new Error("Order not found");
        return order;
      }),
  }),
});

export type AppRouter = typeof appRouter;
