# Options Trading Sandbox

Personal intraday options code. Signals can ask for a trade, but the risk layer
gets final say. Paper/live adapters handle orders. New ideas go through
walk-forward tests before I let them near real money.

> Personal project excerpt. Broker keys, account data, and trade journals are
> removed.

## How it moves
1. Fetch intraday bars and the options chain for each symbol.
2. Let the active signal module say CALL / PUT / NONE.
3. Size the trade, then check daily loss, throttles, duplicates, and kill switch.
4. Send the bracket order through Webull, IBKR, Tradier, or paper mode.
5. Log the decision and reconcile it later.

## Layout
- `engine.py` - scan -> plan -> risk -> execute
- `signal_engine.py` - VWAP-pullback signal logic
- `risk.py` - position sizing + risk controls
- `backtest/metrics.py` - Sharpe, drawdown, profit factor, Calmar
