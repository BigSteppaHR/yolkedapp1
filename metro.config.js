const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable unstable_enablePackageExports to fix Supabase/ws issues
config.resolver.unstable_enablePackageExports = false;

module.exports = config; 