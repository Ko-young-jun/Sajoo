// ================================================
// 대운/연운 그래프 컴포넌트
// ================================================

import {

    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Area,
    AreaChart
} from 'recharts';
import type { YearLuck } from '../types';
import { TrendingUp } from 'lucide-react';

interface LifeCurveChartProps {
    yearLucks: YearLuck[];
    currentYear: number;
}

export function LifeCurveChart({ yearLucks, currentYear }: LifeCurveChartProps) {
    const data = yearLucks.map(luck => ({
        year: luck.year,
        score: luck.score,
        label: luck.label,
        pillar: `${luck.pillar.gan}${luck.pillar.ji}`
    }));

    // 최고/최저 해 찾기
    const bestYear = yearLucks.reduce((a, b) => a.score > b.score ? a : b);
    const worstYear = yearLucks.reduce((a, b) => a.score < b.score ? a : b);

    // 평균 점수
    const avgScore = Math.round(yearLucks.reduce((sum, y) => sum + y.score, 0) / yearLucks.length);

    return (
        <div className="card life-curve-card fade-in">
            <div className="card-header">
                <h3 className="card-title">
                    <TrendingUp className="inline-icon" size={20} />
                    향후 10년 운세 흐름
                </h3>
                <p className="card-subtitle">당신의 인생 곡선을 확인하세요</p>
            </div>

            <div className="year-summary">
                <div className="year-stat best">
                    <span className="stat-label">✨ 최고의 해</span>
                    <span className="stat-value">{bestYear.year}년</span>
                    <span className="stat-score">{bestYear.score}점</span>
                </div>
                <div className="year-stat avg">
                    <span className="stat-label">📊 평균</span>
                    <span className="stat-value">{avgScore}점</span>
                </div>
                <div className="year-stat caution">
                    <span className="stat-label">⚡ 도전의 해</span>
                    <span className="stat-value">{worstYear.year}년</span>
                    <span className="stat-score">{worstYear.score}점</span>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#667eea" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#667eea" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="year"
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <YAxis
                            domain={[30, 100]}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(0,0,0,0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            labelFormatter={(year) => `${year}년`}
                            formatter={(value: number) => [`${value}점`, '운세 점수']}
                        />
                        <ReferenceLine
                            x={currentYear}
                            stroke="#f59e0b"
                            strokeDasharray="5 5"
                            label={{ value: '현재', fill: '#f59e0b', fontSize: 10 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#667eea"
                            strokeWidth={3}
                            fill="url(#scoreGradient)"
                            dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#fff', stroke: '#667eea', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="year-timeline">
                {yearLucks.map((luck, index) => (
                    <div
                        key={luck.year}
                        className={`timeline-item ${luck.year === currentYear ? 'current' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="timeline-year">{luck.year}</div>
                        <div
                            className="timeline-score"
                            style={{
                                background: getScoreColor(luck.score)
                            }}
                        >
                            {luck.score}
                        </div>
                        <div className="timeline-label">{luck.label}</div>
                        <div className="timeline-pillar">{luck.pillar.gan}{luck.pillar.ji}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getScoreColor(score: number): string {
    if (score >= 80) return 'linear-gradient(135deg, #f5af19, #f12711)';
    if (score >= 70) return 'linear-gradient(135deg, #667eea, #764ba2)';
    if (score >= 55) return 'linear-gradient(135deg, #22c55e, #16a34a)';
    if (score >= 45) return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    return 'linear-gradient(135deg, #6b7280, #4b5563)';
}

// 스타일
const curveStyles = `
.life-curve-card {
  max-width: 700px;
  margin: 1.5rem auto;
}

.year-summary {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-md);
}

.year-stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-score {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.year-stat.best .stat-value { color: #f5af19; }
.year-stat.caution .stat-value { color: #3b82f6; }

.year-timeline {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem 0;
  margin-top: 1rem;
}

.timeline-item {
  flex-shrink: 0;
  text-align: center;
  padding: 0.75rem;
  background: rgba(255,255,255,0.03);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255,255,255,0.05);
  min-width: 70px;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.timeline-item.current {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.timeline-year {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.timeline-score {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin: 0.25rem 0;
}

.timeline-label {
  font-size: 0.625rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.timeline-pillar {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-serif);
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = curveStyles;
    document.head.appendChild(styleSheet);
}
