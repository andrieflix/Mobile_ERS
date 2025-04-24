import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { EmergencyReport } from '@ph-emergency/api';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

// Temporary mock data
const mockEmergencies: EmergencyReport[] = [
  {
    id: '1',
    type: 'medical',
    location: {
      latitude: 14.5995,
      longitude: 120.9842,
      address: 'Manila, Philippines',
    },
    description: 'Patient experiencing chest pain',
    reporterId: 'user1',
    status: 'assigned',
    createdAt: new Date(),
    updatedAt: new Date(),
    severity: 'high',
    assignedResponders: ['responder1'],
  },
  // Add more mock emergencies as needed
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement actual data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderEmergencyItem = ({ item }: { item: EmergencyReport }) => (
    <TouchableOpacity
      style={styles.emergencyItem}
      onPress={() => navigation.navigate('EmergencyDetails', { emergencyId: item.id })}
    >
      <View style={styles.emergencyHeader}>
        <Text style={styles.emergencyType}>{item.type.toUpperCase()}</Text>
        <Text style={styles.emergencySeverity}>{item.severity}</Text>
      </View>
      <Text style={styles.emergencyDescription}>{item.description}</Text>
      <Text style={styles.emergencyLocation}>{item.location.address}</Text>
      <Text style={styles.emergencyTime}>
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEmergencies}
        renderItem={renderEmergencyItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  emergencyItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  emergencyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  emergencySeverity: {
    fontSize: 14,
    color: '#FF3B30',
    textTransform: 'capitalize',
  },
  emergencyDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  emergencyLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  emergencyTime: {
    fontSize: 12,
    color: '#999',
  },
}); 