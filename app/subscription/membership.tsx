import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const DropdownArrow = ({ isExpanded }: { isExpanded: boolean }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.Text 
      style={[
        styles.arrow,
        { transform: [{ rotate }] }
      ]}
    >
      ▼
    </Animated.Text>
  );
};

export default function Membership() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Access to limited learning materials (e.g., 1 subject/module per week)',
        'Access to a few sample practice exams (e.g., 2 exams/month)',
        'Limited number of reviewer downloads (e.g., 2 per month)',
        'No performance tracking',
        'No offline access'
      ]
    },
    {
        name: 'Basic Plan',
        price: '₱499/month',
        features: [
          'Unlimited access to all learning materials',
          'Access to all practice exams',
          '10 reviewer downloads per month',
          'Performance tracking and analytics',
          'Offline access'
        ]
      },
    {
      name: 'Premium Plan',
      price: '₱999/month',
      features: [
        'Unlimited access to all learning materials',
        'Unlimited access to practice exams',
        'Unlimited reviewer downloads',
        'Performance tracking and analytics',
        'Offline access to materials',
        'Priority support',
        'Exclusive content (e.g., bonus tips, advanced practice sets)'
      ],
      recommended: true
    }
  ];

  const togglePlan = (planName: string) => {
    setExpandedPlan(expandedPlan === planName ? null : planName);
  };

  const handleSignOut = () => {
    router.replace('/auth');
  };

  const handleSelectPlan = (planName: string, price: string) => {
    router.push('/subscription/payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/ReviewHub.png')} style={styles.logo} />
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chooseHead}>
      <Text style={styles.title}>Choose Your Plan</Text>
      </View>

      <ScrollView 
        style={styles.plansContainer}
        contentContainerStyle={styles.plansContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {plans.map((plan) => (
          <View 
            key={plan.name} 
            style={[
              styles.planCard,
              plan.recommended && styles.recommendedCard
            ]}
          >
            {plan.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>BEST VALUE</Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.planHeader}
              onPress={() => togglePlan(plan.name)}
              activeOpacity={0.7}
            >
              <View style={styles.planSummary}>
                <View style={styles.planTitleContainer}>
                  <Text style={[
                    styles.planName,
                    plan.recommended && styles.recommendedPlanName
                  ]}>
                    {plan.name}
                  </Text>
                  <Text style={[
                    styles.planPrice,
                    plan.recommended && styles.recommendedPlanPrice
                  ]}>
                    {plan.price}
                  </Text>
                </View>
                <DropdownArrow isExpanded={expandedPlan === plan.name} />
              </View>
            </TouchableOpacity>

            {expandedPlan === plan.name && (
              <Animated.View style={styles.expandedContent}>
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={styles.featureRow}>
                      <Text style={[
                        styles.checkmark,
                        plan.recommended && styles.recommendedCheckmark
                      ]}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity 
                  style={[
                    styles.selectButton,
                    plan.recommended && styles.recommendedButton,
                    plan.name === 'Free' && styles.freeButton
                  ]}
                  onPress={() => handleSelectPlan(plan.name, plan.price)}
                >
                  <Text style={styles.selectButtonText}>
                    {plan.name === 'Free' ? 'Start Free' : 'Select Plan'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  chooseHead: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  plansContainer: {
    flex: 1,
  },
  plansContentContainer: {
    padding: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  recommendedCard: {
    borderWidth: 2,
    borderColor: '#4c6ef5',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4c6ef5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    padding: 16,
  },
  planSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitleContainer: {
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  recommendedPlanName: {
    color: '#4c6ef5',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  recommendedPlanPrice: {
    color: '#4c6ef5',
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  checkmark: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendedCheckmark: {
    color: '#4c6ef5',
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  selectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  recommendedButton: {
    backgroundColor: '#4c6ef5',
  },
  freeButton: {
    backgroundColor: '#00a67e',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
