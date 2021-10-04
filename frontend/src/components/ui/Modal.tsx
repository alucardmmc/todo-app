import ReactDOM from 'react-dom'

import './Modal.css'

const classes = {
  modalBack: 'modal-background',
  modalContainer: 'modal-container',
  modalButton: 'modal-button'
}

interface Props {
  open: boolean;
  onClose: any;
  children: JSX.Element;
}

const Modal:React.FC<Props> = ({open, onClose, children}) => {
  if (!open) return null

  return ReactDOM.createPortal(
    <div className={classes.modalBack} onClick={onClose}>
      <div className={classes.modalContainer} onClick={e => {e.stopPropagation()}}>
        <button className={classes.modalButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

export default Modal

