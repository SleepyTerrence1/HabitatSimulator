const params = new URLSearchParams(window.location.search);

const outcome = params.get("outcome") || "Mission Failed";
const score = params.get("score") || "0";
const rating = params.get("rating") || "Not Rated";
const research = params.get("research") || "0";
const runtime = params.get("runtime") || "0";
const money = params.get("money") || "$0";
const power = params.get("power") || "0";
const difficulty = params.get("difficulty") || "Easy";

document.getElementById("OutcomeText").textContent = outcome;
document.getElementById("ScoreText").textContent = score;
document.getElementById("RatingText").textContent = rating;
document.getElementById("ResearchText").textContent = `${research} Research`;
document.getElementById("TimeText").textContent = `${runtime} Minutes`;
document.getElementById("MoneyText").textContent = `$${money}`;
document.getElementById("PowerText").textContent = `${power} W`;
document.getElementById("DifficultyText").textContent = difficulty;

document.getElementById("PlayAgainButton").addEventListener("click", () => {
    window.location.href = "../../DifficultyPage/Difficulty.html";
});

document.getElementById("DifficultyButton").addEventListener("click", () => {
    window.location.href = "../../DifficultyPage/Difficulty.html";
});
