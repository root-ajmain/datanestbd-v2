# DataNest BD search research and implementation notes

Research date: 10 October 2026. Scope: the current local website, plus publicly discoverable pages on datanestbd.com. Audience assumption: Bangladesh businesses, English copy.

## What this research does and does not establish

This is a search-informed keyword and content map, **not a verified Google ranking report**. The web search tool returned public DataNest BD and competitor pages. A direct Google results request was inaccessible, and no Search Console or rank-tracker account/export was available. Search-tool result order is not a Google position. Search volume, keyword difficulty, clicks, impressions and average position have not been invented. A missing result in these searches does not establish that a page is unindexed.

The priorities below reflect relevance, buyer intent and fit with the existing business, not measured search volume. Page-specific supporting phrases are editorial suggestions unless the linked evidence shows the phrase/topic. All source observations are snapshots; some search results were last crawled months earlier.

## Research observations

| Topic searched | Evidence observed | Content decision |
| --- | --- | --- |
| DataNest BD and site-specific queries | [Home](https://datanestbd.com/) and [service hub](https://datanestbd.com/services/) describe WhatsApp, web, SaaS, AI and marketing offerings. | Keep the home page broad; assign purchase questions to dedicated pages. |
| WhatsApp Business API Bangladesh | [DataNest's service](https://datanestbd.com/services/whatsapp-api/) and [On Cloud API](https://oncloudapi.com/whatsapp-api-bangladesh/) discuss setup, inboxes, integrations and costs. | Explain prerequisites and operating workflow. Do not copy competitor statistics, payment methods or promises. |
| WhatsApp API pricing Bangladesh | [Omnistra's guide](https://www.omnistra.io/blog/whatsapp-business-api-bangladesh) discusses the billing model. Search results contained conflicting/outdated pricing explanations. | Use [Meta's own pricing page](https://whatsappbusiness.com/products/platform-pricing/) for billing facts; preserve local package prices separately. |
| Web development and AI automation Bangladesh | [DataNest web development](https://www.datanestbd.com/services/web-development/), [DataNest AI](https://www.datanestbd.com/services/ai-automation/) and [Mollahs IT](https://mollahsit.com/) cover business websites, integrations and workflows. | Describe scope, use cases and evaluation. Remove unsupported guaranteed speed, rankings and AI accuracy. |
| SaaS development Bangladesh | [DataNest SaaS](https://datanestbd.com/services/saas-development/) and [Algoramming](https://www.algoramming.com/services/custom-software-development/saas-product-development) cover multi-tenant products and product delivery. | Answer MVP, tenant permissions, billing, ownership and running-cost questions. |
| Landing pages and paid ads Bangladesh | [Ngital landing pages](https://ngital.com/services/landing-page-design) and [FIXLY IT](https://fixlyit.com/) cover campaign pages and conversion tracking. | Separate landing-page construction from ongoing ad management. |
| Facebook business setup | The live [Facebook business service](https://datanestbd.com/services/facebook-business/) uses a different route from the local project. | Add an exact permanent redirect to /services/meta-ecosystem; describe readiness assistance instead of promised verification. |

## Highest-priority corrections

1. **Duplicated brand titles.** Search results show several titles ending with the brand twice. Local child titles also included the brand while the root template appended it again. Implemented absolute, unique editorial titles for each local page. [Google title guidance](https://developers.google.com/search/docs/appearance/title-link).
2. **Page-specific canonical and sharing metadata.** Implemented canonical, description, Open Graph and Twitter text through one server-side helper. Contact query variants canonicalize to /contact. Google may choose different title links or snippets; metadata cannot force the search display. [Snippet guidance](https://developers.google.com/search/docs/appearance/snippet).
3. **Outdated billing and guarantees.** Corrected per-conversation/1,000-free-quota language in local marketing content. Removed ban immunity, approval and measured-performance claims that lacked supporting evidence. Meta publishes delivered-message pricing and reserves policy enforcement rights. [Pricing](https://whatsappbusiness.com/products/platform-pricing/), [messaging policy](https://whatsappbusiness.com/policy/).
4. **Sample work presented as achieved results.** Reframed three local work examples as illustrative reference architectures. Removed unsubstantiated time savings, client outcomes and confidentiality explanations.
5. **Noindex page blocked from crawling.** /thank-you keeps noindex and stays outside the sitemap, but is no longer disallowed by robots.txt. This lets crawlers read its indexing instruction. The introduction no longer asserts database success for an unverified direct visit. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
6. **Image descriptions.** Inspected the four local illustrations and wrote descriptive alt text. An image title tooltip is not a substitute for alt text. Decorative imagery should use empty alt text when an actual img element is purely decorative. [Google image guidance](https://developers.google.com/search/docs/appearance/google-images).
7. **Useful content rather than meta-keyword stuffing.** Removed the root meta-keyword list. Keyword targets are for editorial planning; Google does not use that tag for web ranking. [Google explanation](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag).

## Live-site differences to reconcile before deployment

- **Phone:** public site text lists +880 1804 277420; the local project uses +880 1886-123456. This task preserves the local contact configuration. The owner must identify the correct number across the site, account profiles and campaign destinations.
- **Delivery location:** the public site includes a Mirpur address; the local site says online-only consultations. Do not turn an illustration into evidence of an office or add a physical-visit invitation without confirmation.
- **Identity:** existing local content supplies the legal name and WhatChimp Silver Partner claim. The credential URL could not be fetched with the research tool, so partner status was not independently reverified. No new direct Meta partnership claim is added.
- **Package prices:** local Basic ৳3,500/month, Growth ৳6,500/month and ৳700 setup are retained as owner-supplied source content. Public older content shows different offers. Confirm package inclusions and current prices before deployment.
- **Host and trailing slashes:** search results contain both www and non-www URLs. This alone does not prove duplicate indexing. The local canonical origin remains the configured value (default https://datanestbd.com). Verify production redirects and Google's selected canonical in Search Console.
- **Missing live content:** a blog index and at least four articles are publicly discoverable but are absent from this local source. The existing /case-studies index maps to /work, whose sample content differs from the live case studies. Preserve any verified, useful live content when migrating; do not blanket-redirect unrelated article/detail URLs to the home page. See SEO_LIVE_CONTENT_BRIEFS.md.
- **Privacy and service terms:** existing contractual clauses were preserved, except for the correction of obsolete Meta billing terminology. Their factual/legal adequacy was not audited. Check the real data stores, processors, retention, cookie behavior and claimed security practices before publication.

## Keyword ownership and publishing order

| Priority | Page group | Why |
| --- | --- | --- |
| 1 | WhatsApp API service + pricing | Direct setup and cost inquiries; remove conflicting billing claims first. |
| 2 | Web development, AI automation, SaaS | Clear commercial offerings with distinct scopes and substantive buyer questions. |
| 3 | Landing pages, paid ads, Meta setup | Related acquisition and setup needs; interlink them without duplicating the same service pitch. |
| 4 | Home, services, about, contact | Navigation, brand trust, service discovery and consultation. |
| 5 | Architecture and three work examples | Technical evaluation and supporting long-tail topics; label examples honestly. |
| Trust | Privacy, terms, refunds | Branded information and confidence, not aggressive commercial keyword targets. |
| Utility | Thank-you, errors and API endpoints | No acquisition targeting. Preserve functional behavior and appropriate indexing controls. |

## How to collect actual Google ranking keywords

Use Search Console for the verified domain property. Export Search results performance for a defined period (for example the last three complete months), with search type Web and a Bangladesh country filter. Also retain an all-country comparison. Include query, landing page, clicks, impressions, CTR, average position, dates, country and device where available. Export query and page reports separately if necessary; a page-filtered query export gives a more useful query-to-page relationship than two unrelated totals.

Average position is an aggregate, not a permanent rank. Search Console may omit anonymized/low-volume queries, so an export is not literally every search. Prioritize relevant queries already earning impressions, compare the actual landing page with the intended page in SEO_KEYWORD_MAP.csv, then review whether the page answers the query. Do not change titles merely to include unrelated high-impression terms.

After an authorized deployment, verify redirects, canonicals, robots instructions and the sitemap on the real domain. Inspect representative URLs in Search Console and submit the sitemap. Review results over a comparable period after recrawling; do not attribute every change in traffic solely to copy edits.

## Implementation scope

### Validation

- Production build passed using `NEXT_BUILD_DIR=.next-seo-review`, isolated from the existing preview. The default shared build had failed during page collection; the isolated build compiled, type-checked and generated all routes successfully.
- `scripts/check-seo.mjs` passed against the production preview at `http://127.0.0.1:3100`: 21 HTTP pages, unique titles/descriptions, canonicals, one H1 per page, social metadata, image alt attributes, parseable JSON-LD, indexing, 20 sitemap entries and the legacy Facebook-business redirect configuration. The internal design-system page remains noindex.
- Existing UI suite: 10 of 11 tests passed. The mobile-navigation test expects an `Open navigation` button absent from the current header. This SEO task did not change that header interaction or rewrite the test to hide the mismatch.
- The build reported that `DATABASE_URL` is unset locally and leads fall back to a JSON file. Production lead-storage configuration is outside this content change and needs checking before deployment.
- No deployment, Search Console submission or verified ranking improvement is claimed.

The internal `/design-system` component showcase is separate from the 21 public/utility page briefs. It retains its existing noindex directive and is excluded from the sitemap; its sample marketing copy was corrected to remove unsupported pricing and performance guarantees. It is not an acquisition landing page and needs no keyword targeting.

The local code receives copy and SEO metadata changes, not a deployment. Existing sections, visual styles, business forms and interaction handlers remain. The content map is in content/seo-pages.json; detailed service copy is in content/service-copy.ts; image descriptions are in content/image-alts.ts. SEO_PAGE_CONTENT.md contains every local page's keyword targets, title, description, H1, introduction, subject coverage, links and explanation. Topics and recommended internal links are editorial guidance unless they already appear in the page; they are not claims that new sections or every link were added.
