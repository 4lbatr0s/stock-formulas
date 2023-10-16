const webSocketConstants = {
    EVENTS:{
        OPEN:'open',
        MESSAGE:'message',
        CLOSE:'close',
        ERROR:'error',
        SEND:'send',
    }, 
    ERROR:{
        CODES:{
            RESET:'ECONNRESET',
            REFUSED:"ECONNREFUSED"
        }
    }, 
    RECEIVED_MESSAGES:{
        SUCCESS:'success',
        AUTH:'authenticated',
        CONNECTED:'connected',
        SUB:'subscription'
    },
    MESSAGES:{
        retryingConnection(second){
            return `Retrying connection in ${second} seconds...`;
        }
        closingTheConnection(){
            return `WebSocket connection encountered an error. Closing the connection.`
        }
    }
}

Object.freeze(webSocketConstants);

export default webSocketConstants;