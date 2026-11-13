import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const database = mysql.createPool({
  host: process.env['DB_HOST'] || 'localhost',
  port: Number(process.env['DB_PORT'] || 3306),
  user: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_NAME'] || 'mars_shop',
  waitForConnections: true,
  connectionLimit: 10,
});

const products = [
  { id: 0, name: 'Trip to Mars T-Shirt', priceCents: 2590 },
  { id: 1, name: 'Trip to Mars Mug', priceCents: 590 },
  { id: 2, name: 'Trip to Mars Hoodie', priceCents: 3590 },
  { id: 3, name: 'Trip to Mars Poster', priceCents: 2000 },
];

app.use(express.json());

app.post('/api/orders', async (req, res) => {
  const { customer, items } = req.body as {
    customer?: {
      firstName?: string;
      lastName?: string;
      location?: string;
      paymentMethod?: string;
    };
    items?: Array<{ productId?: number; quantity?: number }>;
  };
  const validPaymentMethods = ['card', 'delivery'];
  const paymentMethod = customer?.paymentMethod;

  if (
    !customer?.firstName?.trim() ||
    !customer.lastName?.trim() ||
    !customer.location?.trim() ||
    typeof paymentMethod !== 'string' ||
    !validPaymentMethods.includes(paymentMethod) ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    res.status(400).json({ error: 'Invalid order details.' });
    return;
  }

  const orderItems = items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    const quantity = Number(item.quantity);
    return product && Number.isInteger(quantity) && quantity > 0 && quantity <= 99
      ? { product, quantity }
      : null;
  });

  if (orderItems.some((item) => item === null)) {
    res.status(400).json({ error: 'Invalid order items.' });
    return;
  }

  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const totalCents = orderItems.reduce(
      (total, item) => total + item!.product.priceCents * item!.quantity,
      0,
    );
    const [orderResult] = await connection.execute<mysql.ResultSetHeader>(
      `INSERT INTO orders
        (first_name, last_name, delivery_location, payment_method, total_cents)
       VALUES (?, ?, ?, ?, ?)`,
      [
        customer.firstName.trim(),
        customer.lastName.trim(),
        customer.location.trim(),
        paymentMethod,
        totalCents,
      ],
    );

    for (const item of orderItems) {
      await connection.execute(
        `INSERT INTO order_items
          (order_id, product_id, product_name, unit_price_cents, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderResult.insertId,
          item!.product.id,
          item!.product.name,
          item!.product.priceCents,
          item!.quantity,
        ],
      );
    }

    await connection.commit();
    res.status(201).json({ orderId: orderResult.insertId });
  } catch (error) {
    await connection.rollback();
    console.error('Failed to save order:', error);
    res.status(500).json({ error: 'Could not save order.' });
  } finally {
    connection.release();
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
