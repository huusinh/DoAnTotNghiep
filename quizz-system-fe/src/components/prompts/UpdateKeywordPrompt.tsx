import { useAppDispatch } from "@redux/hooks";
import {
  getKeywordById,
  getKeywords,
  updateKeyword,
} from "@main/features/slices/keywords.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type UpdateKeywordPromptProps = {
  display: boolean;
  closeModal: () => void;
  edittingKeywordId: number | undefined;
};

export const UpdateKeywordPrompt = ({
  display,
  closeModal,
  edittingKeywordId,
}: UpdateKeywordPromptProps) => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");

  const internalCloseModal = () => {
    setKeyword("")
    closeModal();
  }

  useEffect(() => {
    if (edittingKeywordId) {
      dispatch(getKeywordById(edittingKeywordId))
        .then(unwrapResult)
        .then(({ keyword }) => {
          setKeyword(keyword);
        });
    }
  }, [edittingKeywordId, dispatch]);

  const onSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(
      updateKeyword({
        keywordId: edittingKeywordId!,
        keyword,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(getKeywords());
        dispatch(showMessageDialog("Chỉnh sửa từ khóa thành công"));
        internalCloseModal();
      });
  };

  return (
    <Modal centered show={display} onHide={internalCloseModal}>
      <Form onSubmit={onSubmitClick}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa từ khóa</Modal.Title>
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
