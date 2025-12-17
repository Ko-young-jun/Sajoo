// ================================================
// 오행별 개운 가이드
// ================================================

import type { ElementGuide, Element } from '../types';

export const ELEMENT_GUIDES: Record<Element, ElementGuide> = {
    wood: {
        element: 'wood',
        direction: '동쪽',
        season: '봄',
        luckyNumbers: [3, 8],
        colors: ['초록색', '청록색', '연두색'],
        foods: ['신맛 음식', '푸른 채소', '브로콜리', '시금치', '청포도', '레몬'],
        activities: ['등산', '산책', '원예', '독서', '자기계발', '새로운 것 배우기'],
        jobs: ['교육', '출판', '의료', '상담', '연구', '디자인', '패션']
    },
    fire: {
        element: 'fire',
        direction: '남쪽',
        season: '여름',
        luckyNumbers: [2, 7],
        colors: ['빨간색', '주황색', '보라색', '분홍색'],
        foods: ['쓴맛 음식', '붉은 과일', '토마토', '고추', '석류', '커피'],
        activities: ['운동', '춤', '노래', '발표', '토론', '사교 모임', '공연 관람'],
        jobs: ['연예', '마케팅', '광고', '요리', '미용', '방송', '강연']
    },
    earth: {
        element: 'earth',
        direction: '중앙',
        season: '환절기 (사계절 끝)',
        luckyNumbers: [5, 10],
        colors: ['노란색', '황토색', '베이지', '갈색'],
        foods: ['단맛 음식', '곡물', '감자', '고구마', '호박', '꿀', '대추'],
        activities: ['명상', '요가', '부동산 탐방', '인테리어', '수집', '중재 역할'],
        jobs: ['부동산', '건축', '농업', '중개', '컨설팅', '보험', '행정']
    },
    metal: {
        element: 'metal',
        direction: '서쪽',
        season: '가을',
        luckyNumbers: [4, 9],
        colors: ['흰색', '금색', '은색', '회색'],
        foods: ['매운맛 음식', '파', '마늘', '생강', '무', '양파', '배'],
        activities: ['정리정돈', '금융 공부', '보석 감상', '악기 연주', '글쓰기'],
        jobs: ['금융', '법률', '기계', '자동차', 'IT', '품질관리', '감정평가']
    },
    water: {
        element: 'water',
        direction: '북쪽',
        season: '겨울',
        luckyNumbers: [1, 6],
        colors: ['검은색', '파란색', '남색', '자주색'],
        foods: ['짠맛 음식', '해산물', '미역', '다시마', '콩', '검은깨', '블루베리'],
        activities: ['수영', '명상', '여행', '철학 공부', '심리 탐구', '휴식'],
        jobs: ['무역', '수산업', '물류', '철학', '심리학', '연구', '정보통신']
    }
};

/**
 * 오행으로 개운 가이드 조회
 */
export function getElementGuide(element: Element): ElementGuide {
    return ELEMENT_GUIDES[element];
}

/**
 * 용신 기반 개운 조언 생성
 */
export function generateLuckyAdvice(yongShinElement: Element): string[] {
    const guide = ELEMENT_GUIDES[yongShinElement];

    return [
        `🧭 **행운의 방향**: ${guide.direction}`,
        `🎨 **행운의 색상**: ${guide.colors.join(', ')}`,
        `🔢 **행운의 숫자**: ${guide.luckyNumbers.join(', ')}`,
        `🍽️ **도움이 되는 음식**: ${guide.foods.slice(0, 4).join(', ')}`,
        `🏃 **추천 활동**: ${guide.activities.slice(0, 4).join(', ')}`,
        `💼 **적합한 직종**: ${guide.jobs.slice(0, 4).join(', ')}`
    ];
}
