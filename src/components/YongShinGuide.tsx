// ================================================
// 용신/개운 가이드 컴포넌트
// ================================================

import type { YongShinAnalysis, Element } from '../types';
import { getElementGuide } from '../data/elementGuide';
import { Compass, Palette, Hash, UtensilsCrossed, Activity, Briefcase } from 'lucide-react';

interface YongShinGuideProps {
    analysis: YongShinAnalysis;
}

const ELEMENT_NAMES: Record<Element, string> = {
    wood: '목(木)',
    fire: '화(火)',
    earth: '토(土)',
    metal: '금(金)',
    water: '수(水)'
};

const ELEMENT_EMOJIS: Record<Element, string> = {
    wood: '🌳',
    fire: '🔥',
    earth: '🏔️',
    metal: '⚙️',
    water: '💧'
};

export function YongShinGuide({ analysis }: YongShinGuideProps) {
    const guide = getElementGuide(analysis.yongShin);

    return (
        <div className="card yongshin-card fade-in">
            <div className="card-header">
                <h3 className="card-title">용신 분석 & 개운 가이드</h3>
                <p className="card-subtitle">당신에게 필요한 기운과 보충 방법</p>
            </div>

            {/* 용신/희신/기신 표시 */}
            <div className="yongshin-grid">
                <div className="yongshin-item yongshin">
                    <span className="yongshin-emoji">{ELEMENT_EMOJIS[analysis.yongShin]}</span>
                    <span className="yongshin-label">용신 (用神)</span>
                    <span className="yongshin-name">{ELEMENT_NAMES[analysis.yongShin]}</span>
                    <span className="yongshin-desc">가장 필요한 기운</span>
                </div>
                <div className="yongshin-item huishin">
                    <span className="yongshin-emoji">{ELEMENT_EMOJIS[analysis.huiShin]}</span>
                    <span className="yongshin-label">희신 (喜神)</span>
                    <span className="yongshin-name">{ELEMENT_NAMES[analysis.huiShin]}</span>
                    <span className="yongshin-desc">용신을 도와주는 기운</span>
                </div>
                {analysis.giShin && (
                    <div className="yongshin-item gishin">
                        <span className="yongshin-emoji">{ELEMENT_EMOJIS[analysis.giShin]}</span>
                        <span className="yongshin-label">기신 (忌神)</span>
                        <span className="yongshin-name">{ELEMENT_NAMES[analysis.giShin]}</span>
                        <span className="yongshin-desc">주의할 기운</span>
                    </div>
                )}
            </div>

            {/* 개운 가이드 */}
            <div className="lucky-guide">
                <h4 className="guide-title">
                    {ELEMENT_EMOJIS[analysis.yongShin]} {ELEMENT_NAMES[analysis.yongShin]} 기운 보충법
                </h4>

                <div className="guide-grid">
                    <div className="guide-item">
                        <Compass size={20} className="guide-icon" />
                        <span className="guide-label">행운의 방향</span>
                        <span className="guide-value">{guide.direction}</span>
                    </div>

                    <div className="guide-item">
                        <Palette size={20} className="guide-icon" />
                        <span className="guide-label">행운의 색상</span>
                        <span className="guide-value">{guide.colors.slice(0, 3).join(', ')}</span>
                    </div>

                    <div className="guide-item">
                        <Hash size={20} className="guide-icon" />
                        <span className="guide-label">행운의 숫자</span>
                        <span className="guide-value">{guide.luckyNumbers.join(', ')}</span>
                    </div>

                    <div className="guide-item">
                        <UtensilsCrossed size={20} className="guide-icon" />
                        <span className="guide-label">도움되는 음식</span>
                        <span className="guide-value">{guide.foods.slice(0, 3).join(', ')}</span>
                    </div>

                    <div className="guide-item">
                        <Activity size={20} className="guide-icon" />
                        <span className="guide-label">추천 활동</span>
                        <span className="guide-value">{guide.activities.slice(0, 3).join(', ')}</span>
                    </div>

                    <div className="guide-item">
                        <Briefcase size={20} className="guide-icon" />
                        <span className="guide-label">적합한 직종</span>
                        <span className="guide-value">{guide.jobs.slice(0, 3).join(', ')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 스타일
const yongshinStyles = `
.yongshin-card {
  max-width: 600px;
  margin: 1.5rem auto;
}

.yongshin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.yongshin-item {
  text-align: center;
  padding: 1.25rem;
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255,255,255,0.08);
}

.yongshin-item.yongshin {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.05);
}

.yongshin-item.huishin {
  border-color: rgba(34, 197, 94, 0.3);
  background: rgba(34, 197, 94, 0.05);
}

.yongshin-item.gishin {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
}

.yongshin-emoji {
  display: block;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.yongshin-label {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.yongshin-name {
  display: block;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.25rem 0;
}

.yongshin-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.lucky-guide {
  background: rgba(255,255,255,0.02);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-top: 1rem;
}

.guide-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.guide-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.guide-icon {
  color: #667eea;
  margin-bottom: 0.25rem;
}

.guide-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.guide-value {
  font-size: 0.9rem;
  color: var(--text-primary);
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = yongshinStyles;
    document.head.appendChild(styleSheet);
}
