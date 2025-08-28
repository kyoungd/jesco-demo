# JSON Data Schemas

Location: `/schemas`

All schemas use **JSON Schema Draft 2020-12** and reference common primitives in `common.json`.

## Files
- `account.json` — single account record
- `portfolio.json` — portfolio summary tiles
- `positions.json` — holdings list
- `activity.json` — cash & movements
- `performance.json` — performance tiles + history
- `trades.json` — trade feed + summary
- `commissions.json` — Saracoti-only commissions
- `fixed-income.json` — bonds + summary

### Usage
- Validate data files under `/data/{portal}/{accountId}/` against these schemas.
- Keep values simple: numbers for money/percent; ISO strings for dates.
- UI is presentation-only — no derived calculations beyond formatting.
