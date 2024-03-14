import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged  } from 'firebase/auth'
import configFirebase from '../ufirebase/config'







    

  






const app = initializeApp(configFirebase) 
const auth = getAuth(app)



export {auth}

