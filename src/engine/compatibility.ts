
// ================================================
// 궁합 분석 엔진
// ================================================

import type {
    FourPillars,
    CompatibilityResult
} from '../types';

import { getAdvancedFiveElementAnalysis, calculateElementDistribution } from './fiveElements';
import { DAY_GAN_COMPATIBILITY } from './tenGods';

// Local interface removed to use global type.


/**
 * 궁합 분석 메인 함수
 */
export function analyzeCompatibility(
    pillars1: FourPillars,
    pillars2: FourPillars,
    name1: string,
    name2: string
): CompatibilityResult {

    // 4. [NEW] Deep Element Synergy logic integration
    // We need to calculate distributions first
    const dist1 = calculateElementDistribution(pillars1);
    const dist2 = calculateElementDistribution(pillars2);

    // Get advanced analysis
    const advanced1 = getAdvancedFiveElementAnalysis(pillars1, dist1);
    const advanced2 = getAdvancedFiveElementAnalysis(pillars2, dist2);

    const synergy = analyzeElementSynergy(advanced1, advanced2);

    // Score blending (Total 100)
    // - Ilju Harmony: 40%
    // - Element Synergy: 60% (since user asked to maximize this)
    const iljuHarmony = DAY_GAN_COMPATIBILITY[pillars1.day.gan]?.[pillars2.day.gan] || 50;
    const totalScore = Math.round((iljuHarmony * 0.4) + (synergy.complementScore * 0.6));

    // Construct Result
    return {
        score: totalScore,
        summary: `${name1}님과 ${name2}님의 궁합 요약: ${synergy.summary} 전체적으로 ${totalScore}점입니다.`,
        details: {
            iljuHarmony: {
                score: iljuHarmony,
                description: '일주(성격) 조화도 분석 결과입니다.'
            },
            fiveElementHarmony: {
                score: synergy.complementScore,
                description: synergy.detailText
            },
            overallAdvice: synergy.advice
        }
    };
}


// [NEW] 오행 상호 보완 분석
function analyzeElementSynergy(
    p1: import('./fiveElements').AdvancedAnalysisResult,
    p2: import('./fiveElements').AdvancedAnalysisResult
): { complementScore: number; summary: string; detailText: string; advice: string } {
    let score = 50;
    let compliments: string[] = [];

    // 1. 용신 보완 (상대방이 나의 용신을 많이 가졌는가?)
    const p1Yongshin = p1.yongShinProfile.primary;

    // p2가 p1의 용신을 얼마나 가졌나 (Good: > 20%, Bad: < 10%)
    const p2HasP1Yongshin = p2.elementAnalysis.find(e => e.element === p1Yongshin)?.percentage || 0;

    if (p2HasP1Yongshin > 25) {
        score += 20;
        compliments.push(`상대방이 나에게 꼭 필요한 오행(${p1Yongshin})을 풍부하게 가지고 있어 큰 힘이 됩니다.`);
    } else if (p2HasP1Yongshin < 10) {
        score -= 5;
    }

    // 2. 기운 균형
    const p1Weakest = p1.elementAnalysis.find(e => e.state === 'weak')?.element;
    const p2Strongest = p2.elementAnalysis.find(e => e.state === 'excess')?.element;

    if (p1Weakest && p2Strongest && p1Weakest === p2Strongest) {
        score += 15;
        compliments.push(`나의 부족한 ${p1Weakest} 기운을 상대방이 채워주는 완벽한 보완 관계입니다.`);
    }

    const summary = compliments.length > 0 ? compliments[0] : '서로의 기운을 무난하게 주고받는 관계입니다.';
    const detailText = compliments.length > 0 ? compliments.join(' ') : '특별히 서로를 보완하거나 해치는 오행이 없는 원만한 관계입니다.';
    const advice = score > 80 ? '아주 이상적인 오행 배합입니다.' : '서로 부족한 점을 이해하고 배려한다면 더 좋은 관계가 될 것입니다.';

    return { complementScore: score, summary, detailText, advice };
}

// [End of file]
