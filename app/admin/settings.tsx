import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export default function AdminSettingsScreen() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      features: [
        'Access to limited learning materials (e.g., 1 subject/module per week)',
        'Access to a few sample practice exams (e.g., 2 exams/month)',
        'Limited number of reviewer downloads (e.g., 2 per month)',
        'No performance tracking',
        'No offline access'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 499,
      features: [
        'Unlimited access to all learning materials',
        'Access to all practice exams',
        '10 reviewer downloads per month',
        'Performance tracking and analytics',
        'No offline access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 999,
      features: [
        'Unlimited access to all learning materials',
        'Unlimited access to practice exams',
        'Unlimited reviewer downloads',
        'Performance tracking and analytics',
        'Offline access to materials',
        'Priority support',
        'Exclusive content (e.g., bonus tips, advanced practice sets)'
      ]
    }
  ]);

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setShowSubscriptionModal(true);
  };

  const handleUpdatePlan = (updatedPlan: SubscriptionPlan) => {
    const updatedPlans = subscriptionPlans.map(plan => 
      plan.id === updatedPlan.id ? updatedPlan : plan
    );
    setSubscriptionPlans(updatedPlans);
    setShowSubscriptionModal(false);
    setEditingPlan(null);
    Alert.alert('Success', 'Subscription plan updated successfully');
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 name={icon} size={16} color="#007AFF" />
        </View>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {onPress && (
        <FontAwesome5 name="chevron-right" size={16} color="#8E8E93" />
      )}
    </TouchableOpacity>
  );

  const renderSubscriptionPlan = (plan: SubscriptionPlan) => (
    <View key={plan.id} style={styles.planCard}>
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planPrice}>
          ₱ {plan.price.toFixed(2)}{plan.price > 0 ? ' /month' : ''}
        </Text>
      </View>
      <View style={styles.planFeatures}>
        {plan.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureItem}>
            <FontAwesome5 name="check" size={12} color="#007AFF" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.editPlanButton}
        onPress={() => handleEditPlan(plan)}
      >
        <Text style={styles.editPlanButtonText}>Edit Plan</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* User Management Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Management</Text>
        <View style={styles.settingsGroup}>
          {renderSettingItem(
            'users',
            'Manage Users',
            'View and manage all users',
            () => router.push('/admin/users')
          )}
         
        </View>
      </View>

      {/* Subscription Plans Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription Plans</Text>
        <View style={styles.plansContainer}>
          {subscriptionPlans.map(plan => renderSubscriptionPlan(plan))}
        </View>
      </View>

      {/* System Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Settings</Text>
        <View style={styles.settingsGroup}>
          {renderSettingItem(
            'bell',
            'Notification Settings',
            'Configure system notifications'
          )}
          {renderSettingItem(
            'shield-alt',
            'Security Settings',
            'Manage security preferences'
          )}
          {renderSettingItem(
            'database',
            'Backup Settings',
            'Configure data backup options'
          )}
        </View>
      </View>

      {/* Subscription Edit Modal */}
      <Modal
        visible={showSubscriptionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSubscriptionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {editingPlan?.name} Plan</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Plan Name"
              value={editingPlan?.name}
              onChangeText={(text) => setEditingPlan(editingPlan ? {...editingPlan, name: text} : null)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Price"
              value={editingPlan?.price.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setEditingPlan(editingPlan ? {...editingPlan, price: parseFloat(text) || 0} : null)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowSubscriptionModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => editingPlan && handleUpdatePlan(editingPlan)}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: 16,
  },
  settingsGroup: {
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#161647',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  planHeader: {
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
  },
  planFeatures: {
    marginTop: 12,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  editPlanButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  editPlanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 