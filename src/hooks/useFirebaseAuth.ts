/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Firebase, { googleAuthProvider } from '../../firebaseConfig';

interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  phoneNumber: string;
  photoURL: string;
  providerData: any;
  providerId: string;
  refreshToken: string;
  tenantId: string;
}
const formatAuthUser = (user): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  emailVerified: user.emailVerified,
  isAnonymous: user.isAnonymous,
  metadata: user.metadata,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  providerData: user.providerData,
  providerId: user.providerId,
  refreshToken: user.refreshToken,
  tenantId: user.tenantId,
});

/**
 * @description - firebase hook.
 * @returns - Return different methods of firebase.
 */
export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schoolInfo, setSchoolInfo] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const getUserFromAPI = async (formattedUser) => {
    axios('/api/User', {
      params: {
        getUserByKeyName: true,
        key: 'email',
        value: formattedUser.email,
      },
    }).then((res) => {
      setAuthUser({ ...formattedUser, userInfo: res.data });
      localStorage.setItem('UserInfo', JSON.stringify(res.data));
      setLoading(false);
    });
  };

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const userInfoLocal =
      typeof localStorage !== undefined && localStorage.getItem('UserInfo')
        ? JSON.parse(localStorage.getItem('UserInfo'))
        : undefined;

    const formattedUser = formatAuthUser(authState);

    if (formattedUser.email !== userInfoLocal?.email) {
      getUserFromAPI(formattedUser);
      return;
    }

    if (userInfoLocal) {
      setAuthUser({ ...formattedUser, userInfo: userInfoLocal });
    }

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    return Firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = async () =>
    Firebase.auth().signInWithPopup(googleAuthProvider);

  const createUserWithEmailAndPassword = (email, password) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password);

  const updateEmail = (email) => Firebase.auth().currentUser.updateEmail(email);

  const passwordReset = (email) =>
    Firebase.auth().sendPasswordResetEmail(email);

  const signOut = () => Firebase.auth().signOut().then(clear);

  const getAuthToken = async () => Firebase.auth().currentUser.getIdToken(true);

  const sendVerificationEmail = async () =>
    Firebase.auth().currentUser.sendEmailVerification();

  const confirmPasswordReset = async (code, newPassword) =>
    Firebase.auth().confirmPasswordReset(code, newPassword);

  useEffect(() => {
    if (schoolInfo && Object.keys(schoolInfo).length) {
      localStorage.setItem(
        'schoolInfo',
        JSON.stringify({ ...schoolInfo, currentTime: new Date() }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolInfo]);

  useEffect(() => {
    let getSchoolData: any = localStorage.getItem('schoolInfo');
    const currentTime = new Date();

    if (getSchoolData) {
      getSchoolData = JSON.parse(getSchoolData);
      const givenTime = new Date(getSchoolData.currentTime);
      const diffInMillis = currentTime.getTime() - givenTime.getTime();
      const diffInMinutes = diffInMillis / (1000 * 60);

      if (diffInMinutes < 45) {
        setSchoolInfo(getSchoolData);
      } else {
        localStorage.removeItem('schoolInfo');
        setSchoolInfo({});
      }
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On Login, Fetch user token
  useEffect(() => {
    if (authUser) {
      getAuthToken().then((token) => {
        localStorage.setItem('AUTH_TOKEN', token);
      });
    }
  }, [authUser]);

  return {
    signInWithGoogle,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    confirmPasswordReset,
    passwordReset,
    signOut,
    getAuthToken,
    sendVerificationEmail,
    updateEmail,
    setSchoolInfo,
    schoolInfo,
    isInitialized,
    authUser,
    loading,
  };
}
