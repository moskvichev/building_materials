'use strict';
// функция приводящая в движение сайт

function init(){
   
  disableSubmitButton();
  inputOrder();
}
// берем все страницы сайта
function getPages(){
  return document.getElementsByClassName("page");
}
// показываем активную и прячем остальные страницы
function getActivePageNumber(){
  let pages = getPages();
  
  let i=0;
  while(pages[i].hidden){
    i++;
  }
  return i;
}
// перелистываем страницы
function setNextPageAsActive(){

  let activePageNum = getActivePageNumber();
  let pages = getPages();
  pages[activePageNum].hidden=true;

  if(activePageNum<pages.length){
    pages[activePageNum+1].hidden=false;
  }

}
// кнопка далее / отправить неактивны
function disableSubmitButton(){
  var buttons = document.getElementsByClassName("submitBtn");

  for(let i=0; i<buttons.length; i++){
    buttons[i].disabled=true;
  }  
}
// кнопка далее / отправить активна при валидном заполнении форм
function enableSubmitButton(){
    
  let activePage = getActivePageNumber();
  if(activePage==0)
  {
    let length = document.getElementById("length-wall");
    let height = document.getElementById("height-wall");
    let material = document.getElementById("material");

    if (length.checkValidity() && height.checkValidity() && material.checkValidity()){
      document.getElementsByClassName("submitBtn")[0].disabled=false;
    }
  }

  if(activePage==1)
  {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");

    if (name.checkValidity() && email.checkValidity() && phone.checkValidity()){
      document.getElementsByClassName("submitBtn")[1].disabled=false;
    }
  }
}

//Проверяем ввод, валидируем, подсчитываем сумму
function inputOrder(){
  //if (!el) var el = window.event.srcElement;
  enableSubmitButton();    
  localization();
  calculateOrder();
  textInputSecondPage();
  textInputThirdPage();
    
}

function calculateOrder(){

  let length = document.getElementById("length-wall");
  let height = document.getElementById("height-wall");
  let material = document.getElementById("material");
  let isNeedAssembly = document.getElementById("need-assembly");
  let result = calculateOrderInternal(parseInt(length.value), parseInt(height.value), isNeedAssembly.checked, parseInt(material.options[material.selectedIndex].value));  
  document.getElementById("order-total").innerHTML = result;
}

//Считаем сумму заказа. 
function calculateOrderInternal(length, height, isNeedAssembly, material){
  if (!el) var el = window.event.srcElement;
  
  if( Number.isNaN(length) ||  Number.isNaN(height) ||  Number.isNaN(material) || 
    length== 0 || height == 0 || material=="" ||  material == 0){
    return 0;
  }

  let meters = length * height;
  
  if(isNeedAssembly)//нужна сборка
  {
    material+=200;
  }


  return meters*material;
}

function inputContact(){  
  enableSubmitButton();  
}
// при нажатии отправить - происходит отправка почты
function submit(){
  
  setNextPageAsActive();
  init();
  
  if(getActivePageNumber()==2){
    sendEmail();
  }
  
}
// функция отправки почты
function sendEmail(){
  
  let clientEmail = document.getElementById("");
  
  sendEmailInternal(clientEmail,"","");

}

function sendEmailInternal(to){

  let name = document.getElementById("name");
  let phone = document.getElementById("phone");

  let from="moskvichev_e@bk.ru";
  let smtpServer="smtp.mail.ru";
  let login ="moskvichev_e@bk.ru";
  let pwd="lizaliza1737";
  let message= name.value + ", заказ №1 сформирован. В ближайшее время наш специалист свяжется с вами по телефону " + phone.value;
  let subject="Тестовое задание, заказ забора №1";

  Email.send(from, to, subject, message, smtpServer, login, pwd);
}
// функция склонения слова метр - метра - метров
function decliner(number, one, two, five) {  
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
      return five;
  }
  number %= 10;
  if (number == 1) {
      return one;
  }
  if (number >= 2 && number <= 4) {
      return two;
  }
  return five;
}

function localization(){    
  let length = document.getElementById("length-wall").value;
  let height = document.getElementById("height-wall").value;
    
  document.getElementsByClassName("form__input_measurement")[0].innerHTML = decliner(parseInt(length), " метр", " метра", " метров");
  document.getElementsByClassName("form__input_measurement")[1].innerHTML = decliner(parseInt(height), " метр", " метра", " метров");  
}
// динамическое изменение текста на второй странице
function textInputSecondPage(){
  let metrLength = document.getElementById("length-wall").value;
  let metrHeight = document.getElementById("height-wall").value;
  let length = document.getElementById("length-wall");
  let height = document.getElementById("height-wall");
  let material = document.getElementById("material"); 
  let isNeedAssembly = document.getElementById("need-assembly"); 
  let result = calculateOrderInternal(parseInt(length.value), parseInt(height.value), isNeedAssembly.checked, parseInt(material.options[material.selectedIndex].value));  
  document.getElementById("len").innerHTML = "длинной " + length.value;
  document.getElementById("metr_length").innerHTML = decliner(parseInt(metrLength), " метр", " метра", " метров");
  document.getElementById("hei").innerHTML = " высотой " + height.value;
  document.getElementById("metr_height").innerHTML = decliner(parseInt(metrHeight), " метр", " метра", " метров");
  document.getElementById("mat").innerHTML = material.options[material.selectedIndex].label;
  document.getElementById("cost").innerHTML = result;
}
// динамическое изменение текста на третьей странице

function textInputThirdPage() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  document.getElementById("info__name").innerHTML = name.value;
  document.getElementById("info__email").innerHTML = email.value;
  document.getElementById("info__phone").innerHTML = phone.value;
}

  
 


