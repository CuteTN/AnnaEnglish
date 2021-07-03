import React, { useEffect } from 'react'
import CompleteModal from './CompleteModal';

const CompleteModalContext = React.createContext();

/**
 * @returns {useCompleteModalType}
 */
export const useCompleteModal = () => {
  return React.useContext(CompleteModalContext)
}


export const CompleteModalProvider = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const onceClose = React.useRef(null);

  useEffect(() => {
    if (!visible) {
      onceClose.current?.();
      onceClose.current = null;
    }
  }, [visible])

  const handleButtonPress = () => {
    setVisible(false);
  }

  const showCompleteModal = ({ onClose }) => {
    setVisible(true);
    onceClose.current = onClose;
  }

  return (
    <CompleteModalContext.Provider value={{
      showCompleteModal,
      completeModalVisible: visible
    }}>
      <CompleteModal
        visible={visible}
        onButtonPress={handleButtonPress}
      />
      {children}
    </CompleteModalContext.Provider>
  )
}


/**
 * @typedef {object} useCompleteModalType
 * @property {(options: { onClose: () => void }) => void} showCompleteModal
 * @property {boolean} completeModalVisible
 */