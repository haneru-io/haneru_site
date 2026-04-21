---
title: "Part 3: The Script"
description: The full Google Apps Script to copy into your spreadsheet, with a plain-English walkthrough of what each section does.
sidebar:
  order: 4
---

The following script lives inside your Google Sheet and handles the whole sync process. It reads your prices, finds each product in Shopify, and pushes the updates through via the API.

You don't need to write any of it from scratch. Copy the full script below, paste it in, fill in your credentials, and it's ready to run.

---

## Adding the Script to Your Sheet

Open your pricing spreadsheet and go to **Extensions → Apps Script**. This opens the Apps Script editor in a new tab. You'll see a default empty function, you can simply delete it and paste in the full script below.
---

## The Full Script

```javascript
// ============================================================
// CONFIGURATION — paste your values here before running
// ============================================================
const SHOPIFY_STORE = "your-store.myshopify.com";
const SHOPIFY_CLIENT_ID = "your-client-id";
const SHOPIFY_SECRET = "your-client-secret";

const API_VERSION = "2026-04";
const SHEET_NAME = "Pricing";
const DATA_START = 2; // first data row (row 1 = headers)

// Column positions — 0-based, matching your sheet layout
const COL_HANDLE = 0; // A: Handle
const COL_PRICE = 3; // D: Variant Price
const COL_COST = 4; // E: Cost per item

// ============================================================
// AUTH
// ============================================================
function getAccessToken() {
  const url = "https://" + SHOPIFY_STORE + "/admin/oauth/access_token";
  const res = UrlFetchApp.fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    payload: JSON.stringify({
      client_id: SHOPIFY_CLIENT_ID,
      client_secret: SHOPIFY_SECRET,
      grant_type: "client_credentials",
    }),
    muteHttpExceptions: true,
  });
  const data = JSON.parse(res.getContentText());
  if (!data.access_token)
    throw new Error("Auth failed — check your Client ID and Secret.");
  return data.access_token;
}

// ============================================================
// SHOPIFY REST HELPERS
// ============================================================
function shopifyGet(token, path) {
  const res = UrlFetchApp.fetch(
    "https://" + SHOPIFY_STORE + "/admin/api/" + API_VERSION + "/" + path,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      muteHttpExceptions: true,
    },
  );
  return JSON.parse(res.getContentText());
}

function shopifyPut(token, path, payload) {
  const res = UrlFetchApp.fetch(
    "https://" + SHOPIFY_STORE + "/admin/api/" + API_VERSION + "/" + path,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    },
  );
  return JSON.parse(res.getContentText());
}

// ============================================================
// MAIN SYNC
// ============================================================
function syncPrices() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet not found: " + SHEET_NAME);
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < DATA_START) {
    SpreadsheetApp.getUi().alert("No data found in sheet.");
    return;
  }

  // Set up log sheet
  let logSheet = ss.getSheetByName("Sync Log");
  if (!logSheet) {
    logSheet = ss.insertSheet("Sync Log");
    logSheet.appendRow(["Timestamp", "Handle", "Status", "Detail"]);
  }

  const timestamp = new Date().toLocaleString();
  const token = getAccessToken();
  const rows = sheet
    .getRange(DATA_START, 1, lastRow - DATA_START + 1, sheet.getLastColumn())
    .getValues();

  let synced = 0,
    skipped = 0,
    errors = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const handle = String(row[COL_HANDLE]).trim();
    const price = parseFloat(row[COL_PRICE]);
    const cost = parseFloat(row[COL_COST]);

    // Skip empty rows or rows with no valid price
    if (!handle || isNaN(price)) {
      skipped++;
      continue;
    }

    try {
      // Look up the product by Handle
      const productData = shopifyGet(
        token,
        "products.json?handle=" + handle + "&fields=id,variants",
      );

      if (!productData.products || productData.products.length === 0) {
        logSheet.appendRow([
          timestamp,
          handle,
          "NOT FOUND",
          "No product found with this handle",
        ]);
        errors++;
        continue;
      }

      const variants = productData.products[0].variants;

      // Update every variant (they all share the same price)
      for (let v = 0; v < variants.length; v++) {
        const variant = variants[v];

        // Update retail price
        shopifyPut(token, "variants/" + variant.id + ".json", {
          variant: { id: variant.id, price: price.toFixed(2) },
        });

        // Update cost if the column has a value
        if (!isNaN(cost) && cost > 0) {
          shopifyPut(
            token,
            "inventory_items/" + variant.inventory_item_id + ".json",
            {
              inventory_item: {
                id: variant.inventory_item_id,
                cost: cost.toFixed(2),
              },
            },
          );
        }

        Utilities.sleep(500); // pace the requests to stay within Shopify's rate limit
      }

      logSheet.appendRow([
        timestamp,
        handle,
        "UPDATED",
        "Updated " + variants.length + " variant(s)",
      ]);
      synced++;
    } catch (err) {
      logSheet.appendRow([timestamp, handle, "ERROR", err.message]);
      errors++;
    }
  }

  SpreadsheetApp.getUi().alert(
    "Sync complete!\n\n" +
      "✓ Updated: " +
      synced +
      "\n" +
      "— Skipped: " +
      skipped +
      "\n" +
      "✕ Errors: " +
      errors +
      "\n\n" +
      "See the Sync Log tab for details.",
  );
}

// ============================================================
// MENU
// ============================================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Shopify Sync")
    .addItem("Sync Prices", "syncPrices")
    .toUi();
}
```

---

## What Each Part Does

### Configuration

The block at the top is the only part of the script you need to touch. Paste in your store URL, Client ID, and Client Secret from Part 2, and make sure `SHEET_NAME` matches the tab name you set up in Part 1. Everything else can stay as is unless your sheet columns are in a different order.

### Auth

Before the script can talk to Shopify, it needs to exchange your Client ID and Secret for an access token. That's what `getAccessToken` does. It sends your credentials to Shopify and gets back a temporary token that's used for every API call in that run. This happens once at the start of each sync.

### The Sync loop

`syncPrices` is the main function. It reads every row in your sheet, grabs the Handle and prices, and for each one makes a call to Shopify to find the matching product. Once it has the product, it loops through all its variants and pushes the updated price to each one. If a cost is in the sheet, that gets updated too via a separate call. Shopify stores cost on the inventory item rather than the variant, which is why there are two updates per variant rather than one.

The `Utilities.sleep(500)` between each variant call is just a pause to make sure the script doesn't hit Shopify's rate limit on larger catalogues.

### The Sync Log

Every time the script runs it writes a row to a tab called Sync Log, one row per product, with a timestamp, the handle, whether it succeeded, and any detail worth knowing. If a product handle isn't found in Shopify or something goes wrong mid-sync, that's where you'll see it. The tab is created automatically the first time the script runs.

### The menu

`onOpen` adds a **Shopify Sync** menu to your spreadsheet toolbar when the sheet is opened. That's how you'll run the sync. No need to go back into the Apps Script editor once it's set up.

---

## Before You Run It

Fill in your credentials at the top of the script and click **Save** (the floppy disk icon, or Cmd/Ctrl + S). Then go back to your spreadsheet, refresh the page, and you should see the **Shopify Sync** menu appear in the toolbar. If it doesn't show up straight away, give it a few seconds. It runs on page load.

In [Part 4](/integrations/google-sheets-pricing/part-4) we'll run the sync for the first time and look at how to set it up to run automatically on a a schedule or by the simple click of a button.
