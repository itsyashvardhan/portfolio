import styles from './chart.module.css'

const data = [
    { name: 'EfficientFormer-L1', ms: 1.6,  acc: 79.2, type: 'hybrid',   pareto: true  },
    { name: 'MobileViT-XS',       ms: 7.2,  acc: 78.9, type: 'hybrid',   pareto: false },
    { name: 'EfficientNet-B3',    ms: 14.2, acc: 81.6, type: 'cnn',      pareto: true  },
    { name: 'FastViT-HD',         ms: 18.5, acc: 82.2, type: 'hybrid',   pareto: true  },
    { name: 'EfficientNet-B0',    ms: 30,   acc: 77.1, type: 'cnn',      pareto: false },
    { name: 'EfficientNet-B4',    ms: 48.5, acc: 82.9, type: 'cnn',      pareto: false, cliff: true },
    { name: 'MobileNetV3',        ms: 49,   acc: 75.2, type: 'cnn',      pareto: false },
    { name: 'ViT-Base/16',        ms: 98.0, acc: 81.0, type: 'vit',      pareto: false },
]

// Chart area: x=latency 0-110ms, y=accuracy 73-85%
const W = 660, H = 300
const PAD = { top: 36, right: 20, bottom: 56, left: 52 }
const cW = W - PAD.left - PAD.right
const cH = H - PAD.top - PAD.bottom

const xMin = 0, xMax = 110
const yMin = 73, yMax = 85

const toX = (ms: number) => PAD.left + ((ms - xMin) / (xMax - xMin)) * cW
const toY = (acc: number) => PAD.top + ((yMax - acc) / (yMax - yMin)) * cH

const xTicks = [0, 25, 50, 75, 100]
const yTicks = [74, 76, 78, 80, 82, 84]

const regimes = [
    { x: 0,  w: toX(15) - toX(0),  label: '<15ms',  color: 'var(--regime-rt)' },
    { x: toX(15), w: toX(50) - toX(15), label: '<50ms', color: 'var(--regime-int)' },
]

export function ParetoChart() {
    return (
        <figure className={styles.figure}>
            <div className={styles.header}>
                <span className={styles.label}>Latency-Accuracy Pareto Frontier</span>
                <div className={styles.legend}>
                    <span className={styles.legendItem} data-type="hybrid">
                        <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,10 0,10" fill="currentColor"/></svg>
                        Hybrid (Pareto-optimal)
                    </span>
                    <span className={styles.legendItem} data-type="cnn">
                        <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="currentColor"/></svg>
                        CNN
                    </span>
                    <span className={styles.legendItem} data-type="vit">
                        <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 9.76,3.45 7.94,9.05 2.06,9.05 0.24,3.45" fill="currentColor"/></svg>
                        Pure ViT
                    </span>
                    <span className={styles.legendItem} data-type="cliff">
                        <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                        Cache Cliff
                    </span>
                </div>
            </div>

            <svg
                className={styles.svg}
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label="Scatter plot: Latency vs Accuracy for 8 vision encoders across edge hardware platforms"
            >
                {/* Regime zones */}
                {regimes.map((r, i) => (
                    <rect key={i}
                        x={r.x} y={PAD.top}
                        width={r.w} height={cH}
                        fill={r.color}
                        opacity="1"
                    />
                ))}

                {/* Y grid */}
                {yTicks.map(y => (
                    <line key={y}
                        x1={PAD.left} y1={toY(y)}
                        x2={PAD.left + cW} y2={toY(y)}
                        className={styles.grid}
                    />
                ))}

                {/* X grid */}
                {xTicks.map(x => (
                    <line key={x}
                        x1={toX(x)} y1={PAD.top}
                        x2={toX(x)} y2={PAD.top + cH}
                        className={styles.grid}
                    />
                ))}

                {/* Axes */}
                <line x1={PAD.left} y1={PAD.top + cH} x2={PAD.left + cW} y2={PAD.top + cH} className={styles.axis}/>
                <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + cH} className={styles.axis}/>

                {/* X ticks */}
                {xTicks.map(x => (
                    <text key={x}
                        x={toX(x)} y={PAD.top + cH + 18}
                        className={styles.tick} textAnchor="middle"
                    >{x}ms</text>
                ))}

                {/* Y ticks */}
                {yTicks.map(y => (
                    <text key={y}
                        x={PAD.left - 8} y={toY(y) + 4}
                        className={styles.tick} textAnchor="end"
                    >{y}%</text>
                ))}

                {/* Axis labels */}
                <text x={PAD.left + cW / 2} y={H - 4} className={styles.axisLabel} textAnchor="middle">
                    Encoder Latency (ms) — lower is better
                </text>
                <text
                    x={12} y={PAD.top + cH / 2}
                    className={styles.axisLabel} textAnchor="middle"
                    transform={`rotate(-90, 12, ${PAD.top + cH / 2})`}
                >
                    Accuracy (%)
                </text>

                {/* Regime labels */}
                <text x={toX(7)} y={PAD.top - 8} className={styles.regimeLabel} textAnchor="middle" data-regime="rt">Real-time</text>
                <text x={toX(32)} y={PAD.top - 8} className={styles.regimeLabel} textAnchor="middle" data-regime="int">Interactive</text>

                {/* Cache cliff annotation */}
                <line
                    x1={toX(14.2)} y1={toY(81.6) - 24}
                    x2={toX(48.5)} y2={toY(82.9) - 10}
                    className={styles.cliffArrow}
                />
                <text x={toX(28)} y={toY(82.5) - 28} className={styles.cliffLabel} textAnchor="middle">
                    3.4× jump · Cache Cliff
                </text>

                {/* Data points */}
                {data.map((d) => {
                    const cx = toX(d.ms), cy = toY(d.acc)
                    const r = d.pareto ? 7 : 5.5
                    const labelOffset = getLabelOffset(d.name)

                    return (
                        <g key={d.name}>
                            {/* Point */}
                            {d.type === 'hybrid' ? (
                                <polygon
                                    points={`${cx},${cy - r * 1.2} ${cx + r},${cy + r * 0.7} ${cx - r},${cy + r * 0.7}`}
                                    className={styles.pointHybrid}
                                />
                            ) : d.type === 'vit' ? (
                                <polygon
                                    points={`${cx},${cy - r} ${cx + r * 0.95},${cy - r * 0.31} ${cx + r * 0.59},${cy + r * 0.81} ${cx - r * 0.59},${cy + r * 0.81} ${cx - r * 0.95},${cy - r * 0.31}`}
                                    className={styles.pointVit}
                                />
                            ) : d.cliff ? (
                                <>
                                    <circle cx={cx} cy={cy} r={r} className={styles.pointCliff}/>
                                    <circle cx={cx} cy={cy} r={r + 4} fill="none" className={styles.pointCliffRing}/>
                                </>
                            ) : (
                                <circle cx={cx} cy={cy} r={r} className={d.pareto ? styles.pointCnnPareto : styles.pointCnn}/>
                            )}
                            {/* Label */}
                            <text
                                x={cx + labelOffset.dx}
                                y={cy + labelOffset.dy}
                                className={d.pareto || d.cliff ? styles.labelBold : styles.labelMuted}
                            >
                                {d.name}
                            </text>
                        </g>
                    )
                })}
            </svg>

            <figcaption className={styles.caption}>
                8 architectures benchmarked across RPi 5, Jetson Orin Nano, Coral TPU, iPhone 15 Pro.
                Triangles are hybrid CNN-Transformer models. Cache Cliff visible between B3 (14.2ms) and B4 (48.5ms) on Jetson.
                Source: Table II, ICCCN 2026.
            </figcaption>
        </figure>
    )
}

function getLabelOffset(name: string): { dx: number; dy: number } {
    const offsets: Record<string, { dx: number; dy: number }> = {
        'EfficientFormer-L1': { dx: 10,  dy: -8  },
        'MobileViT-XS':       { dx: 10,  dy: 5   },
        'EfficientNet-B3':    { dx: 10,  dy: -8  },
        'FastViT-HD':         { dx: 10,  dy: -8  },
        'EfficientNet-B0':    { dx: 10,  dy: -8  },
        'EfficientNet-B4':    { dx: 10,  dy: -8  },
        'MobileNetV3':        { dx: 10,  dy: 14  },
        'ViT-Base/16':        { dx: 10,  dy: -8  },
    }
    return offsets[name] || { dx: 8, dy: -8 }
}
