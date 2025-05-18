import { router } from 'expo-router';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function CreditDebit() {
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
        <Text style={styles.title}>Set up your credit or debit card</Text>
        
        <View style={styles.cardOptions}>
          <View style={styles.cardTypeContainer}>
            <Image source={require('../../assets/images/visa.png')} style={styles.cardTypeIcon} />
            <Text style={styles.cardTypeText}>Visa</Text>
          </View>
          <View style={styles.cardTypeContainer}>
            <Image source={require('../../assets/images/mastercard.png')} style={styles.cardTypeIcon} />
            <Text style={styles.cardTypeText}>Mastercard</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Card number"
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiration date"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name on card"
          />
        </View>

        <View style={styles.planInfo}>
          <Text style={styles.planLabel}>Unknown Plan</Text>
          <TouchableOpacity>
            <Text style={styles.changePlanLink}>Change Plan</Text>
          </TouchableOpacity>
          <Text style={styles.planId}>yjpUD9KZS4Zo9n4Nn28c Plan</Text>
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity style={styles.checkbox} />
          <Text style={styles.termsText}>
            By checking the checkbox below, you agree to CrimEdge's Terms of Use, Privacy Policy, and that you are over 18. CrimEdge will automatically renew your subscription (Unknown Plan) to your payment method until you cancel. You may cancel anytime to avoid future charges.
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
  cardOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,
  },
  cardTypeContainer: {
    alignItems: 'center',
  },
  cardTypeIcon: {
    width: 48,
    height: 32,
    resizeMode: 'contain',
  },
  cardTypeText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    width: '100%',
    maxWidth: isTablet ? 500 : undefined,
    gap: 16,
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
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  planInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  planLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  changePlanLink: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 8,
  },
  planId: {
    color: '#666',
    fontSize: 14,
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