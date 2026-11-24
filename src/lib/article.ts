const PROMO = /linktr\.ee\/future\.finder|follow future finder|join our whatsapp channel|all our links in one place/i

export function renderOpportunityArticle(content: string): { html: string; showFollow: boolean } {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  let showFollow = false
  const kept: string[] = []
  for (const line of lines) {
    if (PROMO.test(line)) {
      showFollow = true
      continue
    }
    kept.push(line)
  }
  while (kept.length > 0 && kept[kept.length - 1].trim() === '') kept.pop()
  while (kept.length > 0 && kept[kept.length - 1].trim() === '---') {
    kept.pop()
    while (kept.length > 0 && kept[kept.length - 1].trim() === '') kept.pop()
  }

  const html: string[] = []
  let index = 0
  while (index < kept.length) {
    const trimmed = kept[index].trim()
    if (!trimmed) {
      index += 1
      continue
    }
    if (trimmed === '---') {
      html.push('<hr>')
      index += 1
      continue
    }
    const heading = /^(#{2,3})\s+(.+)$/.exec(trimmed)
    if (heading) {
      const level = heading[1].length === 2 ? 'h2' : 'h3'
      html.push(`<${level}>${inline(heading[2])}</${level}>`)
      index += 1
      continue
    }
    if (/^\|.+\|$/.test(trimmed)) {
      const tableLines: string[] = []
      while (index < kept.length && /^\|.+\|$/.test(kept[index].trim())) {
        tableLines.push(kept[index].trim())
        index += 1
      }
      const rendered = renderTable(tableLines)
      if (rendered) html.push(rendered)
      continue
    }
    if (/^[-*]\s+/.test(trimmed) && !trimmed.startsWith('**')) {
      const items: string[] = []
      while (index < kept.length) {
        const item = kept[index].trim()
        if (!/^[-*]\s+/.test(item) || item.startsWith('**')) break
        items.push(item.replace(/^[-*]\s+/, ''))
        index += 1
      }
      html.push(`<ul>${items.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`)
      continue
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = []
      while (index < kept.length && /^\d+\.\s+/.test(kept[index].trim())) {
        items.push(kept[index].trim().replace(/^\d+\.\s+/, ''))
        index += 1
      }
      html.push(`<ol>${items.map(item => `<li>${inline(item)}</li>`).join('')}</ol>`)
      continue
    }
    html.push(`<p>${inline(trimmed)}</p>`)
    index += 1
  }

  return { html: html.join(''), showFollow }
}

function renderTable(lines: string[]): string {
  const rows = lines.filter(line => !isSeparator(line)).map(splitRow)
  if (rows.length === 0) return ''
  const [head, ...body] = rows
  const headHtml = `<thead><tr>${head.map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead>`
  const bodyHtml = body.length
    ? `<tbody>${body.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`
    : ''
  return `<table>${headHtml}${bodyHtml}</table>`
}

function splitRow(line: string): string[] {
  return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim())
}

function isSeparator(line: string): boolean {
  return /^\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line)
}

function inline(text: string): string {
  let value = escapeHtml(text.trim())
  value = value.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label: string, href: string) => {
    const safe = safeHref(href)
    if (!safe) return label
    const external = /^https?:/i.test(safe)
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${escapeHtml(safe)}"${attrs}>${label}</a>`
  })
  value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  value = value.replace(/(^|[\s(])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
  return value
}

function safeHref(href: string): string | null {
  const value = href.trim()
  if (/^https?:\/\//i.test(value)) return value
  if (/^mailto:/i.test(value)) return value
  if (value.startsWith('/') && !value.startsWith('//')) return value
  return null
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
