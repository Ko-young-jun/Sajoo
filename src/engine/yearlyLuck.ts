import { FourPillars, EarthlyBranch, HeavenlyStem, Element, YearlyForecast } from '../types';
import { calculateTenGod } from './tenGods';

// 연도별 간지 계산 (간단 예시: 2025 을사, 2026 병오)
// 실제로는 60갑자 계산 로직이 필요하지만, 여기서는 2025, 2026 하드코딩 혹은 간단 오프셋 계산
const GAN_LIST: HeavenlyStem[] = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const JI_LIST: EarthlyBranch[] = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

// 1924년이 갑자년 (0, 0) 기준
function getYearPillar(year: number): { gan: HeavenlyStem, ji: EarthlyBranch } {
    const offset = year - 1924;
    const ganIndex = offset % 10;
    const jiIndex = offset % 12;
    return {
        gan: GAN_LIST[ganIndex < 0 ? ganIndex + 10 : ganIndex],
        ji: JI_LIST[jiIndex < 0 ? jiIndex + 12 : jiIndex]
    };
}

// 삼합 로직
const SAM_HAP_GROUP: Record<string, { group: EarthlyBranch[], element: Element, name: string }> = {
    'fire': { group: ['인', '오', '술'], element: 'fire', name: '인오술 화국' },
    'water': { group: ['신', '자', '진'], element: 'water', name: '신자진 수국' },
    'wood': { group: ['해', '묘', '미'], element: 'wood', name: '해묘미 목국' },
    'metal': { group: ['사', '유', '축'], element: 'metal', name: '사유축 금국' }
};

export function analyzeYearlyForecast(pillars: FourPillars, targetYear: number): YearlyForecast {
    const { gan, ji } = getYearPillar(targetYear);
    const dayMaster = pillars.day.gan;

    // 1. 삼합 체크
    // 내 사주의 지지와 세운의 지지(ji)가 합쳐져서 삼합을 이루는지 확인
    const myBranches = [pillars.year.ji, pillars.month.ji, pillars.day.ji, pillars.hour?.ji].filter(b => b) as EarthlyBranch[];
    // 세운 지지 포함
    const allBranches = [...myBranches, ji];

    let specialEvent: YearlyForecast['specialEvent'] = undefined;
    let theme = `${gan}${ji}년 운세`;
    let description = `${targetYear}년은 ${gan}과 ${ji}의 기운이 들어오는 해입니다.`;
    let score = 50;

    // 삼합 탐색
    for (const config of Object.values(SAM_HAP_GROUP)) {
        // config.group의 모든 글자가 allBranches에 포함되어 있는지 확인
        // (세운 지지 'ji'가 반드시 포함되어야 의미가 큼)
        if (config.group.every(b => allBranches.includes(b)) && config.group.includes(ji)) {
            specialEvent = {
                name: `${config.name} (삼합)`,
                effect: '강력한 기운의 변화',
                type: 'samhap'
            };

            // 십신 해석 (TenGod calculation removed as it was unused)

            // 삼합 오행에 따른 해석 (Sage Level)
            if (config.element === 'fire') {
                if (dayMaster === '경') { // 경금 + 화국 = 제련 (Great Success)
                    theme = "용광로 속의 무쇠 (대기만성)";
                    description = "뜨거운 불이 당신(쇠)을 감싸는 해입니다. 힘들 수 있지만, 이를 견디면 '명검'으로 다시 태어나 명예와 직위가 크게 상승합니다.";
                    score = 90;
                    specialEvent.effect = "관운(명예운) 폭발, 승진 및 리더 등극";
                } else {
                    theme = "불타오르는 열정";
                    description = "주변 환경이 뜨겁게 달아오릅니다. 활동력이 왕성해지고 일이 확장되는 시기입니다.";
                    score = 80;
                }
            } else if (config.element === 'water') {
                theme = "거대한 물결의 흐름";
                description = "큰 물이 들어와 흐름을 만듭니다. 지혜를 발휘하거나 해외, 유동적인 일에 유리합니다.";
                score = 75;
            }
            // ... 다른 오행 해석 추가 가능

            break; // 하나 발견하면 종료
        }
    }

    // 2. 2026년 경금 일간 특화 로직 (User Request 대응)
    if (targetYear === 2026 && dayMaster === '경') {
        // 병오(2026) + 경금 => 편관(칠살) 제련
        // 위에서 삼합 로직에 걸렸겠지만, 혹시 안 걸려도 강제 오버라이드 가능
        // 여기서는 삼합 로직을 믿음
    }

    // ----------------------------------------------------
    // 3. 상세 운세 (카테고리별 점수 및 조언)
    // ----------------------------------------------------
    const tenGod = calculateTenGod(dayMaster, gan);

    // 기본 점수 설정 (운의 흐름에 따라 약간씩 변동)
    const baseScore = score;

    // 십신별 테마 및 점수 보정
    const categories = {
        wealth: { score: baseScore, text: "평이한 재물운입니다." },
        career: { score: baseScore, text: "안정적인 직장 생활이 예상됩니다." },
        love: { score: baseScore, text: "기존 관계가 유지되는 시기입니다." },
        health: { score: baseScore, text: "건강 관리에 유의하세요." }
    };

    const advice: string[] = [];

    // 십신에 따른 로직
    if (tenGod === '편재' || tenGod === '정재') {
        categories.wealth.score += 15;
        categories.wealth.text = "재물운이 상승하는 시기입니다. 투자의 기회가 올 수 있습니다.";
        categories.career.score += 5;
        advice.push("금전적 흐름이 활발해지니 투자를 고려해보세요.");
        advice.push("하지만 과욕은 금물이니 리스크 관리가 필요합니다.");
    } else if (tenGod === '편관' || tenGod === '정관') {
        categories.career.score += 20;
        categories.career.text = "승진이나 명예 상승의 기회가 있습니다.";
        categories.wealth.score += 5;
        advice.push("책임감이 중요한 시기입니다. 맡은 일에 최선을 다하세요.");
        advice.push("명예가 따르지만 그만큼 스트레스도 동반될 수 있습니다.");
    } else if (tenGod === '식신' || tenGod === '상관') {
        categories.career.score += 10;
        categories.career.text = "새로운 일을 벌이거나 창작 활동에 좋습니다.";
        categories.wealth.score += 5;
        advice.push("창의적인 아이디어가 샘솟는 시기입니다.");
        advice.push("말조심을 해야 하며, 구설수에 오르지 않도록 주의하세요.");
    } else if (tenGod === '편인' || tenGod === '정인') {
        categories.career.text = "학업이나 자격증 취득에 매우 유리합니다.";
        categories.wealth.score -= 5; // 문서 잡느라 현금 묶임
        categories.health.score -= 5; // 생각이 많아짐
        advice.push("배움에 투자하기 좋은 시기입니다.");
        advice.push("계약이나 문서 관련 운이 좋으니 꼼꼼히 살피세요.");
    } else if (tenGod === '비견' || tenGod === '겁재') {
        categories.wealth.score -= 10; // 돈 나갈 일 많음
        categories.career.text = "경쟁이 치열해지지만 동료의 도움도 있습니다.";
        categories.love.score -= 5;
        advice.push("주변 사람들과의 협력이 중요합니다.");
        advice.push("지출이 늘어날 수 있으니 지갑 관리에 유의하세요.");
    }

    // 삼합/충에 따른 보정
    if (specialEvent) {
        if (specialEvent.type === 'samhap') {
            categories.career.score += 10;
            categories.wealth.score += 10;
            advice.unshift(`💡 ${specialEvent.effect}`);
        }
    }

    // 월별 운세 (간단 로직: 생월과 충이 되는 달 조심)
    const keyMonths = {
        best: [2, 6, 10], // 임시 로직 (랜덤성이 아닌 고정 패턴 추천)
        caution: [1, 7]
    };

    return {
        year: targetYear,
        gan, ji,
        theme,
        score,
        description,
        categories,
        keyMonths,
        advice,
        specialEvent
    };
}
