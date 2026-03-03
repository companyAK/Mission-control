#!/bin/bash
echo "================================================"
echo " OpenClaw Agent Swarm Status"
echo "================================================"
echo ""
echo "🔄 Active Agent Sessions:"
tmux ls 2>/dev/null || echo " No agents currently running"
echo ""
echo "📁 Task Outputs:"
ls -lah /root/.openclaw/workspace/tasks/ 2>/dev/null || echo " No task outputs yet"
echo ""
echo "📄 Latest Outputs Preview:"
for f in /root/.openclaw/workspace/tasks/*.md; do
  [ -f "$f" ] || continue
  echo ""
  echo " ── $(basename $f) ──"
  tail -3 "$f"
done
echo ""
echo "================================================"
