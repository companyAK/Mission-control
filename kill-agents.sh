#!/bin/bash
echo "🛑 Stopping all agent sessions…"
tmux ls 2>/dev/null | grep "agent-" | cut -d: -f1 | xargs -I{} tmux kill-session -t {} 2>/dev/null
echo "✅ All agents stopped"
