// ================================================
// 궁합 결과 컴포넌트
// ================================================

import { Heart, Sparkles, CheckCircle, Users } from 'lucide-react';
import type { CompatibilityResult } from '../types';
import type { FourPillars, IljuData } from '../types';

interface CompatibilityResultProps {
  result: CompatibilityResult;
  person1Name: string;
  person2Name: string;
  person1Pillars: FourPillars;
  person2Pillars: FourPillars;
  person1Ilju: IljuData;
  person2Ilju: IljuData;
}

export function CompatibilityResultView({
  result,
  person1Name,
  person2Name,
  person1Pillars,
  person2Pillars,
  person1Ilju,
  person2Ilju
}: CompatibilityResultProps) {
  const scoreColor = getScoreColor(result.score);

  return (
    <div className="compatibility-result fade-in">
      {/* 헤더 - 점수 */}
      <div className="compat-header">
        <div className="compat-score-circle" style={{ background: scoreColor }}>
          <span className="compat-score">{result.score}</span>
          <span className="compat-score-label">점</span>
        </div>
        <p className="compat-summary">{result.summary}</p>
      </div>

      {/* 두 사람 프로필 */}
      <div className="compat-profiles">
        <div className="compat-profile">
          <div className="profile-emoji">{person1Ilju.symbol}</div>
          <div className="profile-name">{person1Name}</div>
          <div className="profile-ilju">
            {person1Pillars.day.gan}{person1Pillars.day.ji}일주
          </div>
          <div className="profile-desc">{person1Ilju.description}</div>
        </div>

        <div className="compat-heart">
          <Heart size={40} color="#ef4444" fill="#ef4444" />
        </div>

        <div className="compat-profile">
          <div className="profile-emoji">{person2Ilju.symbol}</div>
          <div className="profile-name">{person2Name}</div>
          <div className="profile-ilju">
            {person2Pillars.day.gan}{person2Pillars.day.ji}일주
          </div>
          <div className="profile-desc">{person2Ilju.description}</div>
        </div>
      </div>

      {/* 상세 분석 */}
      <div className="compat-details">
        <h3 className="details-title">
          <Sparkles size={20} className="inline-icon" />
          상세 분석
        </h3>

        {/* 일주 조화 */}
        <div className="detail-card">
          <div className="detail-header">
            <Users size={18} />
            <span>일주(성격) 조화</span>
            <span className="detail-score">{result.details.iljuHarmony.score}점</span>
          </div>
          <p className="detail-desc">{result.details.iljuHarmony.description}</p>
        </div>

        {/* 오행 조화 (Element Synergy) */}
        <div className="detail-card">
          <div className="detail-header">
            <Sparkles size={18} />
            <span>오행(기운) 조화</span>
            <span className="detail-score">{result.details.fiveElementHarmony.score}점</span>
          </div>
          <p className="detail-desc">{result.details.fiveElementHarmony.description}</p>
        </div>
      </div>

      {/* 조언 */}
      <div className="compat-advice card">
        <h3 className="advice-title">
          💡 두 분을 위한 조언
        </h3>
        <p className="advice-text" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <CheckCircle size={16} className="advice-icon" style={{ display: 'inline', marginRight: '8px' }} />
          {result.details.overallAdvice}
        </p>
      </div>
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'linear-gradient(135deg, #f43f5e, #ec4899)';
  if (score >= 70) return 'linear-gradient(135deg, #667eea, #764ba2)';
  if (score >= 55) return 'linear-gradient(135deg, #22c55e, #16a34a)';
  return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
}

// 스타일
const resultStyles = `
.compatibility-result {
  max-width: 700px;
  margin: 0 auto;
}

.compat-header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%);
  border-radius: var(--radius-xl);
  margin-bottom: 2rem;
}

.compat-score-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3);
}

.compat-score {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.compat-score-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.compat-metaphor {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.compat-summary {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto;
}

.compat-profiles {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.compat-profile {
  text-align: center;
  flex: 1;
  max-width: 200px;
}

.profile-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.profile-name {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.profile-ilju {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.profile-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.compat-heart {
  animation: pulse-heart 1.5s ease-in-out infinite;
}

.compat-details {
  margin-bottom: 2rem;
}

.details-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.detail-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.detail-score {
  margin-left: auto;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.detail-badge {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.1);
}

.detail-badge.good {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.detail-badge.caution {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.detail-relation {
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.detail-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.compat-advice {
  background: rgba(102, 126, 234, 0.05);
  border-color: rgba(102, 126, 234, 0.2);
}

.advice-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

.advice-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.advice-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.advice-item:last-child {
  border-bottom: none;
}

.advice-icon {
  color: #22c55e;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

@media (max-width: 600px) {
  .compat-profiles {
    flex-direction: column;
    gap: 1rem;
  }
  
  .compat-heart {
    order: -1;
  }
  
  .detail-relation {
    flex-direction: column;
    gap: 0.25rem;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = resultStyles;
  document.head.appendChild(styleSheet);
}
