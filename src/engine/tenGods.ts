// ================================================
// 십신 (Ten Gods) 계산 엔진
// ================================================

import type {
    HeavenlyStem,
    TenGod,
    FourPillars,
    TenGodDistribution
} from '../types';
import { GAN_TO_ELEMENT, GAN_TO_YINYANG } from './SajuCalculator';

/**
 * 두 천간 간의 십신 관계 계산
 * @param dayGan 일간 (본인)
 * @param targetGan 비교 대상 천간
 */
export function calculateTenGod(dayGan: HeavenlyStem, targetGan: HeavenlyStem): TenGod {
    const dayElement = GAN_TO_ELEMENT[dayGan];
    const targetElement = GAN_TO_ELEMENT[targetGan];
    const dayYinYang = GAN_TO_YINYANG[dayGan];
    const targetYinYang = GAN_TO_YINYANG[targetGan];

    const sameYinYang = dayYinYang === targetYinYang;

    // 오행 관계 분석
    const elementRelations = {
        wood: { generates: 'fire', controls: 'earth', generatedBy: 'water', controlledBy: 'metal' },
        fire: { generates: 'earth', controls: 'metal', generatedBy: 'wood', controlledBy: 'water' },
        earth: { generates: 'metal', controls: 'water', generatedBy: 'fire', controlledBy: 'wood' },
        metal: { generates: 'water', controls: 'wood', generatedBy: 'earth', controlledBy: 'fire' },
        water: { generates: 'wood', controls: 'fire', generatedBy: 'metal', controlledBy: 'earth' }
    };

    const relation = elementRelations[dayElement];

    // 같은 오행 = 비겁
    if (dayElement === targetElement) {
        return sameYinYang ? '비견' : '겁재';
    }

    // 내가 생하는 오행 = 식상
    if (relation.generates === targetElement) {
        return sameYinYang ? '식신' : '상관';
    }

    // 내가 극하는 오행 = 재성
    if (relation.controls === targetElement) {
        return sameYinYang ? '편재' : '정재';
    }

    // 나를 극하는 오행 = 관성
    if (relation.controlledBy === targetElement) {
        return sameYinYang ? '편관' : '정관';
    }

    // 나를 생하는 오행 = 인성
    if (relation.generatedBy === targetElement) {
        return sameYinYang ? '편인' : '정인';
    }

    return '비견'; // fallback
}

/**
 * 사주 전체의 십신 분포 계산
 */
export function calculateTenGodDistribution(pillars: FourPillars): TenGodDistribution {
    const dayGan = pillars.day.gan;
    const distribution: TenGodDistribution = {
        bigyeob: 0,   // 비겁
        siksang: 0,   // 식상
        jaeseong: 0,  // 재성
        gwanseong: 0, // 관성
        inseong: 0    // 인성
    };

    // 각 기둥의 천간 분석
    const gans = [pillars.year.gan, pillars.month.gan];
    if (pillars.hour) gans.push(pillars.hour.gan);

    gans.forEach(gan => {
        const tenGod = calculateTenGod(dayGan, gan);
        addToDistribution(distribution, tenGod);
    });

    return distribution;
}

function addToDistribution(dist: TenGodDistribution, tenGod: TenGod): void {
    switch (tenGod) {
        case '비견':
        case '겁재':
            dist.bigyeob++;
            break;
        case '식신':
        case '상관':
            dist.siksang++;
            break;
        case '편재':
        case '정재':
            dist.jaeseong++;
            break;
        case '편관':
        case '정관':
            dist.gwanseong++;
            break;
        case '편인':
        case '정인':
            dist.inseong++;
            break;
    }
}

/**
 * 십신 한글 설명
 */
export function getTenGodDescription(tenGod: TenGod): string {
    const descriptions: Record<TenGod, string> = {
        '비견': '나와 같은 기운, 형제·친구·동료처럼 함께하는 존재',
        '겁재': '나와 경쟁하는 기운, 도전과 자극을 주는 관계',
        '식신': '내가 낳아주는 창조력, 표현과 재능의 기운',
        '상관': '날카로운 표현력, 혁신과 도전의 에너지',
        '편재': '활동적인 재물운, 사교와 투자의 기운',
        '정재': '안정적인 재물운, 성실과 축적의 기운',
        '편관': '권위와 도전, 승부사 기질의 기운',
        '정관': '명예와 책임, 안정된 성취의 기운',
        '편인': '독창적 영감, 비범한 사고의 기운',
        '정인': '학문과 지혜, 보호와 안정의 기운'
    };
    return descriptions[tenGod];
}

/**
 * 십신 카테고리별 설명
 */
export const TEN_GOD_CATEGORIES = {
    bigyeob: {
        name: '비겁',
        description: '자기 주도력',
        traits: ['독립심', '경쟁심', '자기주장']
    },
    siksang: {
        name: '식상',
        description: '표현력/창의력',
        traits: ['창의성', '표현력', '아이디어']
    },
    jaeseong: {
        name: '재성',
        description: '현실 감각',
        traits: ['재물운', '실용성', '관계력']
    },
    gwanseong: {
        name: '관성',
        description: '책임감/리더십',
        traits: ['책임감', '명예', '통제력']
    },
    inseong: {
        name: '인성',
        description: '학습/안정 추구',
        traits: ['학습력', '지혜', '안정추구']
    }
    // ... existing code ...
};

/**
 * 일간 궁합 점수표 (0~100)
 */
export const DAY_GAN_COMPATIBILITY: Record<HeavenlyStem, Record<HeavenlyStem, number>> = {
    '갑': { '갑': 70, '을': 80, '병': 90, '정': 85, '무': 60, '기': 95, '경': 40, '신': 50, '임': 85, '계': 90 },
    '을': { '갑': 85, '을': 70, '병': 90, '정': 80, '무': 65, '기': 60, '경': 95, '신': 40, '임': 90, '계': 85 },
    '병': { '갑': 90, '을': 85, '병': 70, '정': 75, '무': 85, '기': 90, '경': 60, '신': 95, '임': 40, '계': 50 },
    '정': { '갑': 85, '을': 90, '병': 75, '정': 70, '무': 90, '기': 85, '경': 50, '신': 60, '임': 95, '계': 40 },
    '무': { '갑': 50, '을': 60, '병': 85, '정': 90, '무': 70, '기': 75, '경': 90, '신': 85, '임': 60, '계': 95 },
    '기': { '갑': 95, '을': 50, '병': 90, '정': 85, '무': 75, '기': 70, '경': 85, '신': 90, '임': 50, '계': 60 },
    '경': { '갑': 40, '을': 95, '병': 50, '정': 60, '무': 90, '기': 85, '경': 70, '신': 75, '임': 85, '계': 90 },
    '신': { '갑': 50, '을': 40, '병': 95, '정': 60, '무': 85, '기': 90, '경': 75, '신': 70, '임': 90, '계': 85 },
    '임': { '갑': 85, '을': 90, '병': 40, '정': 95, '무': 50, '기': 60, '경': 85, '신': 90, '임': 70, '계': 75 },
    '계': { '갑': 90, '을': 85, '병': 50, '정': 40, '무': 95, '기': 50, '경': 90, '신': 85, '임': 75, '계': 70 }
};

export function calculateTenGodCompatibility(gan1: HeavenlyStem, gan2: HeavenlyStem): { score: number; description: string } {
    const score = DAY_GAN_COMPATIBILITY[gan1]?.[gan2] || 50;
    let description = '무난한 궁합입니다.';
    if (score >= 90) description = '천생연분의 아주 좋은 궁합입니다!';
    else if (score >= 80) description = '서로 도움을 주고받는 좋은 관계입니다.';
    else if (score <= 50) description = '서로의 성향 차이를 이해하려는 노력이 필요합니다.';

    return { score, description };
}

