import React from 'react';
import { Star, HelpCircle, Info } from 'lucide-react';
import type { SpecialStar } from '../types';

interface SpecialStarsProps {
    stars: SpecialStar[];
    isPremium: boolean;
}

const SpecialStars: React.FC<SpecialStarsProps> = ({ stars, isPremium }) => {
    if (!isPremium) {
        return (
            <div className="bg-gray-100 p-8 rounded-2xl text-center opacity-70 mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Star className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-2">⭐ 사주의 특별한 기운(신살)</h3>
                <p>내 사주의 숨겨진 잠재력(도화살, 역마살 등)은 프리미엄 리포트에서 공개됩니다.</p>
            </div>
        );
    }

    if (stars.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 text-center">
                <h3 className="text-lg font-bold mb-3 text-gray-700">특별한 신살이 발견되지 않았습니다</h3>
                <p className="text-gray-500 leading-relaxed">
                    이는 '무난하고 평온한 삶'을 의미합니다. <br />
                    강력한 파동(살)이 없다는 것은 그만큼 안정적인 인생을 살 수 있다는 축복이기도 합니다.
                </p>
            </div>
        );
    }

    return (
        <div className="card mt-8 fade-in">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="card-title mb-0 text-xl">내 사주의 특별한 기운</h3>
                    <p className="text-gray-500 text-sm mt-1">남들과 다른 나만의 잠재력과 에너지</p>
                </div>
            </div>

            <div className="grid gap-6">
                {stars.map((star, idx) => (
                    <div
                        key={idx}
                        className={`
                            relative overflow-hidden rounded-2xl border transition-all duration-300
                            ${star.type === 'gil'
                                ? 'bg-white border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200'
                                : 'bg-white border-red-100 shadow-sm hover:shadow-md hover:border-red-200'}
                        `}
                    >
                        {/* Decorator Line */}
                        <div className={`h-1.5 w-full ${star.type === 'gil' ? 'bg-gradient-to-r from-purple-400 to-indigo-400' : 'bg-gradient-to-r from-orange-400 to-red-400'}`} />

                        <div className="p-6">
                            {/* Header Section */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <h4 className="font-bold text-gray-900 text-lg md:text-xl tracking-tight">
                                        {star.name}
                                    </h4>
                                    <span className={`
                                        px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase
                                        ${star.type === 'gil' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'}
                                    `}>
                                        {star.type === 'gil' ? '길신 (Lucky)' : '흉신 (Caution)'}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                                    {star.description}
                                </div>
                            </div>

                            {/* Main Meaning */}
                            <div className="mb-6">
                                <p className="text-gray-700 text-base leading-relaxed font-medium">
                                    " {star.meaning || star.effect} "
                                </p>
                            </div>

                            {/* Technical Details (Separated) */}
                            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div className="detail-item">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Info className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs font-bold text-gray-500 uppercase">어떤 작용을 하나요?</span>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-6 leading-relaxed">
                                        {star.effect}
                                    </p>
                                </div>

                                {star.source && (
                                    <div className="detail-item">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <HelpCircle className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs font-bold text-gray-500 uppercase">왜 이 기운이 있나요?</span>
                                        </div>
                                        <p className="text-sm text-gray-600 pl-6 leading-relaxed">
                                            {star.source}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialStars;
