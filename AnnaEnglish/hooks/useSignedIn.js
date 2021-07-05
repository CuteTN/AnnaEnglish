import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Fire from '../firebase/Fire';
import { fakeEmailToUsername } from '../Utils/Auth';
import { checkEnoughUserInfo } from '../Utils/user';
import { useRealtimeFire } from './useRealtimeFire';

/**
 * @typedef {"Unknown"|"SignedIn"|"NotSignedIn"|"NoInfo"} StatusType
*/


/**
 * Get/Set current user info
 * @returns {{user: any, updateUser: (newValue: any) => void, status: StatusType, username: string}}
 */
export const useSignedIn = () => {
  const [username, setUsername] = useState(null);
  // const [user, setUser] = useState(null);

  /** @type [StatusType, React.Dispatch<React.SetStateAction<StatusType>>] */
  const [status, setStatus] = useState("Unknown");

  const [user,] = useRealtimeFire("user", username);

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

        // fix realtime lose data
        Fire.update(`user/${newUsername}`, { activated: true });
      }
    })

    return () => {
      unsubscribeAuthChange()
    }
  }, []);

  useEffect(() => {
    if (user)
      setStatus(checkEnoughUserInfo(user).isValid ? "SignedIn" : "NoInfo");
  }, [user])

  // useEffect(() => {
  //   const childRef = Fire.getRootRef().child(`user/${username}`);

  //   const listener = childRef.on("value", (snapshot) => {
  //     setUser(snapshot.toJSON());
  //   })

  //   return () => {
  //     childRef.off("value", listener);
  //   }
  // }, [username])

  const updateUser = (newValue) => {
    if (username)
      Fire.update(`user/${username}`, newValue);
  }

  return { user, updateUser, username, status }
}