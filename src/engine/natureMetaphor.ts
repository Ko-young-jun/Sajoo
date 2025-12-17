import type { HeavenlyStem, EarthlyBranch } from '../types';
import { NATURE_METAPHORS, Season } from '../data/metaphorData';

// 월지를 계절로 변환하는 매핑
const SEASON_MAP: Record<EarthlyBranch, Season> = {
    '인': 'spring', '묘': 'spring', '진': 'spring',
    '사': 'summer', '오': 'summer', '미': 'summer',
    '신': 'autumn', '유': 'autumn', '술': 'autumn',
    '해': 'winter', '자': 'winter', '축': 'winter'
};

export interface DynamicMetaphorResult {
    title: string;
    description: string;
    keywords: string[];
    season: Season;
    dayMaster: HeavenlyStem;
}

/**
 * 사주의 일간과 월지를 분석하여 자연 물상(Metaphor)을 생성합니다.
 * 예: 갑목(Wood) + 인월(Spring) -> "봄의 숲을 호령하는 거목"
 */
export function getNatureMetaphor(dayMaster: HeavenlyStem, monthJi: EarthlyBranch): DynamicMetaphorResult {
    const season = SEASON_MAP[monthJi] || 'spring'; // 기본값 Spring
    const metaphor = NATURE_METAPHORS[dayMaster][season];

    return {
        ...metaphor,
        season,
        dayMaster
    };
}
