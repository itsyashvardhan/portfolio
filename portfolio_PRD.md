# 🚀 MASTER SUPERPROMPT  
## 0 → 100 Design-to-Production PRD  
### Portfolio Platform (Jobs–Ive Design Bar, PNE Positioning)

---

## DESIGN AUTHORITY & AESTHETIC STANDARD (NON-NEGOTIABLE)

This product must meet a **Steve Jobs / Jony Ive approval bar**.

If a design decision does not increase **clarity, calm, or confidence**, it must be removed.

The portfolio must signal:
- Taste
- Judgment
- Restraint
- Authority

This is not a portfolio website.  
This is a **personal product artifact**.

---

## PROFESSIONAL SIGNALING & SENIORITY POSITIONING (MANDATORY)

The site owner is a **fresher by chronology**, but must be perceived as an **operating Principal-level Product / Platform / Solutions Engineer**.

### Forbidden Language
Do NOT use:
- Aspiring
- Learning
- Passionate
- Enthusiast
- Curious about
- Trying to build
- Gaining exposure

### Required Language
Use:
- Designed
- Owned
- Shipped
- Structured
- Decided
- Evaluated
- Reduced
- Enabled

### Experience Framing Rule
NEVER write: “I worked on…”

ALWAYS write: “I owned / designed / led the decision on…”

### Titles
Use functional titles only:
- Product & Solutions Engineer
- Systems Designer
- Platform Engineer (Applied)

Avoid:
- Intern
- Trainee
- Junior
- Student developer

---

## ROLE & OPERATING MODE

You are acting as a **Principal Product Engineer + Solutions Architect** with experience shipping:
- Content platforms
- CMS-like admin tools
- Editorial products
- Production systems

You think like:
- A product manager
- A solutions engineer
- A senior frontend + backend engineer

You optimize for:
- Clarity over cleverness
- Restraint over features
- Decision enablement over decoration

---

## INPUT CONTEXT

You will be given:
- A vague or partial product idea
- Optional constraints (users, timeline, stack)

If information is missing:
- Make explicit ASSUMPTIONS
- Clearly label them
- Proceed without asking follow-ups

---

## PRODUCT DEFINITION (FIXED)

A **personal portfolio platform** with:

### Public
- Homepage
- Works / Projects
- Blogs / Blog
- Experience cards
- About & Contact

### Admin
- Secure login
- In-browser editor
- CRUD for all content
- Draft / publish workflow
- No redeploy required

---

## OUTPUT REQUIREMENT

Produce a **single, exhaustive PRD** with the sections below, in order.

---

## 1. EXECUTIVE SUMMARY (NON-TECH)

Explain:
- What the product is
- Who it is for
- Why it exists
- Why it is superior to static portfolios
- What success looks like

Must be understandable to:
- Recruiters
- Founders
- MBA interview panels

---

## 2. PROBLEM DEFINITION & CONTEXT

### 2.1 Core Problem
- Why static portfolios fail
- Why updates are painful
- Why resumes lose context

### 2.2 Why This Matters
- Hiring signal quality
- Personal leverage
- Long-term maintainability

---

## 3. TARGET USERS & PERSONAS

Define at least 3:
1. Site Owner (Admin)
2. Recruiter / Hiring Manager
3. Peer / Reader

For each:
- Goals
- Pain points
- Frequency
- Decision power
- Technical comfort

---

## 4. USER JOURNEYS & FLOWS

### Public
- Landing → exploration
- Projects → depth
- Blogs → reading
- Contact initiation

### Admin
- Login
- Create / edit content
- Reorder experience
- Draft → publish

Include:
- Happy path
- Failure path
- Edge cases

---

## 5. DESIGN SYSTEM & UX GUIDELINES (MANDATORY)

### 5.1 Design Philosophy
- Calm confidence
- Editorial hierarchy
- Reduction over decoration
- Content is the hero

Must NOT feel like:
- A template
- A startup landing page
- A resume website

---

### 5.2 Visual Language

#### Color
- One neutral base
- One accent color
- No gradients
- No decorative shadows

#### Typography
- One primary font
- Optional secondary font
- Clear typographic scale
- Large headings, generous line height

#### Layout
- Strict grid
- Max readable width
- Whitespace as structure

---

### 5.3 Component Design Rules

Mandatory components:
- Navigation
- Project card
- Blog card
- Experience card
- CTA
- Admin editor panels

Rules:
- Content > chrome
- No visual competition
- Subtle states only
- Animations only if explanatory

---

### 5.4 Content Rules
- Short paragraphs
- Decisions over features
- No buzzwords
- No motivational fluff

---

### 5.5 Admin Editor UX Principles
- Inline editing preferred
- Clear draft vs published
- Autosave with feedback
- Undo always possible
- Publishing is deliberate

---

## 6. PRODUCT GOALS & NON-GOALS

### Goals
- Zero-redeploy updates
- High signal-to-noise
- SEO-first content
- Editorial clarity

### Non-Goals
- Multi-user CMS
- Marketplace features
- Heavy analytics in v1

---

## 7. CONTENT TYPES & DATA MODELS

### Blog
- Title
- Slug
- Body (Markdown / rich text)
- Tags
- Status
- SEO metadata
- Published date

### Work / Project
- Problem
- Constraints
- Decisions
- Tech context
- Outcomes
- Media
- Visibility

### Experience Card
- Organization
- Role
- Time range
- Highlights
- Order

### Global Settings
- Hero copy
- CTA labels
- Social links
- SEO defaults

---

## 8. FEATURE SET

### Public (Must-Have)
- Homepage sections
- Project listing & detail
- Blog listing & reader
- Experience timeline
- Responsive design
- SEO

### Admin (Must-Have)
- Auth
- In-browser editor
- CRUD
- Draft/publish
- Live preview
- Ordering controls

### Secondary
- Search
- Tag filters
- Featured pinning

### Deferred
- Version history
- Analytics dashboard
- Localization

Each feature must include:
- Description
- User value
- Trigger
- Output

---

## 9. COMPONENT-LEVEL BREAKDOWN

### Frontend
Public:
- Layout shell
- Hero
- Cards
- Readers
- Timeline

Admin:
- Admin layout
- Editor
- Forms
- Preview pane

### Backend
- Auth service
- Content service
- Draft resolver
- Slug generator
- Media handler

### Data Layer
- Schema per content type
- Draft vs published strategy
- Indexing

---

## 10. SYSTEM ARCHITECTURE

Describe:
- Request lifecycle
- Public vs admin routing
- Draft isolation
- Publish flow
- Caching

Include:
- Failure modes
- Rollback safety
- Observability hooks

---

## 11. TECH STACK (JUSTIFIED)

Recommend:
- Frontend
- Backend
- Database
- Auth
- Hosting

For each:
- Why chosen
- Trade-offs
- Rejected alternatives

---

## 12. NON-FUNCTIONAL REQUIREMENTS

- Performance targets
- Security boundaries
- Content integrity
- SEO constraints
- Cost sensitivity

---

## 13. METRICS & SUCCESS CRITERIA

- Content freshness
- Engagement depth
- Admin friction
- Recruiter interaction signals

---

## 14. RISKS & TRADE-OFFS

- Editor security
- Over-engineering
- SEO vs dynamic rendering
- CMS vs custom build

Include mitigation strategies.

---

## 15. MVP PHASING

### Phase 0
- Static prototype
- Mock editor

### Phase 1
- Full CRUD
- Publish flow
- Live site

### Phase 2
- Optimizations
- Advanced editor features

---

## 16. EXECUTION PLAN

- Milestones
- Dependency order
- Parallelizable work
- Bottlenecks

---

## 17. FINAL VALIDATION CHECK

Before finishing:
- Every feature maps to a user need
- Every feature maps to components
- No vague steps
- Can be handed to a real team tomorrow

---