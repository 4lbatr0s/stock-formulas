
// let currentPriceWSS; // Declare the WebSocket variable outside the function

// const connectToCurrentPriceWSS = (callback, stockSymbol) => {
//   if (!currentPriceWSS || currentPriceWSS.readyState === WebSocket.CLOSED) {
//     currentPriceWSS = new WebSocket(`ws://localhost:4747`);
//     currentPriceWSS.onopen = () => {
//       currentPriceWSS.send(currentPriceWSS.send(JSON.stringify({ message: "DATA IS SENDING:", stockSymbol })));
//       currentPriceWSS.onmessage = async (event) => {
//         let parsedData = JSON.parse(event.data);
//         callback(parsedData?.p);
//         console.log('Message received from currentPriceWSS:', event.data);
//       };
//     };
//   } else {
//     console.log('STOCK WebSocket connection already exists.');
//   }
// };

// const configureCurrentPriceWSS = (callback, stockSymbol) => {
//   connectToCurrentPriceWSS(callback, stockSymbol);

//   currentPriceWSS.onerror = (error) => {
//     console.error('WebSocket error:', error);
//     if (isConnectionError(error)) {
//       console.log('Retrying connection in 5 seconds...');
//       setTimeout(() => connectToCurrentPriceWSS(callback), 5000);
//     } else {
//       console.log('CURRENT PRICE WebSocket connection encountered an error. Closing the connection.');
//       currentPriceWSS.close();
//       // Additional recovery logic here...
//     }
//   };
//   const isConnectionError = (error) => {
//     if (error && error.code) {
//       if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
//         return true;
//       }
//     }
//     return false;
//   };

//   currentPriceWSS.onclose = (event) => {
//     console.log('CURRENT PRICE WebSocket connection closed:', event.code, event.reason);
//     connectToCurrentPriceWSS(); // Attempt to reconnect
//   };
// };

// export default configureCurrentPriceWSS;
