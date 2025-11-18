import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalization } from '../hooks/useLocalization';
import { projectsService, Project } from '../services/projects.service';
import { transactionsService, Transaction } from '../services/transactions.service';
import { groupChatsService } from '../services/group-chats.service';
import { authService } from '../services/api';

export default function ProjectDetailsScreen({ route, navigation }: any) {
  const { projectId } = route.params;
  const { t } = useLocalization();
  const [project, setProject] = useState<Project | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectDetails();
    loadUserId();
  }, [projectId]);

  const loadUserId = async () => {
    try {
      const user = await authService.getUser();
      if (user && user.id) {
        setUserId(user.id);
        console.log('User loaded:', user);
      }
    } catch (error) {
      console.error('Error loading user ID:', error);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      const [projectData, transactionsData] = await Promise.all([
        projectsService.getById(projectId),
        transactionsService.getAll(projectId, 1, 20),
      ]);
      setProject(projectData);
      
      // Deduplicate transactions by ID to prevent duplicate key errors
      const uniqueTransactions = transactionsData.data.reduce((acc: Transaction[], current: Transaction) => {
        const isDuplicate = acc.find((item: Transaction) => item.id === current.id);
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      setTransactions(uniqueTransactions);
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  const openChat = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // Get or create a chat for this project
      const chats = await groupChatsService.getAll();
      let chat = chats.find((c: any) => c.projectId === projectId);

      if (!chat) {
        // Create new chat if none exists
        chat = await groupChatsService.create({ projectId });
      }

      // Navigate to chat screen
      navigation.navigate('Chat', {
        chatId: chat.id,
        userId: userId,
        projectName: project?.name || 'Project Chat',
      });
    } catch (error) {
      console.error('Error opening chat:', error);
      Alert.alert('Error', 'Failed to open chat. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{t('common.error')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.name}</Text>
        {project.description && (
          <Text style={styles.description}>{project.description}</Text>
        )}
        {project.createdBy && (
          <Text style={styles.meta}>
            Created by: {project.createdBy.name} ({project.createdBy.role})
          </Text>
        )}
        
        {/* Chat Button */}
        <TouchableOpacity style={styles.chatButton} onPress={openChat}>
          <Ionicons name="chatbubbles" size={20} color="#fff" />
          <Text style={styles.chatButtonText}>Open Project Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('transactions.title')}</Text>
        {transactions.length === 0 ? (
          <Text style={styles.emptyText}>{t('transactions.noTransactions')}</Text>
        ) : (
          transactions.map((transaction, index) => (
            <View key={transaction.id || `transaction-${index}`} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionLabel}>{t('transactions.amount')}:</Text>
                <Text style={styles.transactionAmount}>
                  ${transaction.amount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionLabel}>{t('transactions.buyer')}:</Text>
                <Text style={styles.transactionValue}>
                  {transaction.buyer?.name || 'Unknown'}
                </Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionLabel}>{t('transactions.seller')}:</Text>
                <Text style={styles.transactionValue}>
                  {transaction.seller?.name || 'Unknown'}
                </Text>
              </View>
              <Text style={styles.transactionDate}>
                {new Date(transaction.timestamp).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    lineHeight: 24,
  },
  meta: {
    fontSize: 14,
    color: '#999',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  transactionValue: {
    fontSize: 14,
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
