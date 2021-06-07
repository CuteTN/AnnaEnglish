import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Fire from '../firebase/Fire';
import { fakeEmailToUsername } from '../Utils/Auth';

/**
 * @typedef {"Unknown"|"SignedIn"|"NotSignedIn"} StatusType
*/

/**
 * Get/Set current user info
 * @returns {{user: any, updateUser: (newValue: any) => void, status: StatusType}}
 */
export const useSignedIn = () => {
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null);

  /** @type [StatusType, React.Dispatch<React.SetStateAction<StatusType>>] */
  const [status, setStatus] = useState("Unknown");

  useEffect(() => {
    const unsubscribeAuthChange = Fire.auth().onAuthStateChanged(user => {
      if (!user) {
        setUsername(null);
        setStatus("NotSignedIn");
      }
      else {
        const { email } = user;
        const newUsername = fakeEmailToUsername(email);
        setUsername(newUsername);
        setStatus("SignedIn");
      }
    })

    return () => {
      unsubscribeAuthChange()
    }
  }, []);

  useEffect(() => {
    const childRef = Fire.getRootRef().child(`user/${username}`);

    const listener = childRef.on("value", (snapshot) => {
      setUser(snapshot.toJSON());
    })

    return () => {
      childRef.off("value", listener);
    }
  }, [username])

  const updateUser = (newValue) => {
    if (username)
      Fire.update(`user/${username}`, newValue);
  }

  return { user, updateUser, status }
}