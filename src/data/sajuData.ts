import { Element } from '../types';

export interface ElementDetail {
    personality: {
        strength: string[];
        weakness: string[];
        excess: string;
        deficiency: string;
    };
    health: {
        organs: string[];
        symptoms: string[];
        prevention: string;
    };
    remedy: {
        foods: string[];
        colors: { name: string; hex: string }[];
        direction: string;
        activities: string[];
        items: string[];
        habits: string[];
    };
}

export const ELEMENT_DETAILS: Record<Element, ElementDetail> = {
    wood: {
        personality: {
            strength: ['창의적', '진취적', '인자함', '성장 지향', '리더십', '계획성'],
            weakness: ['고집', '독단적', '마무리 부족', '경쟁심'],
            excess: '지나치게 고집이 세고 남의 말을 듣지 않으며, 시작은 잘하나 끝맺음이 약할 수 있습니다.',
            deficiency: '의욕이 부족하고 우유부단하며, 끈기가 약해 중도 포기하는 경우가 많습니다.'
        },
        health: {
            organs: ['간', '담낭', '눈', '신경계', '근육', '관절'],
            symptoms: ['눈의 피로', '근육 경련', '편두통', '만성 피로', '화를 잘 냄'],
            prevention: '술을 줄이고 충분한 수면을 취하며, 스트레스를 그때그때 해소해야 합니다.'
        },
        remedy: {
            foods: ['신맛 과일(매실, 유자)', '녹색 채소(시금치, 브로콜리)', '비타민C'],
            colors: [{ name: '초록색', hex: '#22c55e' }, { name: '청록색', hex: '#0d9488' }],
            direction: '동쪽',
            activities: ['등산', '산림욕', '원예/식물 기르기', '아침 운동'],
            items: ['목제 가구', '나무 장신구', '식물 화분', '책'],
            habits: ['아침 일찍 일어나기', '새로운 계획 세우기', '독서']
        }
    },
    fire: {
        personality: {
            strength: ['열정적', '예의 바름', '화려함', '표현력', '적극성', '솔직함'],
            weakness: ['성급함', '다혈질', '감정 기복', '허영심'],
            excess: '감정을 주체하지 못해 폭발하기 쉽고, 지나친 솔직함으로 타인에게 상처를 줄 수 있습니다.',
            deficiency: '매사에 소극적이고 열정이 부족하며, 자신감이 결여되어 우울감을 느낄 수 있습니다.'
        },
        health: {
            organs: ['심장', '소장', '혈액', '혀', '얼굴', '시력'],
            symptoms: ['가슴 두근거림', '불면증', '고혈압', '안면 홍조', '심혈관 질환'],
            prevention: '유산소 운동으로 심폐 기능을 강화하고, 흥분되는 상황을 피하며 명상을 권합니다.'
        },
        remedy: {
            foods: ['쓴맛 음식(다크초콜릿, 커피)', '대추', '토마토', '붉은 육류'],
            colors: [{ name: '빨간색', hex: '#ef4444' }, { name: '주황색', hex: '#f97316' }],
            direction: '남쪽',
            activities: ['햇볕 쬐기', '사람들과의 모임', '노래/춤', '방송/발표'],
            items: ['조명/스탠드', '캔들/향초', '화려한 액세서리', '전자기기'],
            habits: ['활발하게 대화하기', '많이 웃기', '낮에 활동하기']
        }
    },
    earth: {
        personality: {
            strength: ['포용력', '신용', '성실함', '안정감', '중재자', '현실적'],
            weakness: ['보수적', '답답함', '의심', '게으름'],
            excess: '변화를 싫어하고 고집이 세며, 지나친 신중함으로 기회를 놓칠 수 있습니다.',
            deficiency: '뿌리가 약해 불안정하고, 끈기가 부족하며 사람들에게 믿음을 주기 어렵습니다.'
        },
        health: {
            organs: ['비장', '위장', '입/입술', '피부', '근육(살집)'],
            symptoms: ['소화불량', '위염', '식욕 부진/과다', '복부 비만', '피부 트러블'],
            prevention: '규칙적인 식습관이 가장 중요하며, 단맛을 줄이고 소식을 생활화해야 합니다.'
        },
        remedy: {
            foods: ['단맛(꿀, 호박)', '뿌리 채소(고구마, 당근)', '곡물(현미, 쌀)', '발효 음식'],
            colors: [{ name: '노란색', hex: '#eab308' }, { name: '황토색', hex: '#a16207' }],
            direction: '중앙 (거실 등 집의 중심)',
            activities: ['맨발 걷기', '도예/흙 빚기', '캠핑', '요가'],
            items: ['천연 소재 침구', '토기/도자기', '돌 장식품', '쿠션'],
            habits: ['약속 철저히 지키기', '집안 정리정돈', '명상']
        }
    },
    metal: {
        personality: {
            strength: ['결단력', '의리', '정확함', '냉철함', '원칙주의', '깔끔함'],
            weakness: ['냉혹함', '비판적', '강박증', '융통성 부족'],
            excess: '날카로운 언변으로 남을 상처 입히고, 지나친 강박과 결벽증을 보일 수 있습니다.',
            deficiency: '맺고 끊음이 불분명하고, 우유부단하며 실천력이 약해 흐지부지하기 쉽습니다.'
        },
        health: {
            organs: ['폐', '대장', '코', '피부', '뼈', '치아'],
            symptoms: ['비염', '천식', '피부 건조', '변비/설사', '다절/골절'],
            prevention: '호흡기 관리에 유의하고, 건조하지 않게 습도를 유지하며 금연이 필수입니다.'
        },
        remedy: {
            foods: ['매운맛(마늘, 양파, 생강, 파)', '흰색 음식(배, 도라지, 무)', '견과류'],
            colors: [{ name: '흰색', hex: '#f8fafc' }, { name: '은색/회색', hex: '#94a3b8' }],
            direction: '서쪽',
            activities: ['웨이트 트레이닝', '바둑/체스', '드라이브', '기계 다루기'],
            items: ['금속 액세서리', '시계', '거울', '운동기구'],
            habits: ['심호흡 하기', '규칙 정하기', '불필요한 물건 버리기 (미니멀리즘)']
        }
    },
    water: {
        personality: {
            strength: ['지혜', '유연함', '친화력', '총명함', '적응력', '통찰력'],
            weakness: ['변덕', '비밀스러움', '음흉함', '우울감', '생각 과다'],
            excess: '생각이 너무 많아 실천하지 못하고, 음울한 기운에 빠지거나 색정(色情)에 빠질 수 있습니다.',
            deficiency: '융통성이 없고 매사 빡빡하게 굴며, 지혜가 부족해 임기응변에 약합니다.'
        },
        health: {
            organs: ['신장', '방광', '귀', '생식기', '혈액', '머리카락'],
            symptoms: ['부종', '요통', '이명', '생리 불순', '냉증', '탈모'],
            prevention: '몸을 항상 따뜻하게 하고, 짠 음식을 피하며 수분을 적절히 섭취해야 합니다.'
        },
        remedy: {
            foods: ['짠맛(약간)', '검은콩', '해조류(미역, 김)', '해산물', '물'],
            colors: [{ name: '검정색', hex: '#171717' }, { name: '남색', hex: '#1e3a8a' }],
            direction: '북쪽',
            activities: ['수영', '반신욕', '낚시', '여행', '음악 감상'],
            items: ['어항/분수', '검은색 소품', '보석(진주)', '오디오'],
            habits: ['충분한 휴식', '물 자주 마시기', '일기 쓰기']
        }
    }
};
