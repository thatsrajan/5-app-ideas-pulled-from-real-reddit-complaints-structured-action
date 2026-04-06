# Structured Action Items Extractor

Paste a transcript, extract assignee-linked tasks, and export CSV for downstream tools.

## What works
- Paste raw transcript text
- Heuristic extraction for common task patterns
- Review results in a table
- Export CSV for Notion/Linear import

## Run locally
```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Meaningful user path
1. Paste transcript text
2. Click Extract actions
3. Review the table and export CSV

## Known gaps
- Uses rule-based extraction, not an LLM
- No direct Notion/Linear API export yet
- Audio upload/transcription is not implemented in this MVP
