// ================================================
// 10천간 데이터 (일간 성향)
// ================================================

import type { IlganData, HeavenlyStem } from '../types';

export const ILGAN_DATA: Record<HeavenlyStem, IlganData> = {
    '갑': {
        gan: '갑',
        element: 'wood',
        yinYang: 'yang',
        symbol: '큰 나무',
        keywords: ['리더십', '진취성', '독립심', '정의감'],
        description: '곧게 자라는 큰 나무처럼, 당신은 강인한 의지와 리더십을 타고났습니다. 하늘을 향해 뻗어가는 나무처럼 끊임없이 성장하고 발전하려는 기질이 있습니다.'
    },
    '을': {
        gan: '을',
        element: 'wood',
        yinYang: 'yin',
        symbol: '풀, 덩굴, 꽃',
        keywords: ['적응력', '섬세함', '인내', '조화'],
        description: '유연한 덩굴이나 아름다운 꽃처럼, 당신은 어떤 환경에서도 적응하며 주변과 조화를 이룹니다. 부드러움 속에 강인함을 품고 있습니다.'
    },
    '병': {
        gan: '병',
        element: 'fire',
        yinYang: 'yang',
        symbol: '태양',
        keywords: ['열정', '표현력', '사교성', '자신감'],
        description: '세상을 밝히는 태양처럼, 당신은 주변에 따뜻함과 활력을 전합니다. 타고난 밝은 에너지로 사람들을 이끄는 매력이 있습니다.'
    },
    '정': {
        gan: '정',
        element: 'fire',
        yinYang: 'yin',
        symbol: '촛불, 등불',
        keywords: ['따뜻함', '섬세함', '예술성', '배려'],
        description: '어둠 속에서 빛나는 촛불처럼, 당신은 섬세하고 따뜻한 마음으로 주변을 비춥니다. 예술적 감각과 깊은 감수성을 지녔습니다.'
    },
    '무': {
        gan: '무',
        element: 'earth',
        yinYang: 'yang',
        symbol: '산',
        keywords: ['신뢰', '안정', '중재', '포용'],
        description: '흔들리지 않는 산처럼, 당신은 안정감과 신뢰를 주는 존재입니다. 넓은 품으로 많은 것을 포용하고 중심을 잡아주는 역할을 합니다.'
    },
    '기': {
        gan: '기',
        element: 'earth',
        yinYang: 'yin',
        symbol: '논밭, 정원',
        keywords: ['포용', '수용', '실용', '성실'],
        description: '곡식을 키우는 비옥한 땅처럼, 당신은 주변을 풍요롭게 만드는 힘이 있습니다. 실용적이고 성실하며, 함께하는 이들을 돌봅니다.'
    },
    '경': {
        gan: '경',
        element: 'metal',
        yinYang: 'yang',
        symbol: '철, 무기',
        keywords: ['결단력', '의지', '정의', '강인함'],
        description: '단단한 철처럼, 당신은 강한 의지와 결단력을 가졌습니다. 정의를 추구하고, 어려움에 굴하지 않는 강인한 정신이 있습니다.'
    },
    '신': {
        gan: '신',
        element: 'metal',
        yinYang: 'yin',
        symbol: '보석, 귀금속',
        keywords: ['정교함', '예리함', '미적감각', '완벽'],
        description: '빛나는 보석처럼, 당신은 섬세하고 예리한 감각을 지녔습니다. 완벽을 추구하며, 독특한 아름다움과 가치를 발합니다.'
    },
    '임': {
        gan: '임',
        element: 'water',
        yinYang: 'yang',
        symbol: '바다, 큰 강',
        keywords: ['지혜', '포용', '유연', '가능성'],
        description: '넓은 바다처럼, 당신은 깊은 지혜와 무한한 포용력을 지녔습니다. 모든 것을 품고 어디로든 흘러갈 수 있는 무한한 가능성이 있습니다.'
    },
    '계': {
        gan: '계',
        element: 'water',
        yinYang: 'yin',
        symbol: '비, 이슬, 안개',
        keywords: ['직관', '감수성', '적응', '순수'],
        description: '맑은 이슬처럼, 당신은 순수하고 깊은 감수성을 지녔습니다. 직관력이 뛰어나고, 조용히 스며들어 변화를 만들어내는 힘이 있습니다.'
    }
};

/**
 * 천간으로 일간 데이터 조회
 */
export function getIlganData(gan: HeavenlyStem): IlganData {
    return ILGAN_DATA[gan];
}
