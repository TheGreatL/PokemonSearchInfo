const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultDisplay = document.getElementById('displayResult');
const resultImage = document.getElementById('pokemonImage');
const results = document.querySelectorAll('.display');
const API_LINK = 'https://pokeapi.co/api/v2/pokemon/';
searchButton.addEventListener('click',()=>{

        const results = document.querySelectorAll('.display');
        results.forEach(result=>{
            result.textContent='';
        });
        resultImage.src='';
        //If Empty Go Here
        if(!searchInput.value){
            resultDisplay.textContent='Don`t leave field empty';
            return;
        }

     
        
        const checkedCheckBox=[];
        const checkBoxes  = document.querySelectorAll('input[type=checkbox]');
        checkBoxes.forEach((checkbox,index)=>{
                if(checkbox.checked){
                        checkedCheckBox.push(index);
                }
        });

        if(!checkedCheckBox.length){
            resultDisplay.textContent='Please check at lease one checkbox';
            return;
        }
        displayData(checkedCheckBox,searchInput.value.toLowerCase());

});
 function displayData(checkedCheckBox,searchInput){
    fetch(API_LINK+searchInput)
    .then(response=>{

        if(!response.ok){
            throw new Error("Your input is not valid");
        }

        return response.json();
    })
    .then(responseData=>{
        console.log(responseData);
            const {
                  name:pokemonName,
                  abilities:[
                    {
                        ability:{name:abilityName1}
                    },
                    {ability:
                        {
                            name:abilityName2
                        }
                    }
                ],
                sprites:{front_default:pokemonIcon}
             
            }=responseData;

            resultImage.src = pokemonIcon;
            for(let check of checkedCheckBox){
                switch(check){
                    case 0:
                        results[check].textContent = `Abilities:${abilityName1}, ${abilityName2}`;
                        break;
                    case 1:
                        results[check].textContent = `Name:${pokemonName}`;
                        break;
                    case 2:
                        results[check].textContent = `Evolve:`;
                        break;
                    case 3:
                        let typesData='';
                        responseData.types.forEach(typesArr=>{
                            typesData+=`${typesArr.type.name}, `;
                        });
                        results[check].textContent = `Type:${typesData}`;
                        break;
                }      
            }
         
          
           
        })
    .catch(error=>{
        resultDisplay.textContent=error;
    });
}
