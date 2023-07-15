
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import data from './data.json'


function App() {
  const [carPrice,setCarPrice] = useState(0);
  const [selectedValue, setSelectedValue] = useState('v1');
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState('');
  const [fuel, setFuel] = useState(null);
  const [age, setAge] = useState(0);
  const [adress, setAdress] = useState(0);
  const handleFuelChange = (event) => {
    setFuel(event.target.value);
  }
  const handleAgeChange = (event) => {
    console.log("Selected year: " + event.target.value);
    const age = 2023 - Number(event.target.value)
    let ageRange;

    if (age >= 0 && age <= 2) {
      ageRange = "0-2";
    } else if (age >= 3 && age <= 4) {
      ageRange = "3-4";
    } else if (age >= 5 && age <= 6) {
      ageRange = "5-6";
    } else if (age === 7) {
      ageRange = "7";
    } else if (age === 8) {
      ageRange = "8";
    } else if (age === 9) {
      ageRange = "9";
    } else if (age >= 10) {
      ageRange = "10";
    }

    console.log("Calculated age: " + age);
    console.log("Age range: " + ageRange);

    setAge(ageRange);


  }



  const mapVolumeToKey = (volume, fuelType) => {
    let key;
    if(fuelType === 'Бензин') {
      if (volume <= 1000) {
        key = "<=1000";
      } else if (volume <= 1500) {
        key = "1001-1500";
      } else if (volume <= 2000) {
        key = "1501-2000";
      } else if (volume <= 3000) {
        key = "2001-3000";
      }else {
        key = ">3000";
      }
    } else if(fuelType === 'Дизель') {
      if (volume <= 1500) {
        key = "<=1500";
      } else if (volume <= 2500) {
        key = "1501-2500";
      } else {
        key = ">=2500";
      }
    }
    return {key, value: volume};
  }

  const handleVolumeChange = (event) => {
    const volumeData = mapVolumeToKey(Number(event.target.value), fuel);
    setVolume(volumeData);
    console.log("Selected volume: " + volumeData.key);
  };

  const calculatePrice = () =>{
    if(fuel && age && volume) {
      const volumeData = mapVolumeToKey(volume.value, fuel);
      console.log('Data:', data);
      console.log('Fuel:', fuel);
      console.log('Volume Key:', volumeData.key);
      console.log('Age:', age);

      let taxRate;

      switch (fuel) {
        case 'Электрика':
          taxRate = 0;
          break;
        case 'Гибрид':
          // For Hybrid, we take 50% of the Benzine tax rate
          taxRate = 0.5 * data['Бензин'][volumeData.key][age];
          console.log(taxRate) //undefined!!!!
          break;
        default:
          // For other fuel types, use the normal tax rate
          taxRate = data[fuel][volumeData.key][age];
      }
      console.log('Tax Rate:', taxRate);
      const tax = volume.value * taxRate;
      console.log('Tax:', tax);
      setPrice(tax);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  return (
    <div className="container">
      <h1 className="title">Калькулятор доставки</h1>

      <input type="number" className="form-control" placeholder="Price of car"
             onChange={e => setCarPrice(Number(e.target.value))}/>


      <select className="form-select" aria-label="Adress" >
        <option value="1">ALTOONA, PA 15931 - порт Newark</option>
        <option value="2">ABILENE, TX 79601 - порт Houston</option>
        <option value="3">SACRAMENTO (CA) 95828 - порт Los Angeles</option>
      </select>


      <hr/>

      <select value={selectedValue} className="form-control" onChange={handleChange} >
        <option value="v1">Легковой автомобиль</option>
        <option value="v2">Внедорожник, минивэн</option>
        <option value="v3">Пикап</option>
        <option value="v4">Мотоцикл</option>
      </select>
      <hr/>
      <select id="combustibil"
              className="form-control"
              onChange={handleFuelChange}>
        <option value="Бензин">Бензин</option>
        <option value="Дизель">Дизель</option>
        <option value="Гибрид">Гибрид</option>
        <option value="Электрика">Электрика</option>
      </select>
      <hr/>

      <select className="form-control" onChange={handleAgeChange}>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
      <input type="number" className="form-control" placeholder="Объем двигателя" onChange={handleVolumeChange} />

      <button type="button" className="btn btn-primary" onClick={calculatePrice}>
        Calculate
      </button>
      <div>Итого: {price}</div>
      <div>Pretul masinii: {carPrice}</div>
    </div>
  );

}

export default App;