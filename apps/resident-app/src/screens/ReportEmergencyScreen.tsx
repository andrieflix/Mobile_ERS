import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { EmergencyType, EmergencySeverity } from '@ph-emergency/api';

type ReportEmergencyScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReportEmergency'>;
};

const emergencyTypes: EmergencyType[] = [
  'medical',
  'fire',
  'police',
  'natural_disaster',
  'traffic_accident',
  'other',
];

const severityLevels: EmergencySeverity[] = [
  'low',
  'medium',
  'high',
  'critical',
];

export default function ReportEmergencyScreen({ navigation }: ReportEmergencyScreenProps) {
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<EmergencySeverity | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    try {
      if (!selectedType || !selectedSeverity || !description || !location) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // TODO: Implement actual emergency report submission
      Alert.alert(
        'Success',
        'Emergency reported successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Emergency Type</Text>
        <View style={styles.optionsGrid}>
          {emergencyTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                selectedType === type && styles.selectedOption,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedType === type && styles.selectedOptionText,
                ]}
              >
                {type.replace('_', ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Severity Level</Text>
        <View style={styles.optionsRow}>
          {severityLevels.map((severity) => (
            <TouchableOpacity
              key={severity}
              style={[
                styles.severityButton,
                selectedSeverity === severity && styles.selectedSeverity,
                { backgroundColor: getSeverityColor(severity) },
              ]}
              onPress={() => setSelectedSeverity(severity)}
            >
              <Text style={styles.severityText}>
                {severity.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Describe the emergency situation"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter location or use current location"
          value={location}
          onChangeText={setLocation}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function getSeverityColor(severity: EmergencySeverity): string {
  switch (severity) {
    case 'low':
      return '#4CD964';
    case 'medium':
      return '#FF9500';
    case 'high':
      return '#FF3B30';
    case 'critical':
      return '#AF2A2A';
    default:
      return '#007AFF';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  severityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedSeverity: {
    opacity: 1,
  },
  severityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 