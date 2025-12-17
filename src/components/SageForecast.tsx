import { YearlyForecast } from '../types';

interface SageForecastProps {
    forecasts: YearlyForecast[];
}

export function SageForecast({ forecasts }: SageForecastProps) {
    if (!forecasts || forecasts.length === 0) return null;

    return (
        <div className="card fade-in" style={{ marginTop: '2rem' }}>
            <h2 className="card-title text-center mb-6">
                <span className="text-primary mr-2">🔮</span>
                현자의 미래 예언
            </h2>

            <div className="sage-grid">
                {forecasts.map((forecast) => {
                    const isSpecial = !!forecast.specialEvent;
                    return (
                        <div
                            key={forecast.year}
                            className={`sage-card ${isSpecial ? 'special-event' : ''}`}
                        >
                            {/* Header */}
                            <div className="sage-header">
                                <span className="sage-year">{forecast.year}년</span>
                                <span className="sage-ganji">{forecast.gan}{forecast.ji}년</span>
                            </div>

                            <h3 className="sage-theme">"{forecast.theme}"</h3>

                            {isSpecial && (
                                <div className="special-badge">
                                    🔥 {forecast.specialEvent?.name} 발동!
                                </div>
                            )}

                            <p className="sage-desc">
                                {forecast.description}
                                {isSpecial && (
                                    <span className="special-effect-text">
                                        <br />
                                        <strong>Effect:</strong> {forecast.specialEvent?.effect}
                                    </span>
                                )}
                            </p>

                            {/* Detailed Categories */}
                            {forecast.categories && (
                                <div className="category-grid">
                                    <CategoryItem label="💰 재물" data={forecast.categories.wealth} />
                                    <CategoryItem label="💼 직업" data={forecast.categories.career} />
                                    <CategoryItem label="❤️ 애정" data={forecast.categories.love} />
                                    <CategoryItem label="💪 건강" data={forecast.categories.health} />
                                </div>
                            )}

                            {/* Advice & Timing */}
                            <div className="sage-footer-info">
                                {forecast.advice && forecast.advice.length > 0 && (
                                    <div className="advice-box">
                                        <h4>💡 현자의 조언</h4>
                                        <ul>
                                            {forecast.advice.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {forecast.keyMonths && (
                                    <div className="timing-box">
                                        <div className="timing-row">
                                            <span className="timing-label good">🍀 행운의 달:</span>
                                            <span>{forecast.keyMonths.best.join(', ')}월</span>
                                        </div>
                                        <div className="timing-row">
                                            <span className="timing-label bad">⚠️ 주의할 달:</span>
                                            <span>{forecast.keyMonths.caution.join(', ')}월</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="sage-score-bar-container">
                                <div className="sage-score-bar">
                                    <div className="sage-score-fill" style={{ width: `${forecast.score}%` }}></div>
                                </div>
                                <span className="sage-score-text">종합 운세 점수: {forecast.score}점</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .sage-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 1.5rem;
                }
                .sage-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 1.5rem;
                    position: relative;
                    transition: transform 0.3s ease;
                }
                .sage-card.special-event {
                    border: 1px solid #eab308;
                    background: linear-gradient(135deg, rgba(234, 179, 8, 0.05) 0%, rgba(234, 179, 8, 0.01) 100%);
                    box-shadow: 0 4px 20px rgba(234, 179, 8, 0.1);
                }
                .sage-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 0.5rem;
                }
                .sage-year {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--text-primary);
                }
                .sage-ganji {
                    font-family: var(--font-serif);
                    color: var(--text-muted);
                }
                .sage-theme {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: #eab308;
                    margin-bottom: 1rem;
                }
                .special-badge {
                    display: inline-block;
                    background: rgba(234, 179, 8, 0.2);
                    color: #facc15;
                    padding: 0.25rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                .sage-desc {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .special-effect-text {
                    display: block;
                    margin-top: 0.5rem;
                    color: #ffd700;
                }
                
                /* Category Grid */
                .category-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                .category-item {
                    background: rgba(0, 0, 0, 0.03);
                    padding: 0.75rem;
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                }
                .cat-label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 0.25rem;
                    display: block;
                }
                .cat-score-bg {
                    background: rgba(0, 0, 0, 0.1);
                    height: 4px;
                    border-radius: 2px;
                    margin-bottom: 0.25rem;
                }
                .cat-score-fill {
                    background: var(--text-secondary);
                    height: 100%;
                    border-radius: 2px;
                }
                .cat-text {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    line-height: 1.3;
                    display: block;
                }

                /* Advice Box */
                .advice-box {
                    background: rgba(234, 179, 8, 0.05);
                    border-radius: 12px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                }
                .advice-box h4 {
                    font-size: 0.9rem;
                    color: #d97706;
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                .advice-box ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }
                .advice-box li {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    margin-bottom: 0.25rem;
                    padding-left: 1rem;
                    position: relative;
                }
                .advice-box li::before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: #d97706;
                }

                /* Timing Box */
                .timing-box {
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 12px;
                    padding: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                .timing-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    margin-bottom: 0.25rem;
                    color: var(--text-secondary);
                }
                .timing-label {
                    font-weight: 600;
                }
                .timing-label.good { color: #10b981; }
                .timing-label.bad { color: #ef4444; }

                .sage-score-bar-container {
                    margin-top: auto;
                }
                .sage-score-bar {
                    background: rgba(0, 0, 0, 0.1);
                    height: 6px;
                    border-radius: 3px;
                    margin-bottom: 0.5rem;
                }
                .sage-score-fill {
                    background: var(--primary-color);
                    height: 100%;
                    border-radius: 3px;
                }
                .sage-score-text {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    float: right;
                }
            `}</style>
        </div>
    );
}

function CategoryItem({ label, data }: { label: string, data: { score: number, text: string } }) {
    // Score limits 0-100
    const safeScore = Math.min(100, Math.max(0, data.score));
    return (
        <div className="category-item">
            <span className="cat-label">{label} <span style={{ fontSize: '0.7em', opacity: 0.7 }}>{data.score}점</span></span>
            <div className="cat-score-bg">
                <div className="cat-score-fill" style={{ width: `${safeScore}%` }}></div>
            </div>
            <span className="cat-text">{data.text}</span>
        </div>
    );
}
