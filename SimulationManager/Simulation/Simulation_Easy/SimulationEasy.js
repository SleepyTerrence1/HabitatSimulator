
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

    console.log("Tick Updated");
}


setInterval(Update, 1000 / TPS);