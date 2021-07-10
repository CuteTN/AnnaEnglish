import React from 'react'
import YesNoModal from './YesNoModal';

const YesNoModalContext = React.createContext();

/**
 * @returns {useYesNoModalType}
 */
export const useYesNoModal = () => {
  return React.useContext(YesNoModalContext)
}


export const YesNoModalProvider = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const modalProps = React.useRef();
  /** @type {React.MutableRefObject<"yes"|"no">} */
  const lastDecision = React.useRef();
  const onceClose = React.useRef(null);

  React.useEffect(() => {
    if (!visible) {
      onceClose.current?.(lastDecision.current);
      onceClose.current = null;
    }
  }, [visible])

  /**
   * @param {"yes"|"no"} decision 
   */
  const handleButtonPress = (decision) => {
    lastDecision.current = decision;
    setVisible(false);
  }


  /** @type {showYesNoModalType} */
  const showYesNoModal = ({ label, text, imageUrl, onClose }) => {
    modalProps.current = {
      label, text, imageUrl
    };
    onceClose.current = onClose;
    setVisible(true);
  }

  return (
    <YesNoModalContext.Provider value={{
      showYesNoModal,
      yesNoModalVisible: visible
    }}>
      <YesNoModal
        visible={visible}

        label={modalProps.current?.label}
        text={modalProps.current?.text}
        imageUrl={modalProps.current?.imageUrl}

        onYesPress={() => handleButtonPress("yes")}
        onNoPress={() => handleButtonPress("no")}
      />
      {children}
    </YesNoModalContext.Provider>
  )
}


/**
 * @typedef {object} useYesNoModalType
 * @property {showYesNoModalType} showYesNoModal
 * @property {boolean} yesNoModalVisible
 */

/**
 * @typedef {Object} YesNoModalPropType
 * @property {(decision: "yes"|"no") => void} onClose
 * @property {string} label
 * @property {string} text
 * @property {string} imageUrl
*/

/**
 * @callback showYesNoModalType
 * @param {YesNoModalPropType} options
 * @returns {void}
*/