const input=document.querySelector('#tweet');
const form=document.querySelector('#formulario');
const listText=document.querySelector('#lista-tweets');
let array=[];

addEvent();
function addEvent(){

    document.addEventListener('DOMContentLoaded', () => {
        if(localStorage.getItem('info')){
            const object=JSON.parse(localStorage.getItem('info'));
            viewHtml(object);
            return;
        };
        
    });

    form.addEventListener('submit',getInput);
    listText.addEventListener('click',deleteInfo);
};

function getInput(e){
    e.preventDefault();

    if(input.value){
        const object={
            id:Date.now(),
            text:input.value
        };
        safeInfo(object);
    };
};

function safeInfo(e){
    array.push(e)
    localStorage.setItem('info', JSON.stringify(array) );
    viewHtml(array);
};

function viewHtml(value){

    before();

    value.forEach(element => {

        const buttom=document.createElement('a');
        buttom.classList.add('borrar-tweet');
        buttom.textContent='x';

        const html=document.createElement('li');
        html.textContent=element.text;
        html.dataset.id=element.id;
        document.querySelector('#lista-tweets').appendChild(html).appendChild(buttom); 
    });

    form.reset();
}
function before(){
    while(listText.firstChild){
        listText.removeChild(listText.firstChild);
    };
}

function deleteInfo(e){
    if(e.target.classList.contains('borrar-tweet')){
	console.log(e.target)
        const info=JSON.parse(localStorage.getItem('info'));
        const newInfo=info.filter(elemnt => elemnt.id !== Number(e.target.parentElement.dataset.id));
        array=[...newInfo];
        viewHtml(newInfo);
        localStorage.setItem('info',JSON.stringify(newInfo));
    };
    cleanStorage();
}

function cleanStorage(){
   const array=JSON.parse(localStorage.getItem('info'));
   if(array.length === 0){
    localStorage.removeItem('info')
    form.reset();
   };
}