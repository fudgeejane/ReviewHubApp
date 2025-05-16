import {
    MaterialIcons
} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
  
  const { width, height } = Dimensions.get('window');
  
  type IconName = 'menu-book' | 'school' | 'trending-up' | 'file-download' | 'headset' | 
                  'desktop-windows' | 'phone-android' | 'check-circle' | 'star' | 
                  'people' | 'access-time' | 'menu' | 'close' | 'arrow-forward';
  
  interface Service {
    icon: IconName;
    label: string;
  }
  
  interface Stat {
    icon: IconName;
    value: string;
    label: string;
  }
  
  interface PricingPlan {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
  }
  
  export default function Landing() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const menuAnimation = new Animated.Value(isMenuOpen ? 1 : 0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      Animated.spring(menuAnimation, {
        toValue: isMenuOpen ? 0 : 1,
        useNativeDriver: true,
      }).start();
    };
  
    const services: Service[] = [
      { icon: 'menu-book', label: 'Structured Modules' },
      { icon: 'school', label: 'Mock Tests' },
      { icon: 'trending-up', label: 'Performance Tracking' },
      { icon: 'file-download', label: 'Reviewer Downloads' },
      { icon: 'headset', label: 'Expert Support' },
      { icon: 'desktop-windows', label: 'Online Access' },
      { icon: 'phone-android', label: 'Mobile Learning' },
      { icon: 'check-circle', label: 'Practice Exams' },
    ];
  
    const stats: Stat[] = [
      { icon: 'check-circle', value: '98%', label: 'First-time Passers' },
      { icon: 'star', value: '95%', label: 'Average Board Rating' },
      { icon: 'people', value: '1000+', label: 'Successful Graduates' },
      { icon: 'access-time', value: '24/7', label: 'Learning Access' },
    ];
  
    const pricingPlans: PricingPlan[] = [
      {
        name: 'Free Plan',
        price: 'Free',
        features: [
          'Access to limited learning materials ',
          'Access to a few sample exams',
          'No performance tracking',
          'No offline access'
        ]
      },
      {
        name: 'Basic Plan',
        price: '₱499',
        isPopular: true,
        features: [
          'Full access to materials',
          'Unlimited practice exams',
          '10 downloads/month',
          'Performance tracking',
          'No offline access'
        ]
      },
      {
        name: 'Premium Plan',
        price: '₱999',
        features: [
          'Everything in Basic',
          'Unlimited downloads',
          'Priority support',
          'Offline access',
          'One-on-one mentoring'
        ]
      }
    ];
  
    const testimonials = [
      {
        name: "John Doe",
        role: "Criminology Graduate",
        quote: "Review Hub's comprehensive materials and expert guidance were instrumental in my success!"
      },
      {
        name: "Jane Smith",
        role: "Board Exam Passer",
        quote: "The structured modules helped me identify my weak areas and improve significantly."
      }
    ];
  
    const renderHeader = () => (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/ReviewHub.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  
    const renderHeroSection = () => (
      <View style={styles.heroSection}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80' }}
          style={styles.heroBackground}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Your Path to Excellence in Criminology</Text>
            <Text style={styles.heroSubtitle}>
              Master the Board Exam with our comprehensive review system designed for success
            </Text>
  
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <MaterialIcons name={stat.icon} size={24} color="#007AFF" />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
  
            <View style={styles.ctaContainer}>
              <Link href="/auth/signup" asChild>
                <TouchableOpacity style={styles.signUpButton}>
                  <Text style={styles.ctaButtonText}>Sign Up</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </Link>
              <Link href="/auth/signin" asChild>
                <TouchableOpacity style={styles.signInButton}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  
    const renderFeatures = () => (
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Our Features</Text>
        <Text style={styles.sectionSubtitle}>
          Comprehensive tools and resources to help you succeed in your criminology journey
        </Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <MaterialIcons name={service.icon} size={24} color="#007AFF" />
              <Text style={styles.serviceLabel}>{service.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  
    const renderPricingSection = () => (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <Text style={styles.sectionSubtitle}>Select the perfect plan that fits your learning needs and budget</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pricingContainer}
        >
          {pricingPlans.map((plan, index) => (
            <View key={index} style={[
              styles.pricingCard,
              plan.isPopular && styles.popularPricingCard
            ]}>
              {plan.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              <Text 
                style={
                  plan.name === 'Free Plan' ? styles.planPriceFree :
                  plan.name === 'Basic Plan' ? styles.planPriceBasic :
                  styles.planPricePremium
                }
              >
                {plan.price}
              </Text>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <MaterialIcons name="check-circle" size={20} color="#007AFF" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.selectPlanButton}>
                <Text style={styles.selectPlanButtonText}>Select Plan</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  
    const renderAboutSection = () => (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Review Hub</Text>
        <Text style={styles.sectionSubtitle}>
        Review Hub is an online review platform tailored for future criminologists. We provide structured modules, live coaching, quizzes, and performance tracking—accessible anytime, anywhere. With flexible subscription plans, expert mentors, and a supportive learning community, we help students prepare confidently for the Criminology Licensure Exam.
        </Text>
        <View style={styles.aboutContent}>
          <View style={styles.missionCard}>
            <MaterialIcons name="school" size={32} color="#007AFF" />
            <Text style={styles.missionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              To empower aspiring criminologists through accessible, high-quality, and exam-focused review resources.
            </Text>
          </View>
          <View style={styles.missionCard}>
            <MaterialIcons name="visibility" size={32} color="#007AFF" />
            <Text style={styles.missionTitle}>Our Vision</Text>
            <Text style={styles.missionText}>
              To be the leading digital review platform for criminology licensure exam preparation in the Philippines.
            </Text>
          </View>
        </View>
      </View>
    );
  
    const renderContactSection = () => (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionSubtitle}>Get in touch with our team</Text>
        <View style={styles.contactForm}>
          <TextInput 
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#666"
          />
          <TextInput 
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
          />
          <TextInput 
            style={[styles.input, styles.messageInput]}
            placeholder="Message"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.contactRow}>
            <MaterialIcons name="phone" size={24} color="#007AFF" />
            <Text style={styles.contactText}>+63 969 045 6744</Text>
          </View>
          <View style={styles.contactRow}>
            <MaterialIcons name="email" size={24} color="#007AFF" />
            <Text style={styles.contactText}>support@reviewhub.com</Text>
          </View>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {renderHeader()}
        <ScrollView style={styles.scrollView}>
          {renderHeroSection()}
          {renderFeatures()}
          {renderPricingSection()}
          {renderAboutSection()}
          {renderContactSection()}
        </ScrollView>
  
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <Animated.View 
            style={[
              styles.menuOverlay,
              {
                opacity: menuAnimation,
                transform: [{
                  translateX: menuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0]
                  })
                }]
              }
            ]}
          >
            <SafeAreaView style={styles.menuContent}>
              {['Home', 'Features', 'Plans', 'About', 'Contact'].map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    toggleMenu();
                  }}
                >
                  <Text style={styles.menuItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
              <Link href="/auth/signin" asChild>
                <TouchableOpacity style={styles.menuSignInButton}>
                  <Text style={styles.menuSignInButtonText}>Sign In</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </Link>
            </SafeAreaView>
          </Animated.View>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingTop: 30,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 50,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      width: 150,
      height:50,
    },
    scrollView: {
      flex: 1,
    },
    section: {
      padding: 20,
      backgroundColor: '#fff',
    },
    pricingContainer: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    pricingCard: {
      width: width * 0.8,
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      marginHorizontal: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    popularPricingCard: {
      borderColor: '#007AFF',
      borderWidth: 2,
    },
    popularBadge: {
      position: 'absolute',
      top: -12,
      right: 20,
      backgroundColor: '#007AFF',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    popularBadgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
    planName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    planPriceFree: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      backgroundColor: '#4CAF50',
      textAlign: 'center',
      width: 100,
      height: 100,
      alignSelf: 'center',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
    },
    planPriceBasic: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      backgroundColor: '#007AFF',
      textAlign: 'center',
      width: 100,
      height: 100,
      alignSelf: 'center',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
    },
    planPricePremium: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      backgroundColor: '#9C27B0',
      textAlign: 'center',
      width: 100,
      height: 100,
      alignSelf: 'center',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
    },
    featuresContainer: {
      marginBottom: 20,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    featureText: {
      marginLeft: 10,
      color: '#666',
    },
    selectPlanButton: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    selectPlanButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    aboutContent: {
      marginTop: 20,
    },
    missionCard: {
      backgroundColor: '#f5f7fa',
      padding: 20,
      borderRadius: 15,
      marginBottom: 15,
      alignItems: 'center',
    },
    missionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    missionText: {
      textAlign: 'center',
      color: '#666',
      lineHeight: 22,
    },
    contactForm: {
      marginTop: 20,
    },
    input: {
      backgroundColor: '#f5f7fa',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    messageInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    submitButton: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    contactInfo: {
      marginTop: 30,
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    contactText: {
      marginLeft: 10,
      color: '#666',
      fontSize: 16,
    },
    heroSection: {
      height: height * 0.8,
    },
    heroBackground: {
      flex: 1,
      resizeMode: 'cover',
    },
    heroOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 10,
    },
    heroSubtitle: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 30,
      opacity: 0.9,
    },
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginBottom: 30,
    },
    statCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width: width * 0.4,
      marginBottom: 10,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginVertical: 5,
    },
    statLabel: {
      fontSize: 12,
      color: '#fff',
      opacity: 0.9,
    },
    ctaContainer: {
      width: '100%',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 15,
    },
    signUpButton: {
      backgroundColor: '#007AFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 25,
      gap: 10,
      width: '45%',
    },
    signInButton: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#fff',
      width: '45%',
    },
    signInButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    ctaButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    featuresSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#007AFF',
      textAlign: 'center',
      marginBottom: 10,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
    },
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    serviceCard: {
      backgroundColor: '#f5f7fa',
      width: width * 0.44,
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    serviceLabel: {
      marginTop: 10,
      fontSize: 14,
      color: '#333',
      textAlign: 'center',
    },
    menuOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: width * 0.8,
      backgroundColor: '#fff',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    menuContent: {
      flex: 1,
      padding: 20,
      paddingTop: 50,
    },
    menuItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    menuItemText: {
      fontSize: 16,
      color: '#333',
    },
    menuSignInButton: {
      backgroundColor: '#007AFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 25,
      marginTop: 20,
      gap: 10,
    },
    menuSignInButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  }); 