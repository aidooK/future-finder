import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { renderOpportunityArticle } from './article.ts'

describe('opportunity article markdown', () => {
  it('renders structure and removes the promotional footer', () => {
    const { html, showFollow } = renderOpportunityArticle([
      '## How to Apply',
      '',
      '1. Prepare your CV',
      '2. Send your application to **recruitment@jdlinkoil.com**',
      '',
      '## Tips',
      '',
      '- Have the letters ready before you apply.',
      '',
      '---',
      '*Follow Future Finder for daily opportunities: [https://linktr.ee/future.finder](https://linktr.ee/future.finder)*',
    ].join('\n'))

    assert.equal(showFollow, true)
    assert.equal(html.includes('---'), false)
    assert.equal(html.includes('linktr.ee'), false)
    assert.match(html, /<h2>How to Apply<\/h2>/)
    assert.match(html, /<ol><li>Prepare your CV<\/li><li>Send your application to <strong>recruitment@jdlinkoil.com<\/strong><\/li><\/ol>/)
    assert.match(html, /<ul><li>Have the letters ready before you apply\.<\/li><\/ul>/)
  })

  it('renders a simple table', () => {
    const { html } = renderOpportunityArticle([
      '| Centre | Location |',
      '| --- | --- |',
      '| Southern | Accra |',
    ].join('\n'))
    assert.match(html, /<th>Centre<\/th><th>Location<\/th>/)
    assert.match(html, /<td>Southern<\/td><td>Accra<\/td>/)
  })
})
