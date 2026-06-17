# Algorithmic Trading System

An automated intraday options trading system. Pluggable signal engines feed a
multi-layer risk engine and broker-agnostic execution, and every change is
measured with a walk-forward backtester.

> Excerpts from a personal project. Live broker keys, account data, and
> trade journals are kept out of these excerpts.

## Flow
1. Per symbol, fetch intraday bars + the options chain.
2. A signal engine (VWAP-pullback by default; ORB and mean-reversion variants)
   decides CALL / PUT / NONE from trend, pullback, momentum, and regime filters.
3. The risk engine sizes the position and applies hard controls
   (daily-loss lockout, throttle, duplicate-order guard, kill switch).
4. A broker adapter (Webull / IBKR / Tradier / paper) submits a bracket order;
   every decision is journaled and reconciled.

## Layout
- `engine.py` - per-symbol scan -> plan -> risk -> execute
- `signal_engine.py` - VWAP-pullback signal logic
- `risk.py` - position sizing + risk controls
- `backtest/metrics.py` - Sharpe, drawdown, profit factor, Calmar
