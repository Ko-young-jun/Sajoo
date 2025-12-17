// ================================================
// 대운/연운 계산 엔진
// ================================================

import type {
    DaeunInfo,
    YearLuck,
    Pillar,
    FourPillars,
    Element,
    UserInput
} from '../types';
import {
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES,
    GAN_TO_ELEMENT,
    GAN_TO_YINYANG,
    JI_TO_ELEMENT
} from './SajuCalculator';

/**
 * 대운 계산
 * 남자 양년생/여자 음년생: 순행 (시간 순서대로)
 * 남자 음년생/여자 양년생: 역행 (시간 역순으로)
 */
export function calculateDaeun(
    input: UserInput,
    pillars: FourPillars
): DaeunInfo[] {
    const { gender } = input;
    const yearGanYinYang = GAN_TO_YINYANG[pillars.year.gan];

    // 순행/역행 결정
    const isForward =
        (gender === 'male' && yearGanYinYang === 'yang') ||
        (gender === 'female' && yearGanYinYang === 'yin');

    // 월주 인덱스
    const monthGanIndex = HEAVENLY_STEMS.indexOf(pillars.month.gan);
    const monthJiIndex = EARTHLY_BRANCHES.indexOf(pillars.month.ji);

    const daeunList: DaeunInfo[] = [];

    // 대운 시작 나이 계산 (간략화: 평균 5세로 설정)
    let startAge = 5;

    // 8개 대운 생성 (80년치)
    for (let i = 0; i < 8; i++) {
        const step = isForward ? i + 1 : -(i + 1);

        const ganIndex = ((monthGanIndex + step) % 10 + 10) % 10;
        const jiIndex = ((monthJiIndex + step) % 12 + 12) % 12;

        const pillar: Pillar = {
            gan: HEAVENLY_STEMS[ganIndex],
            ji: EARTHLY_BRANCHES[jiIndex],
            ganElement: GAN_TO_ELEMENT[HEAVENLY_STEMS[ganIndex]],
            jiElement: JI_TO_ELEMENT[EARTHLY_BRANCHES[jiIndex]],
            ganYinYang: GAN_TO_YINYANG[HEAVENLY_STEMS[ganIndex]]
        };

        const endAge = startAge + 9;

        daeunList.push({
            startAge,
            endAge,
            pillar,
            theme: getDaeunTheme(pillar, pillars.day.gan),
            description: getDaeunDescription(pillar, i)
        });

        startAge = endAge + 1;
    }

    return daeunList;
}

/**
 * 대운 테마 결정
 */
function getDaeunTheme(daeunPillar: Pillar, dayGan: string): string {
    const dayElement = GAN_TO_ELEMENT[dayGan as keyof typeof GAN_TO_ELEMENT];
    const daeunElement = daeunPillar.ganElement;

    // 오행 관계에 따른 테마
    const themes: Record<string, string> = {
        same: '확장과 경쟁의 시기',
        generating: '성장과 창조의 시기',
        generated: '지원과 안정의 시기',
        controlling: '도전과 성취의 시기',
        controlled: '시련과 성장의 시기'
    };

    const relation = getElementRelation(dayElement, daeunElement);
    return themes[relation] || '변화의 시기';
}

/**
 * 오행 관계 분석
 */
function getElementRelation(baseElement: Element, targetElement: Element): string {
    if (baseElement === targetElement) return 'same';

    const generating: Record<Element, Element> = {
        wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood'
    };
    const generated: Record<Element, Element> = {
        wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal'
    };
    const controlling: Record<Element, Element> = {
        wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire'
    };
    const controlled: Record<Element, Element> = {
        wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth'
    };

    if (generating[baseElement] === targetElement) return 'generating';
    if (generated[baseElement] === targetElement) return 'generated';
    if (controlling[baseElement] === targetElement) return 'controlling';
    if (controlled[baseElement] === targetElement) return 'controlled';

    return 'neutral';
}

/**
 * 대운 설명 생성
 */
function getDaeunDescription(_pillar: Pillar, index: number): string {
    const seasonDescriptions = [
        '인생의 기초를 다지는 시기입니다.',
        '가능성을 탐색하고 방향을 잡는 시기입니다.',
        '본격적인 성장과 발전의 시기입니다.',
        '능력을 발휘하고 성과를 거두는 시기입니다.',
        '성취를 공고히 하고 확장하는 시기입니다.',
        '경험을 바탕으로 지혜를 나누는 시기입니다.',
        '인생의 원숙미가 빛나는 시기입니다.',
        '삶의 결실을 거두고 정리하는 시기입니다.'
    ];

    return seasonDescriptions[index] || '새로운 변화가 찾아오는 시기입니다.';
}

/**
 * 연운 계산 (향후 10년)
 */
export function calculateYearLuck(
    pillars: FourPillars,
    startYear: number
): YearLuck[] {
    const dayGan = pillars.day.gan;
    const yearLucks: YearLuck[] = [];

    for (let i = 0; i < 10; i++) {
        const year = startYear + i;

        // 해당 연도의 간지 계산
        const baseYear = 1984; // 갑자년
        const diff = year - baseYear;
        const ganIndex = ((diff % 10) + 10) % 10;
        const jiIndex = ((diff % 12) + 12) % 12;

        const pillar: Pillar = {
            gan: HEAVENLY_STEMS[ganIndex],
            ji: EARTHLY_BRANCHES[jiIndex],
            ganElement: GAN_TO_ELEMENT[HEAVENLY_STEMS[ganIndex]],
            jiElement: JI_TO_ELEMENT[EARTHLY_BRANCHES[jiIndex]],
            ganYinYang: GAN_TO_YINYANG[HEAVENLY_STEMS[ganIndex]]
        };

        // 점수 계산 (일간과의 관계 기반)
        const score = calculateYearScore(dayGan, pillar);

        yearLucks.push({
            year,
            score,
            label: getYearLabel(score),
            pillar
        });
    }

    return yearLucks;
}

/**
 * 연운 점수 계산
 */
function calculateYearScore(dayGan: string, yearPillar: Pillar): number {
    const dayElement = GAN_TO_ELEMENT[dayGan as keyof typeof GAN_TO_ELEMENT];
    const yearGanElement = yearPillar.ganElement;
    const yearJiElement = yearPillar.jiElement;

    let score = 50; // 기본 점수

    // 천간 관계
    const ganRelation = getElementRelation(dayElement, yearGanElement);
    switch (ganRelation) {
        case 'generated': score += 20; break;  // 인성 - 지원
        case 'same': score += 10; break;        // 비겁 - 힘얻음
        case 'generating': score += 5; break;   // 식상 - 표현
        case 'controlling': score += 15; break; // 재성 - 재물
        case 'controlled': score -= 10; break;  // 관성 - 압박
    }

    // 지지 관계
    const jiRelation = getElementRelation(dayElement, yearJiElement);
    switch (jiRelation) {
        case 'generated': score += 15; break;
        case 'same': score += 5; break;
        case 'generating': score += 5; break;
        case 'controlling': score += 10; break;
        case 'controlled': score -= 5; break;
    }

    // 범위 제한
    return Math.max(30, Math.min(95, score));
}

/**
 * 연운 레이블
 */
function getYearLabel(score: number): string {
    if (score >= 80) return '전성기';
    if (score >= 70) return '상승기';
    if (score >= 55) return '안정기';
    if (score >= 45) return '전환기';
    return '도약준비';
}

/**
 * 현재 대운 정보 가져오기
 */
export function getCurrentDaeun(daeunList: DaeunInfo[], age: number): DaeunInfo | undefined {
    return daeunList.find(d => age >= d.startAge && age <= d.endAge);
}
