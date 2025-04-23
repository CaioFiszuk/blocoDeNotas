import Modal from 'react-modal';

Modal.setAppElement('#root');

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Popup({ isOpen, onClose, children }: PopupProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      overlayClassName="popup__overlay" 
      className="popup__content" 
    >
      {children}
    </Modal>
  );
}

export default Popup;