// ================================================
// 오행 밸런스 레이더 차트 컴포넌트
// ================================================

import { useState } from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import type { ElementDistribution, Element, AdvancedElementAnalysis } from '../types';

interface FiveElementChartProps {
    distribution: ElementDistribution;
    advancedAnalysis?: AdvancedElementAnalysis[]; // [NEW]
}

const ELEMENT_INFO: Record<Element, { name: string; color: string; icon: string }> = {
    wood: { name: '목(木)', color: '#22c55e', icon: '🌳' },
    fire: { name: '화(火)', color: '#ef4444', icon: '🔥' },
    earth: { name: '토(土)', color: '#f59e0b', icon: '⛰️' },
    metal: { name: '금(金)', color: '#94a3b8', icon: '⚔️' }, // Metal color adj
    water: { name: '수(水)', color: '#3b82f6', icon: '💧' }
};

export function FiveElementChart({ distribution, advancedAnalysis }: FiveElementChartProps) {
    const [selectedElement, setSelectedElement] = useState<Element | null>(null);

    const data = [
        { element: '목(木)', value: distribution.wood, fullMark: 100, key: 'wood' },
        { element: '화(火)', value: distribution.fire, fullMark: 100, key: 'fire' },
        { element: '토(土)', value: distribution.earth, fullMark: 100, key: 'earth' },
        { element: '금(金)', value: distribution.metal, fullMark: 100, key: 'metal' },
        { element: '수(水)', value: distribution.water, fullMark: 100, key: 'water' }
    ];

    // 가장 강한/약한 오행 찾기
    const entries = Object.entries(distribution) as [Element, number][];
    const strongest = entries.reduce((a, b) => a[1] > b[1] ? a : b);
    const weakest = entries.reduce((a, b) => a[1] < b[1] ? a : b);

    // 상세 정보 가져오기
    const getDetail = (element: Element) => {
        return advancedAnalysis?.find(a => a.element === element)?.details;
    };

    const selectedDetail = selectedElement ? getDetail(selectedElement) : null;

    return (
        <div className="card element-chart-card fade-in">
            <div className="card-header">
                <h3 className="card-title">오행 밸런스 정밀 분석</h3>
                <p className="card-subtitle">각 오행을 클릭하여 상세 분석을 확인하세요</p>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis
                            dataKey="element"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 50]}
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            axisLine={false}
                        />
                        <Radar
                            name="오행 분포"
                            dataKey="value"
                            stroke="#667eea"
                            fill="url(#colorGradient)"
                            fillOpacity={0.6}
                            strokeWidth={2}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            formatter={(value: number) => [`${value}%`, '비율']}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#764ba2" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="element-buttons">
                {(Object.keys(ELEMENT_INFO) as Element[]).map((el) => (
                    <button
                        key={el}
                        className={`element-btn ${selectedElement === el ? 'active' : (!selectedElement ? 'guide-pulse' : '')}`}
                        onClick={() => setSelectedElement(selectedElement === el ? null : el)}
                        style={{
                            borderColor: selectedElement === el ? ELEMENT_INFO[el].color : 'transparent',
                            color: selectedElement === el ? ELEMENT_INFO[el].color : undefined
                        }}
                    >
                        <span className="element-icon">{ELEMENT_INFO[el].icon}</span>
                        <span className="element-name">{ELEMENT_INFO[el].name}</span>
                        <span className="element-pct">{distribution[el]}%</span>
                        {/* Interactive Hint */}
                        {!selectedElement && <span className="click-hint">👆</span>}
                    </button>
                ))}
            </div>

            {selectedElement && selectedDetail && (
                <div className="element-detail-panel fade-in">
                    <h4 style={{ color: ELEMENT_INFO[selectedElement].color }}>
                        {ELEMENT_INFO[selectedElement].name} 상세 분석
                    </h4>

                    <div className="detail-section">
                        <h5>💡 성격과 특성</h5>
                        <p><strong>장점:</strong> {selectedDetail.personality.strength.join(', ')}</p>
                        <p><strong>보완점:</strong> {selectedDetail.personality.weakness.join(', ')}</p>
                    </div>

                    <div className="detail-section">
                        <h5>🏥 건강 체크</h5>
                        <p><strong>취약 장기:</strong> {selectedDetail.health.organs.join(', ')}</p>
                        <p><strong>관리법:</strong> {selectedDetail.health.prevention}</p>
                    </div>

                    <div className="detail-section">
                        <h5>✨ 개운법 (행운을 부르는 법)</h5>
                        <div className="remedy-grid">
                            <div className="remedy-item">
                                <span className="label">음식</span>
                                <span className="val">{selectedDetail.remedy.foods.slice(0, 3).join(', ')}</span>
                            </div>
                            <div className="remedy-item">
                                <span className="label">색상</span>
                                <span className="val">{selectedDetail.remedy.colors.map(c => c.name).join(', ')}</span>
                            </div>
                            <div className="remedy-item">
                                <span className="label">방향</span>
                                <span className="val">{selectedDetail.remedy.direction}</span>
                            </div>
                            <div className="remedy-item">
                                <span className="label">활동</span>
                                <span className="val">{selectedDetail.remedy.activities.slice(0, 2).join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!selectedElement && (
                <div className="element-summary">
                    <div className="element-item strongest">
                        <span className="element-label">가장 강한 기운</span>
                        <span
                            className="element-value"
                            style={{ color: ELEMENT_INFO[strongest[0]].color }}
                        >
                            {ELEMENT_INFO[strongest[0]].name} ({strongest[1]}%)
                        </span>
                    </div>
                    <div className="element-item weakest">
                        <span className="element-label">보완이 필요한 기운</span>
                        <span
                            className="element-value"
                            style={{ color: ELEMENT_INFO[weakest[0]].color }}
                        >
                            {ELEMENT_INFO[weakest[0]].name} ({weakest[1]}%)
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

// 스타일
const chartStyles = `
.element-chart-card {
  max-width: 600px; /* Wider for details */
  margin: 0 auto;
}

.chart-container {
  margin: 1rem 0;
}

@keyframes pulse-light {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
    70% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(102, 126, 234, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
}

.element-btn.guide-pulse {
    animation: pulse-light 2s infinite;
}

.click-hint {
    display: inline-block;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    opacity: 0.8;
    animation: bounce 1s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}

.element-buttons {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
}

.element-btn {
    flex: 1;
    min-width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 0.25rem;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.element-btn:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.element-btn.active {
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-weight: bold;
    transform: translateY(-2px);
    border-color: currentColor;
}

.element-icon {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
}

.element-name {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 0.1rem;
}

.element-pct {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.element-detail-panel {
    background: rgba(255,255,255,0.7);
    border-radius: 16px;
    padding: 1.5rem;
    margin-top: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.element-detail-panel h4 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    text-align: center;
}

.detail-section {
    margin-bottom: 1.25rem;
}

.detail-section h5 {
    font-size: 0.95rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-bottom: 0.25rem;
}

.detail-section p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 0.25rem;
}

.remedy-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.remedy-item {
    background: rgba(255,255,255,0.5);
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.remedy-item .label {
    font-size: 0.7rem;
    color: var(--text-muted);
}

.remedy-item .val {
    font-size: 0.85rem;
    color: var(--text-primary);
    font-weight: 500;
}

.element-summary {
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-md);
}

.element-item {
  text-align: center;
}

.element-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.element-value {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 600;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = chartStyles;
    document.head.appendChild(styleSheet);
}
