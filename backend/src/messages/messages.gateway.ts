import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, chatId: string) {
    client.join(`chat:${chatId}`);
    console.log(`Client ${client.id} joined chat ${chatId}`);
  }

  @SubscribeMessage('leaveChat')
  handleLeaveChat(client: Socket, chatId: string) {
    client.leave(`chat:${chatId}`);
    console.log(`Client ${client.id} left chat ${chatId}`);
  }

  // Method to notify all clients in a chat about a new message
  notifyNewMessage(message: any) {
    if (message.chat?.id) {
      this.server.to(`chat:${message.chat.id}`).emit('newMessage', message);
    }
    
    // Also broadcast to all connected clients
    this.server.emit('messageCreated', message);
  }
}
