// ================================================
// 60갑자 일주 데이터 (물상론 기반)
// Gemini 프롬프트의 "자연 형상" 컨셉 적용
// ================================================

import type { IljuData } from '../types';

export const ILJU_DATA: Record<string, IljuData> = {
    // ========== 갑(甲) 일간 ==========
    '갑자': {
        name: '갑자',
        symbol: '🌲',
        description: '깊은 물 위에 우뚝 선 대나무',
        natureImage: '어둠 속에서도 곧게 자라는 대나무 숲',
        personality: '지혜롭고 유연하며, 어떤 상황에서도 중심을 잃지 않습니다.',
        lifeTheme: '지혜와 인내로 성장하며, 깊은 통찰력으로 세상을 이끄는 삶',
        keywords: ['#지혜', '#인내', '#통찰력']
    },
    '갑인': {
        name: '갑인',
        symbol: '🐅',
        description: '봄 숲을 달리는 호랑이처럼 강인한 나무',
        natureImage: '울창한 숲 속에서 힘차게 뻗어가는 거대한 참나무',
        personality: '자신감이 넘치고 추진력이 강하며, 리더십이 탁월합니다.',
        lifeTheme: '강한 의지로 목표를 향해 돌진하는 개척자의 삶',
        keywords: ['#리더십', '#추진력', '#개척정신']
    },
    '갑진': {
        name: '갑진',
        symbol: '🌳',
        description: '구름 위로 솟아오르는 신령한 나무',
        natureImage: '하늘을 향해 솟구치는 거대한 소나무, 구름이 그 주위를 감싸다',
        personality: '이상이 높고 야망이 크며, 큰 그림을 그리는 능력이 뛰어납니다.',
        lifeTheme: '높은 이상을 품고 사회적 성취를 이루는 삶',
        keywords: ['#야망', '#이상', '#성취']
    },
    '갑오': {
        name: '갑오',
        symbol: '🔥',
        description: '불꽃과 함께 타오르는 나무',
        natureImage: '모닥불 옆에서 빛나는 나무, 열정과 온기를 전하다',
        personality: '열정적이고 표현력이 풍부하며, 사람들에게 영감을 줍니다.',
        lifeTheme: '열정과 창의력으로 세상을 밝히는 삶',
        keywords: ['#열정', '#표현력', '#영감']
    },
    '갑신': {
        name: '갑신',
        symbol: '⚔️',
        description: '단련되어 더욱 강해지는 나무',
        natureImage: '바위틈에서 자라나는 소나무, 시련 속에서 더욱 단단해지다',
        personality: '도전을 두려워하지 않으며, 역경 속에서 성장합니다.',
        lifeTheme: '시련을 통해 단련되어 강인해지는 삶',
        keywords: ['#도전', '#성장', '#강인함']
    },
    '갑술': {
        name: '갑술',
        symbol: '🏔️',
        description: '산 정상에 뿌리내린 나무',
        natureImage: '가을 산 정상에서 홀로 서 있는 노송',
        personality: '원칙을 중시하고 의리가 있으며, 신뢰할 수 있는 사람입니다.',
        lifeTheme: '원칙과 신념을 지키며 존경받는 삶',
        keywords: ['#원칙', '#의리', '#신뢰']
    },

    // ========== 을(乙) 일간 ==========
    '을축': {
        name: '을축',
        symbol: '🌱',
        description: '겨울 땅속에서 봄을 기다리는 씨앗',
        natureImage: '눈 아래 촉촉한 흙 속에서 싹을 틔울 준비를 하는 씨앗',
        personality: '인내심이 강하고 때를 기다릴 줄 알며, 실용적입니다.',
        lifeTheme: '인내와 준비를 통해 때가 되면 피어나는 삶',
        keywords: ['#인내', '#준비', '#실용성']
    },
    '을묘': {
        name: '을묘',
        symbol: '🌸',
        description: '봄바람에 흔들리는 꽃',
        natureImage: '따뜻한 봄 햇살 아래 만개한 벚꽃',
        personality: '예술적 감각이 뛰어나고 섬세하며, 조화를 추구합니다.',
        lifeTheme: '아름다움과 조화를 추구하며 예술적으로 사는 삶',
        keywords: ['#예술', '#섬세함', '#조화']
    },
    '을사': {
        name: '을사',
        symbol: '🌿',
        description: '불꽃 곁에서 자라나는 끈기 있는 덩굴',
        natureImage: '따뜻한 불 곁에서 자라는 담쟁이',
        personality: '적응력이 뛰어나고 기회를 잘 포착하며, 인간관계가 좋습니다.',
        lifeTheme: '지혜롭게 기회를 잡고 유연하게 성공을 이루는 삶',
        keywords: ['#적응력', '#기회포착', '#유연성']
    },
    '을미': {
        name: '을미',
        symbol: '🌾',
        description: '여름 들판의 풍요로운 곡식',
        natureImage: '황금빛으로 익어가는 여름 들판의 밀',
        personality: '포용력이 있고 다정하며, 주변을 풍요롭게 만듭니다.',
        lifeTheme: '나눔과 포용으로 주변을 풍요롭게 하는 삶',
        keywords: ['#포용', '#풍요', '#다정함']
    },
    '을유': {
        name: '을유',
        symbol: '💎',
        description: '보석처럼 빛나는 섬세한 풀',
        natureImage: '이슬 맺힌 아침 풀잎이 햇살에 반짝이다',
        personality: '섬세하고 예리하며, 미적 감각이 탁월합니다.',
        lifeTheme: '섬세한 아름다움으로 가치를 발하는 삶',
        keywords: ['#섬세', '#예리함', '#미적감각']
    },
    '을해': {
        name: '을해',
        symbol: '🌊',
        description: '바다 위를 떠다니는 해초',
        natureImage: '깊고 넓은 바다 속에서 유유히 흔들리는 해초',
        personality: '상상력이 풍부하고 감수성이 깊으며, 창의적입니다.',
        lifeTheme: '깊은 감성과 창의력으로 새로운 세계를 여는 삶',
        keywords: ['#상상력', '#감수성', '#창의성']
    },

    // ========== 병(丙) 일간 ==========
    '병자': {
        name: '병자',
        symbol: '🌅',
        description: '호수 위에 떠오르는 아침 해',
        natureImage: '고요한 새벽 호수 위로 붉게 떠오르는 태양',
        personality: '따뜻하고 지혜로우며, 감성과 이성의 균형을 갖추었습니다.',
        lifeTheme: '내면의 지혜와 외적인 열정을 조화시키는 삶',
        keywords: ['#균형', '#지혜', '#온기']
    },
    '병인': {
        name: '병인',
        symbol: '🌄',
        description: '숲을 밝히는 아침 햇살',
        natureImage: '울창한 숲 사이로 내리쬐는 황금빛 태양',
        personality: '자신감 있고 밝으며, 주변을 환하게 비춥니다.',
        lifeTheme: '밝은 에너지로 주변을 이끌고 비추는 리더의 삶',
        keywords: ['#자신감', '#밝음', '#리더십']
    },
    '병진': {
        name: '병진',
        symbol: '☀️',
        description: '구름 위로 솟아오른 정오의 태양',
        natureImage: '구름 위에서 세상을 내려다보는 찬란한 태양',
        personality: '야망이 크고 카리스마가 있으며, 큰 영향력을 발휘합니다.',
        lifeTheme: '높은 곳에서 세상을 밝히는 영향력 있는 삶',
        keywords: ['#카리스마', '#영향력', '#야망']
    },
    '병오': {
        name: '병오',
        symbol: '🔆',
        description: '한여름 정오의 작열하는 태양',
        natureImage: '푸른 하늘에서 강렬하게 빛나는 한여름의 태양',
        personality: '열정적이고 에너지가 넘치며, 적극적으로 행동합니다.',
        lifeTheme: '뜨거운 열정으로 모든 것을 성취하는 삶',
        keywords: ['#열정', '#에너지', '#적극성']
    },
    '병신': {
        name: '병신',
        symbol: '🌇',
        description: '쇠를 녹이는 뜨거운 태양',
        natureImage: '대장간의 화덕처럼 뜨겁게 빛나는 태양',
        personality: '추진력이 강하고 결단력 있으며, 일을 완수합니다.',
        lifeTheme: '강한 의지로 어려움을 녹여내고 목표를 이루는 삶',
        keywords: ['#결단력', '#추진력', '#완성']
    },
    '병술': {
        name: '병술',
        symbol: '🌆',
        description: '가을 하늘에 지는 붉은 노을',
        natureImage: '가을 저녁 하늘을 물들이는 장엄한 노을',
        personality: '원숙하고 깊은 사고를 하며, 삶의 지혜가 있습니다.',
        lifeTheme: '성숙한 지혜로 후반 인생을 빛내는 삶',
        keywords: ['#원숙', '#지혜', '#성숙']
    },

    // ========== 정(丁) 일간 ==========
    '정축': {
        name: '정축',
        symbol: '🕯️',
        description: '겨울밤 방안을 밝히는 촛불',
        natureImage: '추운 겨울밤, 따뜻한 방안에서 일렁이는 촛불',
        personality: '따뜻하고 다정하며, 주변을 편안하게 만듭니다.',
        lifeTheme: '작지만 따뜻한 빛으로 주변을 밝히는 삶',
        keywords: ['#따뜻함', '#편안함', '#배려']
    },
    '정묘': {
        name: '정묘',
        symbol: '🔥',
        description: '봄 숲에서 타오르는 모닥불',
        natureImage: '봄바람 부는 밤, 숲 속에서 활활 타오르는 모닥불',
        personality: '예술적이고 열정적이며, 표현력이 뛰어납니다.',
        lifeTheme: '예술과 열정으로 세상을 따뜻하게 하는 삶',
        keywords: ['#예술', '#열정', '#표현력']
    },
    '정사': {
        name: '정사',
        symbol: '⚡',
        description: '활활 타오르는 불꽃',
        natureImage: '어둠 속에서 강렬하게 타오르는 불꽃',
        personality: '총명하고 눈치가 빠르며, 순발력이 좋습니다.',
        lifeTheme: '빠른 판단력과 통찰로 기회를 잡는 삶',
        keywords: ['#통찰', '#순발력', '#총명']
    },
    '정미': {
        name: '정미',
        symbol: '🏮',
        description: '여름밤 정원의 등불',
        natureImage: '따뜻한 여름밤 정원을 밝히는 오래된 등불',
        personality: '안정적이고 신뢰할 수 있으며, 헌신적입니다.',
        lifeTheme: '꾸준한 노력과 헌신으로 성공을 이루는 삶',
        keywords: ['#안정', '#신뢰', '#헌신']
    },
    '정유': {
        name: '정유',
        symbol: '💫',
        description: '보석을 비추는 빛',
        natureImage: '금과 보석 위에 내려앉아 빛을 발하는 촛불',
        personality: '섬세하고 완벽을 추구하며, 미적 감각이 뛰어납니다.',
        lifeTheme: '섬세한 아름다움을 추구하며 가치를 높이는 삶',
        keywords: ['#섬세', '#완벽', '#미적감각']
    },
    '정해': {
        name: '정해',
        symbol: '✨',
        description: '바다 위에 비치는 달빛 같은 불',
        natureImage: '고요한 밤바다 위에 반짝이는 등대불',
        personality: '깊은 감성과 직관력이 있으며, 신비로운 매력이 있습니다.',
        lifeTheme: '깊은 직관과 감성으로 사람들을 이끄는 삶',
        keywords: ['#직관', '#감성', '#신비']
    },

    // ========== 무(戊) 일간 ==========
    '무자': {
        name: '무자',
        symbol: '🏔️',
        description: '호수를 품은 산',
        natureImage: '맑은 호수를 품에 안은 거대한 산',
        personality: '포용력이 있고 지혜로우며, 안정감을 줍니다.',
        lifeTheme: '깊은 지혜로 많은 것을 품고 이끄는 삶',
        keywords: ['#포용', '#지혜', '#안정']
    },
    '무인': {
        name: '무인',
        symbol: '🗻',
        description: '울창한 숲으로 뒤덮인 산',
        natureImage: '푸른 나무들이 가득한 생명력 넘치는 산',
        personality: '생명력이 넘치고 활동적이며, 실행력이 강합니다.',
        lifeTheme: '활발한 에너지로 새로운 것을 창조하는 삶',
        keywords: ['#생명력', '#활동성', '#창조']
    },
    '무진': {
        name: '무진',
        symbol: '⛰️',
        description: '하늘을 찌를 듯한 거대한 산',
        natureImage: '구름 위로 솟아오른 웅장한 산맥',
        personality: '스케일이 크고 야망이 있으며, 한계를 두지 않습니다.',
        lifeTheme: '큰 꿈을 품고 위대한 것을 이루는 삶',
        keywords: ['#야망', '#스케일', '#위대함']
    },
    '무오': {
        name: '무오',
        symbol: '🌋',
        description: '불을 품은 산',
        natureImage: '내부에 뜨거운 에너지를 품은 화산',
        personality: '겉은 차분하나 내면에 열정이 넘치며, 폭발적 에너지가 있습니다.',
        lifeTheme: '내면의 열정을 폭발시켜 큰 성취를 이루는 삶',
        keywords: ['#열정', '#폭발력', '#내면']
    },
    '무신': {
        name: '무신',
        symbol: '💎',
        description: '보물을 품은 산',
        natureImage: '내부에 귀한 광물을 간직한 산',
        personality: '실속 있고 현실적이며, 재물을 모으는 능력이 있습니다.',
        lifeTheme: '현실적인 감각으로 부를 쌓아가는 삶',
        keywords: ['#현실감각', '#재물', '#실속']
    },
    '무술': {
        name: '무술',
        symbol: '🏜️',
        description: '고원의 산',
        natureImage: '가을 햇살 아래 우뚝 선 고원의 산',
        personality: '원칙적이고 의리가 있으며, 단단한 신념을 가졌습니다.',
        lifeTheme: '굳건한 신념으로 흔들리지 않는 삶',
        keywords: ['#원칙', '#신념', '#의리']
    },

    // ========== 기(己) 일간 ==========
    '기축': {
        name: '기축',
        symbol: '🌾',
        description: '겨울을 지나 봄을 기다리는 땅',
        natureImage: '눈 덮인 비옥한 논밭, 봄의 풍요를 품고 있다',
        personality: '인내심이 강하고 성실하며, 준비를 철저히 합니다.',
        lifeTheme: '꾸준한 준비와 노력으로 결실을 맺는 삶',
        keywords: ['#성실', '#인내', '#준비']
    },
    '기묘': {
        name: '기묘',
        symbol: '🌻',
        description: '꽃을 키우는 정원',
        natureImage: '다양한 꽃들이 피어있는 아름다운 정원',
        personality: '섬세하고 예술적이며, 아름다움을 만들어냅니다.',
        lifeTheme: '아름다움을 가꾸고 주변을 풍요롭게 하는 삶',
        keywords: ['#예술', '#섬세', '#풍요']
    },
    '기사': {
        name: '기사',
        symbol: '🔥',
        description: '불에 달궈지는 땅',
        natureImage: '뜨거운 태양 아래 단단해지는 점토',
        personality: '열정적이고 실행력이 있으며, 현실적으로 목표를 이룹니다.',
        lifeTheme: '열정과 실행력으로 현실에서 성공하는 삶',
        keywords: ['#실행력', '#열정', '#현실성']
    },
    '기미': {
        name: '기미',
        symbol: '🏡',
        description: '비옥한 들판',
        natureImage: '따뜻한 여름 햇살 아래 풍요로운 들판',
        personality: '포용력이 있고 배려심이 깊으며, 가정적입니다.',
        lifeTheme: '따뜻한 마음으로 가족과 주변을 돌보는 삶',
        keywords: ['#포용', '#배려', '#가정']
    },
    '기유': {
        name: '기유',
        symbol: '💰',
        description: '황금을 품은 땅',
        natureImage: '가을 황금빛 들판, 수확의 기쁨을 안고 있다',
        personality: '현실 감각이 뛰어나고 재물운이 좋으며, 실속 있습니다.',
        lifeTheme: '현명한 판단으로 부를 쌓아가는 삶',
        keywords: ['#현실감각', '#재물', '#지혜']
    },
    '기해': {
        name: '기해',
        symbol: '🌊',
        description: '바다와 만나는 해안',
        natureImage: '넓은 바다를 마주한 비옥한 해안가',
        personality: '상상력이 풍부하고 유연하며, 새로운 것에 열려있습니다.',
        lifeTheme: '열린 마음으로 새로운 세계를 탐험하는 삶',
        keywords: ['#상상력', '#유연성', '#개방성']
    },

    // ========== 경(庚) 일간 ==========
    '경자': {
        name: '경자',
        symbol: '⚔️',
        description: '물에 담근 잘 벼린 칼',
        natureImage: '맑은 샘물에 담겨 날카로움을 갖춘 검',
        personality: '지혜롭고 예리하며, 냉철한 판단력이 있습니다.',
        lifeTheme: '날카로운 통찰력으로 문제를 해결하는 삶',
        keywords: ['#지혜', '#예리함', '#판단력']
    },
    '경인': {
        name: '경인',
        symbol: '🪓',
        description: '숲을 개척하는 도끼',
        natureImage: '울창한 숲 속에서 길을 내는 도끼',
        personality: '도전적이고 추진력이 있으며, 개척 정신이 강합니다.',
        lifeTheme: '새로운 길을 개척하며 앞서 나가는 삶',
        keywords: ['#도전', '#개척', '#추진력']
    },
    '경진': {
        name: '경진',
        symbol: '🛡️',
        description: '갑옷을 입은 전사',
        natureImage: '하늘을 향해 빛나는 갑옷의 용사',
        personality: '야망이 크고 강인하며, 목표를 향해 돌진합니다.',
        lifeTheme: '강한 의지와 야망으로 정복자가 되는 삶',
        keywords: ['#야망', '#강인함', '#승리']
    },
    '경오': {
        name: '경오',
        symbol: '🔨',
        description: '불에 달궈지는 쇠',
        natureImage: '용광로에서 단련되는 강철',
        personality: '열정적이고 활동적이며, 변화를 두려워하지 않습니다.',
        lifeTheme: '열정의 불꽃 속에서 더욱 강해지는 삶',
        keywords: ['#열정', '#단련', '#변화']
    },
    '경신': {
        name: '경신',
        symbol: '⚙️',
        description: '완벽하게 만들어진 정밀 기계',
        natureImage: '정교하게 맞물려 돌아가는 톱니바퀴',
        personality: '완벽을 추구하고 논리적이며, 효율을 중시합니다.',
        lifeTheme: '완벽한 시스템을 만들어 성공하는 삶',
        keywords: ['#완벽', '#논리', '#효율']
    },
    '경술': {
        name: '경술',
        symbol: '🗡️',
        description: '땅에 꽂힌 명검',
        natureImage: '석양빛에 빛나는, 땅에 꽂힌 전설의 검',
        personality: '원칙을 지키고 정의로우며, 의리가 있습니다.',
        lifeTheme: '정의와 원칙을 지키며 존경받는 삶',
        keywords: ['#정의', '#원칙', '#의리']
    },

    // ========== 신(辛) 일간 ==========
    '신축': {
        name: '신축',
        symbol: '💎',
        description: '흙 속에서 빛나는 원석',
        natureImage: '깊은 땅속에서 발견된 빛나는 보석 원석',
        personality: '인내심이 있고 내면의 가치를 키워가며, 숨겨진 재능이 있습니다.',
        lifeTheme: '시간이 지날수록 빛나는 가치를 발하는 삶',
        keywords: ['#내면', '#인내', '#숨은재능']
    },
    '신묘': {
        name: '신묘',
        symbol: '✨',
        description: '이슬에 빛나는 보석',
        natureImage: '봄 아침 이슬 맺힌 나뭇잎 위에 떨어진 보석',
        personality: '섬세하고 예술적이며, 독창적인 미적 감각이 있습니다.',
        lifeTheme: '섬세한 아름다움으로 세상을 감동시키는 삶',
        keywords: ['#예술', '#섬세', '#독창성']
    },
    '신사': {
        name: '신사',
        symbol: '🔥',
        description: '불 속에서 단련되는 금',
        natureImage: '용광로에서 순수한 금으로 정제되는 모습',
        personality: '시련 속에서 더욱 빛나며, 자기 발전을 위해 노력합니다.',
        lifeTheme: '시련을 통해 순수한 가치로 정제되는 삶',
        keywords: ['#정제', '#발전', '#순수']
    },
    '신미': {
        name: '신미',
        symbol: '🌸',
        description: '정원의 비녀',
        natureImage: '아름다운 정원에서 빛나는 고급스러운 장신구',
        personality: '우아하고 품위 있으며, 예술적 재능이 뛰어납니다.',
        lifeTheme: '우아함과 예술로 삶을 아름답게 하는 삶',
        keywords: ['#우아', '#품위', '#예술']
    },
    '신유': {
        name: '신유',
        symbol: '💍',
        description: '완벽하게 세공된 보석',
        natureImage: '정교하게 커팅된, 빛을 발하는 다이아몬드',
        personality: '완벽을 추구하고 예리하며, 높은 기준을 가집니다.',
        lifeTheme: '완벽한 아름다움을 추구하며 빛나는 삶',
        keywords: ['#완벽', '#예리함', '#빛남']
    },
    '신해': {
        name: '신해',
        symbol: '🌊',
        description: '바다에 떠있는 진주',
        natureImage: '깊은 바다 속에서 은은하게 빛나는 진주',
        personality: '깊은 내면을 가지고 감성적이며, 신비로운 매력이 있습니다.',
        lifeTheme: '깊은 내면의 아름다움을 발하는 삶',
        keywords: ['#깊이', '#감성', '#신비']
    },

    // ========== 임(壬) 일간 ==========
    '임자': {
        name: '임자',
        symbol: '🌊',
        description: '한겨울의 거대한 바다',
        natureImage: '끝없이 펼쳐진 깊고 어두운 겨울 바다',
        personality: '지혜가 깊고 포용력이 크며, 무한한 가능성을 품고 있습니다.',
        lifeTheme: '깊은 지혜로 모든 것을 품는 삶',
        keywords: ['#지혜', '#포용', '#가능성']
    },
    '임인': {
        name: '임인',
        symbol: '🌧️',
        description: '숲을 적시는 봄비',
        natureImage: '푸른 숲에 촉촉하게 내리는 생명의 비',
        personality: '베풂을 좋아하고 생명력을 주며, 창조적입니다.',
        lifeTheme: '주변에 생명과 활력을 주는 창조자의 삶',
        keywords: ['#창조', '#베풂', '#활력']
    },
    '임진': {
        name: '임진',
        symbol: '🐉',
        description: '용이 승천하는 구름 위의 물',
        natureImage: '구름 사이를 누비는 용과 함께하는 빗물',
        personality: '야망이 크고 변화무쌍하며, 큰일을 도모합니다.',
        lifeTheme: '큰 꿈을 품고 하늘 높이 비상하는 삶',
        keywords: ['#야망', '#변화', '#비상']
    },
    '임오': {
        name: '임오',
        symbol: '☁️',
        description: '태양 아래 피어오르는 증기',
        natureImage: '뜨거운 태양 아래 피어오르는 따뜻한 수증기',
        personality: '열정과 지성을 겸비하고 활동적이며, 영향력이 있습니다.',
        lifeTheme: '열정과 지혜로 세상에 영향을 미치는 삶',
        keywords: ['#열정', '#지성', '#영향력']
    },
    '임신': {
        name: '임신',
        symbol: '⛲',
        description: '바위 사이로 솟는 샘물',
        natureImage: '단단한 바위 틈에서 맑게 솟아나는 샘',
        personality: '어려움을 뚫고 나아가며, 생명력이 강합니다.',
        lifeTheme: '어떤 장애물도 뚫고 나가는 삶',
        keywords: ['#돌파', '#생명력', '#끈기']
    },
    '임술': {
        name: '임술',
        symbol: '🌧️',
        description: '가을 산에 내리는 비',
        natureImage: '가을 산을 적시는 차분한 가을비',
        personality: '깊은 사고를 하고 현명하며, 삶의 지혜가 있습니다.',
        lifeTheme: '깊은 성찰로 인생의 지혜를 얻는 삶',
        keywords: ['#성찰', '#지혜', '#현명']
    },

    // ========== 계(癸) 일간 ==========
    '계축': {
        name: '계축',
        symbol: '❄️',
        description: '겨울 땅 아래 흐르는 지하수',
        natureImage: '눈 덮인 땅 아래 조용히 흐르는 지하수',
        personality: '인내심이 강하고 내면이 깊으며, 꾸준히 목표를 향해 갑니다.',
        lifeTheme: '꾸준한 노력으로 성취를 이루는 삶',
        keywords: ['#인내', '#꾸준함', '#성취']
    },
    '계묘': {
        name: '계묘',
        symbol: '🌧️',
        description: '봄꽃에 내리는 가랑비',
        natureImage: '만개한 꽃들 위에 살포시 내리는 봄비',
        personality: '섬세하고 감성적이며, 예술적 재능이 뛰어납니다.',
        lifeTheme: '섬세한 감성으로 아름다움을 표현하는 삶',
        keywords: ['#감성', '#섬세', '#예술']
    },
    '계사': {
        name: '계사',
        symbol: '💧',
        description: '불 곁에서 피어오르는 수증기',
        natureImage: '뜨거운 불 옆에서 올라가는 신비로운 안개',
        personality: '직관력이 뛰어나고 변화에 빠르게 적응합니다.',
        lifeTheme: '변화 속에서 기회를 포착하는 삶',
        keywords: ['#직관', '#적응', '#기회']
    },
    '계미': {
        name: '계미',
        symbol: '☔',
        description: '여름 들판에 적시는 소나기',
        natureImage: '무더운 여름날 시원하게 내리는 소나기',
        personality: '갑자기 나타나 큰 영향을 주며, 결정적 순간에 빛납니다.',
        lifeTheme: '결정적 순간에 빛나는 삶',
        keywords: ['#결정적', '#영향력', '#순간']
    },
    '계유': {
        name: '계유',
        symbol: '💎',
        description: '보석을 씻는 깨끗한 물',
        natureImage: '보석을 맑게 닦아내는 순수한 물',
        personality: '순수하고 깨끗하며, 진가를 알아보는 눈이 있습니다.',
        lifeTheme: '순수함으로 진정한 가치를 발견하는 삶',
        keywords: ['#순수', '#통찰', '#진가']
    },
    '계해': {
        name: '계해',
        symbol: '🌊',
        description: '끝없이 넓은 바다',
        natureImage: '수평선이 보이지 않는 무한한 대양',
        personality: '상상력이 무한하고 포용력이 크며, 한계를 두지 않습니다.',
        lifeTheme: '무한한 가능성을 품고 세상을 포용하는 삶',
        keywords: ['#무한', '#포용', '#가능성']
    }
};

/**
 * 일주명으로 데이터 조회
 */
export function getIljuData(ilju: string): IljuData | undefined {
    return ILJU_DATA[ilju];
}

/**
 * 모든 일주 목록 반환
 */
export function getAllIljuNames(): string[] {
    return Object.keys(ILJU_DATA);
}
