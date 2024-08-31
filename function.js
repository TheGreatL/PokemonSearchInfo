const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultDisplay = document.getElementById('displayResult');
const resultImage = document.getElementById('pokemonImage');

const api_link ='https://pokeapi.co/api/v2/pokemon/';
let searchLink;
searchButton.addEventListener('click',(event)=>{
    if(searchInput.value==""){
            resultDisplay.textContent="Your input is not valid.\nTry Again"; 
            return;
        }
    checkFilter();
});
function checkFilter(){
    resultDisplay.textContent="";
    
    const checkBoxes= document.querySelectorAll('input[type=checkbox]');
    let filterIndicator =[];
    checkBoxes.forEach((checkbox,index)=>{
        if(checkbox.checked)
            filterIndicator.push(index);
        
    });
    if(filterIndicator.length >0){
        searchLink= api_link+searchInput.value.toLowerCase();
        clearDisplay(()=>fetchData(filterIndicator));
        
    }
    else{
        resultDisplay.textContent='Please Choose in The Filter Result';
    }
       
}
function clearDisplay(callback){
    const allDisplay =document.querySelectorAll('.display');
    allDisplay.forEach(display=>display.textContent="");
    resultImage.src='';
    callback();
}
function fetchData(checkboxes){
 
        fetch(searchLink)
        .then(response=>response.json())
        .then(value=>{
                    resultImage.src= value.sprites.front_default;
                    console.log(value);
                    checkboxes.forEach((checkBox,index)=>{
                        switch(checkBox+1){
                            case 1:
                                const displaySkill = document.getElementById('displaySkill');
                                displaySkill.textContent="SKILL:";
                                        value.abilities.forEach((ability,index)=>{
                                            displaySkill.textContent+=value.abilities.length-1>index?ability.ability.name+",":ability.ability.name;
                                        });
                                break;
                            case 2:
                                const displayName = document.getElementById('displayName');
                                displayName.textContent="NAME:";
                                        displayName.textContent+= value.name;
                                break;
                            case 3:
                                const displayEvolve = document.getElementById('displayEvolve');
                                displayEvolve.textContent="EVOLVE:";
                                break;
                            case 4:
                                const displayType = document.getElementById('displayType');
                                displayType.textContent="TYPE:";
                                        value.types.forEach((type, index)=>{
                                            displayType.textContent+=value.types.length-1>index?type.type.name+",":type.type.name;
                                        });
                                break;
                        }


                    });






                })
        .catch(error=>{
                resultDisplay.textContent="Your input is not valid";
        });
}