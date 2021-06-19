import { useSelector } from 'react-redux';
import Fire from '../firebase/Fire';

const subscribedPaths = {};

/**
 * @param {AvailableFirebaseChildren} path 
 */
export const useFiredux = (path) => {
  if (path) {
    if (!subscribedPaths[path]) {
      subscribedPaths[path] = true;
      Fire.subscribeRef(path);
    }
  }

  if (path)
    return useSelector(state => state?.reducerFirebase?.[path]);
  else
    return null;
}

/**
 * @typedef {"user"|"topic"} AvailableFirebaseChildren
 */