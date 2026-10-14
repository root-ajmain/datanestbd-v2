import fs from 'node:fs';
import pages from '../content/seo-pages.json';
import { serviceCopy } from '../content/service-copy';
import { services } from '../content/services';
import { projects } from '../content/projects';
import { imageAlts } from '../content/image-alts';

const sourceLabel = (url: string, i: number) => `[Source ${i + 1}](${url})`;
let report = '# DataNest BD: page-by-page SEO content\n\n';
report += 'Prepared 10 October 2026. English content for Bangladesh businesses. These are keyword targets, not verified Google rankings. See SEO_RESEARCH.md for research limits, factual checks and sources.\n\n';
report += 'Applied: titles, descriptions, canonical/sharing metadata, H1s, introductions, seven service summaries/FAQ sets, inspected image alt text and selected factual corrections. Topic lists, explanations and recommended links below are editorial guidance, not new public page sections. Existing contractual policy clauses are preserved.\n\n';
report += '| Page | Primary target | Priority |\n| --- | --- | --- |\n';
for (const page of pages) report += `| ${page.path} | ${page.primaryKeyword} | ${page.priority} |\n`;
const csv = [['Page','Keyword','Role','Intent','Editorial priority','Google average position','Monthly search volume','Evidence URLs','Research date']];
for (const page of pages) {
  report += `\n## ${page.path}\n\n`;
  report += `**Search intent:** ${page.intent}. **Indexing:** ${page.index ? 'indexable' : 'noindex; excluded from sitemap'}.\n\n`;
  report += `**Primary keyword:** ${page.primaryKeyword}\n\n**Supporting targets:** ${page.supportingKeywords.join('; ') || 'None; utility page.'}\n\n`;
  report += `**SEO title (${page.title.length} characters):** ${page.title}\n\n**Meta description (${page.description.length} characters):** ${page.description}\n\n`;
  report += `**H1:** ${page.heading}\n\n**Introduction:**\n\n${page.introduction}\n\n`;
  const slug = page.path.split('/').at(-1)!;
  const service = page.path.startsWith('/services/') ? services.find(s => s.slug === slug) : undefined;
  const project = page.path.startsWith('/work/') ? projects.find(p => p.slug === slug) : undefined;
  if (service) {
    const copy = serviceCopy[slug];
    report += `**Service explanation (applied in the existing scope section):**\n\n${copy.summary}\n\n**Buyer FAQs:**\n\n`;
    for (const faq of copy.faqs) report += `- **${faq.question}** ${faq.answer}\n`;
    report += '\n';
  }
  if (project) {
    report += `**Example problem:** ${project.problem}\n\n**Proposed solution:** ${project.scope}\n\n**Evidence status:** ${project.attributionLimitations}\n\n`;
  }
  report += '**Topics the page should explain:**\n\n' + page.topics.map(t => `- ${t}`).join('\n') + '\n\n';
  const asset = service?.highlightImage || project?.image;
  if (asset) report += `**Image:** ${asset}\n\n**Alt text:** ${imageAlts[asset]}\n\n`;
  else if (page.path === '/' || page.path === '/work' || page.path === '/about') report += '**Alt text:** use the image-specific descriptions in the shared asset table below.\n\n';
  else report += '**Alt text:** no unique editorial image needs an invented description on this page. Shared badges retain their factual accessible names; do not add keyword tooltips to decorative controls.\n\n';
  report += `**Recommended internal links:** ${page.internalLinks.map(p => `\`${p}\``).join(', ')}\n\n`;
  report += `**Why this page needs this content:** ${page.explanation}\n\n`;
  report += `**Research evidence:** ${page.evidence.map(sourceLabel).join(', ') || 'Local page purpose; no commercial search-demand claim.'}\n`;
  const keywords = page.index ? [page.primaryKeyword, ...page.supportingKeywords] : [];
  keywords.forEach((keyword, i) => csv.push([page.path,keyword,i === 0 ? 'Primary target' : 'Supporting suggestion',page.intent,page.priority,'Not available','Not available',page.evidence.join(' | '),'2026-10-10']));
}
report += '\n## Shared image descriptions\n\n';
report += '| Asset | Descriptive alt text |\n| --- | --- |\n';
for (const [asset, alt] of Object.entries(imageAlts)) report += `| ${asset} | ${alt} |\n`;
report += '\nTitles and descriptions are written for relevance and readability. Character counts are editorial checks, not Google limits or guaranteed display lengths. The actual rendered page and search intent take priority over a numeric target.\n';
fs.writeFileSync('SEO_PAGE_CONTENT.md', report);
const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
fs.writeFileSync('SEO_KEYWORD_MAP.csv', '\uFEFF' + csv.map(row => row.map(quote).join(',')).join('\r\n') + '\r\n');
console.log(`Exported ${pages.length} page briefs and ${csv.length - 1} keyword targets.`);
