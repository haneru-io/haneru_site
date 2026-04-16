---
title: Discounts and Promotions
description: How to create and manage discount codes and automatic discounts in Shopify.
sidebar:
  order: 7
---

Shopify gives you two ways to offer discounts: codes that customers enter at checkout, and automatic discounts that apply without any input from the customer. Both live under **Discounts** in your admin sidebar.

---

## Discount Codes vs Automatic Discounts

The choice between the two usually comes down to intent.

**Discount codes** are good for targeted promotions — sending a code to your mailing list, running a campaign with a memorable code, or offering a one-time discount to a specific customer. The customer has to know the code and enter it, which gives you a layer of control.

**Automatic discounts** apply to every qualifying order without the customer doing anything. They work well for sitewide sales and time-limited promotions where you want zero friction — no code to remember, no risk of the customer forgetting to apply it at checkout.

One thing worth knowing upfront: Shopify only allows one automatic discount to be active at a time on a standard plan. If you need to stack multiple automatic discounts you're looking at Shopify Plus territory. Discount codes can be stacked if you allow it, but that's configured per-discount.

---

## Discount Types

Both codes and automatic discounts share the same set of discount types:

**Percentage** — takes a percentage off the order or specific products. The most common type for general promotions.

**Fixed amount** — takes a fixed value off, like £10 off any order over £50. More predictable for the customer, but slightly less flexible for you.

**Free shipping** — waives the shipping cost. Useful as a standalone offer or combined with a minimum spend requirement.

**Buy X get Y** — buy a set number of products and get another free or discounted. Good for moving stock or increasing average order value.

---

## Creating a Discount Code

Go to **Discounts → Create discount**. Shopify will ask you to pick a discount method — the four options are Amount off products, Amount off order, Buy X get Y, and Free shipping.

![Shopify discount creation screen showing the four discount method options](/images/discounts/discount_create_code.png)

Select your method and you'll land on the configuration screen. Give the code a name at the top — this is what customers type at checkout. You can write your own (`10PERCENTOFF`, `SUMMER20`) or generate a random one. Choose your discount value, and then set which products or collections it applies to. In the example below the discount is 10% off the Jackets collection.

![Shopify discount code configuration screen showing a 10% off code applied to the Jackets collection](/images/discounts/discount_code_config.png)

Further down you'll find the rest of the settings:

**Minimum purchase requirements** — require a minimum spend or quantity before the code activates. In the example this is set to £200, so the 10% only kicks in on orders over that amount.

**Maximum discount uses** — limit how many times the code can be used in total, or cap it at one use per customer. Setting a total cap of 200 uses with one use per customer is a reasonable setup for a targeted campaign.

**Combinations** — controls whether this discount can stack with other active discounts. By default nothing is ticked, meaning it won't combine with other codes or automatic discounts. Worth reviewing if you're running multiple promotions at once.

![Shopify discount code showing minimum spend of £200, usage limit of 200, and combinations section](/images/discounts/discount_code_config_2.png)

Set your active dates if it's time-limited, then save. The code is live immediately.

---

## Creating an Automatic Discount

Go to **Discounts → Create discount** and select your discount method, then choose **Automatic** rather than **Discount code** at the top of the form.

The setup is the same as a code with two differences: there's no code for the customer to enter — instead you give it a title that shows at checkout when it applies (something like "Summer Sale") — and usage limits aren't available, since automatic discounts apply to every qualifying order by definition.

The main controls are the discount value, which products or collections it covers, the minimum purchase requirement, and the active dates.

---

## Combining Discounts

The **Combinations** section on any discount controls whether it can stack with other active discounts. The options are combining with other product discounts, order discounts, or shipping discounts.

By default nothing is ticked. If you're running a discount code and an automatic discount at the same time, customers will only get whichever is applied first unless you explicitly allow them to combine. Worth checking any time you have more than one promotion running.

---

## Discounts vs Compare-At Price

It's worth being clear on the difference between these two, because they're often used for the same purpose but work differently.

A **discount** applies at checkout — it reduces what the customer pays when they add something to their cart. The reduction is shown in the cart and at checkout.

A **compare-at price** is a display-only field on the product itself. Setting it higher than the selling price shows a crossed-out "was" price on the product page — signalling a markdown without requiring any checkout action. There's no code, no minimum spend, and no expiry. It just changes how the price looks on the product listing.

Both have their place. Compare-at price works well for permanent markdowns and clearance items. Discounts work better for time-limited campaigns where you want to be able to turn the offer on and off cleanly.

:::caution
Be careful running both at the same time on the same product. A customer could see a crossed-out compare-at price on the product page and then have a discount code applied at checkout on top of that — which may not reflect your intended margin.
:::
