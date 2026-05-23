import type { Blog, BlogListItem, Work, WorkListItem } from '@/lib/types'

const now = new Date().toISOString()

export const fallbackBlogPosts: Blog[] = [
    {
        id: 'fallback-blog-1',
        slug: 'cache-cliff-edge-ai-latency',
        title: 'The Cache Cliff: Why Edge AI Latency Isn\'t Linear',
        body: `When benchmarking vision encoders for edge VLLM deployments, a pattern emerged that isn't discussed enough: latency doesn't scale linearly with model size.

At a certain threshold — when the model's working set exceeds the NPU's L2/L3 cache — you hit what I'm calling the **Cache Cliff**. Latency jumps non-linearly, sometimes 3–5×, with only a modest increase in parameter count.

## What this means in practice

Across 8 architectures and 4 hardware platforms (Raspberry Pi 5, Google Coral TPU, NVIDIA Jetson Orin Nano, and one mobile SoC), the pattern held consistently:

- EfficientFormer-L1: **1.6 ms** TTFT
- ViT-Base: **98.0 ms** TTFT

The jump isn't linear between them. There are cliff points where adding parameters produces outsized latency penalties.

## The Sensory Bottleneck Hypothesis

Vision encoders represent 70–85% of TTFT in edge VLLM deployments. The language model — often assumed to be the bottleneck — is not the constraint. The image tokenisation stage is.

This reframes encoder selection entirely. You're not choosing between accuracy tiers; you're choosing between latency regimes:

- **Real-time**: < 15 ms — EfficientFormer-L1 class
- **Interactive**: < 100 ms — MobileViT class
- **Batch**: < 500 ms — ViT-Base class

## Implication for hardware-aware design

Don't interpolate between benchmarks on different hardware. Measure cache behaviour directly. A model that sits comfortably in L2 on a Jetson may spill to DRAM on a Coral TPU, changing its latency profile entirely.

The hardware-aware encoder selection matrix from this research maps architectures to regimes per platform — because the "best" encoder is always relative to your cache topology.`,
        excerpt: 'A non-linear latency jump occurs when model size exceeds L2/L3 NPU cache — and it changes how you should select encoders for edge deployment.',
        banner_image: '/blog/hero-devanagari.png',
        tags: ['research', 'edge-ai', 'ml-systems'],
        read_time: 5,
        status: 'published',
        seo_title: null,
        seo_description: null,
        published_at: '2026-01-10T00:00:00.000Z',
        created_at: now,
        updated_at: now,
    },
]

export const fallbackBlogListItems: BlogListItem[] = fallbackBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    banner_image: post.banner_image,
    tags: post.tags,
    read_time: post.read_time,
    created_at: post.created_at,
    published_at: post.published_at,
}))

export const fallbackWorks: Work[] = [
    {
        id: 'fallback-work-1',
        slug: 'diagflo',
        title: 'DiagFlo',
        description: 'LLM engine that converts plain-language inputs into executable DSLs across 20+ technical formats.',
        problem: 'Translating natural language intent into structured, executable diagram formats requires consistent LLM orchestration and DSL parsing across a wide surface area of output types.',
        constraints: 'Must run on Cloudflare edge with low cold-start latency; LLM outputs must be deterministic enough to be parsed as valid DSLs without post-hoc correction loops.',
        decisions: 'Used LangChain for orchestration with an MCP Server layer to standardise tool calls; Gemini API chosen for its large context window needed to hold DSL grammars in-prompt.',
        tech_context: 'Deployed on Cloudflare Workers with streaming responses; MCP Server handles format routing logic so the core LLM chain remains format-agnostic.',
        outcome: '~50 weekly active product users. Supports 20+ technical output formats. Active and in continuous development.',
        body: null,
        role: 'Builder',
        tech_stack: ['LangChain', 'MCP Server', 'Gemini API', 'Cloudflare', 'TypeScript'],
        repo_url: null,
        demo_url: 'https://diagflo.yashvardhan.dev',
        demo_label: 'Live',
        project_status: 'active',
        featured: true,
        status: 'published',
        display_order: 1,
        created_at: now,
        updated_at: now,
    },
    {
        id: 'fallback-work-2',
        slug: 'getcred',
        title: 'GetCred',
        description: 'Bureau-agnostic ML credit scoring model targeting the 120M+ unbanked Indian demographic.',
        problem: 'Traditional credit bureaus exclude 120M+ Indians with no formal credit history, leaving them without access to financial products despite having real transactional footprints.',
        constraints: 'Privacy-first pipeline — no PII retained after feature extraction; must handle 2M+ simulated monthly transactions at sub-2-minute inference latency.',
        decisions: 'XGBoost chosen for its interpretability via SHAP and performance on tabular financial data; PySpark for distributed transaction aggregation; Docker for reproducible inference environments.',
        tech_context: 'SQLite as a lightweight persistence layer for the scoring pipeline; SHAP explanations surfaced per-applicant so decisions are auditable.',
        outcome: 'Privacy-first pipeline processes 2M+ simulated monthly transactions at sub-2-minute inference latency. Active.',
        body: null,
        role: 'Builder',
        tech_stack: ['Python', 'XGBoost', 'SQLite', 'PySpark', 'SHAP', 'Docker'],
        repo_url: null,
        demo_url: 'https://getcred.yashvardhan.dev',
        demo_label: 'Live',
        project_status: 'active',
        featured: false,
        status: 'published',
        display_order: 2,
        created_at: now,
        updated_at: now,
    },
]

export const fallbackWorkListItems: WorkListItem[] = fallbackWorks.map((work) => ({
    slug: work.slug,
    title: work.title,
    description: work.description,
    outcome: work.outcome,
    tech_stack: work.tech_stack,
    repo_url: work.repo_url,
    demo_url: work.demo_url,
    demo_label: work.demo_label,
    project_status: work.project_status,
    featured: work.featured,
}))
