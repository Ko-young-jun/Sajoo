import React from 'react';
import { TarotCard } from '../data/tarotData';
import { getTarotCardImage } from '../data/tarotImages';

interface TarotCardFaceProps {
    card: TarotCard;
    className?: string;
    style?: React.CSSProperties;
}

const TarotCardFace: React.FC<TarotCardFaceProps> = ({ card, className, style }) => {
    const isMajor = card.type === 'major';
    // Extract card number name for Minor Arcana (e.g., 'Queen' from 'Queen of Cups')
    const cardNumberName = !isMajor ? card.englishName.split(' of ')[0] : undefined;
    const cardImage = getTarotCardImage(card.id, card.type, cardNumberName);

    return (
        <div
            className={`relative overflow-hidden flex items-center justify-center ${className}`}
            style={{
                ...style,
                backgroundColor: '#0d0d0d', // Dark background for letterboxing
            }}
        >
            {/* Card Image - Full display without cropping */}
            <img
                src={cardImage}
                alt={card.englishName}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                }}
            />
        </div>
    );
};

export default TarotCardFace;
