// ================================================
// 격국 (Format) 분석 엔진
// ================================================

import type { HeavenlyStem, EarthlyBranch } from '../types';
import { calculateTenGod } from './tenGods';

export interface FormatResult {
    name: string;
    description: string;
    traits: string[];
    jobs: string[];
}

/**
 * 격국 판단 메인 함수
 * 월지(Month Branch)와 일간(Day Gan)을 기준으로 판단
 */
export function determineFormat(monthJi: EarthlyBranch, dayGan: HeavenlyStem): FormatResult {
    // 월지 지장간의 본기(Main Qi)를 기준으로 십신을 계산하여 격을 정함
    // 간단화를 위해 월지 자체의 오행->십신으로 1차 판단

    // 월지를 천간으로 치환 (본기 기준)
    const jiToGanMap: Record<EarthlyBranch, HeavenlyStem> = {
        '자': '계', '축': '기', '인': '갑', '묘': '을', '진': '무', '사': '병',
        '오': '정', '미': '기', '신': '경', '유': '신', '술': '무', '해': '임'
    };

    const monthGanEquivalent = jiToGanMap[monthJi];
    const tenGod = calculateTenGod(dayGan, monthGanEquivalent);

    // 10정격 매핑
    const formatMap: Record<string, FormatResult> = {
        '비견': {
            name: '건록격 (建祿格)',
            description: '자수성가형 리더',
            traits: ['독립심', '주체성', '추진력'],
            jobs: ['사업가', '프리랜서', '전문직']
        },
        '겁재': {
            name: '양인격 (羊刃格)', // 엄밀히는 양인과 겁재격 구분하나 통칭
            description: '강인한 승부사',
            traits: ['경쟁심', '리더십', '투지'],
            jobs: ['군인', '경찰', '운동선수', '외과의사']
        },
        '식신': {
            name: '식신격 (食神格)',
            description: '풍요로운 창조자',
            traits: ['창의력', '온화함', '연구심'],
            jobs: ['요리사', '예술가', '연구원', '교육자']
        },
        '상관': {
            name: '상관격 (傷官格)',
            description: '혁신적인 아이디어뱅크',
            traits: ['언변', '재치', '비판적 사고'],
            jobs: ['방송인', '변호사', '컨설턴트', '작가']
        },
        '편재': {
            name: '편재격 (偏財格)',
            description: '활동적인 사업가',
            traits: ['공간지각력', '관리능력', '사교성'],
            jobs: ['무역', '유통', '영업', '부동산']
        },
        '정재': {
            name: '정재격 (正財格)',
            description: '성실한 자산관리자',
            traits: ['꼼꼼함', '신용', '저축'],
            jobs: ['금융', '회계', '은행원', '공무원']
        },
        '편관': {
            name: '편관격 (偏官格)',
            description: '카리스마 있는 지도자',
            traits: ['권위', '책임감', '희생정신'],
            jobs: ['검찰', '정치인', '경호원', '임원']
        },
        '정관': {
            name: '정관격 (正官格)',
            description: '모범적인 행정가',
            traits: ['준법정신', '합리성', '안정추구'],
            jobs: ['일반행정', '교사', '대기업', '공기업']
        },
        '편인': {
            name: '편인격 (偏印格)',
            description: '신비로운 직관가',
            traits: ['직관력', '독창성', '순발력'],
            jobs: ['종교인', '철학가', '디자이너', '엔지니어']
        },
        '정인': {
            name: '정인격 (正印格)',
            description: '지혜로운 학자',
            traits: ['학구열', '인내심', '자비심'],
            jobs: ['교수', '의사', '작가', '멘토']
        }
    };

    return formatMap[tenGod] || {
        name: '일반격',
        description: '조화로운 성품',
        traits: ['유연성', '적응력'],
        jobs: ['다양한 분야']
    };
}
