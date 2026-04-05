# Rewards Application

## Overview
This project is a React-based Rewards Dashboard designed to track and calculate customer reward points based on transaction history over a three-month period.

Reward Program Rules:

   - Customers earn 2 points for every dollar spent over $100.
   - Customers earn 1 point for every dollar spent between $50 and $100.

The dashboard provides a clear, interactive view of customer spending and corresponding reward points, enabling businesses to better understand and engage their customer base.

## Features
   - View all transactions with reward points
   - Track monthly and total rewards per customer
   - Search, sort, and paginate data
   - Optimized with useMemo for performance
   - Tested with Jest & React Testing Library

## Tech Stack
    - React JS (JavaScript only)
    - Material-UI
    - Jest + React Testing Library

## Installation & Setup
    - git clone https://github.com/kalai-vani-p/ReactAssignment.git
    - npm install
    - npm start

## Running Tests
    - npm test

##  Architecture Layers

### 1️ Presentation Layer (UI)
    - Located in `components/`
    - Responsible for UI
    - Includes reusable components like Tables, Loaders

### 2️ Business Logic Layer
    - Located in `utils/`
    - Contains pure functions Like,
        - `calculatePoints`
        - `groupByMonths`
        - `groupByTotal`

### 3️ Data Layer
    - Uses static sample data located in sampleData/transactions.json

### 4️ Hooks Layer
    - Located in the customHooks
    - Responsible for abstracting reusable logic across the application

### 5️ Error Handling Layer
    - `ErrorBoundary/`
    - Captures runtime errors and prevents app crashes

## Approach
    - Used pure functions for calculation
    - Used map() for aggregation
    - Used useMemo for performance optimization
    - Separated logic (utils), UI (components), and API (services)

## Edge Cases Handled
    - Decimal values (100.4 → 50 points)
    - Invalid inputs (null, undefined)
    - Empty data
    - Multiple customers
    - Different months and years

## Screenshots

### Dashboard
![Dashboard](src/screenshots/Dashboard.png)

### Transactions 
![Transactions](src/screenshots/TranscationTable.png)

### Monthly Rewards
![Monthly](src/screenshots/MonthlyTable.png)

### Total Rewards
![Total](src/screenshots/TotalTable.png)

### Searching
![Search](src/screenshots/Search.png)

### Sorting
![Sorting](src/screenshots/Sorting.png)

### Error Boundary

![Error Boundary](src/screenshots/Error.png)

### Test Results

![Test Results](src/screenshots/Testcase.png)