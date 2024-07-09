import { useAppDispatch } from "@main/features/hooks";
import {
  createKeyword,
  getKeywords,
} from "@main/features/slices/keywords.slice";
import { showMessageDialog } from "@main/features/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type AddKeywordPromptProps = {
  display: boolean;
  closeModal: () => void;
};

export const AddKeywordPrompt = ({
  display,
  closeModal,
}: AddKeywordPromptProps) => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");

  const onSubmitClick = () => {
    dispatch(
      createKeyword({
        keyword,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(getKeywords());
        dispatch(showMessageDialog("Tạo từ khóa thành công"));
        closeModal();
      });
  };

  return (
    <Modal centered show={display} onHide={closeModal}>
      <Form onSubmit={onSubmitClick}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm từ khóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Từ khóa</Form.Label>
            <Form.Control
              type="text"
              value={keyword}
              required
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
