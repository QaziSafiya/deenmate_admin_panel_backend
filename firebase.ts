import * as admin from 'firebase-admin'
import * as dotenv from 'dotenv'

dotenv.config()

// Step 1: Get base64 string from env
const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64

if (!base64) {
  throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_BASE64 in .env file")
}

// Step 2: Decode base64 and parse as JSON
const serviceAccount = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))

// Step 3: Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})


const db = admin.firestore()
export default db

//  firebase ts
// firebase ts
