// ================================================
// 입력 폼 컴포넌트
// ================================================

import { useState } from 'react';
import { Calendar, Clock, User, Sparkles } from 'lucide-react';
import type { UserInput } from '../types';

interface InputFormProps {
    onSubmit: (input: UserInput) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [birthYear, setBirthYear] = useState(1990);
    const [birthMonth, setBirthMonth] = useState(1);
    const [birthDay, setBirthDay] = useState(1);
    const [birthHour, setBirthHour] = useState<number | undefined>(undefined);
    const [knowTime, setKnowTime] = useState(true);
    const [isLunar, setIsLunar] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            gender,
            birthYear,
            birthMonth,
            birthDay,
            birthHour: knowTime ? birthHour : undefined,
            isLunar
        });
    };

    // 연도 옵션 생성 (1920 ~ 현재)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);

    // 월 옵션
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // 일 옵션 (해당 월의 일수에 맞게)
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };
    const days = Array.from(
        { length: getDaysInMonth(birthYear, birthMonth) },
        (_, i) => i + 1
    );

    // 시간 옵션 (0~23시)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const getHourLabel = (hour: number) => {
        const period = hour < 12 ? '오전' : '오후';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${period} ${displayHour}시`;
    };

    return (
        <form onSubmit={handleSubmit} className="card fade-in">
            <div className="card-header text-center">
                <h2 className="card-title">
                    <Sparkles className="inline-icon" size={24} />
                    당신의 정보를 알려주세요
                </h2>
                <p className="card-subtitle">정확한 분석을 위해 생년월일시를 입력해주세요</p>
            </div>

            {/* 이름 */}
            <div className="form-group">
                <label className="form-label">
                    <User size={16} className="inline-icon" /> 이름
                </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* 성별 */}
            <div className="form-group">
                <label className="form-label">성별</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio-input"
                            name="gender"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        남성
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio-input"
                            name="gender"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        여성
                    </label>
                </div>
            </div>

            {/* 생년월일 */}
            <div className="form-group">
                <label className="form-label">
                    <Calendar size={16} className="inline-icon" /> 생년월일
                </label>
                <div className="date-inputs">
                    <select
                        className="form-select"
                        value={birthYear}
                        onChange={(e) => setBirthYear(Number(e.target.value))}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}년</option>
                        ))}
                    </select>
                    <select
                        className="form-select"
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(Number(e.target.value))}
                    >
                        {months.map(month => (
                            <option key={month} value={month}>{month}월</option>
                        ))}
                    </select>
                    <select
                        className="form-select"
                        value={birthDay}
                        onChange={(e) => setBirthDay(Number(e.target.value))}
                    >
                        {days.map(day => (
                            <option key={day} value={day}>{day}일</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 양력/음력 */}
            <div className="form-group">
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio-input"
                            name="calendar"
                            checked={!isLunar}
                            onChange={() => setIsLunar(false)}
                        />
                        양력
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio-input"
                            name="calendar"
                            checked={isLunar}
                            onChange={() => setIsLunar(true)}
                        />
                        음력
                    </label>
                </div>
            </div>

            {/* 태어난 시간 */}
            <div className="form-group">
                <label className="form-label">
                    <Clock size={16} className="inline-icon" /> 태어난 시간
                </label>
                <div className="radio-group mb-md">
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio-input"
                            name="knowTime"
                            checked={knowTime}
                            onChange={() => setKnowTime(true)}
                        />
                        알고 있음
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio-input"
                            name="knowTime"
                            checked={!knowTime}
                            onChange={() => setKnowTime(false)}
                        />
                        모름
                    </label>
                </div>
                {knowTime && (
                    <select
                        className="form-select"
                        value={birthHour ?? 12}
                        onChange={(e) => setBirthHour(Number(e.target.value))}
                    >
                        {hours.map(hour => (
                            <option key={hour} value={hour}>{getHourLabel(hour)}</option>
                        ))}
                    </select>
                )}
                {!knowTime && (
                    <p className="text-muted text-sm">
                        시간을 모르는 경우 시주를 제외한 삼주로 분석됩니다.
                    </p>
                )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                <Sparkles size={20} />
                사주 분석하기
            </button>
        </form>
    );
}

// 인라인 아이콘 스타일
const inlineIconStyle = `
.inline-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
}

.date-inputs {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
}

.text-muted {
  color: var(--text-muted);
}

.text-sm {
  font-size: 0.875rem;
}
`;

// 스타일 주입
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = inlineIconStyle;
    document.head.appendChild(styleSheet);
}
