// ================================================
// 사주 분석 앱 - TypeScript 타입 정의
// ================================================

// 오행 (Five Elements)
export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
export type ElementKorean = '목' | '화' | '토' | '금' | '수';

// 음양 (Yin Yang)
export type YinYang = 'yang' | 'yin';
export type YinYangKorean = '양' | '음';

// 천간 (10 Heavenly Stems)
export type HeavenlyStem = '갑' | '을' | '병' | '정' | '무' | '기' | '경' | '신' | '임' | '계';

// 지지 (12 Earthly Branches)
export type EarthlyBranch = '자' | '축' | '인' | '묘' | '진' | '사' | '오' | '미' | '신' | '유' | '술' | '해';

// 십신 (Ten Gods)
export type TenGod =
    | '비견' | '겁재'   // 비겁 (같은 오행)
    | '식신' | '상관'   // 식상 (내가 생하는)
    | '편재' | '정재'   // 재성 (내가 극하는)
    | '편관' | '정관'   // 관성 (나를 극하는)
    | '편인' | '정인';  // 인성 (나를 생하는)

// 기둥 (Pillar)
export interface Pillar {
    gan: HeavenlyStem;      // 천간
    ji: EarthlyBranch;      // 지지
    ganElement: Element;    // 천간 오행
    jiElement: Element;     // 지지 오행
    ganYinYang: YinYang;    // 천간 음양
}

// 사주팔자 (Four Pillars)
export interface FourPillars {
    year: Pillar;    // 년주
    month: Pillar;   // 월주
    day: Pillar;     // 일주
    hour?: Pillar;   // 시주 (선택)
}

// 오행 분포
export interface ElementDistribution {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
}

// 용신 분석
export interface YongShinAnalysis {
    yongShin: Element;      // 용신 (가장 필요한 기운)
    huiShin: Element;       // 희신 (용신을 도와주는)
    hanShin?: Element;      // 한신 (중립)
    giShin?: Element;       // 기신 (주의)
    guShin?: Element;       // 구신 (피하기)
}

// 십신 분포
export interface TenGodDistribution {
    bigyeob: number;   // 비겁 (비견 + 겁재)
    siksang: number;   // 식상 (식신 + 상관)
    jaeseong: number;  // 재성 (편재 + 정재)
    gwanseong: number; // 관성 (편관 + 정관)
    inseong: number;   // 인성 (편인 + 정인)
}

// 일주 데이터
export interface IljuData {
    name: string;           // 일주명 (예: 을사)
    symbol: string;         // 물상 상징
    description: string;    // 설명
    natureImage: string;    // 자연 이미지 프롬프트
    personality: string;    // 성격
    lifeTheme: string;      // 인생 테마
    keywords: string[];     // 핵심 키워드
}

// 천간 데이터
export interface IlganData {
    gan: HeavenlyStem;
    element: Element;
    yinYang: YinYang;
    symbol: string;           // 자연 상징 (큰 나무, 태양 등)
    keywords: string[];       // 핵심 단어
    description: string;      // 설명
}

// 오행별 개운 가이드
export interface ElementGuide {
    element: Element;
    direction: string;        // 방향
    season: string;           // 계절
    luckyNumbers: number[];   // 행운의 숫자
    colors: string[];         // 색상
    foods: string[];          // 음식
    activities: string[];     // 활동
    jobs: string[];           // 직업
}

// 대운/연운
export interface DaeunInfo {
    startAge: number;
    endAge: number;
    pillar: Pillar;
    theme: string;        // 시기 테마
    description: string;  // 설명
}

export interface YearLuck {
    year: number;
    score: number;        // 0-100
    label: string;        // 상승기, 전성기, 주의기 등
    pillar: Pillar;
}

// 사용자 입력
export interface UserInput {
    name: string;
    gender: 'male' | 'female';
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour?: number;     // 0-23, undefined면 모름
    isLunar: boolean;       // 음력 여부
}

// 분석 모드
export type AnalysisMode = 'personal' | 'compatibility';
export type Tier = 'free' | 'premium';

// 분석 결과 - 무료
export interface FreeAnalysisResult {
    pillars: FourPillars;
    iljuData: IljuData;
    ilganData: IlganData;
    elementDistribution: ElementDistribution;
    yongShin: YongShinAnalysis;
    elementGuide: ElementGuide;      // 용신 기반 개운 가이드
    currentYearLuck: YearLuck;       // 올해 운세
}

// ------------------------------------
// Phase 3 추가 타입
// ------------------------------------

export interface ElementDetail {
    personality: {
        strength: string[];
        weakness: string[];
        excess: string;
        deficiency: string;
    };
    health: {
        organs: string[];
        symptoms: string[];
        prevention: string;
    };
    remedy: {
        foods: string[];
        colors: { name: string; hex: string }[];
        direction: string;
        activities: string[];
        items: string[];
        habits: string[];
    };
}

export type StrongWeakState = 'excess' | 'weak' | 'balanced';

export interface AdvancedElementAnalysis {
    element: Element;
    percentage: number;
    state: StrongWeakState;
    details: ElementDetail;
}

export interface YongShinDeepProfile {
    type: 'johu' | 'eokbu' | 'tonggwan' | 'balance'; // 조후, 억부, 통관, 일반(중화)
    primary: Element; // 주 용신
    secondary: Element; // 희신
    description: string;
    reason: string; // 선정 이유
    remedy: ElementDetail['remedy'];
}

export interface FormatResult {
    name: string;
    description: string;
    traits: string[];
    jobs: string[];
}

export interface SpecialStar {
    name: string;
    type: 'gil' | 'hyung';
    description: string;
    effect: string;
    meaning: string;
    source?: string;
}

export interface HealthAnalysis {
    weakOrgans: string[];
    symptoms: string[];
    advice: string[];
}

export interface CareerAnalysis {
    suitableJobs: string[];
    workStyle: string;
    advice: string;
}

export interface WealthAnalysis {
    type: string;
    description: string;
    advice: string;
}

// 2025-2026 상세 운세
export interface YearlyForecast {
    year: number;
    gan: HeavenlyStem;
    ji: EarthlyBranch;
    theme: string;
    score: number;
    description: string;
    categories: {
        wealth: { score: number; text: string };
        career: { score: number; text: string };
        love: { score: number; text: string };
        health: { score: number; text: string };
    };
    keyMonths: {
        best: number[];
        caution: number[];
    };
    advice: string[];
    specialEvent?: {
        name: string;
        effect: string;
        type: 'samhap' | 'chung' | 'none';
    };
}

// 분석 결과 - 프리미엄 추가
export interface PremiumAnalysisResult extends FreeAnalysisResult {
    tenGodDistribution: TenGodDistribution;
    format: FormatResult;                  // 격국 (객체로 변경)
    specialStars: SpecialStar[];     // 신살 추가
    daeunList: DaeunInfo[];          // 대운 리스트
    tenYearForecast: YearLuck[];     // 10년 운세
    careerAnalysis: CareerAnalysis;  // 직업 심화
    healthAnalysis: HealthAnalysis;  // 건강 심화
    wealthAnalysis: WealthAnalysis;  // 재물 심화
    advancedFiveElements: AdvancedElementAnalysis[]; // [NEW] Rich data
    deepYongShin: YongShinDeepProfile; // [NEW] Rich data
    natureMetaphor?: { // New Field
        title: string;
        description: string;
        keywords: string[];
        season: string;
    };
    sageForecasts?: YearlyForecast[]; // New Field for 2025, 2026
    iljuData: IljuData; // Keep for fallback or additional info
}

// 궁합 기본 결과
export interface CompatibilityResult {
    score: number;
    summary: string;
    details: {
        iljuHarmony: {
            score: number;
            description: string;
        };
        fiveElementHarmony: {
            score: number;
            description: string;
        };
        overallAdvice: string;
    };
}

// JSON 출력 형식 (Gemini 프롬프트 참고)
export interface GraphData {
    fiveElements: ElementDistribution;
    lifeCurve?: YearLuck[];
}

export interface VisualAssets {
    colorCode: string;              // 용신 색상
    natureImagePrompt: string;      // AI 이미지 생성용
}

export interface AnalysisOutput {
    meta: {
        tier: Tier;
        mode: AnalysisMode;
    };
    graphData: GraphData;
    visualAssets: VisualAssets;
}
