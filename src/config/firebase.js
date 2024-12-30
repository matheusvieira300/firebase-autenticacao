import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env"; //biblioteca pra gerar váriavel de ambiente no react native

// Pela váriavel de ambiente
// colocar manualmente se não funcionar no futuro
// pegar da conta do firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// para persistir os dados de autenticação no asyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) //persistência dos dados
})

//exportando o auth
export { auth }; 