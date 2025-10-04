---
title: Analytics & Reporting Overview
description: Learn how to use Shopify reports and analytics to monitor your store performance and make data-driven decisions.
sidebar:
  order: 5
---

# Analytics & Reporting Overview

Data is one of the most powerful tools for growing your Shopify store. Understanding your sales trends, product performance, and customer behavior allows you to make informed decisions that improve revenue and operational efficiency.

Shopify provides a suite of analytics tools, ranging from pre-built reports to **ShopifyQL**, a query language designed to extract custom insights from your store’s data.

---

## 1. Built-In Shopify Reports

Shopify includes a number of built-in reports depending on your plan:

- **Dashboard Overview:** Quick view of total sales, orders, top products, and returning customer stats.  
- **Sales Reports:** Analyze total sales, sales by product, sales by channel, and more.  
- **Customer Reports:** Understand repeat customers, location, lifetime value, and segmentation.  
- **Acquisition Reports:** Track which channels bring the most traffic and conversions.  

These reports are excellent for a high-level overview, but sometimes you need custom queries to dig deeper.

---

## 2. ShopifyQL for Custom Queries

ShopifyQL is a lightweight query language specifically designed for Shopify analytics. You can use it to create **custom reports**, export data, or explore trends not covered by standard reports.

### **Basic Query Example: Total Sales by Product**

```sql
SELECT
  product.title,
  SUM(order.total_price) AS total_sales
FROM orders
WHERE order.created_at >= '2025-01-01'
GROUP BY product.title
ORDER BY total_sales DESC
LIMIT 10;
```
This query gives you the top 10 best-selling products for the year 2025.

```sql
SELECT
  customer.email,
  COUNT(order.id) AS orders_count,
  SUM(order.total_price) AS total_spent
FROM orders
WHERE customer.tags CONTAINS 'VIP'
GROUP BY customer.email
ORDER BY total_spent DESC
LIMIT 20;
```

Here we identify your top 20 VIP customers based on purchase history.

For a more in-depth look at ShopifyQL and building your own queries, you can read the guide [An Intro to Shopify QL](#)