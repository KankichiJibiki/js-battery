const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

//--- first display
let brandHash = {};
let count = 0;
camera.forEach(value => {
    let brandType = value["brand"];
    if(brandHash[brandType] == null) {
        count = 0;
        brandHash[brandType] = [value];
        count++;
    }
    else {
        brandHash[brandType][count] = value;
        count++;
    }
});

console.log(brandHash);

//create options for brand
const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const battery_list = document.getElementById('battery_list');

for (let key in brandHash) {
    let option = document.createElement('option');
    option.value = key;
    option.innerHTML = key;
    brandSelect.append(option);
}
brandSelect.options[0].selected = true;

for(i = 0; i < brandSelect.childElementCount; i++){
    if(brandSelect.options[i].selected == true){
        let target = brandHash[brandSelect.options[i].value];
        setModel(target);
    }
}

//--- first display

function setModel(target){
    target.forEach(model => {
        console.log(model["model"]);
        let option = document.createElement('option');
        option.value = model["model"];
        option.innerHTML = model["model"];
        modelSelect.append(option);
    });
    displayBatteryList();
}

brandSelect.addEventListener('change', function(event){
    console.log(event.target.value);
    let models = brandHash[event.target.value];

    modelSelect.innerHTML = "";
    setModel(models);
});

modelSelect.addEventListener('change', function(){
    displayBatteryList();
});

let selectedBrandIndex = brandSelect.selectedIndex;
let selectModelIndex = modelSelect.selectedIndex;
let brandOption = brandSelect.options[selectedBrandIndex].value;
let modelOption = modelSelect.options[selectModelIndex].value;

function displayBatteryList(){
    battery_list.innerHTML = "";
    let selectedBrandIndex = brandSelect.selectedIndex;
    let selectModelIndex = modelSelect.selectedIndex;
    let brandOption = brandSelect.options[selectedBrandIndex].value;
    let modelOption = modelSelect.options[selectModelIndex].value;
    let accesoor = parseInt(document.getElementById('power').value);

    console.log(brandHash[brandOption]);
    brandArr = brandHash[brandOption];
    let powerConsumptionWh = 0;
    brandArr.forEach(value => {
        let currModel = value["model"];
        if(currModel == modelOption) powerConsumptionWh
        = value["powerConsumptionWh"]
    });

    document.getElementById("power").addEventListener('keyup', function(){
        displayBatteryList();
    });


    let maxCons = accesoor + powerConsumptionWh;
    battery.forEach(value =>{
        let list_group = document.createElement("div");
        list_group.classList.add('list-group-item', 'd-flex', 'list-inline', 'justify-content-between');
        let capa = parseInt(value["capacityAh"]);
        let voltage = parseInt(value["voltage"]);
        let max = parseInt(value["maxDraw"]);
        let endV = parseInt(value["endVoltage"]);

        if(maxCons <= (max * endV) && maxCons <= (capa*voltage)){
            console.log("Found!");
            let consistantHour = Math.floor((capa*voltage)/maxCons * Math.pow(10, 1))/Math.pow(10, 1);
            let listName = document.createElement('li');
            let listHour = listName.cloneNode(true);
            listName.classList.add("list-inline-item", "fw-bold");
            listHour.classList.add("list-inline-item");
            listName.textContent = value["batteryName"];
            listHour.textContent = "Estimate " + consistantHour + " hours";

            list_group.append(listName);
            list_group.append(listHour);
            battery_list.append(list_group);
        }
    });
}