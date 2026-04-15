---
title: "Part 2: Creating Your Shopify App"
description: Create a custom app in the Shopify Dev Dashboard, set the right API scopes, and retrieve your credentials.
sidebar:
  order: 3
---

In this part we handle the Shopify side of things. We need to create a custom app that gives our script the credentials and permissions to communicate with your store.

---

## Step 1: Getting to the Dev Dashboard

Head to **Settings → Apps and sales channels**. Near the top of the page you'll see an **App development** section with a **Build apps in Dev Dashboard** button.

![Shopify Settings showing the App development section and Build apps in Dev Dashboard button](/images/gsheet_integration/shopify_settings_for_apps.png)

Before clicking it, one thing worth knowing. As of January 2026, Shopify retired the old legacy custom apps system. If you've come across tutorials referencing Private Apps or an API key setup under Settings, they're out of date. The Dev Dashboard is the current approach and it's where we're headed.

---

## Step 2: Create the App

Once in the Dev Dashboard, click **Create app** in the top right and give it a name. Something like `price-sync` is descriptive enough. Hit create and you'll land on the app settings page.

![Full app settings page showing App name, URLs, Webhooks, and Scopes sections](/images/gsheet_integration/shopify_app_settings.png)

There's quite a bit on this page. Here's what matters and what doesn't.

**URLs and Webhooks API version — skip these entirely.** These sections are for apps that embed inside the Shopify admin interface or need to receive real-time event notifications from your store. Our script does neither. It just pushes data to Shopify when you run it, so leave everything here as it is and scroll down.

---

## Step 3: Set Your Scopes

**Scopes** are permissions. They tell Shopify exactly what your app is allowed to read or write, so it's good practice to request only what's genuinely needed.

Click **Select scopes** under the Access section and add:

- `read_products`
- `write_products`

`read_products` lets the script find your products by Handle. `write_products` lets it update their prices. That covers everything the script does. Save your scopes once selected.

---

## Step 4: Install the App on Your Store

With scopes saved, you need to install the app on your store before credentials are generated. Look for the **Install app** button — Shopify will ask you to confirm the permissions you've requested. Confirm and install.

Once installed, you're ready to grab the credentials.

---

## Step 5: Retrieve Your Credentials

After installation, go to the **API credentials** tab on your app. You'll find two values here:

- **Client ID** — this is your API key, visible by default
- **Client Secret** — click **Reveal secret key** to view it

:::caution
Treat your Client Secret like a password. Anyone with it can make API calls to your store with the permissions you've granted. Don't paste it into a shared spreadsheet or commit it to a public repository. We'll store it securely in the script in Part 3.
:::

Copy both values somewhere safe — you'll need them when we write the script.

---

## What You Should Have at the End of Part 2

- A custom app created in the Shopify Dev Dashboard
- Scopes set to `read_products` and `write_products`
- App installed on your store
- Client ID and Client Secret copied and ready

In [Part 3](/integrations/google-sheets-pricing/part-3) we'll write the script itself and connect everything together.
