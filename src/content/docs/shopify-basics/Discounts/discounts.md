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

Go to **Discounts → Create discount → Discount code**.

![Shopify discount code creation screen showing method options](/images/discounts/discount_create_code.png)

Give the code a name — this is what customers will type at checkout. You can let Shopify generate a random one or write your own. Something like `SUMMER20` is fine.

Choose your discount type and set the value. Then work through the configuration options below that:

**Minimum purchase requirements** — you can require a minimum spend or a minimum quantity of items. Leave this blank if the discount should apply to all orders.

**Customer eligibility** — by default a code works for anyone. You can restrict it to specific customers or segments if you want to keep it exclusive.

**Usage limits** — useful for limiting how many times a code can be used in total, or restricting it to one use per customer. Leaving both unchecked means the code can be used unlimited times.

**Active dates** — set a start and end date if it's a time-limited offer. The code becomes inactive automatically once the end date passes.

![Shopify discount code configuration showing minimum requirements and usage limits](/images/discounts/discount_code_config.png)

Save, and the code is live.

---

## Creating an Automatic Discount

Go to **Discounts → Create discount → Automatic discount**.

![Shopify automatic discount creation screen](/images/discounts/discount_create_automatic.png)

The setup is largely the same as a code, with a couple of differences. There's no code to name — instead you give it a title that customers see at checkout when the discount is applied (something like "Summer Sale" rather than `SUMMER20`). 

You also won't have usage limits in the same way, since automatic discounts apply to every qualifying order by definition. The main controls are the discount type and value, the minimum purchase requirement, and the active dates.

![Shopify automatic discount showing the title and active dates fields](/images/discounts/discount_automatic_config.png)

---

## Combining Discounts

Shopify lets you control whether a discount can be combined with other discounts. You'll see a **Combinations** section when setting up any discount:

![Shopify discount combinations options](/images/discounts/discount_combinations.png)

The options are whether the discount can be combined with other product discounts, order discounts, or shipping discounts. By default most discounts won't combine, so if you're running multiple promotions simultaneously it's worth checking this setting or customers may find that only one applies.

---

## Discounts vs Compare-At Price

It's worth being clear on the difference between these two, because they're often used for the same purpose but work differently.

A **discount** applies at checkout — it reduces what the customer pays when they add something to their cart. The reduction is shown in the cart and at checkout.

A **compare-at price** is a display-only field on the product itself. Setting it higher than the selling price shows a crossed-out "was" price on the product page — signalling a markdown without requiring any checkout action. There's no code, no minimum spend, and no expiry. It just changes how the price looks on the product listing.

Both have their place. Compare-at price works well for permanent markdowns and clearance items. Discounts work better for time-limited campaigns where you want to be able to turn the offer on and off cleanly.

:::caution
Be careful running both at the same time on the same product. A customer could see a crossed-out compare-at price on the product page and then have a discount code applied at checkout on top of that — which may not reflect your intended margin.
:::
