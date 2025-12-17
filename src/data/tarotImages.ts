// Tarot Card Image Loader
// Maps card IDs to their generated images - ALL 78 CARDS

// ===== MAJOR ARCANA (22 Cards) =====
import fool from '../assets/tarot/0_fool.png';
import magician from '../assets/tarot/1_magician.png';
import highPriestess from '../assets/tarot/2_high_priestess.png';
import empress from '../assets/tarot/3_empress.png';
import emperor from '../assets/tarot/4_emperor.png';
import hierophant from '../assets/tarot/5_hierophant.png';
import lovers from '../assets/tarot/6_lovers.png';
import chariot from '../assets/tarot/7_chariot.png';
import strength from '../assets/tarot/8_strength.png';
import hermit from '../assets/tarot/9_hermit.png';
import wheel from '../assets/tarot/10_wheel.png';
import justice from '../assets/tarot/11_justice.png';
import hangedMan from '../assets/tarot/12_hanged_man.png';
import death from '../assets/tarot/13_death.png';
import temperance from '../assets/tarot/14_temperance.png';
import devil from '../assets/tarot/15_devil.png';
import tower from '../assets/tarot/16_tower.png';
import star from '../assets/tarot/17_star.png';
import moon from '../assets/tarot/18_moon.png';
import sun from '../assets/tarot/19_sun.png';
import judgement from '../assets/tarot/20_judgement.png';
import world from '../assets/tarot/21_world.png';

// ===== MINOR ARCANA - WANDS (14 Cards) =====
import wands_ace from '../assets/tarot/minor/wands_ace.png';
import wands_two from '../assets/tarot/minor/wands_two.png';
import wands_three from '../assets/tarot/minor/wands_three.png';
import wands_four from '../assets/tarot/minor/wands_four.png';
import wands_five from '../assets/tarot/minor/wands_five.png';
import wands_six from '../assets/tarot/minor/wands_six.png';
import wands_seven from '../assets/tarot/minor/wands_seven.png';
import wands_eight from '../assets/tarot/minor/wands_eight.png';
import wands_nine from '../assets/tarot/minor/wands_nine.png';
import wands_ten from '../assets/tarot/minor/wands_ten.png';
import wands_page from '../assets/tarot/minor/wands_page.png';
import wands_knight from '../assets/tarot/minor/wands_knight.png';
import wands_queen from '../assets/tarot/minor/wands_queen.png';
import wands_king from '../assets/tarot/minor/wands_king.png';

// ===== MINOR ARCANA - CUPS (14 Cards) =====
import cups_ace from '../assets/tarot/minor/cups_ace.png';
import cups_two from '../assets/tarot/minor/cups_two.png';
import cups_three from '../assets/tarot/minor/cups_three.png';
import cups_four from '../assets/tarot/minor/cups_four.png';
import cups_five from '../assets/tarot/minor/cups_five.png';
import cups_six from '../assets/tarot/minor/cups_six.png';
import cups_seven from '../assets/tarot/minor/cups_seven.png';
import cups_eight from '../assets/tarot/minor/cups_eight.png';
import cups_nine from '../assets/tarot/minor/cups_nine.png';
import cups_ten from '../assets/tarot/minor/cups_ten.png';
import cups_page from '../assets/tarot/minor/cups_page.png';
import cups_knight from '../assets/tarot/minor/cups_knight.png';
import cups_queen from '../assets/tarot/minor/cups_queen.png';
import cups_king from '../assets/tarot/minor/cups_king.png';

// ===== MINOR ARCANA - SWORDS (14 Cards) =====
import swords_ace from '../assets/tarot/minor/swords_ace.png';
import swords_two from '../assets/tarot/minor/swords_two.png';
import swords_three from '../assets/tarot/minor/swords_three.png';
import swords_four from '../assets/tarot/minor/swords_four.png';
import swords_five from '../assets/tarot/minor/swords_five.png';
import swords_six from '../assets/tarot/minor/swords_six.png';
import swords_seven from '../assets/tarot/minor/swords_seven.png';
import swords_eight from '../assets/tarot/minor/swords_eight.png';
import swords_nine from '../assets/tarot/minor/swords_nine.png';
import swords_ten from '../assets/tarot/minor/swords_ten.png';
import swords_page from '../assets/tarot/minor/swords_page.png';
import swords_knight from '../assets/tarot/minor/swords_knight.png';
import swords_queen from '../assets/tarot/minor/swords_queen.png';
import swords_king from '../assets/tarot/minor/swords_king.png';

// ===== MINOR ARCANA - PENTACLES (14 Cards) =====
import pentacles_ace from '../assets/tarot/minor/pentacles_ace.png';
import pentacles_two from '../assets/tarot/minor/pentacles_two.png';
import pentacles_three from '../assets/tarot/minor/pentacles_three.png';
import pentacles_four from '../assets/tarot/minor/pentacles_four.png';
import pentacles_five from '../assets/tarot/minor/pentacles_five.png';
import pentacles_six from '../assets/tarot/minor/pentacles_six.png';
import pentacles_seven from '../assets/tarot/minor/pentacles_seven.png';
import pentacles_eight from '../assets/tarot/minor/pentacles_eight.png';
import pentacles_nine from '../assets/tarot/minor/pentacles_nine.png';
import pentacles_ten from '../assets/tarot/minor/pentacles_ten.png';
import pentacles_page from '../assets/tarot/minor/pentacles_page.png';
import pentacles_knight from '../assets/tarot/minor/pentacles_knight.png';
import pentacles_queen from '../assets/tarot/minor/pentacles_queen.png';
import pentacles_king from '../assets/tarot/minor/pentacles_king.png';

// Fallback Placeholder
import placeholder from '../assets/tarot-front-placeholder.png';

// Major Arcana Image Map (22 Cards: 0-21)
const MAJOR_ARCANA_IMAGES: Record<number, string> = {
    0: fool, 1: magician, 2: highPriestess, 3: empress, 4: emperor,
    5: hierophant, 6: lovers, 7: chariot, 8: strength, 9: hermit,
    10: wheel, 11: justice, 12: hangedMan, 13: death, 14: temperance,
    15: devil, 16: tower, 17: star, 18: moon, 19: sun,
    20: judgement, 21: world,
};

// Minor Arcana Image Maps (56 Cards total)
const WANDS_IMAGES: Record<string, string> = {
    'Ace': wands_ace, 'Two': wands_two, 'Three': wands_three, 'Four': wands_four,
    'Five': wands_five, 'Six': wands_six, 'Seven': wands_seven, 'Eight': wands_eight,
    'Nine': wands_nine, 'Ten': wands_ten, 'Page': wands_page, 'Knight': wands_knight,
    'Queen': wands_queen, 'King': wands_king,
};

const CUPS_IMAGES: Record<string, string> = {
    'Ace': cups_ace, 'Two': cups_two, 'Three': cups_three, 'Four': cups_four,
    'Five': cups_five, 'Six': cups_six, 'Seven': cups_seven, 'Eight': cups_eight,
    'Nine': cups_nine, 'Ten': cups_ten, 'Page': cups_page, 'Knight': cups_knight,
    'Queen': cups_queen, 'King': cups_king,
};

const SWORDS_IMAGES: Record<string, string> = {
    'Ace': swords_ace, 'Two': swords_two, 'Three': swords_three, 'Four': swords_four,
    'Five': swords_five, 'Six': swords_six, 'Seven': swords_seven, 'Eight': swords_eight,
    'Nine': swords_nine, 'Ten': swords_ten, 'Page': swords_page, 'Knight': swords_knight,
    'Queen': swords_queen, 'King': swords_king,
};

const PENTACLES_IMAGES: Record<string, string> = {
    'Ace': pentacles_ace, 'Two': pentacles_two, 'Three': pentacles_three, 'Four': pentacles_four,
    'Five': pentacles_five, 'Six': pentacles_six, 'Seven': pentacles_seven, 'Eight': pentacles_eight,
    'Nine': pentacles_nine, 'Ten': pentacles_ten, 'Page': pentacles_page, 'Knight': pentacles_knight,
    'Queen': pentacles_queen, 'King': pentacles_king,
};

/**
 * Get the image source for a Tarot card.
 * @param cardId - The unique ID of the card
 * @param cardType - 'major', 'wands', 'cups', 'swords', 'pentacles'
 * @param cardNumber - For Minor Arcana: 'Ace', 'Two', ..., 'King'
 */
export const getTarotCardImage = (cardId: number, cardType: string, cardNumber?: string): string => {
    // Major Arcana
    if (cardType === 'major' && MAJOR_ARCANA_IMAGES[cardId]) {
        return MAJOR_ARCANA_IMAGES[cardId];
    }

    // Minor Arcana - by number/court name
    if (cardNumber) {
        switch (cardType) {
            case 'wands': return WANDS_IMAGES[cardNumber] || placeholder;
            case 'cups': return CUPS_IMAGES[cardNumber] || placeholder;
            case 'swords': return SWORDS_IMAGES[cardNumber] || placeholder;
            case 'pentacles': return PENTACLES_IMAGES[cardNumber] || placeholder;
        }
    }

    return placeholder;
};

export default getTarotCardImage;
