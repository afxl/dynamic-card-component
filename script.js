const submit=document.querySelector(".submit")
const userName = document.querySelector(".name-inp")
const number = document.querySelector(".num-inp")
const month=document.querySelector(".month")
const year=document.querySelector(".year")
const cvc=document.querySelector(".cvc-inp")
const displayNumber=document.querySelector("#card-number")
const displayCVC=document.querySelector("#cvc")
const displayName = document.querySelector("#name");
const displayExp = document.querySelector("#date-exp");
const checkName=()=>userName.value ;
const checkNum=()=>{
     if (
       !number.value ||
       number.value.length !== 19 
     ){ console.log(number.value.length);
         return false;}
     else return true;
}
const checkDate=()=>{
    const d = new Date();
    curYear=d.getFullYear()-2000;
    console.log(curYear)
    if(!(month.value&&year.value&&month.value>=1&&month.value<=12&&+year.value>curYear)) return false
    else return true
}
const checkCVC =()=>{
    if(!cvc.value||cvc.value.length!==3)return false
    else return true
}
const checkError= function(){
    if(!checkName()){
        document.querySelector("#err-name").classList.remove("hidden");
    }
    if(!checkNum()){
        document.querySelector("#err-num").classList.remove("hidden");
    }
    if(!checkDate()){
        document.querySelector("#err-date").classList.remove("hidden");
    }
    if(!checkCVC()){
        document.querySelector("#err-cvc").classList.remove("hidden");
    }
    if(checkCVC()&&checkDate()&&checkNum()&&checkName()){
        return true;
    }

}
number.addEventListener("input",function(e){
    if(!e.data){
        displayNumber.innerText="0000 0000 0000 0000"
        return}
    if (!parseInt(e.data+1)) {
        number.value = number.value.slice(0, number.value.length - 1);
        return
    }
    if(number.value.length>19) {
          number.value = number.value.slice(0,19);
        return
    };
    if ((number.value.length+1) % 5 === 0 && number.value.length !==19) {
      number.value= number.value + " ";
    }
    displayNumber.innerText =
      number.value + displayNumber.innerText.substring(number.value.length);
})
cvc.addEventListener("input",function (e) {
    if (!e.data) {
      displayCVC.innerText = "000";
      return;
    }
    if (!parseInt(e.data + 1)) {
      cvc.value = cvc.value.slice(0, cvc.value.length - 1);
      return;
    }
    if (cvc.value.length > 3) {
      cvc.value = cvc.value.slice(0, 3);
      return;
    }
    displayCVC.innerText =
      cvc.value + displayCVC.innerText.substring(cvc.value.length);
})
userName.addEventListener("input", function () {
  displayName.innerText =
    userName.value
});
month.addEventListener("input", function () {
    if (month.value.length > 2) {
      month.value = month.value.slice(0, 2);
      return;
    }
  displayExp.innerText =
    month.value.padStart(2,0) + `/${year.value ? year.value : "00"}`;
});
year.addEventListener("input", function () {
    if (year.value.length > 2) {
      year.value = year.value.slice(0, 2);
      return;
    }
  displayExp.innerText =
    `${month.value ? month.value : "00"}/` + year.value.padStart(2, 0);
});
submit.addEventListener("click",function(e){
    e.preventDefault()
    if (!checkError()) return
    document.querySelector("form").classList.add("hidden")
    document.querySelector(".success").classList.remove("hidden");
    document.querySelectorAll("input").forEach(el=>{
      el.value=""
    })
    displayCVC.innerText="000"
    displayName.innerText = "JANE APPLESEED";
    displayNumber.innerText = "0000 0000 0000 0000";
    displayExp.innerText = "00/00";

})
document.querySelector(".success").addEventListener("click",function(){
  document.querySelector("form").classList.remove("hidden");
  document.querySelector(".success").classList.add("hidden");
})


document.querySelectorAll("input").forEach(el=>el.addEventListener("focus",()=>{
    document.querySelectorAll(".err").forEach(el=>el.classList.add("hidden"))
}));