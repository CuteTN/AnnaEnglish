import React from 'react'
import ButtonsModal from './ButtonsModal';

const ButtonsModalContext = React.createContext();

/**
 * @returns {useYesNoModalType}
 */
export const useButtonsModal = () => {
  return React.useContext(ButtonsModalContext)
}


export const ButtonsModalProvider = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const modalProps = React.useRef();

  const closeModalAndHandleFunc = (func) => () => {
    setVisible(false);
    func?.();
  }


  /** @type {showYesNoModalType} */
  const showYesNoModal = ({ label, text, imageUrl, onNo, onYes }) => {
    modalProps.current = {
      label, text, imageUrl
    };

    modalProps.current.buttons = [
      { label: "Có", onPress: closeModalAndHandleFunc(onYes) },
      { label: "Không", onPress: closeModalAndHandleFunc(onNo) },
    ]

    setVisible(true);
  }

  /** @type {showYesNoModalType} */
  const showOkModal = ({ label, text, imageUrl, onOk }) => {
    modalProps.current = {
      label, text, imageUrl
    };

    modalProps.current.buttons = [
      { label: "OK", onPress: closeModalAndHandleFunc(onOk) },
    ]

    setVisible(true);
  }

  return (
    <ButtonsModalContext.Provider value={{
      showYesNoModal,
      showOkModal,
      yesNoModalVisible: visible
    }}>
      <ButtonsModal
        visible={visible}

        label={modalProps.current?.label}
        text={modalProps.current?.text}
        imageUrl={modalProps.current?.imageUrl}

        buttons={modalProps.current?.buttons}
      />
      {children}
    </ButtonsModalContext.Provider>
  )
}


/**
 * @typedef {object} useYesNoModalType
 * @property {showYesNoModalType} showYesNoModal
 * @property {showOkModalType} showOkModal
 * @property {boolean} yesNoModalVisible
 */

/**
 * @typedef {Object} YesNoModalPropType
 * @property {string} label
 * @property {string} text
 * @property {string} imageUrl
 * @property {() => void} onYes
 * @property {() => void} onNo
*/

/**
 * @callback showYesNoModalType
 * @param {YesNoModalPropType} options
 * @returns {void}
*/

/**
 * @typedef {Object} OkModalPropType
 * @property {string} label
 * @property {string} text
 * @property {string} imageUrl
 * @property {() => void} onOk
*/

/**
 * @callback showOkModalType
 * @param {OkModalPropType} options
 * @returns {void}
*/