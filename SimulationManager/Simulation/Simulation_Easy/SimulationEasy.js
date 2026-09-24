
//Function varuiables idk
const TPS = 20;
let SimulationTime = 0
let CrewCapacity = 0; //Crew capacity in people

//Power Vars
let Power = 0; //Power covered in watts
let StoredPower = 0; //Power stored in watts

let Money = 100000000; //In Dolla dollars
let StorageCapacity = 0; //Storage capacity in kilograms
//Add storage capacity later

//Modules
    
//Habitat Modules
const SHabitat_Module = {
    Name: "Small Habitat Module",
    Description: "Small living quarters for up to 2 crew members",
    Cost: 6000000,
    PowerConsumption: 80,
    PowerProduction: 0,
    CrewCapacity: 2,
    Storage_Capacity: 0,
    AmountBought: 0
};
const MHabitat_Module = {
    Name: "Medium Habitat Module",
    Description: "Medium living quarters for up to 4 crew members",
    Cost: 10000000,
    PowerConsumption: 140,
    PowerProduction: 0,
    CrewCapacity: 4,
    Storage_Capacity: 0,
    AmountBought: 0
};
const LHabitat_Module = {
    Name: "Large Habitat Module",
    Description: "Large living quarters for up to 6 crew members",
    Cost: 15000000,
    PowerConsumption: 220,
    PowerProduction: 0,
    CrewCapacity: 6,
    Storage_Capacity: 0,
    AmountBought: 0
};
    
//Power Modules
const Solar_Array = {
    Name: "Solar Array",
    Description: "A solar array that generates power from sunlight",
    Cost: 8000000,
    PowerConsumption: 0,
    PowerProduction: 300,
    CrewCapacity: 0,
    Storage_Capacity: 0,
    AmountBought: 0
};
const Nuclear_Power_Unit = {
    Name: "Nuclear Power Unit",
    Description: "A nuclear power unit that generates power from nuclear reactions",
    Cost: 20000000,
    PowerConsumption: 0,
    PowerProduction: 900,
    CrewCapacity: 0,
    Storage_Capacity: 0,
    AmountBought: 0
};
    
//Research Modules
const Basic_Lab_Unit = {
    Name: "Basic Lab Unit",
    Description: "A basic laboratory for conducting simple experiments",
    Cost: 12000000,
    PowerConsumption: 180,
    PowerProduction: 0,
    CrewCapacity: 0,
    Storage_Capacity: 0,
    AmountBought: 0
};

//Resource Modules
const Basic_Storage_Unit = {
    Name: "Basic Storage Unit",
    Description: "A basic storage unit for storing resources",
    Cost: 4000000,
    PowerConsumption: 50,
    PowerProduction: 0,
    CrewCapacity: 0,
    Storage_Capacity: 500, //In Kilograms
    AmountBought: 0
};

//Module Array
const Modules = [
    SHabitat_Module,
    MHabitat_Module,
    LHabitat_Module,
    Solar_Array,
    Nuclear_Power_Unit,
    Basic_Lab_Unit,
    Basic_Storage_Unit
];

//Display thing variables and stuff
const Simulation_RUNTIME = document.getElementById("Simulation_RUNTIME");
const Module_Array = document.getElementById("Module_Array");
const MoneyDisplay = document.getElementById("MoneyDisplay");
const PowerDisplay = document.getElementById("PowerDisplay");
const CrewDisplay = document.getElementById("CrewDisplay");
const StorageDisplay = document.getElementById("StorageDisplay");
//Display Function
function DisplayUpdate() {
    
    MoneyDisplay.textContent = `$${Money.toLocaleString()}`;
    Module_Array.innerHTML = "";

    for (let i = 0; i < Modules.length; i++) {

        const module = Modules[i];

        const div = document.createElement("div");

        div.innerHTML = 
        `
        <h2>${module.Name}</h2>
        <p>${module.Description}</p>
        <p>Cost: ${module.Cost}</p>
        <p>Power Consumption: ${module.PowerConsumption}</p>
        <p>Power Production: ${module.PowerProduction}</p>
        <p>Crew Capacity: ${module.CrewCapacity}</p>
        <p>Storage Capacity: ${module.Storage_Capacity}</p>

        <button onclick="buyModule(${i})">
            Purchase | Amount Bought: ${module.AmountBought}
        </button>
        `;
    Module_Array.appendChild(div);
    }
}
DisplayUpdate();
//Buy Module function
function buyModule(index) {

    const module = Modules[index];

    if (Money >= module.Cost) {
        Money -= module.Cost;
        module.AmountBought++;

        StatUpdate();
        DisplayUpdate();
        console.log("Purchased:", module.Name);
    }
    else {
        console.log("Not enough money!");
    }
}

//Update Stats Function
function StatUpdate() {
    CrewCapacity = 0;
    Power = 0;
    StorageCapacity = 0;

    for (const module of Modules) {
        CrewCapacity += module.CrewCapacity * module.AmountBought;

        Power +=
            (module.PowerProduction - module.PowerConsumption)
            * module.AmountBought;

        StorageCapacity +=
            module.Storage_Capacity * module.AmountBought;
    }

    PowerDisplay.textContent = StoredPower.toLocaleString();
    CrewDisplay.textContent = CrewCapacity.toLocaleString();
    StorageDisplay.textContent = StorageCapacity.toLocaleString();
}

StatUpdate();
//Simulation Update function
function UpdateSimulation() {
    SimulationTime += 1 / TPS;

    //Calculate Power USage
    StoredPower += Power / TPS;
    //Update resources

    //Check Warnings

    //Update Display
    Simulation_RUNTIME.textContent = (SimulationTime / 60).toFixed(2);
    StatUpdate()
}


setInterval(UpdateSimulation, 1000 / TPS);