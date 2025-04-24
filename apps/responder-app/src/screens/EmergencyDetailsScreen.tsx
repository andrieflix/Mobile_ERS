import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { EmergencyReport } from '@ph-emergency/api';

type EmergencyDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EmergencyDetails'>;
  route: RouteProp<RootStackParamList, 'EmergencyDetails'>;
};

// Temporary mock data
const mockEmergency: EmergencyReport = {
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
};

export default function EmergencyDetailsScreen({
  navigation,
  route,
}: EmergencyDetailsScreenProps) {
  const [status, setStatus] = useState(mockEmergency.status);

  const handleStatusChange = (newStatus: EmergencyReport['status']) => {
    setStatus(newStatus);
    // TODO: Implement actual status update
    Alert.alert('Success', 'Status updated successfully');
  };

  const getStatusColor = (status: EmergencyReport['status']) => {
    switch (status) {
      case 'reported':
        return '#FF9500';
      case 'assigned':
        return '#007AFF';
      case 'in_progress':
        return '#5856D6';
      case 'resolved':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#000';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.type}>{mockEmergency.type.toUpperCase()}</Text>
          <Text
            style={[
              styles.status,
              { color: getStatusColor(status) },
            ]}
          >
            {status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{mockEmergency.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.location}>{mockEmergency.location.address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severity</Text>
          <Text style={styles.severity}>{mockEmergency.severity.toUpperCase()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reported At</Text>
          <Text style={styles.time}>
            {new Date(mockEmergency.createdAt).toLocaleString()}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => handleStatusChange('in_progress')}
          >
            <Text style={styles.buttonText}>Start Response</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => handleStatusChange('resolved')}
          >
            <Text style={styles.buttonText}>Mark as Resolved</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  type: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  location: {
    fontSize: 16,
  },
  severity: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
  },
  actions: {
    marginTop: 24,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 