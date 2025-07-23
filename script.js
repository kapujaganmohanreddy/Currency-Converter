let BASE_URL='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'

let dropdown=document.querySelectorAll(".dropdown select");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let btn=document.querySelector("form button");
let msg=document.querySelector(".message");

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerHTML=currCode;
        newOption.value=currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name =="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let img=element.parentElement.querySelector("img");
    let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    img.src=newsrc;
}

const updateCurrency=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<0){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data=await response.json();
    let ratesforFromcurr=data[fromCurr.value.toLowerCase()];
    let rate= ratesforFromcurr[toCurr.value.toLowerCase()];
    let finalRate=rate*amtVal;
    msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateCurrency();
})

window.addEventListener("load",()=>{
    updateCurrency();
})