import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Fire from '../firebase/Fire';

/**
 * Get/Set current user info
 * @returns {{user: any, updateUser: (newValue: any) => void}}
 */
export const useSignedIn = () => {
  const { username } = useSelector(state => state.reducerSignedIn);
  const [user, setUser] = useState()

  useEffect(() => {
    const childRef = Fire.getRootRef().child(`user/${username}`);

    const listener = childRef.on("value", (snapshot) => {
      setUser(snapshot.toJSON());
    })

    return () => {
      childRef.off("value", listener);
    }
  }, []);

  const updateUser = (newValue) => {
    if (username)
      Fire.update(`user/${username}`, newValue);
  }

  return { user, updateUser }
}