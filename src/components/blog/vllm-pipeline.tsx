import styles from './chart.module.css'

const stages = [
    {
        id: 'input',
        label: 'Input Processing',
        sub: 'Resize · Normalize',
        detail: ['224px or 384px', 'Resolution sets encoder cost'],
        latency: 'L_pre ≈ trivial',
        bottleneck: false,
    },
    {
        id: 'encoder',
        label: 'Vision Encoder',
        sub: 'Primary Bottleneck',
        detail: ['CNN / ViT / Hybrid', '576-1024 visual tokens', '70-85% of total TTFT'],
        latency: 'L_enc: 1.6 – 98 ms',
        bottleneck: true,
    },
    {
        id: 'projector',
        label: 'Projector',
        sub: 'MLP or Q-Former',
        detail: ['Aligns encoder space', 'with LLM token space', 'Q-Former compresses 16×'],
        latency: 'L_proj: 15 – 80 ms',
        bottleneck: false,
    },
    {
        id: 'decoder',
        label: 'LLM Decoder',
        sub: 'Prefill + Generation',
        detail: ['Autoregressive decode', 'Prefill scales with T', '(visual token count)'],
        latency: 'L_prefill(T)',
        bottleneck: false,
    },
]

export function VLLMPipeline() {
    return (
        <figure className={styles.figure}>
            <div className={styles.header}>
                <span className={styles.label}>Edge VLLM Inference Pipeline</span>
            </div>

            <div className={styles.pipeline}>
                {stages.map((stage, i) => (
                    <div key={stage.id} className={styles.pipelineRow}>
                        <div className={`${styles.stage} ${stage.bottleneck ? styles.stageBottleneck : ''}`}>
                            {stage.bottleneck && (
                                <div className={styles.bottleneckBadge}>70-85% TTFT</div>
                            )}
                            <div className={styles.stageName}>{stage.label}</div>
                            <div className={styles.stageSub}>{stage.sub}</div>
                            <div className={styles.stageDivider}/>
                            <div className={styles.stageDetail}>
                                {stage.detail.map((d, j) => (
                                    <span key={j}>{d}</span>
                                ))}
                            </div>
                            <div className={styles.stageLatency}>{stage.latency}</div>
                        </div>
                        {i < stages.length - 1 && (
                            <div className={styles.arrow} aria-hidden="true">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                    <path d="M0 8H16M16 8L10 2M16 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.formula}>
                <span className={styles.formulaLabel}>TTFT =</span>
                <span className={styles.formulaTerm}>L<sub>enc</sub></span>
                <span className={styles.formulaOp}>+</span>
                <span className={styles.formulaTerm}>L<sub>proj</sub></span>
                <span className={styles.formulaOp}>+</span>
                <span className={styles.formulaTerm}>L<sub>prefill</sub>(T)</span>
                <span className={styles.formulaNote}>where L<sub>enc</sub> dominates</span>
            </div>

            <figcaption className={styles.caption}>
                Source: vllmarchitect.yashvardhan.dev · ICCCN 2026, Manchester UK
            </figcaption>
        </figure>
    )
}
