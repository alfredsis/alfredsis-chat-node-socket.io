

class Mensaje{

    constructor(nombre, mensaje){
        this.nombre = nombre;
        this.mensaje = mensaje;

    }
}



class ChatMensajes{

    constructor(){
        this.mensajes = [];
        this.usuarios = {};    
        
        
    }

    get ultimos10(){
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr(){

        return Object.values( this.usuarios ); //
        

    }

    enviarMensaje( nombre, mensaje ){
        this.mensajes.unshift(
            new Mensaje( nombre, mensaje)
        )
    }

    conectarUsuario( usuario ){    
        let colores =[
            "#6D7CDE",
            "#a3975a",
            "#C5A7A7",
            "#A7C5AF",
            "#B4A7C5",
            "#99c2d1"] 
        
        
        this.usuarios[usuario.id] = usuario; 
        this.usuarios[this.usuarios[usuario.id].id]['colores']= colores[Object.keys(this.usuarios).length -1];    
                              
              


    }

    desconectarUsuario( id){
        delete this.usuarios[id];
    }


    
}

module.exports = { ChatMensajes};