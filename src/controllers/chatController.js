const chatService = require('../services/chatService');

function handleConnection(ws) {
    chatService.addClient(ws);

    ws.on('message', (message) => {
        try {
            const messageData = JSON.parse(message);
            chatService.broadcastMessage(messageData);
        } catch (error) {
            console.error('Error al procesar mensaje:', error);
        }
    });

    ws.on('close', () => {
        chatService.removeClient(ws);
    });
}

module.exports = {
    handleConnection
}; 