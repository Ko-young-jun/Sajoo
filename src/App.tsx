// ================================================
// 사주 분석 앱 - 메인 App 컴포넌트
// 레퍼런스 기반 UI 리팩토링 (탭 메뉴 구조)
// ================================================

import { useState } from 'react';
import { Moon, ArrowLeft, Info, Sparkles } from 'lucide-react';

import type { UserInput, FourPillars, PremiumAnalysisResult, IljuData, CompatibilityResult } from './types';

import { InputForm } from './components/InputForm';
import { PillarDisplay } from './components/PillarDisplay';
import { NatureProfile } from './components/NatureProfile';
import { FiveElementChart } from './components/FiveElementChart';
import { LifeCurveChart } from './components/LifeCurveChart';
import { YongShinGuide } from './components/YongShinGuide';
import { CompatibilityForm } from './components/CompatibilityForm';
import { CompatibilityResultView } from './components/CompatibilityResult';
import DeepAnalysis from './components/DeepAnalysis';
import SpecialStars from './components/SpecialStars';
import { SageForecast } from './components/SageForecast';
import TarotTab from './components/TarotTab'; // [NEW]

import { analyzeFullSaju, getIljuString, calculateFourPillars } from './engine/SajuCalculator';
import { analyzeCompatibility } from './engine/compatibility';
import { getIljuData } from './data/iljuData';

type TabType = 'personal' | 'compatibility' | 'tarot'; // [UPDATED]
type ViewState = 'input' | 'result';

interface CompatibilityState {
  person1: UserInput;
  person2: UserInput;
  pillars1: FourPillars;
  pillars2: FourPillars;
  ilju1: IljuData;
  ilju2: IljuData;
  result: CompatibilityResult;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [viewState, setViewState] = useState<ViewState>('input');

  const [personalResult, setPersonalResult] = useState<PremiumAnalysisResult | null>(null);
  const [compatResult, setCompatResult] = useState<CompatibilityState | null>(null);

  const getDefaultIljuData = (iljuString: string): IljuData => ({
    name: iljuString,
    symbol: '🌟',
    description: '독특한 기운을 가진 분입니다',
    natureImage: '신비로운 자연의 형상',
    personality: '특별한 개성을 가지고 계십니다.',
    lifeTheme: '자신만의 길을 개척하는 삶',
    keywords: ['#개성', '#특별함', '#창의성']
  });

  const handlePersonalSubmit = (input: UserInput) => {
    // 통합 분석 엔진 사용
    const result = analyzeFullSaju(input);

    // 일주 데이터 보강 (engine에서 더미데이터 오면 덮어쓰기)
    const iljuString = getIljuString(result.pillars);
    const realIljuData = getIljuData(iljuString) || getDefaultIljuData(iljuString);

    setPersonalResult({
      ...result,
      iljuData: realIljuData
    });
    setViewState('result');
    window.scrollTo(0, 0);
  };

  const handleCompatSubmit = (person1: UserInput, person2: UserInput) => {
    const pillars1 = calculateFourPillars(person1);
    const pillars2 = calculateFourPillars(person2);

    const iljuString1 = getIljuString(pillars1);
    const iljuString2 = getIljuString(pillars2);

    const ilju1 = getIljuData(iljuString1) || getDefaultIljuData(iljuString1);
    const ilju2 = getIljuData(iljuString2) || getDefaultIljuData(iljuString2);

    const result = analyzeCompatibility(pillars1, pillars2, person1.name, person2.name);

    setCompatResult({
      person1, person2, pillars1, pillars2, ilju1, ilju2, result
    });
    setViewState('result');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setViewState('input');
    // 결과 초기화는 하지 않음 (돌아왔을 때 입력값 유지 등을 위해)
  };

  const handleReset = () => {
    setPersonalResult(null);
    setCompatResult(null);
    setViewState('input');
    setActiveTab('personal');
  };

  // 프리미엄 여부 (임시로 true 설정)
  const isPremium = true;

  return (
    <div className="app">
      {/* 헤더 */}
      <header className="app-header">
        <div className="container header-content">
          {viewState === 'result' ? (
            <button className="back-button" onClick={handleBack}>
              <ArrowLeft size={20} />
              <span className="back-text">다시 입력하기</span>
            </button>
          ) : (
            <div className="logo" onClick={handleReset}>
              <Moon size={24} className="logo-icon" />
            </div>
          )}

          <div className="logo-center" onClick={handleReset}>
            <span className="logo-title">운명</span>
          </div>

          <div className="header-spacer" />
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="page">
        <div className="container">

          {/* 입력 뷰 (홈 화면 통합) */}
          {viewState === 'input' && (
            <div className="home-container fade-in">
              <div className="home-header">
                <h1 className="main-title">운명</h1>
                <p className="main-subtitle">당신의 삶에 숨겨진 이야기를 찾아드립니다.</p>

                <div className="badges">
                  <span className="badge-item"><Info size={12} /> 개인정보 수집 없음 · 데이터 저장 안함</span>
                </div>
              </div>

              <div className={`content-card ${activeTab === 'tarot' ? 'tarot-mode' : ''}`}>
                <div className="tab-menu">
                  <button
                    className={`tab-item ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                  >
                    개인 사주
                  </button>
                  <button
                    className={`tab-item ${activeTab === 'compatibility' ? 'active' : ''}`}
                    onClick={() => setActiveTab('compatibility')}
                  >
                    연인/부부 궁합
                  </button>
                  <button
                    className={`tab-item ${activeTab === 'tarot' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tarot')}
                  >
                    <Sparkles size={14} className="inline-icon" /> 오늘의 타로
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === 'personal' && (
                    <div className="fade-in">
                      <div className="form-intro">
                        <h3>사주 풀이</h3>
                        <p>정확한 풀이를 위해 정보를 입력해주세요.</p>
                      </div>
                      <InputForm onSubmit={handlePersonalSubmit} />
                    </div>
                  )}

                  {activeTab === 'compatibility' && (
                    <div className="fade-in">
                      <div className="form-intro">
                        <h3>궁합 풀이</h3>
                        <p>두 분의 정확한 정보를 입력해주세요.</p>
                      </div>
                      <CompatibilityForm onSubmit={handleCompatSubmit} />
                    </div>
                  )}

                  {activeTab === 'tarot' && (
                    <TarotTab />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 결과 뷰 */}
          {viewState === 'result' && (
            <div className="result-container fade-in">
              {activeTab === 'personal' && personalResult && (
                <>
                  <NatureProfile
                    iljuData={personalResult.iljuData}
                    ilganData={personalResult.ilganData}
                    userName={personalResult.pillars.year.gan ? '' : ''} // pillars.day.gan 등 활용 가능하나 NatureProfile 내부에서 처리
                    natureMetaphor={personalResult.natureMetaphor} // New Prop
                  />

                  {/* 신살 분석 추가 */}
                  <SpecialStars stars={personalResult.specialStars} isPremium={isPremium} />

                  <PillarDisplay pillars={personalResult.pillars} />
                  <FiveElementChart
                    distribution={personalResult.elementDistribution}
                    advancedAnalysis={personalResult.advancedFiveElements}
                  />
                  <YongShinGuide analysis={personalResult.yongShin} /> {/* yongShin: {yongShin, huiShin} 형태 주의 */}

                  <div className="my-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 px-2">심화 분석 보고서</h3>
                    <DeepAnalysis
                      career={personalResult.careerAnalysis}
                      health={personalResult.healthAnalysis}
                      wealth={personalResult.wealthAnalysis}
                      advancedFiveElements={personalResult.advancedFiveElements}
                      deepYongShin={personalResult.deepYongShin}
                      isPremium={isPremium}
                    />
                  </div>

                  {/* Sage-Level Forecast (New) */}
                  <SageForecast forecasts={personalResult.sageForecasts || []} />

                  <LifeCurveChart
                    yearLucks={personalResult.tenYearForecast}
                    currentYear={new Date().getFullYear()}
                  />
                </>
              )}

              {activeTab === 'compatibility' && compatResult && (
                <CompatibilityResultView
                  result={compatResult.result}
                  person1Name={compatResult.person1.name}
                  person2Name={compatResult.person2.name}
                  person1Pillars={compatResult.pillars1}
                  person2Pillars={compatResult.pillars2}
                  person1Ilju={compatResult.ilju1}
                  person2Ilju={compatResult.ilju2}
                />
              )}

              <div className="text-center mt-xl mb-xl">
                <button className="btn btn-primary btn-lg" onClick={handleBack}>
                  다른 내용도 확인하기
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 푸터 */}
      <footer className="app-footer">
        <div className="container">
          <p>© 2024 운명 - 정확한 사주팔자 무료 분석</p>
          <p className="footer-note">입력하신 정보는 분석 후 즉시 삭제됩니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

// 앱 스타일 업데이트
const appStyles = `
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(253, 250, 246, 0.85); /* Warm white with transparency */
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(74, 69, 64, 0.05); /* Very subtle border */
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.logo-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
}

.back-text {
  font-size: 0.9rem;
}

.home-container {
  max-width: 600px;
  margin: 0 auto;
}

.home-header {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.main-title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.main-subtitle {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.6);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(74, 69, 64, 0.05);
}

.content-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.02),
    0 12px 24px rgba(74, 69, 64, 0.04);
}

.content-card.tarot-mode {
  padding: 1rem;
  padding-bottom: 0;
}

.content-card.tarot-mode .tab-menu {
  margin-bottom: 0.5rem;
}

.tab-menu {
  display: flex;
  background: rgba(74, 69, 64, 0.03); /* Very subtle grey/brown for tab background */
  border-radius: 14px;
  padding: 5px;
  margin-bottom: 2.5rem;
}

.tab-item {
  flex: 1;
  padding: 0.75rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tab-item.active {
  background: #ffffff;
  color: var(--text-primary);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-intro {
  text-align: center;
  margin-bottom: 2rem;
}

.form-intro h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.form-intro p {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.result-container {
  max-width: 800px;
  margin: 0 auto;
}

.footer-note {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

@media (max-width: 600px) {
  .content-card {
    padding: 1.5rem;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = appStyles;
  document.head.appendChild(styleSheet);
}
