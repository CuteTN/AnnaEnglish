import React from "react";
import ButtonsModal from "./ButtonsModal";

const ButtonsModalContext = React.createContext();

/**
 * @returns {useYesNoModalType}
 */
export const useButtonsModal = () => {
  return React.useContext(ButtonsModalContext);
};

export const ButtonsModalProvider = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const [modalProps, setModalProps] = React.useState();

  const closeModalAndHandleFunc = (func) => () => {
    setVisible(false);
    func?.();
  };

  /** @type {showYesNoModalType} */
  const showYesNoModal = ({ label, text, imageUrl, onNo, onYes }) => {
    const tempModalProps = {
      label,
      text,
      imageUrl,
    };

    tempModalProps.buttons = [
      { label: "Không", onPress: closeModalAndHandleFunc(onNo) },
      { label: "Có", onPress: closeModalAndHandleFunc(onYes) },
    ];

    setModalProps(tempModalProps);
    setVisible(true);
  };

  /** @type {showYesNoModalType} */
  const showOkModal = ({ label, text, imageUrl, onOk }) => {
    const tempModalProps = {
      label,
      text,
      imageUrl,
    };

    tempModalProps.buttons = [
      { label: "OK", onPress: closeModalAndHandleFunc(onOk) },
    ];

    setModalProps(tempModalProps);
    setVisible(true);
  };

  return (
    <ButtonsModalContext.Provider
      value={{
        showYesNoModal,
        showOkModal,
        yesNoModalVisible: visible,
      }}
    >
      <ButtonsModal
        visible={visible}
        label={modalProps?.label}
        text={modalProps?.text}
        imageUrl={modalProps?.imageUrl}
        buttons={modalProps?.buttons}
      />
      {children}
    </ButtonsModalContext.Provider>
  );
};

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
