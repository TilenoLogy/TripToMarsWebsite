# MarsShop

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files. This mode serves the Angular UI only; checkout requests require the SSR server described below.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Order database

Orders are saved through the Express API into MySQL. The `orders` table stores customer and payment details, while `order_items` stores each product and quantity. Create the database and tables once:

```bash
mysql -u root -p < database/schema.sql
```

Configure the connection before starting the SSR server. The defaults use a local
MySQL server and the `mars_shop` database:

Copy `.env.example` to `.env` and replace the password:

```powershell
Copy-Item .env.example .env
```

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=mars_shop
```

The server loads these values automatically when it starts. Never commit `.env`;
it is ignored by Git.

The checkout stores customer delivery details, the selected payment method, and
the ordered products. It does not collect or store card numbers.

To run the UI and order API together, build and start the SSR server:

```bash
npm start
```

Then open `http://localhost:4000/`. Running only `ng serve` will not save
orders because it does not run the Express API or connect to MySQL.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
