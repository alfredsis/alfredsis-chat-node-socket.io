
//referencias a html
const  lblOnline = document.querySelector('#lblOnline');
const  lblOffline =document.querySelector('#lblOffline');

const nickName = document.querySelector('#nickName');
const btnAceptar = document.querySelector('#btnAceptar');
const estado = document.querySelector('#estado');

const txtmensaje = document.querySelector('#mensajeinput');
const btnEnviar = document.querySelector('#enviarmsg');




const socket = io();


socket.on('connect', () =>{    
  
});

socket.on('desconectar-usuario', (nombreUS) =>{  
    // console.log(usuario);
    // console.log(`se fue el usuario ${usuario.apodo}`)
    const ul = document.getElementById("ulUsuarios");
    

    let listItems = ul.getElementsByTagName("li");
    

    for (let item of listItems) {       
      if (item.textContent.trim() == nombreUS) {
        ul.removeChild(item);
        break;
      }
      
    }
 
});



socket.on('enviar-nickName', (payload)=>{          
    dibujarUsuarios(payload);  

    //emitir el payload     
    // socket.emit('enviar-nickName', payload ); //ver   
})

btnAceptar.addEventListener( 'click', ()=>{    
   
    estado.style.display= 'block';
    const apodo = nickName.value;
    // socket.emit('user-connected', apodo);
    
    if(apodo ==""){return;}    
    
    const payload = {
        apodo,
        id: socket.id,
        fecha: 65432186,        
    }   
    
    socket.emit('enviar-nickName', payload );   //Del cliente al servidor
  
    btnAceptar.classList.add('Disabled');
        
})


//aqui recibe por ultima vez 4
socket.on('enviar-mensaje', (payload)=>{      
    
  dibujarMensajes(payload);
  
    
})



txtmensaje.addEventListener('keyup', ({keyCode})=>{
    if(keyCode !==13 ){ return;}

    iniciarChat();
})


btnEnviar.addEventListener( 'click', ()=>{     
    
    iniciarChat();
})

const iniciarChat = ()=>{
    const mensaje = txtmensaje.value;    

    if(mensaje ==""){return;}


    let color;
    let listItems = document.getElementsByTagName("li");
    

    for (let item of listItems) {   
      if (item.textContent.trim() == nickName.value) {       
        color = item.style.backgroundColor;      
        break;
      } 
    }   

    let horass = new Date().getHours();
    let minutos = new Date().getMinutes();
    if (minutos>=0 && minutos<10){
        minutos= "0"+minutos;
    }
       
    
   
    const payload2 = {
        mensaje,
        fecha: horass +`:` + minutos,
        nickName: nickName.value,
        color,
    }


    
    //aqui manda primera vez
    socket.emit('enviar-mensaje', payload2);
    
    document.getElementById("mensajeinput").value = "";
}


const dibujarUsuarios = ( usuarios  ) => {  
 
    let usersHtml = '';    

    for(let i=0; i<usuarios.length; i++) {
        usersHtml += `
        <li  style="background-color: ${usuarios[i].colores}">
         ${usuarios[i].apodo}
        </li>        
        `;      
               
      }

    ulUsuarios.innerHTML = usersHtml;    


}

const dibujarMensajes = ( payload ) => {

    const newElement = document.createElement("li");
    newElement.classList.add("bubble");
    newElement.style.backgroundColor = payload.color;  // agregado
    newElement.textContent = payload.mensaje;
    let fechaSpan = document.createElement("span");
    fechaSpan.id="fecha-bubble"
   

    fechaSpan.textContent = payload.fecha;
    newElement.appendChild(fechaSpan);
    document.querySelector(".outgoing").appendChild(newElement); 

    document.getElementById("outgoing").scrollTop = document.getElementById("outgoing").scrollHeight;


}

const removerUsuario = (payload)=>{


}
