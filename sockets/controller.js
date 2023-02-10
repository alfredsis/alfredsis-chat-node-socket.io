const { ChatMensajes }= require('../models/chat-mensajes');


const chatMensajes = new ChatMensajes();

const socketController = (socket, io) => {  
    
        
    socket.on('disconnect', () => {
    //  chatMensajes.desconectarUsuario( )
    // io.emit('enviar-nickName', chatMensajes.usuariosArr)
        console.log('usuario desconectado', socket.id);  

        let user={};

        for(let usuario of chatMensajes.usuariosArr){
            if(usuario.id ==socket.id){
                console.log(`usuario ${usuario.apodo} desconectado`)    
               user = usuario;   
               break; 
            }
            
           
        }
        console.log(user.apodo);
        // chatMensajes.desconectarUsuario(socket.id);
        io.emit('desconectar-usuario', user.apodo); 

    });


    socket.on('enviar-nickName', ( payload)=>{   
              
        // io.emit('enviar-nickName', payload);
           //Agregar al usuario conectado
        chatMensajes.conectarUsuario(payload);

        //esto se imprime en el server
       
        io.emit('enviar-nickName', chatMensajes.usuariosArr)    
           
      
        // agregado dese aca
        // io.emit('enviar-mensaje', chatMensajes.usuariosArr)

    });




    //aqui recibe 2 veez
    socket.on('enviar-mensaje', ( payload)=>{    
         
        
        //aqui hace algo y emite nuevamnte 3

        io.emit('enviar-mensaje', payload);
    })


    //Limpiar cuando alguien se desconecta
  



}


module.exports = {
    socketController
}