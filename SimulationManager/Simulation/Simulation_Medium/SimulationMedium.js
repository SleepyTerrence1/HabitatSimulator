// Medium difficulty is based on the Easy simulation with tighter constraints.
const TPS = 20;
const MISSION_DURATION_SECONDS = 450;
const RESEARCH_GOAL = 180;
const MAX_STORED_POWER = 12000;

let SimulationTime = 0;
let CrewCapacity = 0;
let MissionState = "construction";
let WarningText = "None";
let LastWarning = "";
let MissionScore = 0;
let MissionRating = "Not Rated";

let PowerProduction = 0;
let PowerConsumption = 0;
let PowerBalance = 0;
let StoredPower = 4000;

let Money = 75000000;
let StorageCapacity = 0;
let Research = 0;

const SHabitat_Module = {
    Name: "Small Habitat Module",
    Description: "Small living quarters for up to 2 crew members",
    Cost: 6000000,
    PowerConsumption: 80,
    PowerProduction: 0,
    CrewCapacity: 2,
    Storage_Capacity: 0,
    AmountBought: 0,
    ResearchProduction: 0
};

const MHabitat_Module = {
    Name: "Medium Habitat Module",
    Description: "Medium living quarters for up to 4 crew members",
    Cost: 10000000,
    PowerConsumption: 140,
    PowerProduction: 0,
    CrewCapacity: 4,
    Storage_Capacity: 0,
    AmountBought: 0,
    ResearchProduction: 0
};

const LHabitat_Module = {
    Name: "Large Habitat Module",
    Description: "Large living quarters for up to 6 crew members",
    Cost: 15000000,
    PowerConsumption: 220,
    PowerProduction: 0,
    CrewCapacity: 6,
    Storage_Capacity: 0,
    AmountBought: 0,
    ResearchProduction: 0
};

const Solar_Array = {
    Name: "Solar Array",
    Description: "A solar array that generates power from sunlight",
    Cost: 8000000,
    PowerConsumption: 0,
    PowerProduction: 300,
    CrewCapacity: 0,
    Storage_Capacity: 0,
    AmountBought: 0,
    ResearchProduction: 0
};

const Nuclear_Power_Unit = {
    Name: "Nuclear Power Unit",
    Description: "A nuclear power unit that generates power from nuclear reactions",
    Cost: 20000000,
    PowerConsumption: 0,
    PowerProduction: 900,
    CrewCapacity: 0,
    Storage_Capacity: 0,
    AmountBought: 0,
    ResearchProduction: 0
};

const Basic_Lab_Unit = {
    Name: "Basic Lab Unit",
    Description: "A basic laboratory for conducting simple experiments",
    Cost: 12000000,
    PowerConsumption: 180,
    PowerProduction: 0,
    CrewCapacity: 0,
    Storage_Capacity: 0,
    AmountBought: 0,
    ResearchProduction: 6
};

const Basic_Storage_Unit = {
    Name: "Basic Storage Unit",
    Description: "A basic storage unit for storing resources",
    Cost: 4000000,
    PowerConsumption: 50,
    PowerProduction: 0,
    CrewCapacity: 0,
    Storage_Capacity: 500,
    AmountBought: 0,
    ResearchProduction: 0
};

const Modules = [
    SHabitat_Module,
    MHabitat_Module,
    LHabitat_Module,
    Solar_Array,
    Nuclear_Power_Unit,
    Basic_Lab_Unit,
    Basic_Storage_Unit
];

const Simulation_RUNTIME = document.getElementById("Simulation_RUNTIME");
const Module_Array = document.getElementById("Module_Array");
const MoneyDisplay = document.getElementById("MoneyDisplay");
const PowerProductionDisplay = document.getElementById("PowerProductionDisplay");
const PowerConsumptionDisplay = document.getElementById("PowerConsumptionDisplay");
const PowerDisplay = document.getElementById("PowerDisplay");
const StoredPowerDisplay = document.getElementById("StoredPowerDisplay");
const CrewDisplay = document.getElementById("CrewDisplay");
const StorageDisplay = document.getElementById("StorageDisplay");
const ResearchDisplay = document.getElementById("ResearchDisplay");
const MissionStateDisplay = document.getElementById("MissionStateDisplay");
const WarningDisplay = document.getElementById("WarningDisplay");
const MissionObjectiveDisplay = document.getElementById("MissionObjectiveDisplay");
const ScoreDisplay = document.getElementById("ScoreDisplay");
const RatingDisplay = document.getElementById("RatingDisplay");
const StartMissionButton = document.getElementById("StartMissionButton");

function calculateMissionScore() {
    const researchScore = Math.min(Research / RESEARCH_GOAL, 1) * 50;
    const powerScore = Math.max(0, 30 - Math.max(0, -PowerBalance) / 1000);
    const budgetScore = Math.min(Money / 100000000, 1) * 20;
    const objectiveBonus = Research >= RESEARCH_GOAL ? 20 : 0;
    const totalScore = Math.max(0, Math.min(100, Math.round(researchScore + powerScore + budgetScore + objectiveBonus)));

    if (totalScore >= 85) {
        MissionRating = "Excellent";
    } else if (totalScore >= 65) {
        MissionRating = "Successful";
    } else if (totalScore >= 40) {
        MissionRating = "Marginal";
    } else {
        MissionRating = "Failed";
    }

    MissionScore = totalScore;
    return totalScore;
}

function showWarning(message) {
    WarningText = message || "None";

    if (WarningText === "None") {
        WarningDisplay.textContent = "None";
        LastWarning = "";
        return;
    }

    if (WarningText !== LastWarning) {
        WarningDisplay.textContent = WarningText;
        LastWarning = WarningText;
    }
}

function redirectToSummary() {
    const params = new URLSearchParams({
        outcome: MissionState === "completed" ? "Mission Complete" : "Mission Failed",
        score: MissionScore,
        rating: MissionRating,
        research: Research.toFixed(1),
        runtime: (SimulationTime / 60).toFixed(2),
        money: Money.toLocaleString(),
        power: PowerBalance.toLocaleString(),
        difficulty: "Medium"
    });

    window.location.href = `../Simulation_Summary/Summary.html?${params.toString()}`;
}

function finishMission(success) {
    if (MissionState !== "active") {
        return;
    }

    MissionState = success ? "completed" : "failed";
    StartMissionButton.disabled = true;
    calculateMissionScore();
    showWarning(success ? "Mission successful! Research objective reached." : "Mission failed. Critical station conditions were reached.");
    DisplayUpdate();
    redirectToSummary();
}

function DisplayUpdate() {
    MoneyDisplay.textContent = `$${Money.toLocaleString()}`;
    PowerProductionDisplay.textContent = `${PowerProduction.toLocaleString()} W`;
    PowerConsumptionDisplay.textContent = `${PowerConsumption.toLocaleString()} W`;
    PowerDisplay.textContent = `${PowerBalance.toLocaleString()} W`;
    StoredPowerDisplay.textContent = `${StoredPower.toLocaleString()} W`;
    CrewDisplay.textContent = CrewCapacity.toLocaleString();
    StorageDisplay.textContent = StorageCapacity.toLocaleString();
    ResearchDisplay.textContent = `${Research.toLocaleString()} / ${RESEARCH_GOAL}`;
    MissionStateDisplay.textContent = MissionState;
    MissionObjectiveDisplay.textContent = `Reach ${RESEARCH_GOAL} research before 7:30 mission time.`;
    WarningDisplay.textContent = WarningText;
    ScoreDisplay.textContent = `${MissionScore}`;
    RatingDisplay.textContent = MissionRating;
    Simulation_RUNTIME.textContent = (SimulationTime / 60).toFixed(2);

    Module_Array.innerHTML = "";

    for (let i = 0; i < Modules.length; i++) {
        const module = Modules[i];
        const buttonText = MissionState === "construction" ? "Purchase" : "Add Module";
        const div = document.createElement("div");

        div.innerHTML = `
        <h2>${module.Name}</h2>
        <p>${module.Description}</p>
        <p>Cost: ${module.Cost}</p>
        <p>Power Consumption: ${module.PowerConsumption}</p>
        <p>Power Production: ${module.PowerProduction}</p>
        <p>Crew Capacity: ${module.CrewCapacity}</p>
        <p>Storage Capacity: ${module.Storage_Capacity}</p>
        <button onclick="buyModule(${i})">${buttonText} | Amount Bought: ${module.AmountBought}</button>
        `;

        Module_Array.appendChild(div);
    }
}

function startMission() {
    if (MissionState !== "construction") {
        return;
    }

    MissionState = "active";
    SimulationTime = 0;
    MissionScore = 0;
    MissionRating = "In Progress";
    StartMissionButton.disabled = true;
    WarningText = "Mission started. Research and power systems are active.";
    showWarning(WarningText);
    DisplayUpdate();
}

function buyModule(index) {
    if (MissionState === "completed" || MissionState === "failed") {
        return;
    }

    const module = Modules[index];

    if (Money >= module.Cost) {
        Money -= module.Cost;
        module.AmountBought++;
        StatUpdate();
        DisplayUpdate();
    }
}

function StatUpdate() {
    CrewCapacity = 0;
    PowerProduction = 0;
    PowerConsumption = 0;
    PowerBalance = 0;
    StorageCapacity = 0;

    for (const module of Modules) {
        CrewCapacity += module.CrewCapacity * module.AmountBought;
        PowerProduction += module.PowerProduction * module.AmountBought;
        PowerConsumption += module.PowerConsumption * module.AmountBought;
        StorageCapacity += module.Storage_Capacity * module.AmountBought;
    }

    PowerBalance = PowerProduction - PowerConsumption;
    PowerDisplay.textContent = `${PowerBalance.toLocaleString()} W`;
    CrewDisplay.textContent = CrewCapacity.toLocaleString();
    StorageDisplay.textContent = StorageCapacity.toLocaleString();
}

let DisplayTimer = 0;
StatUpdate();
DisplayUpdate();

function UpdateSimulation() {
    if (MissionState !== "active") {
        return;
    }

    SimulationTime += 1 / TPS;
    const powerDelta = PowerBalance / TPS;
    StoredPower += powerDelta;

    if (StoredPower > MAX_STORED_POWER) {
        StoredPower = MAX_STORED_POWER;
    }

    if (StoredPower < 0) {
        StoredPower = 0;
    }

    const labCount = Basic_Lab_Unit.AmountBought;
    if (labCount > 0 && StoredPower > 0 && PowerBalance > 0) {
        const researchGain = (labCount * Basic_Lab_Unit.ResearchProduction) / TPS;
        Research += researchGain;
    }

    if (StoredPower <= 0 && PowerBalance <= 0) {
        showWarning("Critical: Stored energy is empty and the station is in a power deficit.");
        finishMission(false);
        return;
    }

    if (StoredPower < MAX_STORED_POWER * 0.25) {
        WarningText = "Warning: Stored energy is running low.";
    } else if (PowerBalance < 0) {
        WarningText = "Warning: Power deficit detected. Station systems are consuming more than they generate.";
    } else if (labCount > 0 && PowerBalance <= 0) {
        WarningText = "Warning: Research labs are offline because the station lacks sufficient power.";
    } else {
        WarningText = "None";
    }

    showWarning(WarningText);

    DisplayTimer += 1 / TPS;
    if (DisplayTimer >= 1) {
        StatUpdate();
        DisplayUpdate();
        DisplayTimer = 0;
    }

    if (Research >= RESEARCH_GOAL) {
        finishMission(true);
        return;
    }

    if (SimulationTime >= MISSION_DURATION_SECONDS) {
        finishMission(false);
        return;
    }
}

StartMissionButton.addEventListener("click", startMission);
setInterval(UpdateSimulation, 1000 / TPS);
