import firebase from 'firebase'
import { reduxStore } from '../redux/store';
import { createActionUpdateFirebase } from '../redux/actions/CreateActionUpdateFirebase'
import * as log from '../Utils/ConsoleLog';
import { firebaseConfig } from './FirebaseConfig';
import { createFakeEmail, validateUsername } from '../Utils/Auth';

class Fire {
  static init = () => {
    Fire.initApp();
  };

  static auth = () => firebase.auth();

  static initApp = () => {
    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig);
    else
      firebase.app();
  };

  static getCurrentUser = () => {
    return firebase.auth().currentUser
  }

  static signOut = async () => {
    let result = false;
    let error = undefined;

    await firebase.auth().signOut().then(
      () => {
        log.logSuccess(`Signed out successfully`)
        result = true;
      },
      (err) => {
        error = err
      }
    )

    return { result, error };
  }

  static signUpWithUsername = async (username, password) => {
    let successful = false;
    let error = undefined;

    if (!validateUsername(username)) {
      return result;
      log.logError(`${username} is an invalid user name. For more detail, please visit: https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username/12019115`, false, true)
    }

    try {
      let email = createFakeEmail(username);
      await firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (credential) => {
          credential.user.updateProfile({ displayName: username }); // async, we don't event need it to be synced here :)
          Fire.update(`user/${username.toLowerCase()}`, {
            displayName: username,
          })
          log.logSuccess(`Created new user with username: ${username}`);
          successful = true;
        },
        (err) => {
          error = err;
        }
      );
    }
    catch (err) {
      error = err;
    }

    return { successful, error };
  }

  static signInWithUsername = async (username, password) => {
    let successful = false;
    let error = undefined;

    let email = createFakeEmail(username);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then(
        (credential) => {
          log.logSuccess(`user ${username} signed in successfully`)
          successful = true;
        },
        (err) => {
          error = err;
        }
      );
    }
    catch (err) {
      error = err;
    }

    return { successful, error };
  }



  static getRootRef = () => firebase.database().ref()

  /// name: name of table from the root
  /// retouch: arr => arr: apply some change to the array of db before storing it to redux
  static subscribeRef = (refPath, retouch) => {
    let ref = firebase.database().ref().child(refPath);
    log.logInfo(`Subscribed to Firebase/${refPath}`, false, false)

    ref.on("value",
      (snapshot) => {
        let snapshotObj = snapshot.toJSON();

        if (retouch && typeof retouch === "function")
          snapshotObj = retouch(snapshotObj)

        // update to redux
        reduxStore.dispatch(createActionUpdateFirebase(refPath, snapshotObj));
        log.logSuccess(`Collection ${refPath} has been retrieved and updated globaly!`)
      },
      (error) => { log.logError(`Failed to retrieve collection ${refPath}: ${error}`) }
    )
  }

  static unSubscribeRef = (refPath) => {
    let ref = firebase.database().ref().child(refPath);
    log.logInfo(`Unsubscribed to Firebase/${refPath}`, false, false)
    ref.off("value")
  }

  static get = async (refPath) => {
    let ref = firebase.database().ref().child(refPath)
    const item = await ref.get().catch((error) => {
      log.logError(`Could not find item from ${refPath}:\nError: ${error}`)
    })
    return item.toJSON();
  }

  // push a new item to refPath (i.e value would be in child ref of refPath). auto generate new ID.
  static push = async (refPath, value) => {
    let ref = firebase.database().ref().child(refPath)
    const link = await ref.push(value).then(
      (value) => log.logSuccess(`New item was added successfully at ${refPath}: ${value}`),
      (error) => log.logError(`Could not add new item to ${refPath}:\n${value}\nError: ${error}`)
    )
    return link
  }

  // set refPath new value, remove all old values
  static set = async (refPath, value) => {
    let ref = firebase.database().ref().child(refPath)
    let link = ref.set(value).then(
      (value) => log.logSuccess(`Item was set successfully at ${refPath}`),
      (error) => log.logError(`Could not set value to ${refPath}:\n${value}\nError: ${error}`)
    )
    return link
  }

  // update refPath new value, keep and override old values
  static update = async (refPath, value) => {
    let ref = firebase.database().ref().child(refPath)
    let link = ref.update(value).then(
      (value) => log.logSuccess(`Item was updated successfully at ${refPath}`),
      (error) => log.logError(`Could not update value to ${refPath}:\n${value}\nError: ${error}`)
    )
    return link
  }

  static remove = async (refPath) => {
    let ref = firebase.database().ref().child(refPath)
    let link = ref.remove().then(
      (value) => log.logSuccess(`Item was removed successfully at ${refPath}`),
      (error) => log.logError(`Could not remove item from ${refPath}:\n${value}\nError: ${error}`)
    )
    return link
  }

  static transaction = async (refPath, transactionUpdate) => {
    let ref = firebase.database().ref().child(refPath)
    let link = ref.transaction(transactionUpdate).then(
      (value) => log.logSuccess(`Item was update successfully at ${refPath}`),
      (error) => log.logError(`Could not update item from ${refPath}:\n${value}\nError: ${error}`)
    )
    return link
  }

}

export default Fire