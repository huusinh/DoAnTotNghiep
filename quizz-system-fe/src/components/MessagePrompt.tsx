import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  closeMessageDialog,
  selectCurrentMessage,
} from "@redux/slices/messages.slice";

export const MessagePrompt = () => {
  const dispatch = useAppDispatch();
  const messageOption = useAppSelector(selectCurrentMessage);

  const closeModal = () => {
    dispatch(closeMessageDialog());
  }

  const handleClosePrimary = () => {
    closeModal()
    messageOption?.onPrimaryButtonClick?.();
  };

  const handleCloseSecondary = () => {
    closeModal()
    messageOption?.onSecondaryButtonClick?.();
  };

  return (
    <Modal
      show={messageOption !== undefined}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>{messageOption?.message ?? ""}</Modal.Body>
      <Modal.Footer>
        {messageOption?.secondaryButtonText && (
          <Button variant="secondary" onClick={handleCloseSecondary}>
            {messageOption?.secondaryButtonText}
          </Button>
        )}
        <Button variant="primary" onClick={handleClosePrimary}>
          {messageOption?.primaryButtonText ?? "Ok"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
