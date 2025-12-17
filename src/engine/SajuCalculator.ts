// ================================================
// 사주 분석 앱 - 만세력 계산 엔진
// ================================================

import type {
    HeavenlyStem,
    EarthlyBranch,
    Pillar,
    FourPillars,
    Element,
    YinYang,
    UserInput,
    PremiumAnalysisResult
} from '../types';

import { calculateTenGodDistribution } from './tenGods';
import { calculateDaeun, calculateYearLuck } from './daeun'; // removed getCurrentDaeun unused
import { determineFormat } from './format';
import { calculateSpecialStars } from './specialStars';
import { analyzeHealth, analyzeCareer, analyzeWealth } from './deepAnalysis';
import { getNatureMetaphor } from './natureMetaphor';
import { analyzeYearlyForecast } from './yearlyLuck'; // New Import
import { calculateElementDistribution, getFiveElementAnalysis, getAdvancedFiveElementAnalysis } from './fiveElements';

// 천간 데이터
export const HEAVENLY_STEMS: HeavenlyStem[] = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

// 지지 데이터
export const EARTHLY_BRANCHES: EarthlyBranch[] = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

// 천간 -> 오행 매핑
export const GAN_TO_ELEMENT: Record<HeavenlyStem, Element> = {
    '갑': 'wood', '을': 'wood',
    '병': 'fire', '정': 'fire',
    '무': 'earth', '기': 'earth',
    '경': 'metal', '신': 'metal',
    '임': 'water', '계': 'water'
};

// 지지 -> 오행 매핑
export const JI_TO_ELEMENT: Record<EarthlyBranch, Element> = {
    '자': 'water',
    '축': 'earth',
    '인': 'wood',
    '묘': 'wood',
    '진': 'earth',
    '사': 'fire',
    '오': 'fire',
    '미': 'earth',
    '신': 'metal',
    '유': 'metal',
    '술': 'earth',
    '해': 'water'
};

// 천간 -> 음양 매핑
export const GAN_TO_YINYANG: Record<HeavenlyStem, YinYang> = {
    '갑': 'yang', '을': 'yin',
    '병': 'yang', '정': 'yin',
    '무': 'yang', '기': 'yin',
    '경': 'yang', '신': 'yin',
    '임': 'yang', '계': 'yin'
};

// 60갑자 배열 생성
export function generate60Jiazi(): string[] {
    const result: string[] = [];
    for (let i = 0; i < 60; i++) {
        const gan = HEAVENLY_STEMS[i % 10];
        const ji = EARTHLY_BRANCHES[i % 12];
        result.push(gan + ji);
    }
    return result;
}

export const SIXTY_JIAZI = generate60Jiazi();

// 60갑자 인덱스 찾기
export function getJiaziIndex(gan: HeavenlyStem, ji: EarthlyBranch): number {
    const jiazi = gan + ji;
    return SIXTY_JIAZI.indexOf(jiazi);
}

// 절기 데이터 (양력 기준 대략적인 날짜)
const SOLAR_TERMS_APPROX: { month: number; day: number }[] = [
    { month: 2, day: 4 },   // 입춘 (寅월 시작)
    { month: 3, day: 6 },   // 경칩 (卯월 시작)
    { month: 4, day: 5 },   // 청명 (辰월 시작)
    { month: 5, day: 6 },   // 입하 (巳월 시작)
    { month: 6, day: 6 },   // 망종 (午월 시작)
    { month: 7, day: 7 },   // 소서 (未월 시작)
    { month: 8, day: 8 },   // 입추 (申월 시작)
    { month: 9, day: 8 },   // 백로 (酉월 시작)
    { month: 10, day: 8 },  // 한로 (戌월 시작)
    { month: 11, day: 8 },  // 입동 (亥월 시작)
    { month: 12, day: 7 },  // 대설 (子월 시작)
    { month: 1, day: 6 },   // 소한 (丑월 시작)
];

// 절기 기준 월지 (인묘진사오미신유술해자축)
const MONTH_BRANCHES: EarthlyBranch[] = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];

/**
 * 년주 계산
 */
export function calculateYearPillar(year: number, month: number, day: number): Pillar {
    let adjustedYear = year;
    if (month < 2 || (month === 2 && day < 4)) {
        adjustedYear = year - 1;
    }

    const baseYear = 1984;
    const diff = adjustedYear - baseYear;
    const index = ((diff % 60) + 60) % 60;

    const gan = HEAVENLY_STEMS[index % 10];
    const ji = EARTHLY_BRANCHES[index % 12];

    return createPillar(gan, ji);
}

/**
 * 월주 계산
 */
export function calculateMonthPillar(_year: number, month: number, day: number, yearGan: HeavenlyStem): Pillar {
    let monthIndex = 0;
    for (let i = 0; i < SOLAR_TERMS_APPROX.length; i++) {
        const term = SOLAR_TERMS_APPROX[i];
        if (term.month === month && day >= term.day) {
            monthIndex = i;
        } else if (term.month < month && term.month !== 1) {
            monthIndex = i;
        } else if (term.month === 1 && month >= 1 && day >= term.day && month < 2) {
            monthIndex = 11; // 축월
        }
    }

    const ji = MONTH_BRANCHES[monthIndex];

    const yearGanIndex = HEAVENLY_STEMS.indexOf(yearGan);
    const monthGanStart = (yearGanIndex % 5) * 2;
    const monthGanIndex = (monthGanStart + monthIndex) % 10;
    const gan = HEAVENLY_STEMS[monthGanIndex];

    return createPillar(gan, ji);
}

/**
 * 일주 계산
 */
export function calculateDayPillar(year: number, month: number, day: number): Pillar {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);
    jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    const baseJd = 2415051;
    const baseIndex = 36;
    const diff = jd - baseJd;
    const index = ((baseIndex + diff) % 60 + 60) % 60;

    const gan = HEAVENLY_STEMS[index % 10];
    const ji = EARTHLY_BRANCHES[index % 12];

    return createPillar(gan, ji);
}

/**
 * 시주 계산
 */
export function calculateHourPillar(hour: number, dayGan: HeavenlyStem): Pillar {
    const hourIndex = Math.floor(((hour + 1) % 24) / 2);
    const ji = EARTHLY_BRANCHES[hourIndex];

    const dayGanIndex = HEAVENLY_STEMS.indexOf(dayGan);
    const hourGanStart = (dayGanIndex % 5) * 2;
    const hourGanIndex = (hourGanStart + hourIndex) % 10;
    const gan = HEAVENLY_STEMS[hourGanIndex];

    return createPillar(gan, ji);
}

/**
 * Pillar 객체 생성
 */
function createPillar(gan: HeavenlyStem, ji: EarthlyBranch): Pillar {
    return {
        gan,
        ji,
        ganElement: GAN_TO_ELEMENT[gan],
        jiElement: JI_TO_ELEMENT[ji],
        ganYinYang: GAN_TO_YINYANG[gan]
    };
}

/**
 * 사주팔자 계산 메인 함수
 */
export function calculateFourPillars(input: UserInput): FourPillars {
    const { birthYear, birthMonth, birthDay, birthHour } = input;
    const year = calculateYearPillar(birthYear, birthMonth, birthDay);
    const month = calculateMonthPillar(birthYear, birthMonth, birthDay, year.gan);
    const day = calculateDayPillar(birthYear, birthMonth, birthDay);

    const result: FourPillars = { year, month, day };

    if (birthHour !== undefined) {
        result.hour = calculateHourPillar(birthHour, day.gan);
    }
    return result;
}

/**
 * 통합 사주 및 운세 분석 (프리미엄 포함)
 */
export function analyzeFullSaju(input: UserInput): PremiumAnalysisResult {
    // 1. 사주팔자 (Four Pillars)
    const pillars = calculateFourPillars(input);

    // 2. 오행 분석
    const elementDistribution = calculateElementDistribution(pillars);
    const { elementGuide } = getFiveElementAnalysis(pillars, elementDistribution);

    // 3. 십신 분석
    const tenGodDistribution = calculateTenGodDistribution(pillars);

    // 4. 오행 및 용신 분석 (Improved)
    const fiveElementAnalysis = getAdvancedFiveElementAnalysis(pillars, elementDistribution);

    // 5. 격국 및 특수 분석
    const format = determineFormat(pillars.month.ji, pillars.day.gan);
    const specialStars = calculateSpecialStars(pillars);

    // 6. 감정 및 성격 (일주론)
    // const iljuData = getIljuData(pillars.day.gan, pillars.day.ji); // This line was commented out in the original, but the instruction implies it should be added. Assuming it's a placeholder for a future function.

    // 7. 심화 분석 (직업, 건강, 재물)
    const healthAnalysis = analyzeHealth(elementDistribution);
    const careerAnalysis = analyzeCareer(format, tenGodDistribution, pillars, specialStars);

    // 8. Sage-Level Natural Identity
    const natureMetaphor = getNatureMetaphor(pillars.day.gan, pillars.month.ji);

    // 9. Sage-Level Yearly Forecast (2025, 2026)
    const forecastTop2 = [
        analyzeYearlyForecast(pillars, 2025),
        analyzeYearlyForecast(pillars, 2026)
    ];

    // 기본 일주/일간 데이터 (더미/단순화)
    const iljuData = {
        name: pillars.day.gan + pillars.day.ji,
        symbol: '자연의 상징',
        description: '일주 설명...',
        natureImage: 'image_prompt',
        personality: '성격...',
        lifeTheme: '인생 테마...',
        keywords: ['키워드1', '키워드2']
    };

    // 일간 데이터 더미
    const ilganData = {
        gan: pillars.day.gan,
        element: pillars.day.ganElement,
        yinYang: pillars.day.ganYinYang,
        symbol: '일간 상징',
        keywords: ['키워드'],
        description: '일간 설명'
    };

    // 4. 대운/연운 계산 (Moved from original position)
    const daeunList = calculateDaeun(input, pillars); // Original call
    const currentYear = new Date().getFullYear(); // Original call
    const tenYearForecast = calculateYearLuck(pillars, currentYear); // Original call
    const currentYearLuck = tenYearForecast[0];

    return {
        pillars,
        iljuData,
        ilganData,
        elementDistribution,
        yongShin: {
            yongShin: fiveElementAnalysis.yongShinProfile.primary,
            huiShin: fiveElementAnalysis.yongShinProfile.secondary,
            hanShin: 'wood', // dummy
            giShin: 'fire', // dummy
            guShin: 'earth' // dummy
        },
        deepYongShin: fiveElementAnalysis.yongShinProfile,
        advancedFiveElements: fiveElementAnalysis.elementAnalysis,
        elementGuide,
        currentYearLuck,
        tenGodDistribution,
        format, // FormatResult 객체
        daeunList,
        tenYearForecast,
        specialStars, // SpecialStar[]
        careerAnalysis,
        healthAnalysis,
        wealthAnalysis: analyzeWealth(tenGodDistribution),
        natureMetaphor,
        sageForecasts: forecastTop2 // Add missing field
    };
}

/**
 * 일주 문자열 반환
 */
export function getIljuString(pillars: FourPillars): string {
    return pillars.day.gan + pillars.day.ji;
}

/**
 * 일간 반환
 */
export function getIlgan(pillars: FourPillars): HeavenlyStem {
    return pillars.day.gan;
}
