import config from './config'
import firebase from "firebase/app";

var secondaryApp = firebase.initializeApp(config, "Secondary")

export default secondaryApp;