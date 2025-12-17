// ================================================
// 용신 (用神) 판단 엔진
// ================================================

import type {
    Element,
    ElementDistribution,
    YongShinAnalysis,
    HeavenlyStem,
    FourPillars,
    YongShinDeepProfile
} from '../types';
import { GAN_TO_ELEMENT } from './SajuCalculator';
import { getGeneratingElement, getControllingElement, getWeakestElement, elementToKorean } from './fiveElements';
import { ELEMENT_DETAILS } from '../data/sajuData';

/**
 * [Advanced] 용신 심화 판단
 * 조후(계절) -> 억부(강약) -> 통관(소통) 순서로 판단
 */
export function determineAdvancedYongShin(pillars: FourPillars, distribution: ElementDistribution): YongShinDeepProfile {
    const dayGan = pillars.day.gan;
    const dayElement = GAN_TO_ELEMENT[dayGan];
    const monthBranch = pillars.month.ji; // 월지 (계절 판단)

    // 1. 조후 용신 (계절적 요인) 체크
    const isSummer = ['사', '오', '미'].includes(monthBranch);
    const isWinter = ['해', '자', '축'].includes(monthBranch);
    const fireScore = distribution.fire;
    const waterScore = distribution.water;

    if (isSummer && fireScore > 30) {
        return {
            type: 'johu',
            primary: 'water',
            secondary: 'metal',
            description: '무더운 여름에 태어나 열기가 강합니다. 시원한 물의 기운으로 열을 식혀주어야 균형이 맞습니다.',
            reason: '조후용신(계절 조절)이 시급합니다.',
            remedy: ELEMENT_DETAILS['water'].remedy
        };
    }

    if (isWinter && waterScore > 30) {
        return {
            type: 'johu',
            primary: 'fire',
            secondary: 'wood',
            description: '추운 겨울에 태어나 한기가 강합니다. 따뜻한 불의 기운으로 얼어붙은 땅을 녹여주어야 합니다.',
            reason: '조후용신(계절 조절)이 시급합니다.',
            remedy: ELEMENT_DETAILS['fire'].remedy
        };
    }

    // 2. 억부 용신 (강약 조절)
    const selfStrength = distribution[dayElement];
    const isWeak = selfStrength < 20;
    const isStrong = selfStrength > 40;

    if (isWeak) {
        const generating = getGeneratingElement(dayElement);
        return {
            type: 'eokbu',
            primary: generating,
            secondary: dayElement,
            description: `나 자신(${elementToKorean(dayElement)})의 힘이 다소 약합니다. 나를 돕고 지지해주는 ${elementToKorean(generating)} 기운이 필요합니다.`,
            reason: '신약한 사주를 보완하는 억부용신입니다.',
            remedy: ELEMENT_DETAILS[generating].remedy
        };
    } else if (isStrong) {
        const controlling = getControllingElement(dayElement);
        const generated = getElementGeneratedBy(dayElement);

        if (distribution[controlling] > 10) {
            return {
                type: 'eokbu',
                primary: controlling,
                secondary: generated,
                description: `나 자신(${elementToKorean(dayElement)})의 기운이 강합니다. 나를 적절히 제어하고 다듬어주는 ${elementToKorean(controlling)} 기운이 길합니다.`,
                reason: '신강한 사주를 제어하는 억부용신입니다.',
                remedy: ELEMENT_DETAILS[controlling].remedy
            };
        } else {
            return {
                type: 'eokbu',
                primary: generated,
                secondary: getElementControlledBy(dayElement),
                description: `나 자신(${elementToKorean(dayElement)})의 기운이 매우 강합니다. 넘치는 에너지를 활동으로 표현하고 발산하는 ${elementToKorean(generated)} 기운이 좋습니다.`,
                reason: '강한 기운을 자연스럽게 흘려보내는 식상용신입니다.',
                remedy: ELEMENT_DETAILS[generated].remedy
            };
        }
    }

    // 3. 중화/통관
    const weakest = getWeakestElement(distribution);
    return {
        type: 'balance',
        primary: weakest,
        secondary: getGeneratingElement(weakest),
        description: `사주의 오행 중 ${elementToKorean(weakest)} 기운이 가장 부족합니다. 이를 보충하여 전체적인 균형을 맞춰야 합니다.`,
        reason: '부족한 기운을 채워주는 균형 용신입니다.',
        remedy: ELEMENT_DETAILS[weakest].remedy
    };
}

/**
 * 기존 단순 용신 판단 (호환성 유지)
 */
export function determineYongShin(
    distribution: ElementDistribution,
    dayGan: HeavenlyStem
): YongShinAnalysis {
    // Legacy API support using simplistic logic or referencing advanced
    // For safety, let's keep it simple as it was, but cleaner.
    const dayElement = GAN_TO_ELEMENT[dayGan];
    const selfStrength = distribution[dayElement];
    const isWeak = selfStrength < 25;
    const isStrong = selfStrength > 40;

    let yongShin: Element;
    let huiShin: Element;

    if (isWeak) {
        yongShin = getGeneratingElement(dayElement);
        huiShin = dayElement;
    } else if (isStrong) {
        yongShin = getElementGeneratedBy(dayElement);
        huiShin = getElementControlledBy(dayElement);
    } else {
        yongShin = getWeakestElement(distribution);
        huiShin = getGeneratingElement(yongShin);
    }

    const allElements: Element[] = ['wood', 'fire', 'earth', 'metal', 'water'];
    const used = [yongShin, huiShin];
    const hanShin = allElements.find(e => !used.includes(e)); // strict unassigned

    return { yongShin, huiShin, hanShin, giShin: undefined, guShin: undefined };
}

// Internal Helpers
function getElementGeneratedBy(element: Element): Element {
    const map: Record<Element, Element> = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
    return map[element];
}

function getElementControlledBy(element: Element): Element {
    const map: Record<Element, Element> = { wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire' };
    return map[element];
}

export function getYongShinDescription(_analysis: YongShinAnalysis): string {
    return "상세 분석을 참고하세요.";
}
