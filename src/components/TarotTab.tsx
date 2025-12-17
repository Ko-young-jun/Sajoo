import { useState, useRef, useEffect } from 'react';
import { Repeat } from 'lucide-react';
import { ALL_CARDS, TarotCard } from '../data/tarotData';
import tarotBackImg from '../assets/tarot-back.png';
import TarotCardFace from './TarotCardFace';

const TOTAL_CARDS = 78;

// Layout Constants - Used for both positioning and container sizing
const CARD_SPACING = 28;
const CONTAINER_HEIGHT = 320;
const CARD_HEIGHT = 130;

const TarotTab = () => {
    const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
    const [deckState, setDeckState] = useState<'spread' | 'drawing' | 'revealed'>('spread');

    // Scroll/Fan State
    const [scrollX, setScrollX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const startScrollX = useRef(0);
    const dragDistance = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Center logic
    useEffect(() => {
        // Center the deck on screen.
        // Middle Card Index = 39.
        // Position of Index 0 should be such that Index 39 is at Center (0).
        // 0 position = (0 * SPACING) + Scroll = ?
        // 39 position = (39 * SPACING) + Scroll = 0
        // Scroll = -(39 * SPACING)
        setScrollX(-(39 * CARD_SPACING));
    }, []);

    // Drag Handlers
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setStartX(clientX);
        dragDistance.current = 0;
        startScrollX.current = scrollX;
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const deltaX = clientX - startX;

        dragDistance.current += Math.abs(deltaX);

        // Linear movement. 1px drag = 1px scroll.
        // Limit scroll bounds? Maybe let it fly free for fun, or clamp.
        // Let's damp it slightly for feel.
        const newScroll = startScrollX.current + (deltaX * 1.2);
        setScrollX(newScroll);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleCardClick = (card: TarotCard) => {
        if (deckState !== 'spread') return;
        if (dragDistance.current > 10) return;

        setDeckState('drawing');
        setTimeout(() => {
            setSelectedCard(card);
            setDeckState('revealed');
        }, 800);
    };

    const resetTarot = () => {
        setDeckState('spread');
        setTimeout(() => setSelectedCard(null), 300);
        setScrollX(-(39 * CARD_SPACING)); // Reset to center
    };

    // Inverted Arch: Center cards at BOTTOM, Edge cards curve UP
    const getCardStyle = (index: number) => {
        const rawOffset = (index * CARD_SPACING) + scrollX;

        // Visibility filter
        if (rawOffset < -500 || rawOffset > 500) return null;

        // Arch Math: Center (offset=0) is at bottom. Edge cards rise upward.
        // Y = BASE - (offset^2 factor) 
        // BASE = bottom of container minus card height minus some margin
        const baseY = CONTAINER_HEIGHT - CARD_HEIGHT - 20; // ~170px
        const liftAmount = (rawOffset * rawOffset) / 4000; // Parabolic lift
        const finalY = Math.max(0, baseY - liftAmount); // Clamp to prevent going above container

        const rotation = rawOffset * 0.08; // Slight tilt

        return {
            left: `calc(50% + ${rawOffset}px)`,
            top: `${finalY}px`,
            transform: `translate(-50%, 0) rotate(${rotation}deg)`,
            zIndex: Math.round(1000 - Math.abs(rawOffset)),
        };
    };

    return (
        <div
            className="w-full flex flex-col items-center bg-[#fdfaf6] select-none touch-none"
            style={{ overflow: 'hidden' }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleMouseUp}
        >
            {/* Header - Hide in revealed state to save space */}
            {deckState === 'spread' && (
                <div className="px-4 w-full max-w-lg text-center pointer-events-none mt-8 mb-4" style={{ zIndex: 20 }}>
                    <h3 className="text-2xl font-bold text-[#4a4540] mb-2 font-serif">오늘의 타로</h3>
                    <p className="text-sm text-[#7d7870] font-medium">
                        카드를 드래그하여 회전시키고, 가장 끌리는 카드를 선택하세요.
                    </p>
                    <div className="mt-2 text-xs text-[#c79e4f] animate-pulse">
                        &larr; 좌우로 드래그 &rarr;
                    </div>
                </div>
            )}

            {/* SPREAD AREA: STRICT CONTAINER - ALL INLINE STYLES */}
            {deckState === 'spread' && (
                <div
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    // CRITICAL: 100% Inline Styles for containment
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '900px',
                        height: `${CONTAINER_HEIGHT}px`,        // Fixed height
                        margin: '0 auto',
                        overflow: 'hidden',      // MUST clip children
                        cursor: 'grab',
                        border: '2px dashed #c79e4f',  // DEBUG: Visible boundary
                        borderRadius: '12px',
                        backgroundColor: 'rgba(253, 250, 246, 0.5)',
                    }}
                >
                    {Array.from({ length: TOTAL_CARDS }).map((_, idx) => {
                        const style = getCardStyle(idx);
                        if (!style) return null;

                        return (
                            <div
                                key={idx}
                                onClick={() => handleCardClick(ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)])}
                                style={{
                                    ...style,
                                    position: 'absolute',
                                    width: '80px',
                                    height: `${CARD_HEIGHT}px`,
                                    backgroundColor: '#1E293B',
                                    border: '1px solid #c79e4f',
                                    borderRadius: '6px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                                    backgroundImage: `url(${tarotBackImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s ease-out',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '6px',
                                        pointerEvents: 'none',
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* REVEALED CARD AREA - COMPACT DESIGN */}
            {deckState !== 'spread' && (
                <div className="w-full flex flex-col items-center px-4 pt-4 pb-4">
                    {/* Card Container with 3D perspective */}
                    <div
                        style={{
                            width: '220px',
                            height: '330px',
                            perspective: '1000px',
                            marginBottom: '16px',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.7s',
                                transform: deckState === 'revealed' ? 'rotateY(180deg)' : 'rotateY(0)',
                            }}
                        >
                            {/* BACK */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backfaceVisibility: 'hidden',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '2px solid #c79e4f',
                                    backgroundColor: '#1a1a1a',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                }}
                            >
                                <img src={tarotBackImg} alt="back" className="w-full h-full object-cover" />
                            </div>

                            {/* FRONT */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '2px solid #c79e4f',
                                    backgroundColor: '#1a1a1a',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                }}
                            >
                                {selectedCard && (
                                    <TarotCardFace card={selectedCard} className="w-full h-full" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Card Name & Meaning - Only after revealed */}
                    {deckState === 'revealed' && selectedCard && (
                        <div className="w-full max-w-sm text-center animate-fade-in">
                            <h3 className="text-lg font-bold text-[#4a4540] mb-1 font-serif">
                                {selectedCard.englishName}
                            </h3>
                            <p className="text-xs text-[#7d7870] mb-3">{selectedCard.name}</p>

                            <div className="bg-white/70 p-3 rounded-lg border border-[#c79e4f]/20 shadow-sm mb-3">
                                <p className="text-[#5a5a5a] text-sm leading-relaxed keep-all">
                                    "{selectedCard.advice}"
                                </p>
                            </div>

                            <button
                                onClick={resetTarot}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-[#2a2a2a] text-[#c79e4f] rounded-full hover:bg-[#c79e4f] hover:text-[#2a2a2a] transition-all font-bold shadow-md text-sm"
                            >
                                <Repeat size={14} />
                                <span>다시 뽑기</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TarotTab;
