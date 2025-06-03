const clients = new Set();
const Message = require('../models/messageModel'); 
const chatService = {
    addClient(client) {
        clients.add(client);
    },

    removeClient(client) {
        clients.delete(client);
    },

    async broadcastMessage(messageData) {
        try {
            const newMessage = new Message({
                username: messageData.username,
                message: messageData.message,
                postId: messageData.postId
            });

            await newMessage.save();

            const messageString = JSON.stringify(messageData);
            clients.forEach((client) => {
                if (client.readyState === 1) { 
                    client.send(messageString);
                }
            });

        } catch (error) {
            console.error('Error guardando mensaje:', error);
        }
    }
};

module.exports = chatService;
