// ================================================
// 자연 형상 프로필 컴포넌트
// Gemini 프롬프트의 "물상론" 컨셉 적용
// ================================================

import type { IljuData, IlganData } from '../types';

interface NatureProfileProps {
    iljuData: IljuData;
    ilganData: IlganData;
    userName: string;
    natureMetaphor?: { // New Prop
        title: string;
        description: string;
        keywords: string[];
        season: string;
    };
}

// 천간 한글 명칭 매핑
const GAN_NAMES: Record<string, string> = {
    '갑': '갑목', '을': '을목',
    '병': '병화', '정': '정화',
    '무': '무토', '기': '기토',
    '경': '경금', '신': '신금',
    '임': '임수', '계': '계수'
};

export function NatureProfile({ iljuData, ilganData, userName, natureMetaphor }: NatureProfileProps) {
    // Fallback to static data if metaphor is not available
    const title = natureMetaphor?.title || iljuData.description;
    const description = natureMetaphor?.description || iljuData.personality;
    const keywords = natureMetaphor?.keywords || iljuData.keywords;
    const seasonName = natureMetaphor?.season === 'spring' ? '봄' :
        natureMetaphor?.season === 'summer' ? '여름' :
            natureMetaphor?.season === 'autumn' ? '가을' : '겨울';

    // 일간 명칭 (예: 갑 -> 갑목)
    const ganName = GAN_NAMES[ilganData.gan] || ilganData.gan;

    return (
        <div className="nature-profile fade-in">
            <div className={`nature-symbol float ${natureMetaphor?.season || ''}`}>
                {iljuData.symbol}
            </div>

            <div className="nature-badge-container">
                {natureMetaphor && <span className="season-badge">{seasonName}의 {ganName}</span>}
            </div>

            <h2 className="nature-title">
                "{title}"
            </h2>

            <p className="nature-description">
                {userName}님은 <strong>{ilganData.symbol}</strong>의 기운을 타고났습니다.
                <br />
                {description}
            </p>

            <div className="life-theme-box">
                <span className="life-theme-label">인생 테마</span>
                <p className="life-theme-text">{iljuData.lifeTheme}</p>
            </div>

            <div className="keywords">
                {keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                        #{keyword}
                    </span>
                ))}
            </div>
        </div>
    );
}

// 추가 스타일
const natureStyles = `
.life-theme-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  margin: var(--spacing-lg) auto;
  max-width: 450px;
}

.life-theme-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-xs);
}

.life-theme-text {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.6;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = natureStyles;
    document.head.appendChild(styleSheet);
}
