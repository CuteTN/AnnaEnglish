import { useSelector } from 'react-redux';

/**
 * @param {AvailableFirebaseChildren} path 
 */
export const useFiredux = (path) => {
  if (path)
    return useSelector(state => state?.reducerFirebase?.[path]);
  else
    return null;
}

/**
 * @typedef {"user"|"topic"} AvailableFirebaseChildren
 */