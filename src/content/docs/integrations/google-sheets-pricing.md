---
title: Google Sheets → Shopify Pricing via API
description: A practical walkthrough of using Google Sheets and the Shopify Admin API to manage and sync catalogue pricing at scale.
sidebar:
  order: 1
---

## Introduction

When it comes to managing your Shopify catalogue, few things are more important than accurate pricing. Having the correct Cost and Retail Price on every product isn't just good housekeeping — it directly affects your margins, your reporting, and ultimately your business.

For this tutorial, it's assumed you already have some form of digital pricing record: a spreadsheet, a ledger, a supplier price list — something that holds your **Product | Cost | RRP** data. That existing document is the starting point.

Setting the cost and retail price on an individual product in Shopify is straightforward. The problem is scale. Consider a practical example:

> **Scenario:** The price of cotton has increased 25% and your supplier is passing the cost on. Your margin takes a hit and retail prices need to increase to compensate. You have 2,000 products in your catalogue that need updating. What's the best approach?

Going product by product is obviously not viable. A step up from that is exporting your catalogue as a CSV file and editing prices in bulk before re-importing. It works — but speaking from experience, it's a tedious process prone to human error from repetitive data entry. It also involves downloading, editing, and re-uploading files, which becomes unwieldy fast when multiple versions of the same spreadsheet start accumulating.

It's worth mentioning [Matrixify](https://matrixify.app) here — it's an excellent Shopify app that makes bulk CSV imports and exports significantly more manageable, and it's well worth knowing about for one-off bulk operations. If you need to make a large structural change to your catalogue, Matrixify is the tool to reach for.

But for **ongoing price management** — where your pricing sheet already exists, prices change regularly, and you want updates to flow into Shopify without manual intervention — there's a better route. This tutorial walks through building a direct connection between Google Sheets and the Shopify Admin API, so that updating a price in your sheet and running a sync is all it takes to keep your store current.

---

## How It Works

The setup has three components working together:

**Google Sheets** acts as your pricing source of truth. Your catalogue lives here — product names, SKUs, variant IDs, cost prices, and retail prices. This is the document you already maintain; the goal is to make it do more work.

**Google Apps Script** is the glue. It's a scripting environment built directly into Google Sheets — no external server, no separate application to deploy, nothing to install. You write a script that lives inside your spreadsheet, reads your pricing data, and sends it to Shopify. It can be run manually on demand or triggered automatically on a schedule.

**The Shopify Admin API** is the endpoint that accepts the updates. When the script runs, it makes a series of API calls — one per product variant — updating the price and compare-at price in your Shopify store directly. No CSV, no import screen, no manual steps.

The flow looks like this:

```
Google Sheet (your pricing data)
        ↓
Google Apps Script (reads the sheet, formats the requests)
        ↓
Shopify Admin API (receives the updates)
        ↓
Your Shopify store (prices updated)
```

The key advantage over file-based approaches is that there's no intermediate file to manage and no upload step. The script talks directly to Shopify. Once it's set up, a price change in your sheet becomes a price change in your store in seconds.

---

## Prerequisites

Before starting, make sure you have the following in place:

**A Shopify store on a paid plan**
API access is not available on the free trial. Any paid plan (Basic and above) gives you access to the Admin API, which is all you need for standard catalogue pricing. If you're on Shopify Plus and want to extend this to per-market pricing, that's covered in the follow-on article [Google Sheets → Shopify Markets Pricing](#).

**A Google account**
The script runs inside Google Sheets via Google Apps Script. A standard Google account is all that's required — no additional Google Cloud setup is needed.

**Your pricing data in a spreadsheet**
You don't need it formatted in any particular way yet — Part 1 covers structuring it correctly. But having your catalogue data (product names, SKUs, and prices) accessible in a spreadsheet before you start will make the process faster.

**No coding experience required**
The script is provided in full and each section is explained. That said, a basic familiarity with Google Sheets — knowing how to navigate cells, columns, and the menu bar will help.

:::note[One row per product, not per variant]
This setup uses the product **Handle** — Shopify's unique identifier for each product, which maps directly to your SKU — as the key in the sheet. Because all variants of a product share the same price (Small, Medium, and Large of SKU 001 are all the same price), you only need one row per product. The script looks up the product by its Handle, retrieves all its variants, and applies the same price to each one automatically.

This keeps the sheet clean and mirrors the way most store owners actually think about pricing — at the product level, not the variant level. If you have a use case where individual variants need different prices (a premium for oversized variants, for example), the script would need adapting, but for the majority of catalogues this approach is simpler and more maintainable.
:::


Let's get stuck in to Part 1 and how to get your Google Sheet setup.

---

## Part 1: Setting Up Your Google Sheet

The sheet is the foundation of the whole setup — it's where your pricing data lives and what the script reads from every time it runs. Getting the structure right here makes everything downstream simpler.

### Step 1: Export and Clean Your Shopify Product Catalogue

Start by exporting your product catalogue from Shopify. Head to **Products → Export → All products** and download the CSV. Open it up in Google Sheets and you'll be greeted by a sprawling spreadsheet with more columns than you'll ever need.

The good news is most of them can go. Delete everything except these five:

![Shopify product export with unnecessary columns removed, showing Handle, Title, Variant SKU, Variant Price, and Cost per item](/images/gsheet_integration/example_shopify_product_export.png)

| Handle | Title | Variant SKU | Variant Price | Cost per item |
|--------|-------|-------------|---------------|---------------|

:::caution
Keep these column headers exactly as they are — don't rename them. Shopify uses these specific names to recognise the data when importing, and we'll be leaning on that same structure later in the process.
:::

You'll notice straight away that most products take up more than one row. That's Shopify exporting each variant separately — so a jacket that comes in Small, Medium, and Large will have three rows, all sharing the same Handle. It might seem like this is useful (apply a different price per size?) but for our purposes it's actually just noise. We're going to use the **Handle** as the unique identifier for each product, and once a price is assigned to a product, all its variants inherit it automatically. One Handle, one price — job done.

So the next step is to strip out the duplicate variant rows and get down to one row per product:

![Cleaned sheet showing one row per product after duplicate variant rows removed](/images/gsheet_integration/example_cleaned_export.png)

Much cleaner. That's your base sheet sorted.

---

### Step 2: Your Pricing Sheet

Good news — the cleaned export from Step 1 is already your pricing sheet. You don't need to create anything new. After removing the duplicate variant rows you should have one row per product with these four columns:

| Column | Header | Description |
|--------|--------|-------------|
| A | `Handle` | Unique product identifier — this is what the script uses to find each product |
| B | `Title` | Product name — not used by the script, just there so you can read the sheet like a human |
| C | `Variant SKU` | Your internal SKU reference |
| D | `Variant Price` | The retail price you want to sync to Shopify |
| E | `Cost per item` | Your cost price — used for margin reporting in Shopify, not visible to customers |

This is now your live pricing document. When prices need updating, this is where you make the change — and the script takes care of getting it into Shopify.

:::tip
The Handle column is the one that cannot have any errors. A single typo means the script won't find that product and will skip it without any obvious warning. Copy it from the export rather than typing it manually.
:::

---

### Step 3: Name Your Sheet Tab

The script references your pricing data by the sheet tab name. Name the tab something clear and consistent — `Pricing` works well. Avoid spaces if possible; underscores are fine (`Pricing_Master`).

You can have other tabs in the same spreadsheet for other purposes — the script will only read the tab you point it at.

---

### Step 4: Lock Down the Handle Column

Once your Handles are in, protect column A so it can't be accidentally edited. A corrupted Handle means the script loses its reference to that product entirely.

To protect a column in Google Sheets: right-click the column header → **Protect range** → add a description like "Do not edit — Shopify Handles" → set permissions to only allow yourself to edit it.

This is a small step but worth doing before you share the sheet with anyone else or run it regularly.

---

### What You Should Have at the End of Part 1

- Your cleaned Shopify export open in Google Sheets
- One row per product with Handle, Title, Variant SKU, Variant Price, and Cost per item
- Duplicate variant rows removed
- The sheet tab named consistently

That's the sheet done. In Part 2 we'll set up API access in Shopify so the script has permission to write to your store.

---

## Part 2: Creating Your Shopify App

In this part we handle the Shopify side of things. We need to create a custom app that gives our script the credentials and permissions to communicate with your store.

### Step 1: Getting to the Dev Dashboard

Head to **Settings → Apps and sales channels**. Near the top of the page you'll see an **App development** section with a **Build apps in Dev Dashboard** button.

![Shopify Settings showing the App development section and Build apps in Dev Dashboard button](/images/gsheet_integration/shopify_settings_for_apps.png)

Before clicking it, one thing worth knowing. As of January 2026, Shopify retired the old legacy custom apps system. If you've come across tutorials referencing Private Apps or an API key setup under Settings, they're out of date. The Dev Dashboard is the current approach and it's where we're headed.

### Step 2: Create the App and Configure Settings

Once in the Dev Dashboard, click **Create app** in the top right and give it a name. Something like `price-sync` is descriptive enough. Hit create and you'll land on the app settings page.

![Full app settings page showing App name, URLs, Webhooks, and Scopes sections](/images/gsheet_integration/shopify_app_settings.png)

There's quite a bit on this page. Here's what matters and what doesn't.

**URLs and Webhooks API version — skip these entirely.** These sections are for apps that embed inside the Shopify admin interface or need to receive real-time event notifications from your store. Our script does neither. It just pushes data to Shopify when you run it, so leave everything here as it is and scroll down.

**Scopes — this is the important bit.** Scopes are permissions. They tell Shopify exactly what your app is allowed to read or write, so it's good practice to request only what's genuinely needed.

Click **Select scopes** under the Access section and add:

- `read_products`
- `write_products`

`read_products` lets the script find your products by Handle. `write_products` lets it update their prices. That covers everything the script does. Save your scopes once selected.

### Step 5: Credentials

*Screenshots coming — this step will cover installing the app on your store and retrieving the Client ID and Secret needed for the script.*

---

### What You Should Have at the End of Part 2

- A custom app created in the Shopify Dev Dashboard
- Scopes set to `read_products` and `write_products`
- App installed on your store with credentials ready

In Part 3 we'll write the script itself and connect everything together.