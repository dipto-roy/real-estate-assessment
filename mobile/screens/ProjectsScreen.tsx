import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useLocalization } from '../hooks/useLocalization';
import { projectsService, Project } from '../services/projects.service';

export default function ProjectsScreen({ navigation }: any) {
  const { t } = useLocalization();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await projectsService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProjects();
  };

  const renderProject = ({ item }: { item: Project }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}
    >
      <Text style={styles.projectName}>{item.name}</Text>
      {item.description && (
        <Text style={styles.projectDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      {item.createdBy && (
        <Text style={styles.projectMeta}>
          {t('common.by')}: {item.createdBy.name}
        </Text>
      )}
      {item._count && (
        <Text style={styles.projectMeta}>
          {t('transactions.title')}: {item._count.transactions || 0}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('projects.title')}</Text>
      {projects.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>{t('projects.noProjects')}</Text>
        </View>
      ) : (
        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  projectCard: {
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
  projectName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  projectMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
