
import { analyzeFullSaju, calculateFourPillars } from './src/engine/SajuCalculator';
import { UserInput } from './src/types';

const input: UserInput = {
    name: 'Test',
    gender: 'male',
    birthYear: 1990,
    birthMonth: 5,
    birthDay: 15,
    birthHour: 13,
    isLunar: false
};

try {
    console.log("Calculating Four Pillars...");
    const pillars = calculateFourPillars(input);
    console.log("Pillars calculated:", pillars);

    console.log("Analyzing Full Saju...");
    const result = analyzeFullSaju(input);

    console.log("Analysis Result Keys:", Object.keys(result));
    console.log("Advanced Five Elements:", result.advancedFiveElements ? "Present" : "Missing");
    console.log("Deep YongShin:", result.deepYongShin ? "Present" : "Missing");

    if (result.advancedFiveElements) {
        console.log("First Element Details:", JSON.stringify(result.advancedFiveElements[0], null, 2));
    }

    console.log("SUCCESS: Engine runs without error.");
} catch (error) {
    console.error("FAILURE: Engine crashed.", error);
}
