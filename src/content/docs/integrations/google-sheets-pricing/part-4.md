---
title: "Part 4: Running and Automating"
description: Run the sync for the first time and set up a trigger to keep your prices updated automatically.
sidebar:
  order: 5
---

At this point everything is in place. The sheet is structured, the app is created, and the script is saved. This part covers running it for the first time and setting it up so it runs automatically going forward.

---

## Running It for the First Time

Go back to your spreadsheet and refresh the page. After a few seconds you should see a **Shopify Sync** menu appear in the toolbar next to Help. Click it and select **Sync Prices**.

The first time you run it, Google will ask you to authorise the script. This is standard — Apps Script needs permission to make external requests on your behalf. Click **Review permissions**, choose your Google account, and work through the prompts. You'll likely see a warning that the app isn't verified — that's expected for scripts you've written yourself. Click **Advanced** and then **Go to [your script name]** to proceed.

Once authorised, the sync will start. You won't see much happening while it runs — just a loading cursor. For a large catalogue this can take a few minutes. When it finishes you'll get an alert showing how many products were updated, skipped, and errored.

:::tip
The first run is a good one to keep an eye on. Open the Sync Log tab before you kick it off and keep it visible. If anything goes wrong with a specific product you'll see it there as it happens.
:::

---

## Checking the Sync Log

The Sync Log tab is created automatically on first run. Each row is one product, showing the timestamp, handle, status, and any detail worth knowing.

The main statuses to look for are:

**UPDATED** — price pushed to Shopify successfully.

**NOT FOUND** — the handle in your sheet doesn't match any product in Shopify. Usually a typo. Check the Handle column and re-run.

**ERROR** — something went wrong mid-update. The detail column will have the error message from Shopify, which usually points at what needs fixing.

---

## Setting Up a Trigger

Running the sync manually is fine for ad hoc price changes, but if you want it to run on a schedule without you having to think about it, you can set up a trigger in Apps Script.

Go back to **Extensions → Apps Script** and click the clock icon in the left sidebar (**Triggers**). Click **Add Trigger** in the bottom right.

Set it up as follows:

- **Function to run:** `syncPrices`
- **Event source:** Time-driven
- **Type:** whatever frequency makes sense for your catalogue

A daily trigger works well for most stores. If your prices change frequently you could go hourly, but for the majority of catalogues once a day is plenty.

Save the trigger and that's it. The script will run on its own schedule from here, and the Sync Log will keep a record of every run.

---

## Wrapping Up

You now have a live connection between your Google Sheet and your Shopify store. Update a price in the sheet, run the sync (or wait for the trigger), and it's in Shopify. No exports, no imports, no manually hunting down products.

A few things worth knowing as you use it:

The script updates every product in the sheet on each run. If you only want to push products where the price has actually changed, that's possible to add — it involves storing the last synced price in a tracking column and comparing it before each update. The production version of this script does exactly that, but it adds complexity that isn't worth it until you're comfortable with the basics.

The API version is set at the top of the script (`API_VERSION`). Shopify deprecates older API versions periodically — if the sync stops working one day with no obvious explanation, this is the first thing to check.
