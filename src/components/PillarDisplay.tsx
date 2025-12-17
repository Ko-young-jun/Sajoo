// ================================================
// 사주 기둥 표시 컴포넌트
// ================================================

import type { FourPillars, Pillar, Element } from '../types';

interface PillarDisplayProps {
    pillars: FourPillars;
}

const ELEMENT_COLORS: Record<Element, string> = {
    wood: '#22c55e',
    fire: '#ef4444',
    earth: '#f59e0b',
    metal: '#e2e8f0',
    water: '#3b82f6'
};

function PillarBox({ pillar, label }: { pillar: Pillar; label: string }) {
    const ganColor = ELEMENT_COLORS[pillar.ganElement];
    const jiColor = ELEMENT_COLORS[pillar.jiElement];

    return (
        <div className="pillar">
            <span className="pillar-label">{label}</span>
            <div className="pillar-box">
                <div
                    className="pillar-gan"
                    style={{
                        borderColor: ganColor,
                        boxShadow: `0 0 10px ${ganColor}40`
                    }}
                >
                    {pillar.gan}
                </div>
                <div
                    className="pillar-ji"
                    style={{
                        borderColor: jiColor,
                        boxShadow: `0 0 10px ${jiColor}40`
                    }}
                >
                    {pillar.ji}
                </div>
            </div>
        </div>
    );
}

export function PillarDisplay({ pillars }: PillarDisplayProps) {
    return (
        <div className="pillars-section">
            <h3 className="section-title text-center mb-md">사주팔자</h3>
            <div className="pillars-container">
                {pillars.hour && (
                    <PillarBox pillar={pillars.hour} label="시주" />
                )}
                <PillarBox pillar={pillars.day} label="일주" />
                <PillarBox pillar={pillars.month} label="월주" />
                <PillarBox pillar={pillars.year} label="년주" />
            </div>
            <p className="pillars-note text-center">
                시주 → 일주 → 월주 → 년주 순서로 표시됩니다
            </p>
        </div>
    );
}

// 추가 스타일
const pillarStyles = `
.pillars-section {
  margin: 2rem 0;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--text-primary);
}

.pillars-note {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 1rem;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = pillarStyles;
    document.head.appendChild(styleSheet);
}
