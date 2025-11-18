import { io, Socket } from 'socket.io-client';

// Socket.IO service for real-time messaging
// Update this with your backend server IP
const SOCKET_URL = 'http://192.168.0.146:3000';

class SocketService {
  private socket: Socket | null = null;
  private connected: boolean = false;

  // Initialize socket connection
  connect(): void {
    if (this.socket && this.connected) {
      console.log('Socket already connected');
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  // Disconnect socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // Join a chat room
  joinChat(chatId: string): void {
    if (this.socket && this.connected) {
      this.socket.emit('joinChat', { chatId });
      console.log('Joined chat:', chatId);
    }
  }

  // Leave a chat room
  leaveChat(chatId: string): void {
    if (this.socket && this.connected) {
      this.socket.emit('leaveChat', { chatId });
      console.log('Left chat:', chatId);
    }
  }

  // Listen for new messages
  onMessageCreated(callback: (message: any) => void): void {
    if (this.socket) {
      this.socket.on('messageCreated', callback);
    }
  }

  // Remove message listener
  offMessageCreated(): void {
    if (this.socket) {
      this.socket.off('messageCreated');
    }
  }

  // Check if socket is connected
  isConnected(): boolean {
    return this.connected;
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;
