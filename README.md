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
2. Install [Catalyst CLI](https://www.zoho.com/catalyst/help/cli/installation.html).
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
2. Configure the **API Console** in Zoho to include your application domain:
   - Update the **Homepage URL** and **Authorized Redirect URI** with your deployment domain.
3. For local testing:
   - Use `catalyst serve` to start the app locally.
   - Update the **API Console**'s **Homepage URL** to `http://localhost:3001`.

---

## Usage

1. Open the deployed app in your browser.
2. Authenticate using Zoho accounts.
3. Use the web interface to:
   - Add new leads
   - View and manage existing leads
   - Delete or update lead information

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Built using [Zoho Catalyst](https://www.zoho.com/catalyst/).
- Integrated with [Zoho CRM](https://www.zoho.com/crm/).
