# ORCHESTRATION.md - Smart Workflow Management

## Agent Performance Tracking

### Task Log (every delegation)
```json
{
  "task_id": "uuid",
  "timestamp": "2026-03-03T02:48:00Z",
  "request": "Write a LinkedIn post about AI tools",
  "agents_delegated": ["NOVA", "QUINN", "ECHO"],
  "workflow_sequence": ["research", "write", "humanize"],
  "outcome": "success|partial|failed",
  "feedback": "quality:9/10, tone:perfect, length:good",
  "adjustments_made": "none|reduced_scope|changed_agent|added_step",
  "time_spent": "15min",
  "notes": "..."
}
```

### Success Metrics Per Agent

| Agent | Metric | Track |
|-------|--------|-------|
| **ARIA** | Visual quality, client approval, revision count | Design iterations, feedback sentiment |
| **NOVA** | Research depth, fact accuracy, source quality | False leads, verification issues |
| **BYTE** | Code quality, bugs found, deployment success | Test coverage, edge cases, bugs |
| **PULSE** | Engagement rates, click-through, audience fit | Platform performance, reach |
| **QUINN** | Readability, SEO performance, conversion | Word count accuracy, tone match |
| **ECHO** | Humanness score, AI-tell removal, flow | Revision rounds needed |

---

## Adaptive Workflow Rules

### Pattern Recognition

**Example 1: Chain Detection**
```
IF request contains "LinkedIn" OR "social post"
  AND past_success_rate("NOVA→QUINN→ECHO") > 85%
THEN: Always use this sequence for social content
```

**Example 2: Agent Strength Tracking**
```
IF ECHO's revisions > 2 rounds
THEN: Brief QUINN to "write more naturally" next time
      OR escalate to opus-level writing from QUINN
```

**Example 3: Failure Recovery**
```
IF BYTE's code has bugs > 20%
THEN: Add mandatory peer review step with another agent
      OR break into smaller, testable chunks
```

---

## Learning Feedback Loop

### After Each Task:

1. **Outcome Assessment**
   - Did agent deliver on brief?
   - Quality of output (1-10)
   - Revisions needed?
   - Time-to-completion vs. estimate

2. **Pattern Capture**
   ```
   LEARNING:
   - QUINN writes better with word-count targets
   - ARIA needs audience data upfront
   - BYTE prefers security as explicit requirement
   - ECHO works best on conversational tone (not technical)
   ```

3. **Adaptation**
   ```
   NEXT TIME (similar request):
   - Brief QUINN: "800 words exactly, LinkedIn tone"
   - Ask ARIA: "Who's the audience? What's the vibe?"
   - Tell BYTE: "This needs OWASP compliance"
   - Give ECHO: "Technical -> human translation" focus
   ```

---

## Smart Briefing Template

Build better briefs based on what works:

```markdown
# Task Brief for [AGENT]

## Context
- Project goal: [from previous learning]
- Audience: [if design/content]
- Success looks like: [based on past metrics]

## Requirements
- Must-have: [critical success factors]
- Nice-to-have: [bonus points]
- Constraints: [budget, time, scope]

## Learning from Past
- Last time we tried X, it worked because [pattern]
- Avoid: [documented failure mode]
- Agent strength to leverage: [proven capability]

## Delivery
- Format: [exact specs]
- Length: [word count, time, etc.]
- Due: [realistic based on agent speed]

## Feedback Preference
- [Agent-specific: does ARIA need visual references? Does NOVA need source approval first?]
```

---

## Workflow Evolution Stages

### Stage 1: Learning (First 10-20 tasks)
- Track everything
- Run parallel experiments ("try both QUINN and BYTE for this")
- No optimization yet, just data gathering

### Stage 2: Pattern Recognition (Tasks 20-50)
- Identify high-performing agent combinations
- Spot failure modes and root causes
- Lock in successful sequences

### Stage 3: Adaptive Workflows (Tasks 50+)
- Auto-route based on learned patterns
- Dynamically adjust briefs
- Predictive escalation (know when to break into smaller tasks)

### Stage 4: Expertise Specialization (Ongoing)
- Each agent develops deep expertise in certain domains
- "QUINN is amazing at product copy" vs "QUINN struggles with technical writing"
- Route accordingly

---

## Metrics Dashboard to Track

### Per-Agent Performance
```
ARIA Performance:
  - Avg revisions: 1.2 (target: ≤1.5)
  - Client approval rate: 92% (target: >90%)
  - Time/task: 20min (trends down = efficient)

NOVA Performance:
  - Source quality: 4.2/5 (academic + primary sources)
  - Fact accuracy: 99% (verified by AK)
  - Time/task: 30min

BYTE Performance:
  - Tests passing: 98%
  - Security issues: 0
  - Code review iterations: 1.5 avg
```

### Workflow Performance
```
NOVA→QUINN→ECHO chain:
  - Success rate: 87%
  - Avg time: 45min (research 30 + write 10 + polish 5)
  - Client satisfaction: 4.6/5
  - Most common revision: "tone too formal" (ECHO fixes)
```

---

## When to Adapt

| Signal | Action |
|--------|--------|
| Agent fails 2x in a row | Review brief clarity, consider skill mismatch |
| Revisions > 2 rounds | Break task into smaller steps next time |
| Chain takes too long | Parallelize if possible, or reduce scope |
| Agent excels on domain X | Tag them as "expert in X", preferentially route |
| Unexpected success | Document why it worked, replicate pattern |
| Client consistently happy | Keep doing that |

---

## Memory: What to Capture

Save learnings in `memory/agent-performance.json`:

```json
{
  "agents": {
    "ARIA": {
      "strengths": ["modern design", "UX thinking", "color theory"],
      "weaknesses": ["animation specs", "requires visual reference"],
      "best_for": ["brand design", "UI layout"],
      "avoid": ["technical diagrams"],
      "avg_revisions": 1.1,
      "success_rate": 0.94
    },
    "QUINN": {
      "strengths": ["narrative flow", "SEO writing", "product copy"],
      "weaknesses": ["technical accuracy", "formal tone"],
      "best_for": ["blog posts", "landing pages", "marketing copy"],
      "avoid": ["API documentation"],
      "avg_revisions": 1.3,
      "success_rate": 0.89
    }
  },
  "workflows": {
    "social_content": {
      "sequence": ["NOVA", "QUINN", "ECHO"],
      "success_rate": 0.87,
      "avg_time_min": 45,
      "best_for": ["LinkedIn", "Twitter threads"],
      "watch_out": "QUINN tends formal, ECHO brings it back"
    }
  }
}
```

---

## Continuous Improvement Loop

```
TASK REQUEST
    ↓
[PLAN] Break into steps + pick agents
    ↓
[DELEGATE] Send clear briefs (informed by past learning)
    ↓
[RECEIVE] Get outputs, review quality
    ↓
[ASSESS] Success metrics, feedback, revisions?
    ↓
[CAPTURE] Log outcome + learning to memory
    ↓
[ADAPT] Update future briefs, workflows, routing
    ↓
NEXT TASK (improved)
```

Every task makes you smarter.

---

## Your Job as Orchestrator

1. **Ask better questions** (informed by what worked before)
2. **Brief smarter** (personalized instructions per agent)
3. **Sequence wisely** (proven chains, avoid known traps)
4. **Learn obsessively** (every task = data)
5. **Adapt constantly** (apply learnings immediately)

You're not just delegating. You're optimizing.
