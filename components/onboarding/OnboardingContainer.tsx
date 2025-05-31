import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft } from 'lucide-react-native';
import ProgressBar from './ProgressBar';

interface OnboardingContainerProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showBackButton?: boolean;
  showProgress?: boolean;
}

export default function OnboardingContainer({
  children,
  currentStep,
  totalSteps = 19,
  showBackButton = true,
  showProgress = true,
}: OnboardingContainerProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      {showProgress && currentStep && (
        <ProgressBar current={currentStep} total={totalSteps} />
      )}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});