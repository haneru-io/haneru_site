---
title: Introduction to ShopifyQL
description: Learn how to use ShopifyQL to query and analyze your Shopify store data with practical examples.
---

ShopifyQL is Shopify's powerful query language designed specifically for analyzing your store's data. Think of it as a simplified version of SQL, but built exclusively for e-commerce analytics. With ShopifyQL, you can extract insights from your orders, products, customers, and sales data without needing to export data or use third-party tools.

## What is ShopifyQL?

ShopifyQL allows you to write queries directly in Shopify's analytics interface to answer specific questions about your store. It's particularly useful when you need to:

- Analyze sales trends and patterns
- Identify top-performing products or collections
- Understand customer behavior across different regions
- Create custom reports that aren't available in standard Shopify analytics

Below is an example of the Shopify QL interface. The queries can be written using ShopifyQL or selected using the UI on the right.

![Shopify QL Dashboard](#)

## Basic ShopifyQL Syntax

ShopifyQL queries follow a straightforward structure:

```sql
FROM [data_source]
SHOW [fields]
WHERE [conditions]
GROUP BY [grouping]
ORDER BY [sorting]
LIMIT [number]
```

Not all clauses are required - you can build queries as simple or complex as your analysis needs.

## Example 1: Top Selling Products This Month

Let's start with a common question: which products are selling best this month:

```sql
FROM sales
  SHOW net_sales
  GROUP BY product_title WITH TOTALS
  SINCE 2024-10-01 UNTIL 2024-10-31
  ORDER BY net_sales DESC
  LIMIT 10
VISUALIZE net_sales
```

**What this query does:**
- Reads `FROM SALES` as the dataset to look up
- Uses `GROUP BY` 
- Specifices date range with `SINCE`
- `ORDER BY` presents the data from high to low
- Restrict returned number of products to 10 with `LIMIT`


## Example 2: Revenue by Country

Another common report you may want to run is Revenue by Country

```sql
FROM orders
SHOW billing_region_name, sum(total_sales) AS total_revenue
WHERE order_date >= '2025-01-01'
GROUP BY billing_region_name
ORDER BY total_revenue DESC
LIMIT 15
```

**What this query does:**
- Uses `billing_region_name` to identify the customer's country
- `sum(total_sales)` calculates total revenue from each country
- Filters to show data from the start of the year onwards
- Returns the top 15 countries by revenue

You can adjust the date filter to focus on different time periods, such as the last quarter or last 30 days.

## Example 3: Average Order Value by Day of Week

Want to know if certain days of the week bring in higher-value orders? This insight can help optimize your marketing schedule:

```sql
FROM orders
SHOW day_of_week(order_date) AS day, avg(total_sales) AS avg_order_value
WHERE order_date >= FIRST_DAY_OF_MONTH
GROUP BY day
ORDER BY avg_order_value DESC
```

**What this query does:**
- `day_of_week(order_date)` extracts which day of the week each order was placed
- `avg(total_sales)` calculates the average order value for each day
- Groups results by day of the week
- Shows which days tend to have higher-value orders

This can reveal patterns like "our Sunday customers spend 30% more on average" which could inform when you launch promotions or send marketing emails.

## Tips for Writing ShopifyQL Queries

**Start simple**: Begin with basic queries and add complexity as you become comfortable with the syntax.

**Use date filters**: Always include relevant date filters to keep your queries performant and results relevant.

**Experiment with aggregations**: Functions like `sum()`, `avg()`, `count()`, `min()`, and `max()` are your friends for summarizing data.

**Save useful queries**: Shopify allows you to save queries you use frequently, making it easy to run regular reports.

## Where to Access ShopifyQL

You can write and run ShopifyQL queries in:

1. **Shopify Admin**: Navigate to Analytics > Reports, then click "Create custom report"
2. **Shopify Reports Editor**: For more advanced report building with visualizations

## Common Data Sources

The most frequently used data sources in ShopifyQL include:

- `orders` - Order data including products, customers, and sales amounts
- `products` - Product catalog information
- `customers` - Customer details and segments
- `sales` - Sales data aggregated at different levels

Each data source has specific fields you can query. Shopify's autocomplete feature in the query editor will suggest available fields as you type.

## Next Steps

Now that you understand the basics of ShopifyQL, try modifying these examples for your own store's needs. Experiment with different date ranges, change the metrics you're measuring, or combine multiple conditions to answer more specific questions about your business.

As you become more comfortable, you can explore more advanced features like calculated fields, time comparisons, and complex filtering conditions to build truly custom analytics for your store.