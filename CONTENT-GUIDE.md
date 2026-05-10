# Future Finder — Content Guide

## How to Publish a New Post

### Step 1 — Copy the right template

Find the template for your category below. Create a new file in the matching folder.

**File naming:** use lowercase, hyphens only, include year
```
content/jobs/company-role-location-year.mdx
content/scholarships/scholarship-name-year.mdx
content/study-abroad/program-name-country-year.mdx
content/entrepreneurship/program-name-year.mdx
content/growth-mindset/topic-slug.mdx
```

---

## TEMPLATE: Jobs

```mdx
---
title: "Job Title — Company Name Year"
category: "jobs"
date: "YYYY-MM-DD"
deadline: "YYYY-MM-DD"
location: "City, Country"
benefit: "Salary range or 'Competitive'"
applyUrl: "https://direct-application-link.com"
excerpt: "One sentence summary of the role and who should apply."
featured: false
tags: ["job-type", "location", "sector"]
---

## About This Role
[2-3 sentences about the company and position]

## Eligibility Requirements
- Requirement 1
- Requirement 2

## What You Will Do
- Responsibility 1
- Responsibility 2

## Benefits
- Benefit 1
- Benefit 2

## How to Apply
1. Step 1
2. Step 2

**Deadline: [Date]. Apply early.**
```

---

## TEMPLATE: Scholarships

```mdx
---
title: "Scholarship Name Year — Benefit Description"
category: "scholarships"
date: "YYYY-MM-DD"
deadline: "YYYY-MM-DD"
location: "Country or 'Various'"
benefit: "Full tuition + allowance / Partial / Amount"
applyUrl: "https://official-application-link.com"
excerpt: "One sentence: who funds it, what it covers, who should apply."
featured: false
tags: ["fully-funded", "country", "level", "subject"]
---

## About the Scholarship
[What it is, who funds it, how many awarded]

## What Is Covered
- Tuition
- Living stipend
- Other benefits

## Eligibility
- Requirement 1
- Requirement 2

## How to Apply — Step by Step
1. Step 1
2. Step 2

## Tips for a Strong Application
- Tip 1
- Tip 2

**Deadline: [Date]. Start your application now.**
```

---

## TEMPLATE: Study Abroad

```mdx
---
title: "Program Name Year — Country"
category: "study-abroad"
date: "YYYY-MM-DD"
deadline: "YYYY-MM-DD"
location: "Country"
benefit: "What is funded"
applyUrl: "https://official-link.com"
excerpt: "One sentence summary."
featured: false
tags: ["country", "program-type", "level"]
---

[Same structure as scholarships]
```

---

## TEMPLATE: Entrepreneurship

```mdx
---
title: "Program Name Year — Grant/Award Amount"
category: "entrepreneurship"
date: "YYYY-MM-DD"
deadline: "YYYY-MM-DD"
location: "Country or Pan-Africa"
benefit: "Grant amount or benefit description"
applyUrl: "https://official-link.com"
excerpt: "One sentence: funder, amount, who qualifies."
featured: false
tags: ["grant", "startup", "sector", "country"]
---

[Same structure as jobs]
```

---

## TEMPLATE: Growth Mindset

```mdx
---
title: "Article Title — Keep It Specific"
category: "growth-mindset"
date: "YYYY-MM-DD"
excerpt: "One sentence describing what the reader will learn."
featured: false
tags: ["topic", "career", "skills"]
---

[Free-form article. Use ## for headings, bullet points, and real examples.]
```

---

## Step 2 — Publish

After saving your file, run these three commands:

```bash
git add .
git commit -m "Added [title of post]"
git push
```

Your post is live within 60 seconds.

---

## Important Rules

1. **deadline field format:** always `YYYY-MM-DD` e.g. `2025-11-05`
2. **date field:** today's date in same format
3. **applyUrl:** always the DIRECT application link, not the homepage
4. **excerpt:** max 160 characters — this is your Google meta description
5. **featured: true** — only for your best 1-2 posts per category
6. **Remove expired posts:** once a deadline passes, either delete the file or add `expired: true` to frontmatter
