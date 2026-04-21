---
title: Google Sheets → Shopify Pricing via API
description: A practical walkthrough of using Google Sheets and the Shopify Admin API to manage and sync catalogue pricing at scale.
sidebar:
  label: Overview
  order: 1
---

## Introduction

When it comes to managing your Shopify catalogue, few things are more important than accurate pricing. Having the correct Cost and Retail Price on every product isn't just good housekeeping. It directly affects your margins, your reporting, and ultimately your business.

For this tutorial, it's assumed you already have some form of digital pricing record: a spreadsheet, a ledger, a supplier price list, something that holds your **Product | Cost | RRP** data. That existing document is the starting point.

Setting the cost and retail price on an individual product in Shopify is straightforward. The problem is scale. Consider a practical example:

> **Scenario:** The price of cotton has increased 25% and your supplier is passing the cost on. Your margin takes a hit and retail prices need to increase to compensate. You have 2,000 products in your catalogue that need updating. What's the best approach?

Going product by product is obviously not viable. A step up from that is exporting your catalogue as a CSV file and editing prices in bulk before re-importing. It works, but speaking from experience, it's a tedious process prone to human error from repetitive data entry. It also involves downloading, editing, and re-uploading files, which becomes unwieldy fast when multiple versions of the same spreadsheet start accumulating.

It's worth mentioning [Matrixify](https://matrixify.app) here. It's an excellent Shopify app that makes bulk CSV imports and exports significantly more manageable, and it's well worth knowing about for one-off bulk operations. If you need to make a large structural change to your catalogue, Matrixify is the tool to reach for.

But for **ongoing price management** where your pricing sheet already exists, prices change regularly, and you want updates to flow into Shopify without manual intervention, there's a better route. This tutorial walks through building a direct connection between Google Sheets and the Shopify Admin API, so that updating a price in your sheet and running a sync is all it takes to keep your store current.

---

## How It Works

The setup has three components working together:

**Google Sheets** acts as your pricing source of truth. Your catalogue lives here: product names, SKUs, variant IDs, cost prices, and retail prices. This is the document you already maintain; the goal is to make it do more work.

**Google Apps Script** is the glue. It's a scripting environment built directly into Google Sheets with no external server, no separate application to deploy, and nothing to install. You write a script that lives inside your spreadsheet, reads your pricing data, and sends it to Shopify. It can be run manually on demand or triggered automatically on a schedule.

**The Shopify Admin API** is the endpoint that accepts the updates. When the script runs, it makes a series of API calls, one per product variant, updating the price and compare-at price in your Shopify store directly. No CSV, no import screen, no manual steps.

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
The script runs inside Google Sheets via Google Apps Script. A standard Google account is all that's required. No additional Google Cloud setup is needed.

**Your pricing data in a spreadsheet**
You don't need it formatted in any particular way yet. Part 1 covers structuring it correctly. But having your catalogue data (product names, SKUs, and prices) accessible in a spreadsheet before you start will make the process faster.

**No coding experience required**
The script is provided in full and each section is explained. That said, a basic familiarity with Google Sheets (knowing how to navigate cells, columns, and the menu bar) will help.

:::note[One row per product, not per variant]
This setup uses the product **Handle** (Shopify's unique identifier for each product, which maps directly to your SKU) as the key in the sheet. Because all variants of a product share the same price (Small, Medium, and Large of SKU 001 are all the same price), you only need one row per product. The script looks up the product by its Handle, retrieves all its variants, and applies the same price to each one automatically.

This keeps the sheet clean and mirrors the way most store owners actually think about pricing: at the product level, not the variant level. If you have a use case where individual variants need different prices (a premium for oversized variants, for example), the script would need adapting, but for the majority of catalogues this approach is simpler and more maintainable.
:::

---

## What's in This Tutorial

- **[Part 1: Setting Up Your Google Sheet](/integrations/google-sheets-pricing/part-1)**: Exporting your catalogue, cleaning it down to one row per product, and structuring the sheet the script will read from.
- **[Part 2: Creating Your Shopify App](/integrations/google-sheets-pricing/part-2)**: Creating a custom app in the Shopify Dev Dashboard, setting the right API scopes, and getting your credentials.
- **[Part 3: The Script](/integrations/google-sheets-pricing/part-3)**: The full Google Apps Script with a section-by-section walkthrough of what it does.
- **[Part 4: Running and Automating](/integrations/google-sheets-pricing/part-4)**: Running the sync manually and setting up a trigger to run it on a schedule.
