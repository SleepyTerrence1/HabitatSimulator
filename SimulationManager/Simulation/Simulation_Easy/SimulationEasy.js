
const TPS = 20;

function Update() {
    let Power = 0 //Power covered in watts
    let Money = 10000000 //In Dolla dollars
    //Modules
    
    const SHabitat_Module = {
        Name: "Small Habitat Module",
        Cost: 6000000,
        PowerConsumption: 80,
        CrewCapacity: 2
    };
    const MHabitat_Module = {
        Name: "Medium Habitat Module",
        Cost: 10000000,
        PowerConsumption: 140,
        CrewCapacity: 4
    };
    const LHabitat_Module = {
        Name: "Large Habitat Module",
        Cost: 15000000,
        PowerConsumption: 220,
        CrewCapacity: 6
    };




    console.log("Tick Updated");
}


setInterval(Update, 1000 / TPS);