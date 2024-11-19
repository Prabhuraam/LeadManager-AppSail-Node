# LeadManager - AppSail

This project demonstrates how to build and deploy a Lead Manager application using Zoho Catalyst's **AppSail** feature with Node.js and Express. It includes Catalyst authentication and integrates with Zoho CRM for lead management.

## Features
- User authentication via Zoho Catalyst
- CRUD operations for leads in Zoho CRM
- Integration with Zoho APIs for OAuth and CRM data handling
- Web-based client UI built with HTML, CSS, and JavaScript

---

## Prerequisites

1. Install [Node.js](https://nodejs.org/) (Node.js 18 or later recommended).
2. Install [Catalyst CLI](https://docs.catalyst.zoho.com/en/getting-started/installing-catalyst-cli/#install-the-cli).
3. Zoho API credentials (Client ID, Client Secret).

---

## Project Setup

1. Clone the repository or download the project files.
2. Follow the **LeadManager Tutorial** up to Step 3 to create the project and set up the datastore table in Zoho Catalyst.
3. Navigate to the project directory and initialize Catalyst:
    ```bash
    catalyst init
    ```
4. Select the **AppSail** feature and configure the project with:
   - Programming Language: Node 18
   - Application Name: `LeadManagerApp`
   - Build Path: Current Project Directory
5. Create a folder named `public` to store web client files.

---

## Backend Setup

1. Initialize the Node.js application:
    ```bash
    npm init
    ```
2. Create an `index.js` file and paste the provided repository code.
3. Replace placeholders in `index.js`:
   - **CLIENTID**: Your Zoho Client ID.
   - **CLIENT_SECRET**: Your Zoho Client Secret.

4. Create an `app-config.json` file with the following content:
    ```json
    {
      "command": "node index.js",
      "build_path": "/",
      "stack": "node18",
      "env_variables": {},
      "memory": 256,
      "scripts": {},
      "raw": {},
      "catalyst_auth": true,
      "login_redirect": "/index.html"
    }
    ```

---

## Frontend Setup

1. Copy the provided `index.html`, `login.html`, `main.js`, and `main.css` files into the `public` folder.
2. In `index.html`, replace the `<<client_id>>` placeholder with your actual Client ID.

---

## Deployment

1. Deploy the project to Zoho Catalyst:
    ```bash
    catalyst deploy
    ```
    Once successfully deployed, you will see a appsail URL generated in the terminal which you can use to access your appsail application.
---

##  Register the Client Application in Zoho API Console

To enable authentication and communication with Zoho services, you need to register your client application in the **Zoho API Console**. This will generate the **Client ID** and **Client Secret**, which are required for generating and refreshing authentication tokens.

### Steps to Register the Client Application:

1. Go to the [Zoho API Console](https://api-console.zoho.com/) and click **Get Started**.
2. Choose **Server-based Applications** as the client type.
3. Enter the **Client Name** as `LeadManagerApp`.
4. Provide the following details:
   - **Homepage URL**: `{APP_DOMAIN}/index.html`
   - **Authorized Redirect URIs**: `{APP_DOMAIN}/generateToken`

   Replace `{APP_DOMAIN}` with the application domain for your Appsail URL.

> **Note**: When testing locally, the Catalyst CLI serves the app on port `3001` by default.

5. Click **Create** to complete the registration. The API Console will generate the **Client ID** and **Client Secret**.

### Post-Registration Configuration:
- Copy the **Client ID** and **Client Secret** and paste them into the corresponding placeholders in your project files:
  - `index.js`
  - `index.html`
- These credentials are necessary for generating the initial Access Token and Refresh Token and for subsequent token refresh operations.


### Adding Local Testing Configuration:
For local testing, add the following **Authorized Redirect URI**: `{LOCALHOST_DOMAIN}/generateToken`




---

## Usage

1. Open the deployed app in your browser.
2. Authenticate using Zoho accounts.
3. Use the web interface to:
   - Add new leads
   - View and manage existing leads
   - Delete or update lead information

---

## Acknowledgments

- Built using [Zoho Catalyst](https://www.zoho.com/catalyst/).
- Integrated with [Zoho CRM](https://www.zoho.com/crm/).
