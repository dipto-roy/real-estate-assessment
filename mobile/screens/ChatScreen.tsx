import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalization } from '../hooks/useLocalization';
import { messagesService, Message } from '../services/messages.service';
import { socketService } from '../services/socket.service';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ route }: any) {
  const { chatId, userId } = route.params;
  const { t } = useLocalization();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchMessages();
    
    // Connect to WebSocket and join chat room
    socketService.connect();
    socketService.joinChat(chatId);

    // Listen for new messages
    socketService.onMessageCreated((newMessage: Message) => {
      if (newMessage.chatId === chatId) {
        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const exists = prev.find((msg) => msg.id === newMessage.id);
          if (exists) {
            return prev; // Don't add duplicate
          }
          return [...prev, newMessage];
        });
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    });

    // Cleanup on unmount
    return () => {
      socketService.leaveChat(chatId);
      socketService.offMessageCreated();
    };
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const data = await messagesService.getAll(chatId, 1, 100);
      // Deduplicate messages by ID
      const uniqueMessages = data.data.reduce((acc: Message[], current: Message) => {
        const isDuplicate = acc.find((item: Message) => item.id === current.id);
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);
      setMessages(uniqueMessages.reverse()); // Reverse to show oldest first
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || sending) return;

    setSending(true);
    try {
      const newMessage = await messagesService.create({
        chatId,
        senderId: userId,
        content: messageText.trim(),
      });
      setMessages((prev) => {
        // Check if message already exists (might come via WebSocket first)
        const exists = prev.find((msg) => msg.id === newMessage.id);
        if (exists) {
          return prev;
        }
        return [...prev, newMessage];
      });
      setMessageText('');
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === userId;
    
    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
        ]}
      >
        {!isMyMessage && item.sender && (
          <Text style={styles.senderName}>{item.sender.name}</Text>
        )}
        <Text style={styles.messageContent}>{item.content}</Text>
        <Text style={styles.messageTime}>
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>{t('messages.noMessages')}</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => item.id || `message-${index}`}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('messages.typeMessage')}
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, sending && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={sending || !messageText.trim()}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
