# Test task for a fullstack developer role

## Getting Started

Create .env.local file in the root of the project:

```
MONGODB_URI="mongodb_uri(with database name)"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="stripe_publishable_key"
STRIPE_SECRET_KEY="stripe_secret_key"
JWT_ACCESS_SECRET="access_secret"
JWT_REFRESH_SECRET="refresh_secret"
```

Run the development server:

```
npm run dev
```

Set up Stripe CLI for webhooks to work. [Learn More](https://stripe.com/docs/stripe-cli)
\
Run Stripe CLI:

```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Open http://localhost:3000 with your browser to see the result.

Add a new product to the Stripe dashboard while the Stripe CLI is running so that it appears in the app.
