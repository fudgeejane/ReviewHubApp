import { router } from 'expo-router';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function DigitalWallet() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const styles = useMemo(() => createStyles(isTablet), [isTablet]);

  const handleSignOut = () => {
    router.replace('/auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/ReviewHub.png')} style={styles.logo} />
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Set up your digital wallet</Text>
        
        <View style={styles.walletOptions}>
          <View style={styles.walletTypeContainer}>
            <Image source={require('../../assets/images/gcash.png')} style={styles.walletTypeIcon} />
            <Text style={styles.walletTypeText}>GCash</Text>
          </View>
          <View style={styles.walletTypeContainer}>
            <Image source={require('../../assets/images/paypal.png')} style={styles.walletTypeIcon} />
            <Text style={styles.walletTypeText}>PayPal</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.planInfo}>
          <Text style={styles.paymentAmount}>₱999/month</Text>
          <Text style={styles.planLabel}>Premium Plan</Text>
          <TouchableOpacity>
            <Text style={styles.changePlanLink}>Change Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity style={styles.checkbox} />
          <Text style={styles.termsText}>
            By checking the checkbox below, you agree to CrimEdge's Terms of Use, Privacy Policy, and that you are over 18. CrimEdge will automatically renew your subscription (₱999/month) to your payment method until you cancel. You may cancel anytime to avoid future charges.
          </Text>
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Membership</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (isTablet: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  signOutButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: isTablet ? 32 : 16,
    alignItems: 'center',
  },
  title: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 32,
    textAlign: 'center',
  },
  walletOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,
  },
  walletTypeContainer: {
    alignItems: 'center',
  },
  walletTypeIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  walletTypeText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    width: '100%',
    maxWidth: isTablet ? 500 : undefined,
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  planInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  paymentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  planLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  changePlanLink: {
    color: '#007AFF',
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#666',
    width: '100%',
    maxWidth: isTablet ? 500 : undefined,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
