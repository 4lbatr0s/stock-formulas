import webSocketConstants from "../scripts/utils/constants/Websockets";

class WebSocketService {
    constructor(url) {
      this.url = url;
      this.websocket = null;
      this.eventHandlers = {};
    }
  
    connect() {
      this.websocket = new WebSocket(this.url);
      this.websocket.onopen = this.handleOpen;
      this.websocket.onclose = this.handleClose;
      this.websocket.onerror = this.handleError;
      this.websocket.onmessage = this.handleMessage;
    }
  
    disconnect() {
      if (this.websocket) {
        this.websocket.close();
      }
    }
  
    handleOpen(event) {
      console.log('WebSocket connection opened:', event);
      this.dispatchEvent(webSocketConstants.EVENTS.OPEN)
    }
  
    handleClose(event) {
      console.log('WebSocket connection closed:', event);
      this.dispatchEvent(webSocketConstants.EVENTS.CLOSE);
    }
  
    handleError(event) {
      console.error('WebSocket error:', event);
      this.dispatchEvent(webSocketConstants.EVENTS.ERROR);
    }
  
    handleMessage(event) {
      console.log('WebSocket message received:', event.data);
      this.dispatchEvent(webSocketConstants.EVENTS.MESSAGE)
      // Implement your message handling logic here
    }
  
  addEventListener(eventType, handler, data) {
      if (!this.eventHandlers[eventType]) {
        this.eventHandlers[eventType] = [];
      }
      this.eventHandlers[eventType].push({ handler: handler, data: data });
    }
  
    removeEventListener(eventType, handler) {
      if (this.eventHandlers[eventType]) {
        this.eventHandlers[eventType] = this.eventHandlers[eventType].filter(
          (h) => h !== handler
        );
      }
    }
  
    async dispatchEvent(eventType) {
      if (this.eventHandlers[eventType]) {
        for (const { handler, data } of this.eventHandlers[eventType]) {
          // If the handler is asynchronous, wait for it to complete
          if (handler.constructor.name === 'AsyncFunction') {
            await handler(data);
          } else {
            handler(data);
          }
        }
      }
    }
  }
  
  export default WebSocketService;
  