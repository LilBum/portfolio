# AegisTrader Options

A paper-only Interactive Brokers research bot. It evaluates completed SPY
five-minute bars, selects at most one defined-risk XSP debit vertical, routes
the spread as one native combo order, and serves a local real-time dashboard.

> Unproven research software. The signal has not been shown to have positive
> expectancy, and this build has no supported live-account mode. The risk
> engine and the evidence system are deliberately larger than the strategy.

## Evidence status

| Claim | Status |
| --- | --- |
| Local software functionality | Measurable with the one-command proof run |
| IBKR paper integration | Read-only reconciliation, supervised one-lot lifecycle |
| Accuracy or profitability | **Not established** |

A green proof report means the tested build ran and preserved its
deterministic state. It does not mean the signal is accurate, profitable,
or representative of live fills.

## Layout

- `risk.py` - fail-closed entry gates, anchored loss latches, sizing caps
- `latch_integrity.py` - canonical fingerprints so latches survive restarts
- `evidence.py` - the proof bundle: exact-build, API/WebSocket, ledger, restart checks
- `brokers/ibkr.py` - paper-only IBKR adapter speaking native combo orders
