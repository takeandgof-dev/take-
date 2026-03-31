import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAuth, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if Firebase is configured
const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

// Initialize Firebase only if configured
let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

function initializeFirebase() {
  if (!isFirebaseConfigured) {
    console.log('[v0] Firebase not configured - skipping initialization')
    return { app: null, db: null, auth: null }
  }
  
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApp()
  }
  db = getFirestore(app)
  auth = getAuth(app)
  return { app, db, auth }
}

const firebase = initializeFirebase()
app = firebase.app
db = firebase.db
auth = firebase.auth

export { app, db, auth, isFirebaseConfigured }
