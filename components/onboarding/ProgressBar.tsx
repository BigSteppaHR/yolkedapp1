import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <LinearGradient
          colors={['#FF6B00', '#FF4500']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progress, { width: `${progress}%` }]}
        />
      </View>
      <Text style={styles.text}>{`${current} of ${total}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  barContainer: {
    height: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
  text: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});