// ================================================
// 오행 분석 엔진
// ================================================

import type { FourPillars, ElementDistribution, Element, ElementGuide, AdvancedElementAnalysis, YongShinDeepProfile } from '../types';
import { determineAdvancedYongShin } from './yongShin';
import { ELEMENT_DETAILS } from '../data/sajuData';

// 지지 속 지장간 (숨겨진 천간들)
const JI_HIDDEN_ELEMENTS: Record<string, Element[]> = {
    '자': ['water'],
    '축': ['earth', 'water', 'metal'],
    '인': ['wood', 'fire', 'earth'],
    '묘': ['wood'],
    '진': ['earth', 'wood', 'water'],
    '사': ['fire', 'metal', 'earth'],
    '오': ['fire', 'earth'],
    '미': ['earth', 'fire', 'wood'],
    '신': ['metal', 'water', 'earth'],
    '유': ['metal'],
    '술': ['earth', 'metal', 'fire'],
    '해': ['water', 'wood']
};

/**
 * 오행 분포 계산
 * 천간, 지지의 본기 + 지장간을 고려하여 계산
 */
export function calculateElementDistribution(pillars: FourPillars): ElementDistribution {
    const counts: ElementDistribution = {
        wood: 0,
        fire: 0,
        earth: 0,
        metal: 0,
        water: 0
    };

    // 천간 분석 (가중치 1.5)
    const pillarList = [pillars.year, pillars.month, pillars.day];
    if (pillars.hour) pillarList.push(pillars.hour);

    pillarList.forEach(pillar => {
        // 천간 (주요 에너지)
        counts[pillar.ganElement] += 1.5;

        // 지지 본기
        counts[pillar.jiElement] += 1;

        // 지장간 (숨겨진 에너지, 가중치 낮음)
        const hiddenElements = JI_HIDDEN_ELEMENTS[pillar.ji] || [];
        hiddenElements.forEach((el, index) => {
            // 첫 번째가 주 기운, 나머지는 보조
            counts[el] += index === 0 ? 0.5 : 0.3;
        });
    });

    // 백분율로 변환
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return {
        wood: Math.round((counts.wood / total) * 100),
        fire: Math.round((counts.fire / total) * 100),
        earth: Math.round((counts.earth / total) * 100),
        metal: Math.round((counts.metal / total) * 100),
        water: Math.round((counts.water / total) * 100)
    };
}

/**
 * 가장 강한 오행 찾기
 */
export function getStrongestElement(distribution: ElementDistribution): Element {
    const entries = Object.entries(distribution) as [Element, number][];
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
}

/**
 * 가장 약한 오행 찾기
 */
export function getWeakestElement(distribution: ElementDistribution): Element {
    const entries = Object.entries(distribution) as [Element, number][];
    return entries.reduce((a, b) => a[1] < b[1] ? a : b)[0];
}

/**
 * 오행 한글명 변환
 */
export function elementToKorean(element: Element): string {
    const map: Record<Element, string> = {
        wood: '목(木)',
        fire: '화(火)',
        earth: '토(土)',
        metal: '금(金)',
        water: '수(水)'
    };
    return map[element];
}

/**
 * 오행 색상 코드
 */
export function elementToColor(element: Element): string {
    const map: Record<Element, string> = {
        wood: '#22c55e',
        fire: '#ef4444',
        earth: '#f59e0b',
        metal: '#f1f5f9',
        water: '#3b82f6'
    };
    return map[element];
}

/**
 * 오행 상생 관계 (나를 생하는 오행)
 */
export function getGeneratingElement(element: Element): Element {
    const map: Record<Element, Element> = {
        wood: 'water',   // 수생목
        fire: 'wood',    // 목생화
        earth: 'fire',   // 화생토
        metal: 'earth',  // 토생금
        water: 'metal'   // 금생수
    };
    return map[element];
}

/**
 * 오행 상극 관계 (나를 극하는 오행)
 */
export function getControllingElement(element: Element): Element {
    const map: Record<Element, Element> = {
        wood: 'metal',   // 금극목
        fire: 'water',   // 수극화
        earth: 'wood',   // 목극토
        metal: 'fire',   // 화극금
        water: 'earth'   // 토극수
    };
    return map[element];
}

/**
 * 오행 분석 통합 함수 (Premium Features용)
 */
export function getFiveElementAnalysis(pillars: FourPillars, distribution: ElementDistribution): {
    yongShin: Element;
    huiShin: Element;
    elementGuide: ElementGuide;
} {
    // Backward compatibility wrapper
    const advanced = getAdvancedFiveElementAnalysis(pillars, distribution);
    return {
        yongShin: advanced.yongShinProfile.primary,
        huiShin: advanced.yongShinProfile.secondary,
        elementGuide: {
            element: advanced.yongShinProfile.primary,
            direction: advanced.yongShinProfile.remedy.direction,
            season: '사계절', // Simplified
            luckyNumbers: [3, 8], // Dummy
            colors: advanced.yongShinProfile.remedy.colors.map(c => c.name),
            foods: advanced.yongShinProfile.remedy.foods,
            activities: advanced.yongShinProfile.remedy.activities,
            jobs: ['분석 참조']
        }
    };
}

export interface AdvancedAnalysisResult {
    elementAnalysis: AdvancedElementAnalysis[];
    yongShinProfile: YongShinDeepProfile;
}

export function getAdvancedFiveElementAnalysis(pillars: FourPillars, distribution: ElementDistribution): AdvancedAnalysisResult {
    // 1. Calculate Element Details (Excess/Deficiency)
    const elementAnalysis: AdvancedElementAnalysis[] = (Object.keys(distribution) as Element[]).map(el => {
        const count = distribution[el];
        let state: 'excess' | 'weak' | 'balanced' = 'balanced';
        if (count > 35) state = 'excess';
        else if (count < 10) state = 'weak';

        return {
            element: el,
            percentage: count,
            state,
            details: ELEMENT_DETAILS[el]
        };
    });

    // 2. Advanced Yongshin Determination
    const yongShinProfile = determineAdvancedYongShin(pillars, distribution);

    return {
        elementAnalysis,
        yongShinProfile
    };
}
