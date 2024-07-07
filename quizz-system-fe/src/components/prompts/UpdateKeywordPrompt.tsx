import { useAppDispatch } from "@redux/hooks";
import { getKeywordById, getKeywords, updateKeyword } from "@main/features/slices/keywords.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type UpdateKeywordPromptProps = {
  display: boolean;
  closeModal: () => void;
  edittingKeywordId: number | undefined
};

export const UpdateKeywordPrompt = ({
  display,
  closeModal,
  edittingKeywordId
}: UpdateKeywordPromptProps) => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (edittingKeywordId) {
      dispatch(getKeywordById(edittingKeywordId))
        .then(unwrapResult)
        .then(({ keyword, description }) => {
          setKeyword(keyword)
          setDescription(description)
        })
    }

    return () => {
      setKeyword('')
      setDescription('')
    }
  }, [edittingKeywordId, dispatch])

  const onSubmitClick = () => {
    dispatch(
      updateKeyword({
        keywordId: edittingKeywordId!,
        keyword,
        description,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(getKeywords())
        dispatch(showMessageDialog("Chỉnh sửa từ khóa thành công"));
        closeModal();
      });
  };

  return (
    <Modal centered show={display} onHide={closeModal} fade>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa từ khóa</Modal.Title>
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
