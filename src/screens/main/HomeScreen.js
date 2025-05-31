import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { authService } from '../../services/authService';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      // TODO: Load today's workout and streak from database
      setTodayWorkout({
        name: 'Push Day - Chest & Triceps',
        exercises: 6,
        duration: '45-60 min',
        muscles: ['Chest', 'Triceps', 'Shoulders'],
      });
      setCurrentStreak(7);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const QuickActionCard = ({ icon, title, subtitle, onPress, color }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, { backgroundColor: theme.colors.background.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
        <Feather name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.quickActionTitle, { color: theme.colors.text.primary }]}>
        {title}
      </Text>
      <Text style={[styles.quickActionSubtitle, { color: theme.colors.text.tertiary }]}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );

  const GoalVisualizationWidget = () => (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.goalWidget}
    >
      <View style={styles.goalContent}>
        <Text style={styles.goalTitle}>Your Goal</Text>
        <Text style={styles.goalText}>
          {user?.profile?.primary_goal?.replace('_', ' ').toUpperCase() || 'BUILD STRENGTH'}
        </Text>
        <View style={styles.streakContainer}>
          <Feather name="zap" size={20} color="#FFFFFF" />
          <Text style={styles.streakText}>{currentStreak} Day Streak</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.goalEditButton}>
        <Feather name="edit-3" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  );

  const TodayWorkoutCard = () => (
    <TouchableOpacity
      style={[styles.workoutCard, { backgroundColor: theme.colors.background.card }]}
      onPress={() => navigation.navigate('Workouts')}
      activeOpacity={0.8}
    >
      <View style={styles.workoutHeader}>
        <View>
          <Text style={[styles.workoutLabel, { color: theme.colors.text.tertiary }]}>
            TODAY'S WORKOUT
          </Text>
          <Text style={[styles.workoutTitle, { color: theme.colors.text.primary }]}>
            {todayWorkout?.name || 'No workout scheduled'}
          </Text>
        </View>
        <View style={[styles.startButton, { backgroundColor: theme.colors.primary }]}>
          <Feather name="play" size={20} color="#FFFFFF" />
        </View>
      </View>
      
      {todayWorkout && (
        <View style={styles.workoutDetails}>
          <View style={styles.workoutStat}>
            <Feather name="layers" size={16} color={theme.colors.text.secondary} />
            <Text style={[styles.workoutStatText, { color: theme.colors.text.secondary }]}>
              {todayWorkout.exercises} exercises
            </Text>
          </View>
          <View style={styles.workoutStat}>
            <Feather name="clock" size={16} color={theme.colors.text.secondary} />
            <Text style={[styles.workoutStatText, { color: theme.colors.text.secondary }]}>
              {todayWorkout.duration}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const CalendarWidget = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDay = new Date().getDay();
    
    return (
      <View style={[styles.calendarWidget, { backgroundColor: theme.colors.background.card }]}>
        <Text style={[styles.calendarTitle, { color: theme.colors.text.primary }]}>
          This Week
        </Text>
        <View style={styles.calendarDays}>
          {days.map((day, index) => (
            <View key={index} style={styles.calendarDayContainer}>
              <Text style={[styles.calendarDayText, { color: theme.colors.text.secondary }]}>
                {day}
              </Text>
              <View
                style={[
                  styles.calendarDay,
                  {
                    backgroundColor: index === currentDay
                      ? theme.colors.primary
                      : index < currentDay
                      ? theme.colors.gamification.achievement + '30'
                      : theme.colors.background.secondary,
                  },
                ]}
              >
                {index < currentDay && (
                  <Feather name="check" size={16} color={theme.colors.primary} />
                )}
                {index === currentDay && (
                  <View style={styles.currentDayDot} />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background.primary }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.text.secondary }]}>
              Welcome back,
            </Text>
            <Text style={[styles.userName, { color: theme.colors.text.primary }]}>
              {user?.profile?.first_name || 'Athlete'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.notificationButton, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => {}}
          >
            <Feather name="bell" size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Goal Visualization */}
        <GoalVisualizationWidget />

        {/* Today's Workout */}
        <TodayWorkoutCard />

        {/* Calendar Widget */}
        <CalendarWidget />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionGrid}>
            <QuickActionCard
              icon="plus-circle"
              title="Log Workout"
              subtitle="Quick add"
              color={theme.colors.primary}
              onPress={() => navigation.navigate('Workouts')}
            />
            <QuickActionCard
              icon="trending-up"
              title="View Progress"
              subtitle="Track gains"
              color={theme.colors.gamification.pr}
              onPress={() => navigation.navigate('Progress')}
            />
            <QuickActionCard
              icon="star"
              title="Inspiration"
              subtitle="Get motivated"
              color={theme.colors.gamification.achievement}
              onPress={() => navigation.navigate('Inspiration')}
            />
            <QuickActionCard
              icon="users"
              title="Find Partner"
              subtitle="Train together"
              color={theme.colors.coral}
              onPress={() => navigation.navigate('Connect')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalWidget: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  goalText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '600',
  },
  goalEditButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  startButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutDetails: {
    flexDirection: 'row',
    gap: 20,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStatText: {
    fontSize: 14,
    marginLeft: 6,
  },
  calendarWidget: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  calendarDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDayContainer: {
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 12,
    marginBottom: 8,
  },
  calendarDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 52) / 2,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
  },
});

export default HomeScreen; 