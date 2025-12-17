// ================================================
// 궁합 입력 폼 컴포넌트
// 레퍼런스 기반 리팩토링 (수직 배치)
// ================================================

import { useState } from 'react';

import type { UserInput } from '../types';

interface CompatibilityFormProps {
    onSubmit: (person1: UserInput, person2: UserInput) => void;
}

interface PersonFormData {
    name: string;
    gender: 'male' | 'female';
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour?: number;
    knowTime: boolean;
    isLunar: boolean;
}

const initialPerson = (): PersonFormData => ({
    name: '',
    gender: 'male',
    birthYear: 1990,
    birthMonth: 1,
    birthDay: 1,
    knowTime: false,
    isLunar: false
});

export function CompatibilityForm({ onSubmit }: CompatibilityFormProps) {
    const [person1, setPerson1] = useState<PersonFormData>(initialPerson());
    const [person2, setPerson2] = useState<PersonFormData>({ ...initialPerson(), gender: 'female' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const input1: UserInput = {
            name: person1.name,
            gender: person1.gender,
            birthYear: person1.birthYear,
            birthMonth: person1.birthMonth,
            birthDay: person1.birthDay,
            birthHour: person1.knowTime ? person1.birthHour : undefined,
            isLunar: person1.isLunar
        };

        const input2: UserInput = {
            name: person2.name,
            gender: person2.gender,
            birthYear: person2.birthYear,
            birthMonth: person2.birthMonth,
            birthDay: person2.birthDay,
            birthHour: person2.knowTime ? person2.birthHour : undefined,
            isLunar: person2.isLunar
        };

        onSubmit(input1, input2);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };

    const renderPersonForm = (
        person: PersonFormData,
        setPerson: React.Dispatch<React.SetStateAction<PersonFormData>>,
        title: string
    ) => {
        const days = Array.from(
            { length: getDaysInMonth(person.birthYear, person.birthMonth) },
            (_, i) => i + 1
        );
        const hours = Array.from({ length: 24 }, (_, i) => i);

        return (
            <div className="person-section">
                <h4 className="section-title">{title}</h4>

                <div className="form-group">
                    <label className="form-label">이름</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="이름을 입력하세요"
                        value={person.name}
                        onChange={(e) => setPerson({ ...person, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">성별</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                className="radio-input"
                                checked={person.gender === 'male'}
                                onChange={() => setPerson({ ...person, gender: 'male' })}
                            />
                            남성
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                className="radio-input"
                                checked={person.gender === 'female'}
                                onChange={() => setPerson({ ...person, gender: 'female' })}
                            />
                            여성
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">생년월일</label>
                    <div className="date-inputs-compact">
                        <select
                            className="form-select"
                            value={person.birthYear}
                            onChange={(e) => setPerson({ ...person, birthYear: Number(e.target.value) })}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}년</option>
                            ))}
                        </select>
                        <select
                            className="form-select"
                            value={person.birthMonth}
                            onChange={(e) => setPerson({ ...person, birthMonth: Number(e.target.value) })}
                        >
                            {months.map(month => (
                                <option key={month} value={month}>{month}월</option>
                            ))}
                        </select>
                        <select
                            className="form-select"
                            value={person.birthDay}
                            onChange={(e) => setPerson({ ...person, birthDay: Number(e.target.value) })}
                        >
                            {days.map(day => (
                                <option key={day} value={day}>{day}일</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">태어난 시간</label>
                    <div className="time-select-group">
                        <select
                            className="form-select time-check-select"
                            value={person.knowTime ? 'known' : 'unknown'}
                            onChange={(e) => setPerson({ ...person, knowTime: e.target.value === 'known' })}
                        >
                            <option value="unknown">모름</option>
                            <option value="known">알고 있음</option>
                        </select>

                        {person.knowTime && (
                            <select
                                className="form-select flex-grow"
                                value={person.birthHour ?? 12}
                                onChange={(e) => setPerson({ ...person, birthHour: Number(e.target.value) })}
                            >
                                {hours.map(hour => (
                                    <option key={hour} value={hour}>
                                        {hour < 12 ? '오전' : '오후'} {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}시
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                <div className="form-group mb-0">
                    <label className="form-label">양력/음력</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                className="radio-input"
                                checked={!person.isLunar}
                                onChange={() => setPerson({ ...person, isLunar: false })}
                            />
                            양력
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                className="radio-input"
                                checked={person.isLunar}
                                onChange={() => setPerson({ ...person, isLunar: true })}
                            />
                            음력
                        </label>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="compatibility-form">
            {renderPersonForm(person1, setPerson1, '나의 정보')}

            <div className="divider-icon">
                <span>&</span>
            </div>

            {renderPersonForm(person2, setPerson2, '상대방 정보')}

            <button type="submit" className="btn btn-primary btn-lg full-width mt-lg">
                궁합 확인하기
            </button>
        </form>
    );
}

// 스타일
const compatStyles = `
.compatibility-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.person-section {
  padding-bottom: 2rem;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: #bf8f7b; /* 레퍼런스의 갈색 톤 */
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.divider-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 2rem;
  position: relative;
}

.divider-icon::before,
.divider-icon::after {
  content: '';
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  flex: 1;
}

.divider-icon span {
  background: #1a1a2e;
  padding: 0 1rem;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: #bf8f7b;
}

.time-select-group {
  display: flex;
  gap: 0.5rem;
}

.time-check-select {
  width: 120px;
}

.flex-grow {
  flex: 1;
}

.full-width {
  width: 100%;
}

.mt-lg {
  margin-top: 2rem;
}

.mb-0 {
  margin-bottom: 0;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = compatStyles;
    document.head.appendChild(styleSheet);
}
