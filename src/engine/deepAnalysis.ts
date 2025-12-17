import type { Element, TenGodDistribution, FourPillars, SpecialStar } from '../types';
import type { FormatResult } from './format';
import { DAY_MASTER_CAREER, TEN_GOD_CAREER_ADVICE } from '../data/deepSajuData';

// ------------------------------------
// 1. 건강 분석 (Health)
// ------------------------------------

export interface HealthAnalysis {
    weakOrgans: string[];
    symptoms: string[];
    advice: string[];
}

export function analyzeHealth(elementDist: Record<Element, number>): HealthAnalysis {
    const weakOrgans: string[] = [];
    const symptoms: string[] = [];
    const advice: string[] = [];

    // 오행별 장기 및 증상 매핑
    const healthMap: Record<Element, { organs: string, symptoms: string }> = {
        wood: { organs: '간, 담', symptoms: '눈 피로, 근육 경련, 분노 조절 필요' },
        fire: { organs: '심장, 소장', symptoms: '불면증, 두근거림, 얼굴 홍조' },
        earth: { organs: '비장, 위장', symptoms: '소화불량, 위염, 무기력증' },
        metal: { organs: '폐, 대장', symptoms: '비염, 피부 트러블, 호흡기 질환' },
        water: { organs: '신장, 방광', symptoms: '부종, 요통, 냉증' }
    };

    (Object.entries(elementDist) as [Element, number][]).forEach(([el, score]) => {
        if (score <= 1) { // 결핍
            weakOrgans.push(healthMap[el].organs);
            symptoms.push(healthMap[el].symptoms);
            advice.push(`${el === 'wood' ? '나무' : el === 'fire' ? '불' : el === 'earth' ? '흙' : el === 'metal' ? '쇠' : '물'}의 기운이 약합니다. 관련 음식을 섭취하세요.`);
        }
    });

    return {
        weakOrgans,
        symptoms,
        advice
    };
}

// ------------------------------------
// 2. 직업 분석 (Career)
// ------------------------------------

export interface CareerAnalysis {
    suitableJobs: string[];
    workStyle: string;
    advice: string;
    dayMasterTrait?: {
        style: string;
        strength: string;
        weakness: string;
    }
}

export function analyzeCareer(
    format: FormatResult,
    _tenGodDist: TenGodDistribution, // _ prefix to ignore unused
    pillars: FourPillars,
    specialStars: SpecialStar[] = []
): CareerAnalysis {
    const dayMaster = pillars.day.gan; // 일간 (나)
    const dmTrait = DAY_MASTER_CAREER[dayMaster];

    // 1. 격국(Format) 기반 핵심 성향 파악
    // format.name 예: "식신격 (食神格)" -> "식신" 추출
    const tenGodKey = format.name.substring(0, 2);
    const tenGodInfo = TEN_GOD_CAREER_ADVICE[tenGodKey] || TEN_GOD_CAREER_ADVICE['비견'];

    let suitableJobs = [...tenGodInfo.jobs];

    // 2. 특수 신살 보정
    const hasYeokma = specialStars.some(s => s.name.includes('역마'));
    const hasDohwa = specialStars.some(s => s.name.includes('도화'));
    const hasHwagae = specialStars.some(s => s.name.includes('화개'));

    if (hasYeokma) {
        suitableJobs.push('우주/항공/무역', '여행 작가/가이드', '국제 비즈니스');
    }
    if (hasDohwa) {
        suitableJobs.push('인플루언서/방송', '패션/뷰티', '공연 기획');
    }
    if (hasHwagae) {
        suitableJobs.push('상담 심리', '종교/철학', '순수 예술');
    }

    // 중복 제거
    suitableJobs = [...new Set(suitableJobs)];

    // 3. 조언 생성
    let advice = `당신은 [${dmTrait.style}]의 기질을 타고났습니다. ${dmTrait.strength} 특히 ${tenGodInfo.desc}`;

    if (specialStars.length > 0) {
        const starNames = specialStars.map(s => s.name).slice(0, 2).join(', ');
        advice += ` 보조적으로 ${starNames}의 기운이 있어, 이를 잘 활용하면 해당 분야에서 두각을 나타낼 수 있습니다.`;
    }

    return {
        suitableJobs,
        workStyle: `${dmTrait.style} - ${tenGodInfo.title}`,
        advice,
        dayMasterTrait: dmTrait
    };
}

// ------------------------------------
// 3. 재물 분석 (Wealth)
// ------------------------------------

export interface WealthAnalysis {
    type: string;
    description: string;
    advice: string;
}

export function analyzeWealth(tenGodDist: TenGodDistribution): WealthAnalysis {
    const { jaeseong, siksang, gwanseong, inseong } = tenGodDist;

    if (jaeseong > 2) {
        return {
            type: '사업가형 부자',
            description: '재물에 대한 감각이 뛰어나고 기회를 잘 포착합니다.',
            advice: '적극적인 투자와 사업 확장이 유리하나, 관리가 중요합니다.'
        };
    } else if (gwanseong > 2 && inseong > 1) {
        return {
            type: '명예형 부자',
            description: '직위와 명예가 오르면 재물도 함께 따릅니다.',
            advice: '돈을 쫓기보다 자신의 브랜드 가치를 높이는 데 집중하세요.'
        };
    } else if (siksang > 2) {
        return {
            type: '재능형 부자',
            description: '자신의 기술과 재능으로 부를 창출합니다.',
            advice: '자신만의 전문 기술이나 콘텐츠를 개발하세요.'
        };
    } else {
        return {
            type: '성실형 부자',
            description: '꾸준한 노력과 절약으로 안정적인 부를 이룹니다.',
            advice: '저축과 안전한 재테크를 통해 자산을 불려나가세요.'
        };
    }
}
