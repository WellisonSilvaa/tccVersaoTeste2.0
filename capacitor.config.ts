import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {

  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '834203845263-b1s2v4vfn5mfhh4d76re5v6s1436j6mk.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

  appId: 'io.ionic.starter',
  appName: 'tccVersaoTeste',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
