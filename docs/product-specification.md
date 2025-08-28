
---

## Field Inventory *(drives UI & archived JSON; mirrors sample workbook)*
### Positions & Holdings
- Instrument identifiers (Symbol/ISIN), description  
- Quantity, price, market value / NAV contribution  
- Strategy/Desk tag *(mark “Fixed Income Desk” lines)*

### Trades (Commission Base)
- Trade date/time, instrument, side, quantity, price, notional  
- Exchange/venue (if present), trade fees/charges (if present)  
- **Calculated:** commissionable base = executed trade basis *(see Commissions)*

### Cash & Movements
- Deposits, withdrawals, **profits taken**  
- Transfers between desks/strategies *(tag “Fixed Income Desk” when applicable)*

### Performance
- Period return %, **MTD, YTD, since inception** (when exposed by APIs)  
- Period P&L and cumulative growth

---

## Commissions (Saracoti Only)
- **Basis:** percentage on **executed trades only** (no AUM/time-based fees).  
- **Level:** **one-level override** (single parent/introducer per sub-account).  
- **Config:** per-client commission % + optional **override mapping** *(DB-configured)*.  
- *First pass can be manual; preferred path is **per-client** setup at onboarding with a distribution table (who gets paid and how much).*
- **Outputs:**
- **Commissions Received** (Master)
- **Commissions Paid** (to sub-accounts/introducers)
- **Calculation:** uses trade-level fields from APIs (e.g., **notional = price × quantity** and/or provided fee/commission fields) as the **commissionable base**; summed to **daily/weekly/monthly** snapshots.

---

## Access & Security
- **Client-only portal:** each user sees only their Master/Sub-Account data.  
- **No admin UI** (Phase 1).  
- **Audit trail:** who viewed what/when retained for compliance.

---

## Out of Scope (Phase 1)
- Admin/back-office screens  
- Multi-level overrides (>1 level)  
- Payments/fund transfers/trade execution  
- File ingestion/ETL (PDF/Excel)

---

## Integrations
- **SecDex, Zero13, ECAP, JESCO** bank accounts & trade partners *(read-only)*

---

## Success Criteria
- Branded portals live for **JESCO** and **Saracoti**  
- Accurate **daily/weekly/monthly** reports with **Fixed Income Desk** visibility  
- **Saracoti** commissions computed per trade with **one-level override**  
- All reports **archived** to external storage and **retrievable**  
- Users can access **only** their entitled data; **no admin view** present

---

## Scope Matrix

| Feature                               | JESCO | Saracoti |
|---------------------------------------|:-----:|:--------:|
| Master/Sub-Account reports            |  ✅   |    ✅    |
| Fixed Income Desk visibility          |  ✅   |    ✅    |
| Commissions                           |  ❌   | ✅ *(trade-only %, 1-level override)* |
| Add new individuals                   | Manual via DB | Standard sub-account via Zero13 |
| Admin UI                              |  ❌   |    ❌    |
| Report archival (daily/weekly/monthly)|  ✅   |    ✅    |

---

## Phase 1 — Allow-List (recommended)
- **Cash & Cash Equivalents** (account balances)  
- **Carbon Credits** (spot + carbon-linked derivatives when present)  
- **Fixed Income** (bonds/notes used by the **Fixed Income Desk**)


## Google Cloud Compliance & Shared Responsibility

### Google Cloud Handles
**Infrastructure & Platform Compliance:**
- SOC 2 Type II, ISO 27001, PCI DSS certifications for GCP services
- Physical security, data center compliance, OS patching for managed services
- Default encryption at rest and in transit
- Platform availability guarantees and DDoS protection
- Audit documentation (SOC 2 reports, ISO certificates, GDPR DPA)

**See detailed Google Cloud configuration in [`docs/phase-1/google-configuration.md`](./google-configuration.md)**

**Summary:**
- **Estimated cost**: $200-800/month for 100-1000 customers
- **Setup complexity**: 6/10 (moderate - manageable by developers)
- **Professional services needed**: Security architecture, email deliverability
- **Timeline**: 2-3 weeks basic system, 12-16 weeks full compliance

### Our Responsibilities
**Application-Level Security:**
- Secure Node.js/TypeScript application development
- User authentication, authorization, and role-based access controls
- Application-level audit logging and monitoring
- Secure Plaid API integration (OAuth 2.0, token management)
- Database security configuration (row-level, column encryption)

**Regulatory Compliance:**
- GDPR data subject rights implementation (access, deletion, portability)
- Privacy policies and consent management
- Incident response procedures and breach notification
- Third-party risk management (including Plaid partnership)
- KYC/AML procedures if required for banking operations

**Configuration & Operations:**
- Proper VPC, firewall, and network security setup
- SSL/TLS configuration for customer web dashboard
- Data backup and recovery procedures
- Infrastructure as code and secure deployment practices

---