import { useAppDispatch } from "@main/features/hooks";
import { createKeyword, getKeywords } from "@main/features/slices/keywords.slice";
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
  const [description, setDescription] = useState("");

  const onSubmitClick = () => {
    dispatch(
      createKeyword({
        keyword,
        description,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(getKeywords())
        dispatch(showMessageDialog("Tạo từ khóa thành công"));
        closeModal();
      });
  };

  return (
    <Modal centered show={display} onHide={closeModal} fade>
      <Modal.Header closeButton>
        <Modal.Title>Thêm từ khóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Từ khóa</Form.Label>
            <Form.Control
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mô tả từ khóa</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={onSubmitClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
