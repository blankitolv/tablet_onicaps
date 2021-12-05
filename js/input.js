let inputKey=document.querySelector('#inputKey');
inputKey.disabled=true;

let btn_continuar= document.querySelector('#finaliza2').disabled=true;
let btn_endRecord= document.querySelector('#endRecord').disabled=true;

let floatingTextarea2 = document.querySelector('#floatingTextarea2').disabled=true;

let consola=document.querySelector('.consola')
//cantidad de teclas presionadas en macro
let cant_teclas=document.querySelector('.cant_teclas')

// almacena las macros armadas
let containerMacros=[];

let listMacro=document.querySelector('.listMacro');
let cant_teclas_dispositivo=9;
// for (let j=0;j<cant_teclas_dispositivo;j++){
//      etiquetaP=document.createElement('P');
//      etiquetaP.innerHTML=`
//           ${j+1} &ltEmpty&gt
//      `
//      listMacro.appendChild(etiquetaP);

// }
let comentario=''
let tbody=document.querySelector('.tbody');
     for (let j=0;j<cant_teclas_dispositivo;j++){ 
          tbody.innerHTML+=`
          <tr class="trr">
               <td>
                    ${j+1}
               </td>
               <td>
                    ${j+1}&ltEmpty&gt
               </td>

          </tr>
          `
     }

/* 
& becomes &amp;
< becomes &lt;
> becomes &gt;
*/
//captura el evento keydown del teclado [inputs]
inputKey.addEventListener('keydown',(e)=>{
     e.preventDefault();
     if (e.repeat==false){
          consola.innerHTML+=`<a href="#" class="a_button" id="${document.querySelectorAll('.consola a').length}"><kbd>${e.key}</kbd></a>`
          cant_pulsaciones();
     }
})
//numero que pone la cantidad de pulsaciones [cant_teclas]
// (borra el existente y agrega el nuevo)
const cant_pulsaciones=()=>{
     while(cant_teclas.firstChild){
          cant_teclas.removeChild(cant_teclas.firstChild);
     }
     cant_teclas.innerHTML=`<p>${document.querySelectorAll('.a_button').length}</p>`
     generaEventosA_Button()
}


//global
let array_desdeHasta=[];

const generaEventosA_Button=()=>{
     let allBotones = document.querySelectorAll('.a_button');
     allBotones.forEach(element => {
          element.addEventListener('click',(e)=>{
               // array_desdeHasta va a tener 2 posiciones
               // si es igual a 1 agrega
               e.preventDefault();
               if (array_desdeHasta.length<=1){
                    if (element.id==array_desdeHasta[0]) {
                         array_desdeHasta.pop();
                    } else {
                         console.log(array_desdeHasta.length); 
                         console.log('add');
                         array_desdeHasta.push(element.id);
                    }
               } else {
                    // si tiene más de 2 borra el ultimo y agrega otro
                    if (parseInt(element.id)>parseInt(array_desdeHasta[0]) && parseInt(element.id)>parseInt(array_desdeHasta[1])){
                         array_desdeHasta.pop();
                         array_desdeHasta.push(element.id);
                    } else if (parseInt(element.id)<array_desdeHasta[0] && parseInt(element.id)<array_desdeHasta[1]){
                         array_desdeHasta.shift();
                         array_desdeHasta.unshift(element.id)
                    }
                    else if (element.id==array_desdeHasta[0]) {
                         array_desdeHasta[0]=String(parseInt(array_desdeHasta[0])+1)
                    } else if (element.id==array_desdeHasta[1]) {
                         array_desdeHasta[1]=String(parseInt(array_desdeHasta[1])-1)
                    } else {
                         array_desdeHasta.pop();
                         array_desdeHasta.push(element.id);
                    }
               }
               if (array_desdeHasta[0]==array_desdeHasta[1]){
                    array_desdeHasta.pop();
               }
               console.log ('desdehasta');
               console.log (array_desdeHasta);
               // (1) si el arreglo tiene 2 elementos
               if (array_desdeHasta.length==2) {
                    // (2) y la posicion [0] es más grande que la [1] -> lo invierte
                    if (parseInt(array_desdeHasta[0])>=parseInt(array_desdeHasta[1])){
                         let aux=array_desdeHasta[0];
                         array_desdeHasta[0]=array_desdeHasta[1];
                         array_desdeHasta[1]=aux;
                    }
               }
               console.log ('desdeHasta');
               console.log(array_desdeHasta);
               allBotones.forEach(unBoton => {
                    if ((parseInt(unBoton.id)>=parseInt(array_desdeHasta[0]) && parseInt(unBoton.id)<=parseInt(array_desdeHasta[1])) || unBoton.id===array_desdeHasta[0] ){
                         unBoton.firstElementChild.className='a_verde'
                         
                    } else {
                         unBoton.firstElementChild.classList.remove("a_verde")
                         unBoton.firstElementChild.className='a_Sinverde'
                    }
               });
          });
     });
}

// selecciona los botones que están seleccionados
let pressJuntos=document.querySelector('#pressJuntos');
pressJuntos.addEventListener('click',(e)=>{
     e.preventDefault();
     let allBotones = document.querySelectorAll('.a_button');
     let cant=0;
     allBotones.forEach(element => {
          if (element.firstChild.className=='a_verde') {
               console.log (`encontré ${++cant} - ${element.textContent}`);
          }
     });
})

// si preciona [resetear seleccion] cambia las clases y reestablece el array
let pressReset=document.querySelector('#pressReset');
pressReset.addEventListener('click',(e)=>{
     e.preventDefault();
     array_desdeHasta=[];
     let allBotones = document.querySelectorAll('.a_button');
     allBotones.forEach(element => {
          if (element.firstChild.className=='a_verde') {
               element.firstChild.className="a_Sinverde";
          }
     });
})
fetch ('../bdKeyMapInput.json')
.then (resp=> resp.json())
.then (data => {
     setTimeout(() => {
          allDataKeyboard=data;
          // finalmente()
     }, 1000);
})

// ************************************************
let text_incrustado=''

const convert_str_to_ecodes=()=>{
     let allBotones = document.querySelectorAll('.a_button');
     // arreglo de todas las keyCodes
     let allParseKeycodes=[];
     //busca: en base a todos los botones, en toda la BD en la key -> EKEY[]
     allBotones.forEach(element => {
          let noEntry=false;
          allDataKeyboard.forEach(ele => {
               // console.log (ele.ekey.length);
               for (let i=0; i<ele.ekey.length;i++){
                    if (element.firstChild.innerHTML==ele.ekey[i] && noEntry==false){
                         allParseKeycodes.push(ele.keyCode);
                         noEntry=true;
                    }
               }
          })
     });
     return allParseKeycodes;
}
let posicion=null;
let keyCaps2 = document.querySelectorAll('input[name="keyCaps2"]')
keyCaps2.forEach(element => {
     element.addEventListener('click',()=>{
          inputKey=document.querySelector('#inputKey');
          inputKey.disabled=false;
          btn_continuar= document.querySelector('#finaliza2').disabled=false;
          btn_endRecord= document.querySelector('#endRecord').disabled=false;
          floatingTextarea2 = document.querySelector('#floatingTextarea2').disabled=false;

          console.log(element.id);
          posicion=element.id;
     })
});
const mostrarMacroUsuario=(allBotones,pos)=>{
     let trr=document.querySelectorAll('.trr');
     let aux=' ';
     console.log('botones');
     allBotones.forEach(element => {
          aux+=`${element.firstChild.innerHTML} `
     });
     console.log(aux);
     trr[pos-1].lastElementChild.innerHTML=`${aux}`;
     comentario+=`# ${aux} \n`
};

let finaliza2=document.querySelector('#finaliza2')
finaliza2.addEventListener('click',(e)=>{
     e.preventDefault();
     let allBotones = document.querySelectorAll('.a_button');
     let allKeyCodes = convert_str_to_ecodes();
     let contador=0;
     let macro='';
     let bandera=false;

     allKeyCodes.forEach(element => {
          // macro
          if ( contador<parseInt(array_desdeHasta[0]) || contador>parseInt(array_desdeHasta[1]) || array_desdeHasta.length==0 ){
               if ( contador == 0 ) {
                    macro+=`\t\t`
               }
               macro+=`teclado.press(Keycode.${element})\n\t\tteclado.release(Keycode.${element})\n\t\t`;
          } else {
               // funcion
               if (bandera==false) {
                    if (contador==0) {
                         macro+=`\t\t`
                    }
                    // función presiona las teclas
                    macro+=`teclado.press(`
                    for ( let i = parseInt(array_desdeHasta[0]); i <= parseInt(array_desdeHasta[1]) ;i++ ) {
                         macro+=`Keycode.${allKeyCodes[i]}`
                         //si es el final de escribir la función entonces escribe \n\t\t
                         if ( i == parseInt(array_desdeHasta[1]) ){
                              macro+=`)\n\t\t`
                         } else {
                              macro+=', '
                         }
                    }
                    // función suelta las teclas
                    macro+=`teclado.release(`
                    for ( let i = parseInt(array_desdeHasta[0]); i <= parseInt(array_desdeHasta[1]) ;i++ ) {
                         macro+=`Keycode.${allKeyCodes[i]}`
                         //si es el final de escribir la función entonces escribe \n\t\t
                         if ( i == parseInt(array_desdeHasta[1]) ){
                              macro+=`)\n\t\ttime.sleep(0.1)\n\t\t`
                         } else {
                              macro+=', '
                         }
                    }
                    bandera=true;
               }
          }
          contador++;
     });
     console.log (macro);
     if (posicion==null)   {
          alert('you need to press a available keycap to establish macro')
     } else {
          containerMacros[posicion-1]=macro;
          let bban=false;
          keyCaps2.forEach(tecla => {
               if (tecla.id==posicion) {
                    tecla.disabled=true;
                    mostrarMacroUsuario( allBotones, parseInt(posicion) );
                    cleanAll();
                    
               }
               
               if ( parseInt(tecla.id)==parseInt(posicion)+1 && bban==false ) {
                    tecla.checked=true;
                    posicion=String(parseInt(posicion)+1);
                    bban=true;
               }
          });

     }
})
let seeAllMacro=document.querySelector('#seeAllMacro').addEventListener('click',()=>{
     containerMacros.forEach(element => {
          console.log (element);
     });
})
const cleanAll=()=>{
     let consola=document.querySelector('.consola')
     while(consola.firstChild){
          consola.removeChild(consola.firstChild);
     }
     array_desdeHasta=[];
     
};
// ----------------------------------- GUARDADO DE LOS MACROS 


// guarda el texto, recibe como parametro el texto YA ARMADO (arriba)
function download(filename, texto) {
     let element = document.createElement('a');
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
     element.setAttribute('download', filename);
 
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();
}


// nombre del archivo a exportar
let nombreArchivo= 'code.py'

//captura boton finalizar
let endRecord = document.querySelector('#endRecord');
endRecord.addEventListener('click',(e)=> {
     e.preventDefault();
     for (let i=0;i<=cant_teclas_dispositivo-1;i++){
          if (containerMacros[i]!=undefined){
               texto+=`\tif boton${i+1}.value:\r${containerMacros[i]}\n`
          }
     }
     let filename = `${nombreArchivo}`;
     download(filename, texto);
})


// texto Base
texto=`
${comentario}
import time \n
import digitalio \n
import board \n
import usb_hid \n
from adafruit_hid.keyboard import Keyboard \n
from adafruit_hid.keycode import Keycode \n
\n
boton1_pin = board.GP28\n
boton2_pin = board.GP2\n
boton3_pin = board.GP5\n
boton4_pin = board.GP27\n
boton5_pin = board.GP11\n
boton6_pin = board.GP7\n
boton7_pin = board.GP19\n
boton8_pin = board.GP17\n
boton9_pin = board.GP14\n
\n
teclado = Keyboard(usb_hid.devices)\n
boton1= digitalio.DigitalInOut(boton1_pin)\n
boton1.direction = digitalio.Direction.INPUT\n
boton1.pull = digitalio.Pull.DOWN\n
\n
boton2= digitalio.DigitalInOut(boton2_pin)\n
boton2.direction = digitalio.Direction.INPUT\n
boton2.pull = digitalio.Pull.DOWN\n
\n
boton3= digitalio.DigitalInOut(boton3_pin)\n
boton3.direction = digitalio.Direction.INPUT\n
boton3.pull = digitalio.Pull.DOWN\n
\n
boton4= digitalio.DigitalInOut(boton4_pin)\n
boton4.direction = digitalio.Direction.INPUT\n
boton4.pull = digitalio.Pull.DOWN\n
\n
boton5= digitalio.DigitalInOut(boton5_pin)\n
boton5.direction = digitalio.Direction.INPUT\n
boton5.pull = digitalio.Pull.DOWN\n
\n
boton6= digitalio.DigitalInOut(boton6_pin)\n
boton6.direction = digitalio.Direction.INPUT\n
boton6.pull = digitalio.Pull.DOWN\n
\n
boton7= digitalio.DigitalInOut(boton7_pin)\n
boton7.direction = digitalio.Direction.INPUT\n
boton7.pull = digitalio.Pull.DOWN\n
\n
boton8= digitalio.DigitalInOut(boton8_pin)\n
boton8.direction = digitalio.Direction.INPUT\n
boton8.pull = digitalio.Pull.DOWN\n
\n
boton9= digitalio.DigitalInOut(boton9_pin)\n
boton9.direction = digitalio.Direction.INPUT\n
boton9.pull = digitalio.Pull.DOWN\n
\n
while True:
`;