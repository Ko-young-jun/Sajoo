// ================================================
// 신살 (Special Stars) 분석 엔진
// ================================================

import type { EarthlyBranch, FourPillars } from '../types';

export interface SpecialStar {
    name: string;
    type: 'gil' | 'hyung'; // 길신/흉신
    description: string;
    effect: string;
    meaning: string; // [New] Beginner-friendly detailed explanation
    source?: string; // [New] e.g. "Because of Year Branch 'Monkey'"
}

/**
 * 신살 계산 메인 함수
 */
export function calculateSpecialStars(pillars: FourPillars): SpecialStar[] {
    const dayGan = pillars.day.gan;
    // dayJi는 현재 사용하지 않으므로 제거
    const branches = [pillars.year.ji, pillars.month.ji, pillars.day.ji, pillars.hour?.ji].filter(Boolean) as EarthlyBranch[];

    const stars: SpecialStar[] = [];

    // 1. 천을귀인 (Top 길신)
    // 갑무경-축미, 을기-자신, 병정-해유, 신-인오, 임계-사묘
    const nobleMap: Record<string, EarthlyBranch[]> = {
        '갑': ['축', '미'], '무': ['축', '미'], '경': ['축', '미'],
        '을': ['자', '신'], '기': ['자', '신'],
        '병': ['해', '유'], '정': ['해', '유'],
        '신': ['인', '오'],
        '임': ['사', '묘'], '계': ['사', '묘']
    };

    if (nobleMap[dayGan]) {
        branches.forEach(ji => {
            if (nobleMap[dayGan].includes(ji)) {
                if (!stars.find(s => s.name === '천을귀인')) {
                    stars.push({
                        name: '천을귀인',
                        type: 'gil',
                        description: '최고의 길신, 귀인의 도움',
                        effect: '어려움이 있어도 돕는 이가 있어 전화위복이 됩니다.',
                        meaning: '하늘이 내린 귀인이 당신을 돕는다는 뜻입니다. 인생의 고비마다 뜻밖의 도움이나 행운이 찾아와 어려움을 해결해줍니다.',
                        source: `일간 '${dayGan}'과 지지 '${ji}'의 만남`
                    });
                }
            }
        });
    }

    // 2. 역마살 (이동수)
    // 인신사해 기준
    const yeokmaMap: Record<string, EarthlyBranch> = {
        '신': '인', '자': '인', '진': '인',
        '인': '신', '오': '신', '술': '신',
        '사': '해', '유': '해', '축': '해',
        '해': '사', '묘': '사', '미': '사'
    };
    // 연지 기준 역마
    const targetYeokma = yeokmaMap[pillars.year.ji as string]; // Type assertion for safety if needed
    if (branches.includes(targetYeokma)) {
        stars.push({
            name: '역마살',
            type: 'gil', // 현대에는 활동성으로 좋게 해석
            description: '활동성과 이동수',
            effect: '활동 범위가 넓고 해외나 타지와 인연이 깊습니다.',
            meaning: '한 곳에 머물기보다 끊임없이 움직여야 발전하는 운명입니다. 여행, 출장, 이사 등이 잦을 수 있으며, 넓은 세상을 무대로 활동할 때 빛을 발합니다.',
            source: `연지 '${pillars.year.ji}'를 기준으로 판단`
        });
    }


    // 3. 도화살 (매력, 인기)
    // 자오묘유 기준
    const dohwaMap: Record<string, EarthlyBranch> = {
        '신': '유', '자': '유', '진': '유',
        '인': '묘', '오': '묘', '술': '묘',
        '사': '오', '유': '오', '축': '오',
        '해': '자', '묘': '자', '미': '자'
    };
    const targetDohwa = dohwaMap[pillars.year.ji as string];
    if (branches.includes(targetDohwa)) {
        stars.push({
            name: '도화살',
            type: 'gil', // 현대에는 인기로 해석
            description: '강력한 매력과 인기',
            effect: '사람들의 시선을 끌고 예술적 감각이 뛰어납니다.',
            meaning: '복숭아 꽃처럼 사람을 홀리는 매력이 있습니다. 연예인처럼 대중의 인기를 얻거나, 자신만의 매력으로 타인의 호감을 쉽게 삽니다.',
            source: `연지 '${pillars.year.ji}'를 기준으로 판단`
        });
    }

    // 4. 화개살 (예술, 종교)
    // 진술축미
    const hwagaeMap: Record<string, EarthlyBranch> = {
        '신': '진', '자': '진', '진': '진',
        '인': '술', '오': '술', '술': '술',
        '사': '축', '유': '축', '축': '축',
        '해': '미', '묘': '미', '미': '미'
    };
    const targetHwagae = hwagaeMap[pillars.year.ji as string];
    if (branches.includes(targetHwagae)) {
        stars.push({
            name: '화개살',
            type: 'gil',
            description: '예술과 학문의 별',
            effect: '정신적인 깊이가 있고 예술, 종교, 철학에 소질이 있습니다.',
            meaning: '화려함을 덮고 내면을 가꾸는 별입니다. 고독을 즐길 줄 알며, 예술적 재능이나 종교적, 철학적 깊이가 남다릅니다.',
            source: `연지 '${pillars.year.ji}'를 기준으로 판단`
        });
    }

    // 5. 백호살 (강한 에너지)
    // 갑진, 을미, 병술, 정축, 무진, 임술, 계축
    const baekhoList = ['갑진', '을미', '병술', '정축', '무진', '임술', '계축'];

    // 각 기둥 체크
    const pillarStrs = [
        pillars.year.gan + pillars.year.ji,
        pillars.month.gan + pillars.month.ji,
        pillars.day.gan + pillars.day.ji,
        pillars.hour ? pillars.hour.gan + pillars.hour.ji : ''
    ];

    if (pillarStrs.some(p => baekhoList.includes(p))) {
        stars.push({
            name: '백호살',
            type: 'hyung', // 주의 필요
            description: '폭발적인 에너지',
            effect: '평소엔 유능하나 욱하는 성질이나 사고를 주의해야 합니다.',
            meaning: '백호(흰 호랑이)처럼 강한 기운을 가졌습니다. 이 에너지를 잘 쓰면 큰 성취를 이루지만, 잘못 쓰면 성격이 급해지거나 뜻밖의 사고를 부를 수 있으니 마음 수양이 필요합니다.',
            source: '간지의 조합이 백호살에 해당'
        });
    }

    // 6. 괴강살 (리더십)
    // 경진, 경술, 임진, 임술, 무술
    const goegangList = ['경진', '경술', '임진', '임술', '무술'];
    if (pillarStrs.some(p => goegangList.includes(p))) {
        stars.push({
            name: '괴강살',
            type: 'gil', // 현대엔 강력한 리더십
            description: '카리스마와 리더십',
            effect: '총명하고 결단력이 있어 지도자가 될 자질이 있습니다.',
            meaning: '북두칠성의 우두머리 별처럼 강한 리더십을 상징합니다. 총명하고 결단력이 있어 남을 이끄는 자리에 오를 가능성이 높습니다.',
            source: '간지의 조합이 괴강살에 해당'
        });
    }

    return stars;
}
