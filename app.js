const transcriptEl = document.getElementById('transcript');
const resultsEl = document.getElementById('results');
let latestRows = [];

function extractActions(text) {
  const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
  const patterns = [
    /(?<assignee>[A-Z][a-z]+)\s+(?:will|to)\s+(?<task>.+)/,
    /action item:?\s*(?<task>.+?)\s*[-–]\s*(?<assignee>[A-Z][a-z]+)/i,
    /(?<assignee>[A-Z][a-z]+):\s*(?<task>follow up.+|send.+|update.+|draft.+|book.+|review.+)/i,
  ];
  const rows = [];
  lines.forEach(line => {
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match?.groups) {
        rows.push({
          task: match.groups.task.replace(/[.]+$/, ''),
          assignee: match.groups.assignee,
          context: line,
        });
        return;
      }
    }
  });
  return rows;
}

function renderRows(rows) {
  latestRows = rows;
  resultsEl.innerHTML = rows.length
    ? rows.map(row => `<tr><td>${row.task}</td><td>${row.assignee}</td><td>${row.context}</td></tr>`).join('')
    : '<tr><td colspan="3" class="muted">No tasks detected yet. Try the sample transcript.</td></tr>';
}

document.getElementById('extract').addEventListener('click', () => {
  renderRows(extractActions(transcriptEl.value));
});

document.getElementById('demo').addEventListener('click', () => {
  transcriptEl.value = `Maya: We need the onboarding email updated before Friday.
Action item: Draft the new onboarding email - Priya
Leo will review the billing FAQ and publish the edits today.
Priya: send the Notion summary to the sales team.
Random discussion about timing.`;
  renderRows(extractActions(transcriptEl.value));
});

document.getElementById('export').addEventListener('click', () => {
  if (!latestRows.length) return;
  const csv = ['Task,Assignee,Context', ...latestRows.map(row => [row.task,row.assignee,row.context].map(value => `"${value.replaceAll('"', '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'action-items.csv';
  link.click();
  URL.revokeObjectURL(url);
});

renderRows([]);
