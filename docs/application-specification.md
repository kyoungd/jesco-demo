# JESCO/Saracoti Reporting UI — Application Specification (Next.js, Presentation-Only)

## 1) Purpose & scope
A lightweight Next.js front-end that renders portfolio, trading/commission, performance, and fixed-income views **purely from JSON files in `/data`**. There is **no API** in this phase; whatever is placed in `/data` is what the UI presents. This spec instructs an AI (or a developer) to implement the presentation layer while keeping data gathering/transformations separate.

Non-goals (Phase 1): admin/back-office screens, multi-level overrides, payments/execution, file ETL.

Security concept (Phase 1): client-only portal views (Master/Sub), no admin UI, with audit trail (app-level) — enforced logically by what data files are loaded.

Two branded portals: **JESCO** (banking) and **Saracoti** (commission portal). Both expose portfolio reports; only Saracoti exposes commissions.

---

## 2) UI pages to implement (using the provided HTML as visual/layout reference)

> Treat each `*.html` file as the canonical layout & component reference. Replicate structure, typography, and widgets. Where the HTML toggles JESCO/Saracoti by URL param, the Next.js pages must honor the same portal context and adjust labels/cards/columns accordingly.

- **Login / Portal selector** — `index.html` and `01-login.html`  
  Behavior: choose JESCO vs Saracoti, then route to portfolio dashboard. (HTML uses a query param to switch Saracoti.)

- **Portfolio Dashboard** — `02-portfolio-dashboard.html`  
  Header with brand + portal name; top nav to Portfolio / Trade Analytics / Performance / Fixed Income; account selector and user badge. Use this layout for the main shell.  
  Page content shows summary cards (value, cash, fixed income, carbon credits), activity feed (cash movements & profits taken), and a performance summary block (MTD etc.).

- **Trade Analytics (+ Saracoti commissions)** — `03-trade-analytics.html`  
  Same header/nav as Portfolio. Page shows trade summary cards, table of trades, optional **commissions** cards/columns/charts. For Saracoti (when `portal=saracoti`), the page turns on commissions cards, commission columns and charts, and changes page description/title.

- **Performance Reports** — `04-performance-reports.html`  
  Summary tiles (MTD, YTD, SI, annualized), historical table blocks (quarters/years), and report cards (e.g., “Q4 2024 Quarterly Report”). The Saracoti portal label/title should adapt through the same query-param mechanism used in HTML.

- **Fixed Income** — `05-fixed-income.html`  
  Summary cards (value, yield, duration, rating) and a bonds table with credit rating & maturity badges.

**Navigation/layout:** Copy the header + nav from the Portfolio and apply to all report pages (it already appears on the other HTML files). Pages must keep the active nav state.

---

## 3) Data origin, shape, and routing

### 3.1 Data location
All runtime data resides under the **`/data`** directory, committed with the app. No external callouts. The UI must render directly from JSON files that mirror the “Field Inventory” and commissions rules.

### 3.2 File naming convention
- `/data/{portal}/{accountId}/portfolio.json`
- `/data/{portal}/{accountId}/trades.json`
- `/data/{portal}/{accountId}/commissions.json` *(Saracoti only)*
- `/data/{portal}/{accountId}/performance.json`
- `/data/{portal}/{accountId}/fixed-income.json`
- `/data/{portal}/{accountId}/activity.json` *(cash & movements)*

Where:
- `portal` ∈ {`jesco`, `saracoti`}
- `accountId` matches the account selector values in the header (e.g., `JESCO001`, `JESCO001-A`).

### 3.3 Portal context & routing
- On login, the chosen portal becomes a query param or route segment. HTML demos use `?portal=saracoti`; keep parity.
- When `portal=saracoti`, certain UI nodes become visible and page titles update (Trade Analytics & Performance).
- The top-nav links must **preserve** the portal context as the user navigates.

---

## 4) Data model (JSON contracts)

> These schemas are intentionally simple and align with the uploaded product spec’s field inventory. The UI must not infer/transform; it should display “as-given,” applying only light totals/formatting.

### 4.1 Common types
- **Money**: numeric (rendered with currency formatting by the UI)
- **Pct**: numeric (0.0347 ⇒ “+3.47%”)
- **Date**: ISO date or date-time string

### 4.2 Accounts
```json
{
  "accountId": "JESCO001",
  "portal": "jesco",
  "displayName": "Master Account - JESCO001",
  "lastLoginAt": "2025-08-20T09:15:00Z"
}
```

### 4.3 Portfolio summary (`portfolio.json`)
```json
{
  "asOf": "2025-08-27T12:45:00Z",
  "totals": {
    "portfolioValue": 2847320,
    "cash": 485600,
    "fixedIncome": 1650800,
    "carbonCredits": 71000
  },
  "performanceToday": { "abs": 127450, "pct": 0.0468 }
}
```

### 4.4 Positions & holdings
```json
{
  "positions": [
    {
      "symbol": "US10Y",
      "description": "U.S. Treasury 10Y",
      "quantity": 150000,
      "price": 98.75,
      "marketValue": 1481250,
      "strategyTag": "Fixed Income Desk"
    }
  ]
}
```

### 4.5 Cash & movements (`activity.json`)
```json
{
  "movements": [
    { "type": "transfer", "title": "Transfer to Fixed Income Desk", "note": "For bond purchase allocation", "amount": -100000, "when": "2025-08-26" },
    { "type": "profit", "title": "Profits Taken", "note": "Carbon credit position partial exit", "amount": 45800, "when": "2025-08-24" }
  ]
}
```

### 4.6 Performance (`performance.json`)
```json
{
  "mtd": { "pct": 0.0347, "pnl": 95240, "label": "January 2025" },
  "ytd": { "pct": 0.0347, "pnl": 95240, "label": "2025" },
  "sinceInception": { "pct": 0.2894, "pnl": 642180, "since": "2023-03-15" },
  "annualized": { "pct": 0.158, "benchmarkPct": 0.082 }
}
```

### 4.7 Trades (`trades.json`)
```json
{
  "filters": { "range": "last_30_days" },
  "summary": { "tradeVolume": 3200000, "tradeCount": 47, "avgPerTrade": 68000 },
  "rows": [
    {
      "executedAt": "2025-08-25T14:30:00Z",
      "instrument": "EU ETS Dec-25",
      "side": "BUY",
      "quantity": 10000,
      "price": 8.50,
      "notional": 85000,
      "venue": "OTC",
      "fees": 0
    }
  ]
}
```

### 4.8 Commissions (Saracoti) (`commissions.json`)
```json
{
  "config": {
    "ratePct": 0.0040,
    "override": { "payeeAccountId": "INTRO-123", "pctOfGross": 0.30 }
  },
  "snapshots": [
    { "period": "2025-08", "earned": 12840, "paid": 3850, "retained": 8990 }
  ],
  "byTrade": [
    { "tradeId": "T-001", "baseNotional": 85000, "calcGross": 340, "paidOut": 102, "retained": 238 }
  ],
  "distribution": { "retainedPct": 0.70, "paidPct": 0.30 }
}
```

### 4.9 Fixed income (`fixed-income.json`)
```json
{
  "asOf": "2025-08-27T12:45:00Z",
  "summary": { "total": 1650800, "pnlToday": 31400, "yieldPct": 0.0428, "modifiedDuration": 6.2, "avgRating": "AA-" },
  "bonds": [
    {
      "isin": "US1234567890",
      "issuer": "US Treasury",
      "couponPct": 0.0425,
      "maturity": "2031-05-15",
      "rating": "AA",
      "maturityBucket": "long",
      "quantity": 1000000,
      "cleanPrice": 98.75,
      "marketValue": 987500
    }
  ]
}
```

---

## 5) Data-to-UI mapping (per page)

### 5.1 Portfolio Dashboard
- Header: portal name, account selector, user chip from Accounts.  
- Summary cards: `portfolio.totals` and `performanceToday`.  
- “Last updated”: `portfolio.asOf`.  
- Activity feed: `activity.movements`.  
- Performance summary block: `performance.mtd`, `ytd`, etc.

### 5.2 Trade Analytics
- Filters: drive what subset of `/data/.../trades.json` to render.  
- Summary cards: `trades.summary` fields.  
- Table: `trades.rows` with columns for trade date/time, instrument, side, qty, price, notional, venue, fees.  
- **Saracoti only**: show `commissions.snapshots` tiles (earned/paid/net), commission columns in the table, and charts from `commissions.byTrade` / `distribution`.

### 5.3 Performance Reports
- Tiles: `performance` object (MTD/YTD/SI/annualized).  
- Historical tables: `performance.history`.  
- Report cards list: use `performance.history` entries with metadata if present.

### 5.4 Fixed Income
- Summary tiles: `fixedIncome.summary`.  
- Bonds table: `fixedIncome.bonds` with **rating** and **maturityBucket** to drive badges/colors.

---

## 6) Minimal implementation architecture (presentation only)

- **Framework:** Next.js (app or pages router).  
- **Routing:**  
  - `/login` → portal chooser  
  - `/:portal/portfolio` → Portfolio  
  - `/:portal/trade-analytics` → Trade Analytics  
  - `/:portal/performance` → Performance  
  - `/:portal/fixed-income` → Fixed Income  

- **Layout shell:** Build a shared Layout component from the Portfolio header/nav HTML so that each page toggles the active nav and shows the account selector & user chip.

- **Data loading:** File-system read of `/data/{portal}/{accountId}/*.json` at request time (SSR) or on client (CSR).

- **Portal-specific toggles:** If `portal === 'saracoti'`, show commission cards/columns/charts and set titles/labels accordingly.

- **Charts:** Trade Analytics uses line and doughnut charts.

---

## 7) Data folder contract (summary)

```
/data/
  jesco/
    JESCO001/
      portfolio.json
      positions.json
      activity.json
      performance.json
      trades.json
      fixed-income.json
  saracoti/
    JESCO001/
      portfolio.json
      activity.json
      performance.json
      trades.json
      commissions.json
      fixed-income.json
```

---

## 8) Rendering rules & UX parity

- Typography/colors/components should match HTML references.  
- Cards & tiles arranged as in HTML.  
- Portal badges/labels must show “JESCO” or “Saracoti”.  
- Filters only slice JSON; no API calls.

---

## 9) Validation & success criteria (Phase 1)

- Both JESCO and Saracoti portals function with brand labels and correct visibility (commissions only for Saracoti).  
- Users can navigate Portfolio → Trade Analytics → Performance → Fixed Income using the top nav.  
- Reports render from JSON correctly with visible tiles, tables, and charts.

---

## 10) Implementation notes

- **No enterprise plumbing needed.** Keep components small, file-based.  
- **Strict separation:** treat JSON as the source of truth.  
- **Error states:** if a JSON file is missing, show empty-state.  
- **Formatting:** signed amounts with color semantics (green/red).

---

## 11) What to build next

- Lightweight “archive” view of prior reports (Performance cards).  
- Expand Fixed Income grouping by rating and maturity buckets.