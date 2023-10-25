import { useEffect } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const FirebaseConnect = (): null => {
  const { authUser } = useFirebaseAuth();

  useEffect(() => {
    if (!authUser) {
      return;
    }

    setInterval(() => {
      setDoc(
        doc(db, 'users', authUser?.uid),
        {
          lastActive: serverTimestamp(),
        },
        { merge: true },
      );
    }, 30000);
  }, [authUser]);

  return null;
};

export default FirebaseConnect;
