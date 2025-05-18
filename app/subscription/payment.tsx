import { router } from 'expo-router';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function Payment() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const styles = useMemo(() => createStyles(isTablet), [isTablet]);

  const handleSignOut = () => {
    router.replace('/auth');
  };

  const handleCreditDebit = () => {
    router.push('/subscription/creditdebit');
  };

  const handleDigitalWallet = () => {
    router.push('/subscription/digitalwallet');
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
        <Text style={styles.title}>Complete Your Payment</Text>
        
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>You have selected the Premium Plan</Text>
          <Text style={styles.paymentAmount}>Payment Amount: ₱999 / month</Text>
          <Text style={styles.secureText}>
            Your payment is encrypted, and you can change how you pay anytime.
          </Text>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.paymentTitle}>Choose how to pay</Text>
          
          <TouchableOpacity style={styles.paymentOption} onPress={handleCreditDebit}>
            <View style={styles.paymentOptionLeft}>
              <Text style={styles.paymentOptionText}>Credit or Debit Card</Text>
            </View>
            <View style={styles.paymentOptionRight}>
              <Image 
                source={require('../../assets/images/visa.png')} 
                style={styles.paymentIcon} 
              />
              <Image 
                source={require('../../assets/images/mastercard.png')} 
                style={styles.paymentIcon} 
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption} onPress={handleDigitalWallet}>
            <View style={styles.paymentOptionLeft}>
              <Text style={styles.paymentOptionText}>Digital Wallet</Text>
            </View>
            <View style={styles.paymentOptionRight}>
              <Image 
                source={require('../../assets/images/gcash.png')} 
                style={styles.paymentIcon} 
              />
              <Image 
                source={require('../../assets/images/paypal.png')} 
                style={styles.paymentIcon} 
              />
            </View>
          </TouchableOpacity>
        </View>
        
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    paddingTop: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    padding: isTablet ? 32 : 16,
    alignItems: 'center',
  },
  title: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 32,
  },
  planInfo: {
    width: '100%',
    maxWidth: isTablet ? 600 : undefined,
    alignItems: 'center',
    marginBottom: 32,
  },
  planTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  paymentAmount: {
    fontSize: isTablet ? 20 : 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  secureText: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
    textAlign: 'center',
  },
  paymentMethods: {
    width: '100%',
    maxWidth: isTablet ? 600 : undefined,
  },
  paymentTitle: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  paymentOptionText: {
    fontSize: isTablet ? 18 : 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  paymentOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
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

});
