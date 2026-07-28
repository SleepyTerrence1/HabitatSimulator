
//Function varuiables idk
const TPS = 20;
let Power = 0 //Power covered in watts
let Money = 10000000 //In Dolla dollars
//Modules
    
//Habitat Modules
const SHabitat_Module = {
    Name: "Small Habitat Module",
    Description: "Small living quarters for up to 2 crew members",
    Cost: 6000000,
    PowerConsumption: 80,
    PowerProduction: 0,
    CrewCapacity: 2,
    Storage_Capacity: 0
};
const MHabitat_Module = {
    Name: "Medium Habitat Module",
    Description: "Medium living quarters for up to 4 crew members",
    Cost: 10000000,
    PowerConsumption: 140,
    PowerProduction: 0,
    CrewCapacity: 4,
    Storage_Capacity: 0
};
const LHabitat_Module = {
    Name: "Large Habitat Module",
    Description: "Large living quarters for up to 6 crew members",
    Cost: 15000000,
    PowerConsumption: 220,
    PowerProduction: 0,
    CrewCapacity: 6,
    Storage_Capacity: 0
};
    
//Power Modules
const Solar_Array = {
    Name: "Solar Array",
    Description: "A solar array that generates power from sunlight",
    Cost: 8000000,
    PowerConsumption: 0,
    PowerProduction: 300,
    CrewCapacity: 0,
    Storage_Capacity: 0
};
const Nuclear_Power_Unit = {
    Name: "Nuclear Power Unit",
    Description: "A nuclear power unit that generates power from nuclear reactions",
    Cost: 20000000,
    PowerConsumption: 0,
    PowerProduction: 900,
    CrewCapacity: 0,
    Storage_Capacity: 0
};
    
//Research Modules
const Basic_Lab_Unit = {
    Name: "Basic Lab Unit",
    Description: "A basic laboratory for conducting simple experiments",
    Cost: 12000000,
    PowerConsumption: 180,
    PowerProduction: 0,
    CrewCapacity: 0,
    Storage_Capacity: 0
};

//Resource Modules
const Basic_Storage_Unit = {
    Name: "Basic Storage Unit",
    Description: "A basic storage unit for storing resources",
    Cost: 4000000,
    PowerConsumption: 50,
    PowerProduction: 0,
    CrewCapacity: 0,
    Storage_Capacity: 500 //In Kilograms
};

//Module Array
const Modules = {
    SHabitat_Module,
    MHabitat_Module,
    LHabitat_Module,
    Solar_Array,
    Nuclear_Power_Unit,
    Basic_Lab_Unit,
    Basic_Storage_Unit
};

function Update() {


    console.log("Tick Updated");
}


setInterval(Update, 1000 / TPS);