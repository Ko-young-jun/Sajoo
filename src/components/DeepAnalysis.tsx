import React from 'react';
import { Briefcase, Heart, Activity, Sparkles, AlertCircle, ThumbsUp } from 'lucide-react';
import type { CareerAnalysis, HealthAnalysis, WealthAnalysis, AdvancedElementAnalysis, YongShinDeepProfile } from '../types';

interface DeepAnalysisProps {
    career: CareerAnalysis;
    health: HealthAnalysis;
    wealth: WealthAnalysis;
    advancedFiveElements?: AdvancedElementAnalysis[];
    deepYongShin?: YongShinDeepProfile;
    isPremium: boolean;
}

const DeepAnalysis: React.FC<DeepAnalysisProps> = ({ career, health, wealth, advancedFiveElements, deepYongShin, isPremium }) => {
    if (!isPremium) {
        return (
            <div className="card fade-in" style={{ opacity: 0.7, textAlign: 'center' }}>
                <h3 className="card-title">🔒 프리미엄 분석 잠금</h3>
                <p>직업, 건강, 재물에 대한 심층 분석은 프리미엄 버전에서 제공됩니다.</p>
            </div>
        );
    }

    return (
        <div className="deep-analysis-container fade-in">
            {/* 용신(기운) 심화 분석 */}
            {deepYongShin && (
                <div className="card mb-lg">
                    <div className="da-header">
                        <Sparkles className="da-icon text-indigo" />
                        <h3 className="card-title">나에게 필요한 행운의 기운 (용신)</h3>
                    </div>
                    <div className="da-content">
                        <div className="da-highlight-box theme-indigo">
                            <span className="da-highlight-title">
                                {deepYongShin.description}
                            </span>
                            <p className="da-highlight-desc">
                                선정 이유: {deepYongShin.reason}
                            </p>
                        </div>

                        <div className="da-section">
                            <h4 className="da-subtitle">
                                <ThumbsUp size={16} style={{ marginRight: '6px' }} />
                                구체적인 개운법 (행운을 부르는 방법)
                            </h4>
                            <div className="da-grid">
                                <div className="da-grid-item">
                                    <span className="da-label">음식</span>
                                    <span className="da-value">{deepYongShin.remedy.foods.join(', ')}</span>
                                </div>
                                <div className="da-grid-item">
                                    <span className="da-label">활동</span>
                                    <span className="da-value">{deepYongShin.remedy.activities.join(', ')}</span>
                                </div>
                                <div className="da-grid-item">
                                    <span className="da-label">색상</span>
                                    <span className="da-value">{deepYongShin.remedy.colors.map((c: any) => c.name).join(', ')}</span>
                                </div>
                                <div className="da-grid-item">
                                    <span className="da-label">방향</span>
                                    <span className="da-value">{deepYongShin.remedy.direction}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 직업 */}
            <div className="card mb-lg">
                <div className="da-header">
                    <Briefcase className="da-icon text-blue" />
                    <h3 className="card-title">직업 심화 분석</h3>
                </div>
                <div className="da-content">
                    <div className="da-row">
                        <span className="da-row-label">추천 직업:</span>
                        <div className="da-tags">
                            {career.suitableJobs.map((job, idx) => (
                                <span key={idx} className="da-tag tag-blue">
                                    {job}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="da-row">
                        <span className="da-row-label">업무 스타일:</span>
                        <p className="da-text">{career.workStyle}</p>
                    </div>
                    <div className="da-advice-box theme-blue">
                        💡 {career.advice}
                    </div>
                </div>
            </div>

            {/* 건강 */}
            <div className="card mb-lg">
                <div className="da-header">
                    <Heart className="da-icon text-red" />
                    <h3 className="card-title">건강 심화 분석</h3>
                </div>
                <div className="da-content">
                    <div className="da-row">
                        <span className="da-row-label">주의해야 할 장기:</span>
                        <div className="da-tags">
                            {health.weakOrgans.length > 0 ? health.weakOrgans.map((organ, idx) => (
                                <span key={idx} className="da-tag tag-red">
                                    {organ}
                                </span>
                            )) : <span className="da-text-safe">특별히 약한 장기가 발견되지 않았습니다. 균형 잡힌 상태입니다.</span>}
                        </div>
                    </div>

                    {/* 오행 건강 정보 추가 */}
                    {advancedFiveElements && advancedFiveElements.map(el => (
                        el.state === 'weak' && (
                            <div key={el.element} className="da-warning-box">
                                <span className="da-warning-title">
                                    <AlertCircle size={14} className="inline-icon" />
                                    {el.element === 'wood' ? '목(Wood)' : el.element === 'fire' ? '화(Fire)' : el.element === 'earth' ? '토(Earth)' : el.element === 'metal' ? '금(Metal)' : '수(Water)'} 기운 부족
                                </span>
                                <p className="da-warning-text">{el.details.health.prevention}</p>
                            </div>
                        )
                    ))}

                    {health.symptoms.length > 0 && (
                        <div className="da-row">
                            <span className="da-row-label">관련 증상:</span>
                            <p className="da-text">{health.symptoms.join(', ')}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 재물 */}
            <div className="card mb-lg">
                <div className="da-header">
                    <Activity className="da-icon text-gold" />
                    <h3 className="card-title">재물 심화 분석</h3>
                </div>
                <div className="da-content">
                    <div className="da-row">
                        <span className="da-row-label">재물 유형:</span>
                        <span className="da-value-highlight">{wealth.type}</span>
                    </div>
                    <p className="da-text">{wealth.description}</p>
                    <div className="da-advice-box theme-gold">
                        💰 {wealth.advice}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeepAnalysis;

// 스타일 정의
const daStyles = `
.deep-analysis-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.da-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.da-icon {
    width: 24px;
    height: 24px;
}
.text-indigo { color: #6366f1; }
.text-blue { color: #3b82f6; }
.text-red { color: #ef4444; }
.text-gold { color: #d97706; }

.da-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.da-highlight-box {
    padding: 1.25rem;
    border-radius: var(--radius-md);
    background: rgba(99, 102, 241, 0.05);
    border: 1px solid rgba(99, 102, 241, 0.1);
}

.da-highlight-title {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
    color: #4338ca;
    margin-bottom: 0.5rem;
}

.da-highlight-desc {
    font-size: 0.9rem;
    color: #4f46e5;
    line-height: 1.5;
}

.da-subtitle {
    font-size: 1rem;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    font-family: var(--font-serif);
}

.da-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.da-grid-item {
    background: rgba(255,255,255,0.5);
    padding: 0.75rem;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(0,0,0,0.05);
}

.da-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.da-value {
    font-size: 0.9rem;
    color: var(--text-primary);
}

.da-row {
    margin-bottom: 0.5rem;
}

.da-row-label {
    font-weight: 600;
    color: var(--text-primary);
    margin-right: 0.5rem;
    font-size: 0.95rem;
}

.da-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.da-tag {
    padding: 0.25rem 0.6rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 500;
}
.tag-blue { background: rgba(59, 130, 246, 0.1); color: #1e40af; }
.tag-red { background: rgba(239, 68, 68, 0.1); color: #991b1b; }

.da-text {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
    margin-top: 0.25rem;
}

.da-text-safe {
    color: #22c55e;
    font-size: 0.9rem;
}

.da-advice-box {
    padding: 1rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
.theme-blue { background: rgba(59, 130, 246, 0.08); color: #1e3a8a; }
.theme-gold { background: rgba(217, 119, 6, 0.08); color: #92400e; }

.da-warning-box {
    padding: 1rem;
    border-radius: var(--radius-md);
    background: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.1);
}

.da-warning-title {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 700;
    color: #b91c1c;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
}

.da-warning-text {
    font-size: 0.9rem;
    color: #7f1d1d;
}

.da-value-highlight {
    font-weight: 700;
    color: #ea580c;
    font-size: 1.1rem;
}

@media (max-width: 600px) {
    .da-grid {
        grid-template-columns: 1fr;
    }
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = daStyles;
    document.head.appendChild(styleSheet);
}
