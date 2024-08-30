const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultDisplay = document.getElementById('displayResult');
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
    checkBoxes.forEach((checkbox,index)=>{
        if(checkbox.checked){

            searchLink= api_link+searchInput.value;
            fetchData(index+1);
        }
    });
    // if(isAllChecked){
    //     resultDisplay.textContent="All Checked";
    //     searchLink= api_link+searchInput.value;
    //     fetchData();
    // }
       
}
function fetchData(checkbox){

    switch(checkbox){
        case 1:
            
            fetch(searchLink)
            .then(response=>response.json())
            .then(value=>
                {
                    resultDisplay.textContent+="Abilities:";
                    value.abilities.forEach((val,index)=>
                    {
                resultDisplay.textContent+=index==(value.abilities.length-1)?val.ability.name:val.ability.name+",";
                // console.log(val.ability);
            });
        
            })
            .catch((error)=>{resultDisplay.textContent="We cannot find your input";console.error(error)});
        
            break;
        case 2:
            resultDisplay.textContent+="Name:";
            fetch(searchLink)
            .then(response=>response.json())
            .then(value=>
                {value.abilities.forEach((val,index)=>
                    {
                resultDisplay.textContent+=index==(value.abilities.length-1)?val.ability.name+"\n":val.ability.name+",";
                // console.log(val.ability);
            });
        
            })
            .catch((error)=>{resultDisplay.textContent="We cannot find your input";console.error(error)});
        
            break;
        case 3:
            resultDisplay.textContent+="Evolve/s:";
            fetch(searchLink)
            .then(response=>response.json())
            .then(value=>
                {value.abilities.forEach((val,index)=>
                    {
                resultDisplay.textContent+=index==(value.abilities.length-1)?val.ability.name+"\n":val.ability.name+",";
                // console.log(val.ability);
            });
        
            })
            .catch((error)=>{resultDisplay.textContent="We cannot find your input";console.error(error)});
        
            break;
        
        case 4:
            
            fetch(searchLink)
            .then(response=>response.json())
            .then(value=>{
                resultDisplay.textContent+="\nType:";
                    value.types.forEach((val,index)=>{
                    resultDisplay.textContent+=index==(value.types.length-1)?val.type.name:val.type.name+",";            
                    });
            })
            .catch((error)=>{resultDisplay.textContent="We cannot find your input";console.error(error)});
        
            break;
                    
                
    }
}