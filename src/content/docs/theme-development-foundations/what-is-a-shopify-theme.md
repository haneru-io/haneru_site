---
title: What is a Shopify Theme?
description: Understand what a Shopify theme is, how it's structured, and get an introduction to Liquid.
sidebar:
    order: 1
---

A Shopify theme is the code that controls how your store looks and behaves on the front end — everything a customer sees when they visit your site. Under the hood, a theme is a collection of files: HTML, CSS, JavaScript, and a templating language called **Liquid**, which is unique to Shopify.

You don't need to touch any of this to run a store. But understanding what a theme is — even at a high level — makes you a more capable store owner and opens the door to customisations that go beyond what the visual editor allows.

---

## The Theme Editor vs. Editing Code

Shopify gives you two ways to work with your theme:

**The Theme Editor** (no code required)
Accessed via **Online Store → Themes → Customize**, this is a visual interface for making changes. You can add, remove, and reorder sections, change colours and fonts, upload images, and adjust layout settings. For the majority of store owners, this is all you'll ever need.

**The Code Editor** (for deeper customisation)
Accessed via **Online Store → Themes → Edit code**, this gives you direct access to the theme files themselves. You can edit Liquid templates, add custom CSS, and modify JavaScript. Changes here affect the theme at a level that the visual editor can't reach.

:::note
Always duplicate your theme before editing code. Go to **Online Store → Themes**, click the three-dot menu on your active theme, and select **Duplicate**. If something breaks in the copy, your original is untouched.
:::

---

## Free vs. Paid Themes

Shopify's [Theme Store](https://themes.shopify.com) has both free and paid options.

**Free themes** are built and maintained by Shopify. They're well-built, performant, and regularly updated. Dawn is the current flagship free theme — it's fast, clean, and a solid starting point for most stores.

**Paid themes** range from roughly $200–$400 and are built by third-party developers. They often come with more built-in features and more distinctive visual styles, which can reduce the need for third-party apps. Whether the cost is justified depends on how much your store's visual identity matters to your customers.

For a new store, starting with a free theme is entirely reasonable. You can switch later — your products, content, and settings don't move with the theme, but migrating is manageable.

---

## What is Liquid?

Liquid is Shopify's templating language. It lives inside your theme files and does one job: it pulls data from your store and outputs it as HTML for the browser to display.

When a customer visits a product page, Shopify doesn't serve a static file. It takes the Liquid template for product pages, fills in the relevant data — title, price, images, variants — and generates the HTML on the fly. This happens on every page load.

Liquid has three main building blocks:

---

### 1. Objects — Output Data

Objects are wrapped in double curly braces `{{ }}` and output values from your store.

```liquid
{{ product.title }}
{{ product.price | money }}
{{ shop.name }}
```

These pull data directly from Shopify — the product title, its formatted price, your store name. You'll see these throughout any theme file.

---

### 2. Tags — Logic and Control

Tags are wrapped in curly braces with percent signs `{% %}` and handle logic — conditionals, loops, and layout structure.

```liquid
{% if product.available %}
  <button>Add to cart</button>
{% else %}
  <p>Out of stock</p>
{% endif %}
```

```liquid
{% for variant in product.variants %}
  <option value="{{ variant.id }}">{{ variant.title }}</option>
{% endfor %}
```

The first example shows a button only if the product is in stock. The second loops through every variant and outputs a dropdown option for each one.

---

### 3. Filters — Transform Output

Filters modify what an object outputs. They're added after a pipe character `|`.

```liquid
{{ product.price | money }}
{{ product.title | upcase }}
{{ article.published_at | date: "%B %d, %Y" }}
```

Here, `money` formats a price with the correct currency symbol and decimal places, `upcase` converts text to uppercase, and `date` turns a raw timestamp into a readable format like "April 15, 2026".

---

## Putting It Together

Here's a real-world example — a snippet you might find in a product card template:

```liquid
<div class="product-card">
  <a href="{{ product.url }}">
    <img src="{{ product.featured_image | img_url: '400x' }}" alt="{{ product.title }}">
    <h2>{{ product.title }}</h2>
    <p>{{ product.price | money }}</p>

    {% if product.compare_at_price > product.price %}
      <span class="sale-badge">Sale</span>
    {% endif %}
  </a>
</div>
```

This outputs a product card with the image, title, and price — and adds a "Sale" badge automatically if the compare-at price is higher than the current price. No hardcoded values anywhere; everything is pulled from Shopify at render time.

---

## Where to Go From Here

Understanding Liquid at this level means you can open a theme file and follow what it's doing — which is a meaningful step. From here:

- Browse Dawn's templates in **Online Store → Themes → Edit code** to see real Liquid in context
- Shopify's [Liquid reference documentation](https://shopify.dev/docs/api/liquid) covers every available object, tag, and filter in full detail
