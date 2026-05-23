import type { Blog, BlogListItem, Work, WorkListItem } from '@/lib/types'

const now = new Date().toISOString()

export const fallbackBlogPosts: Blog[] = [
    {
        id: 'fallback-blog-1',
        slug: 'vision-encoder-optimization-edge-vllm',
        title: 'Vision Encoder Optimization for Edge Visual LLMs',
        body: `This is the research I published at ICCCN 2026 in Manchester. The core question I was investigating: when you deploy a visual LLM on edge hardware, where does the latency actually come from? The answer surprised me, and it changes how you should think about model selection entirely.

## The Sensory Bottleneck

The common assumption is that the language model decoder is the expensive part of a VLLM. It's not. The vision encoder is.

Across my benchmarks, the encoder accounted for 70 to 85 percent of Time-to-First-Token (TTFT). The LLM portion, which everyone obsesses over, was secondary. I'm calling this the **Sensory Bottleneck Hypothesis**: the image tokenisation stage, not the autoregressive decoder, determines the real-time viability of edge VLLM deployments.

The full pipeline breaks down like this:

![Edge VLLM Inference Pipeline: Input Processing, Vision Encoder as primary bottleneck, Projector, LLM Decoder. TTFT = L_enc + L_proj + L_prefill(T)](/blog/vllm-pipeline.svg)

**TTFT = L_enc + L_proj + L_prefill(T)** where L_enc is encoder latency (the bottleneck, 1.6ms to 98ms), L_proj is the projector aligning encoder embeddings with LLM space (15-80ms), and T is the visual token count passed to prefill.

## What I Benchmarked

I ran 8 vision encoder architectures across 4 hardware platforms: Raspberry Pi 5, Raspberry Pi 5 with Google Coral TPU, NVIDIA Jetson Orin Nano, and iPhone 15 Pro. Every number below is averaged over 100 inference passes with a 10-pass warm-up, variance under 8%.

| Backbone | Platform | Precision | Latency (ms) | Accuracy |
|---|---|---|---|---|
| EfficientNet-B0 | Raspberry Pi 5 | TFLite INT8 | 28-32 | 77.1% |
| EfficientNet-B3 | Jetson Orin Nano | TensorRT FP16 | **14.2** | **81.6%** |
| EfficientNet-B4 | Jetson Orin Nano | TensorRT FP16 | 48.5 | 82.9% |
| MobileNetV3 | Legacy Pi 4 | TFLite INT8 | 42-56 | 75.2% |
| MobileViT-XS | iPhone 15 Pro | CoreML NPU | 7.2 | 78.9% |
| ViT-Base/16 | Jetson Orin Nano | TensorRT FP16 | 98.0 | 81.0% |
| FastViT-HD | Jetson Orin Nano | TensorRT FP16 | **18.5** | **82.2%** |
| EfficientFormer-L1 | RPi 5 + Coral TPU | TFLite + NNAPI | **1.6** | 79.2% |

That EfficientFormer-L1 number is the one that stuck with me: **1.6 ms** on a Coral TPU, 79.2% accuracy. ViT-Base gets 81.0% accuracy on a Jetson at **98 ms**. You're trading 60x the latency for 1.8 percentage points. The chart below shows all 8 models plotted on the Pareto frontier:

![Latency-Accuracy Pareto Frontier scatter plot: 8 vision encoders benchmarked across edge platforms. Hybrid models (green triangles) dominate the real-time regime. Cache Cliff visible between EfficientNet-B3 and B4.](/blog/pareto-chart.svg)

EfficientNet-B3 and FastViT-HD sit on the Pareto frontier. EfficientNet-B4 falls off it entirely, which is where the Cache Cliff becomes visible.

## The Cache Cliff

The most important finding is what happens between EfficientNet-B3 and EfficientNet-B4 on the Jetson Orin Nano.

B3 runs at 14.2 ms. B4 runs at 48.5 ms. That's a 3.4x jump in latency for 1.3 percentage points of accuracy gain (81.6% to 82.9%).

This is not a linear scaling penalty. It's a cliff. When the model's working set exceeds the L2/L3 cache on the NPU, you get a non-linear jump as the system spills to DRAM. I'm calling this the **Cache Cliff phenomenon**: the point where model size crosses the 2-8 MB L2/L3 cache constraint and latency jumps discontinuously.

The practical consequence is that you can't interpolate between benchmarks. You need to know where the cliff is for each specific hardware platform you're targeting.

## Three Governing Design Principles

From the formal complexity analysis and Roofline modeling, I derived three principles that hold across all four platforms.

**The Law of Resolution:** Encoder latency scales quadratically with input resolution for CNNs and quartically for ViTs. Doubling resolution increases CNN latency by roughly 4x and ViT latency by roughly 16x. For OCR tasks, EfficientNet-B0 at 384px consistently outperforms EfficientNet-B4 at 224px because higher resolution preserves the spatial detail that downsampling destroys.

**The Law of Depth vs Width:** On edge NPUs, inference latency is dominated by sequential memory access overhead, not arithmetic computation. Deep networks create compute unit starvation. ResNet-101 leaves processing units idle waiting for weight transfers from off-chip DRAM. Wide, shallow networks like MobileNetV3 and EfficientFormer maximise SIMD utilisation instead.

**The Hybridization Principle:** Pure ViTs have disproportionate latency on edge accelerators because of quadratic attention complexity and suboptimal operator support. The Coral TPU has to offload ViT-specific ops like Softmax and reshape to the CPU. Hybrid CNN-Transformer architectures use a convolutional stem for spatial reduction before any attention blocks, getting most of the accuracy with far better hardware utilisation. EfficientFormer-L1 achieves 79.2% at 1.6 ms versus ViT-Base at 81.0% at 98 ms.

## The Encoder Selection Matrix

Based on everything above, I built a hardware-aware selection matrix across three latency regimes:

| Regime | Target Platform | Recommended Encoder | Accuracy | Notes |
|---|---|---|---|---|
| Real-Time < 15ms | IoT / Raspberry Pi | MobileViT-XS, EfficientFormer-L1 | 78-79% | Only hybrid models are feasible here |
| Interactive < 50ms | Coral TPU, Jetson Nano | EfficientNet-B0 to B3, FastViT | 79-82% | Sweet spot for balanced performance |
| Batch < 200ms | Jetson Orin, Edge GPU | EfficientNet-B4+ | 82-83% | Watch the cache cliff beyond B3 |

The interactive tool I built to navigate this interactively is live at [vllmarchitect.yashvardhan.dev](https://vllmarchitect.yashvardhan.dev). It lets you select your hardware platform and latency budget and get a specific encoder recommendation with estimated latency.

## What I Got Wrong Initially

My first instinct was to rank encoders by accuracy and work backwards from there. That's the wrong frame. On edge hardware, you're not picking the most accurate model that fits your latency budget. You're picking the model that sits below the cache cliff on your specific hardware, and then checking whether its accuracy is sufficient.

The "best" encoder is always relative to your cache topology, your resolution requirements, and whether you need real-time or batch throughput. ViT-Base is genuinely great on a server. On a Jetson Orin with a 15ms budget, it's unusable.

## What's Next

The paper is accepted at ICCCN 2026 in Manchester. The project site has the interactive encoder selector, full benchmark tables, and the architecture taxonomy. If you're building anything that involves vision on constrained hardware, I think the cache cliff framing is worth understanding before you commit to an architecture.`,
        excerpt: 'I benchmarked 8 vision encoder architectures across 4 edge platforms for my ICCCN 2026 paper. The finding: the encoder, not the LLM decoder, is the bottleneck. And latency does not scale linearly with model size.',
        banner_image: '/blog/vllm-hero.png',
        tags: ['research', 'edge-ai', 'ml-systems', 'icccn-2026'],
        read_time: 8,
        status: 'published',
        seo_title: 'Vision Encoder Optimization for Edge Visual LLMs | ICCCN 2026',
        seo_description: 'I benchmarked 8 vision encoder architectures across 4 edge platforms. The encoder accounts for 70-85% of TTFT. This is the Cache Cliff phenomenon and why latency is not linear.',
        published_at: '2026-03-15T00:00:00.000Z',
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
