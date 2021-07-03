import React from 'react'
import CheckModal from './CheckModal';

const CheckModalContext = React.createContext();

/**
 * @returns {useCheckModalType}
 */
export const useCheckModal = () => {
  return React.useContext(CheckModalContext)
}


export const CheckModalProvider = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const isCorrectRef = React.useRef();
  const onceClose = React.useRef(null);

  React.useEffect(() => {
    if (!visible) {
      onceClose.current?.();
      onceClose.current = null;
    }
  }, [visible])

  const handleButtonPress = () => {
    setVisible(false);
  }

  const showCheckModal = ({ onClose, isCorrect }) => {
    isCorrectRef.current = isCorrect;
    onceClose.current = onClose;
    setVisible(true);
  }

  return (
    <CheckModalContext.Provider value={{
      showCheckModal,
      checkModalVisible: visible
    }}>
      <CheckModal
        visible={visible}
        isCorrect={isCorrectRef.current}
        onButtonPress={handleButtonPress}
      />
      {children}
    </CheckModalContext.Provider>
  )
}


/**
 * @typedef {object} useCheckModalType
 * @property {(options: { onClose: () => void, isCorrect: boolean }) => void} showCheckModal
 * @property {boolean} checkModalVisible
 */