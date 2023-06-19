function getAllVehicles() {
    const vehicleList = document.getElementById('vehicleList');
    const vehicleMake = document.getElementById('make');
    const vehicleType = document.getElementById('vehicleType');
    const vehicleName = document.getElementById('name');
    const vehiclePrice = document.getElementById('price');
    const vehicleYear = document.getElementById('year');
    const vehicleMileage = document.getElementById('mileage');
    const vehicleBodyType = document.getElementById('bodyType');
    const vehicleCondition = document.getElementById('condition');
    const vehicleColor = document.getElementById('color');
    const vehicleWheelDrive = document.getElementById('wheelDrive');
    const vehiclePower = document.getElementById('power');
    const vehicleFuel = document.getElementById('fuel');
    const vehicleModel = document.getElementById('model');
  
  
    const arrVehicleBodyType = new Set();
    const arrVehicleColor =  new Set();
    const arrVehicleCondition =  new Set();
    const arrVehiclefuel =  new Set();
    const arrVehiclemake =  new Set();
    const arrVehiclemileage =  new Set();
    const arrVehiclemodel =  new Set();
    const arrVehiclename =  new Set();
    const arrVehiclepower =  new Set();
    const arrVehicleprice =  new Set();
    const arrVehicleType =  new Set();
    const arrVehiclewheeldrive =  new Set();
    const arrVehicleyear =  new Set();
  
  
    fetch('http://localhost:3000/api/v1/vehicles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success' && Array.isArray(data.data.vehicles)) {
          data.data.vehicles.forEach(vehicle => {
  
            if(vehicle["status"]=="approved"){
            arrVehicleBodyType.add(vehicle["bodyType"]);
            arrVehicleColor.add(vehicle["color"]);
            arrVehicleCondition.add(vehicle["condition"]);
            arrVehiclefuel.add(vehicle["fuel"]);
            arrVehiclemake.add(vehicle["make"]);
            arrVehiclemileage.add(vehicle["mileage"]);
            arrVehiclemodel.add(vehicle["model"]);
            arrVehiclename.add(vehicle["name"]);
            arrVehiclepower.add(vehicle["power"]);
            arrVehicleprice.add(vehicle["price"]);
            arrVehicleType.add(vehicle["vehicleType"]);
            arrVehiclewheeldrive.add(vehicle["wheelDrive"]);
            arrVehicleyear.add(vehicle["year"]);
            }
          });
  
  
  
        } else {
          console.error('Error: Failed to retrieve vehicle data.');
        }
        arrVehiclemake.forEach(make => {
            var opt = document.createElement('option');
            opt.value = make;
            opt.innerHTML = make;
            vehicleMake.appendChild(opt);
            
          });
          arrVehicleBodyType.forEach(bodyType => {
          var opt = document.createElement('option');
            opt.value = bodyType;
            opt.innerHTML = bodyType;
            // Replace 'vehicleBodyType' with the appropriate select element ID
            vehicleBodyType.appendChild(opt);
           
          });
  
          arrVehicleColor.forEach(color => {
            var opt = document.createElement('option');
            opt.value = color;
            opt.innerHTML = color;
            // Replace 'vehicleColor' with the appropriate select element ID
            vehicleColor.appendChild(opt);
            
          });
  
          arrVehicleCondition.forEach(condition => {
            var opt = document.createElement('option');
            opt.value = condition;
            opt.innerHTML = condition;
            // Replace 'vehicleCondition' with the appropriate select element ID
            vehicleCondition.appendChild(opt);
           
          });
  
          arrVehiclefuel.forEach(fuel => {
            var opt = document.createElement('option');
            opt.value = fuel;
            opt.innerHTML = fuel;
            // Replace 'vehicleFuel' with the appropriate select element ID
            vehicleFuel.appendChild(opt);
            
          });
  
          arrVehiclemileage.forEach(mileage => {
            var opt = document.createElement('option');
            opt.value = mileage;
            opt.innerHTML = mileage;
            // Replace 'vehicleMileage' with the appropriate select element ID
            vehicleMileage.appendChild(opt);
           
          });
  
          arrVehiclemodel.forEach(model => {
            var opt = document.createElement('option');
            opt.value = model;
            opt.innerHTML = model;
            // Replace 'vehicleModel' with the appropriate select element ID
            vehicleModel.appendChild(opt);
           
          });
  
          arrVehiclename.forEach(name => {
            var opt = document.createElement('option');
            opt.value = name;
            opt.innerHTML = name;
            // Replace 'vehicleName' with the appropriate select element ID
            vehicleName.appendChild(opt);
            
          });
  
          arrVehiclepower.forEach(power => {
            var opt = document.createElement('option');
            opt.value = power;
            opt.innerHTML = power;
            // Replace 'vehiclePower' with the appropriate select element ID
            vehiclePower.appendChild(opt);
            
          });
  
          arrVehicleprice.forEach(price => {
            var opt = document.createElement('option');
            opt.value = price;
            opt.innerHTML = price;
            // Replace 'vehiclePrice' with the appropriate select element ID
            vehiclePrice.appendChild(opt);
           
          });
  
          arrVehicleType.forEach(type => {
            var opt = document.createElement('option');
            opt.value = type;
            opt.innerHTML = type;
            // Replace 'vehicleType' with the appropriate select element ID
            vehicleType.appendChild(opt);
            
          });
  
          arrVehiclewheeldrive.forEach(wheelDrive => {
            var opt = document.createElement('option');
            opt.value = wheelDrive;
            opt.innerHTML = wheelDrive;
            // Replace 'vehicleWheelDrive' with the appropriate select element ID
            vehicleWheelDrive.appendChild(opt);
            
          });
  
          arrVehicleyear.forEach(year => {
            var opt = document.createElement('option');
            opt.value = year;
            opt.innerHTML = year;
            // Replace 'vehicleYear' with the appropriate select element ID
            vehicleYear.appendChild(opt);
           
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  