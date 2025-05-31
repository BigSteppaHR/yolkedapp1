# Yolked - AI-Powered Fitness Companion

A comprehensive fitness tracking app with AI-powered workout recommendations, progress tracking, and professional athlete-inspired training programs.

## Features

- 🏋️ **Smart Workout Generation**: AI creates personalized workouts based on your goals, equipment, and fitness level
- 📊 **Progress Tracking**: Track workouts, body measurements, and see your improvements over time
- 🎯 **Goal-Oriented Training**: Set specific fitness goals and get tailored programs to achieve them
- 🌟 **Athlete Inspiration**: Access adapted versions of professional athlete training routines
- 🌓 **Light/Dark Theme**: Automatic theme switching based on system preferences
- 🔐 **Secure Authentication**: Email and Google sign-in via Supabase

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **State Management**: React Context API
- **Navigation**: React Navigation
- **Styling**: Custom theme system with light/dark mode support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yolked-fitness-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   The Supabase configuration is already set up in `src/services/supabase.js`. No additional environment variables are needed for development.

4. **Run the app**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Testing the app**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press 'w' to open in web browser
   - Press 'a' to open in Android emulator
   - Press 'i' to open in iOS simulator

## Project Structure

```
yolked-fitness-app/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   └── onboarding/      # Onboarding-specific components
│   │   
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   └── onboarding/     # Onboarding flow screens
│   │   
│   ├── services/           # API and authentication services
│   │   
│   ├── theme/              # Theme configuration and context
│   │   
│   └── App.js             # Main app component
├── package.json
├── index.js               # App entry point
└── README.md
```

## Onboarding Flow

The app includes a comprehensive onboarding process that collects:
- Personal information (name, date of birth, gender)
- Physical stats (height, weight)
- Fitness experience level
- Training history and frequency
- Fitness goals
- Equipment access
- Training preferences
- Location (optional)

## Authentication

The app supports two authentication methods:
1. **Email/Password**: Traditional email registration with password
2. **Google OAuth**: Quick sign-in with Google account

## Database Schema

The app uses the following main tables:
- `users`: Basic user authentication data
- `profiles`: Detailed user profile information
- `user_preferences`: User settings and preferences
- `workout_sessions`: Workout history
- `exercises`: Exercise database
- `body_measurements`: Progress tracking data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@yolked.app or join our community Discord server. 