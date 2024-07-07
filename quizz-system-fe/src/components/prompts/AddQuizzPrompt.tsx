import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getKeywordsSelect,
  selectKeywordsDropdown,
} from "@main/features/slices/keywords.slice";
import { showMessageDialog } from "@main/features/slices/messages.slice";
import { addQuizz, getQuizzList } from "@main/features/slices/quizz.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";

type AddQuizzPromptProps = {
  display: boolean;
  closeModal: () => void;
};

export const AddQuizzPrompt = ({
  display,
  closeModal,
}: AddQuizzPromptProps) => {
  const dispatch = useAppDispatch();
  const keywordsDropdown = useAppSelector(selectKeywordsDropdown);

  const [name, setName] = useState("");
  const [contestRule, setContestRule] = useState("");
  const [maxTeams, setMaxTeams] = useState("1");
  const [maxKeywords, setMaxQuestions] = useState("0");

  const [teamName, setTeamName] = useState<string[]>([""]);
  const [teamKeywords, setTeamKeywords] = useState<number[][]>([[]]);

  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");

  const [selectedKeywords, setSelectedKeywords] = useState<Set<number>>(
    new Set<number>()
  );

  const onSubmitClick = () => {
    const teamList: Record<string, number[]> = {};

    for (let i = 0; i < teamName.length; i++) {
      teamList[`${teamName[i]}`] = teamKeywords[i];
    }

    dispatch(
      addQuizz({
        competitionName: name,
        maxTeamCount: Number(maxTeams) ?? 0,
        maxQuestionCount: Number(maxKeywords) ?? 0,
        contestTime: Number(minute) * 60 + Number(second),
        creatorId: 1,
        contestRule,
        teamList,
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(getQuizzList());
        closeModal();
      });
  };

  const updateTeamName = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTeamName = [...teamName];
      newTeamName[index] = e.target.value;
      setTeamName(newTeamName);
    };
  };

  const updateTeamKeywords = (teamIndex: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const keywordId = Number(e.target.value);
      const newTeamKeywords = teamKeywords;
      let newSelectedKeywords = [...selectedKeywords];
      if (e.target.checked) {
        newTeamKeywords[teamIndex].push(keywordId);
        newSelectedKeywords.push(keywordId);
      } else {
        newTeamKeywords[teamIndex] = teamKeywords[teamIndex].filter(
          (keywordId) => keywordId !== keywordId
        );
        newSelectedKeywords = newSelectedKeywords.filter(
          (keywordId) => keywordId !== keywordId
        );
      }
      if (newTeamKeywords[teamIndex].length === (Number(maxKeywords) ?? 0)) {
        dispatch(showMessageDialog("Bạn đã chọn đủ từ khóa tối đa"));
      }
      setTeamKeywords(newTeamKeywords);
      setSelectedKeywords(new Set<number>(newSelectedKeywords));
    };
  };

  useEffect(() => {
    dispatch(getKeywordsSelect());

    return () => {
      setName("");
      setMaxTeams("1");
      setMaxQuestions("0");
      setTeamName([""]);
    };
  }, [dispatch]);

  return (
    <Modal
      scrollable
      centered
      show={display}
      fade
      onHide={closeModal}
      className="modal-form"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên cuộc thi</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Luật lệ</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              value={contestRule}
              onChange={(e) => setContestRule(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="row">
            <div className="col-6">
              <Form.Label>Số đội tối đa</Form.Label>
              <Form.Control
                type="text"
                value={maxTeams}
                onChange={(e) => {
                  const newMaxTeams = Number(e.target.value);

                  if (newMaxTeams) {
                    const maxTeamsNumber = Number(maxTeams) ?? 0;

                    if (newMaxTeams > maxTeamsNumber) {
                      const newTeamName = Array.from(
                        { length: newMaxTeams - maxTeamsNumber },
                        () => ""
                      );
                      const newTeamKeywords = Array.from(
                        { length: newMaxTeams - maxTeamsNumber },
                        () => [] as number[]
                      );
                      setTeamName([...teamName, ...newTeamName]);
                      setTeamKeywords([...teamKeywords, ...newTeamKeywords]);
                    } else {
                      setTeamName(teamName.slice(0, newMaxTeams));
                      setTeamKeywords(teamKeywords.slice(0, newMaxTeams));
                    }
                  }

                  setMaxTeams(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key !== "Backspace" && Number.isNaN(Number(e.key))) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="col-6">
              <Form.Label>Số lượng từ khóa tối đa</Form.Label>
              <Form.Control
                type="text"
                value={maxKeywords}
                onChange={(e) => setMaxQuestions(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key !== "Backspace" && Number.isNaN(Number(e.key))) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </Form.Group>
          <div className="row">
            {Array.from({ length: Number(maxTeams) ?? 0 }, (_, i) => i).map(
              (teamIndex) => (
                <div className="col-4">
                  <h3>Team {teamIndex + 1}</h3>
                  <Form.Group>
                    <Form.Label>Tên đội</Form.Label>
                    <Form.Control
                      type="text"
                      value={teamName[teamIndex]}
                      onChange={updateTeamName(teamIndex)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Từ khóa</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle>Chọn từ khóa</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <form>
                          {keywordsDropdown.map((keyword, keywordIndex) => (
                            <Dropdown.ItemText
                              key={`${teamIndex}-${keywordIndex}`}
                            >
                              <div className="form-check">
                                <input
                                  id={`${teamIndex}-${keywordIndex}`}
                                  type="checkbox"
                                  name={`${teamIndex}-${keywordIndex}`}
                                  className="form-check-input"
                                  value={keyword.id!}
                                  checked={teamKeywords[teamIndex]?.includes(
                                    keyword.id!
                                  )}
                                  disabled={
                                    selectedKeywords.has(keyword.id!) &&
                                    !teamKeywords[teamIndex]?.includes(
                                      keyword.id!
                                    )
                                  }
                                  onChange={updateTeamKeywords(teamIndex)}
                                />
                                <label
                                  style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    msUserSelect: "none",
                                  }}
                                  htmlFor={`${teamIndex}-${keywordIndex}`}
                                >
                                  {keyword.keyword}
                                </label>
                              </div>
                            </Dropdown.ItemText>
                          ))}
                        </form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </div>
              )
            )}
          </div>
          <Form.Group>
            <Form.Label>Thời gian</Form.Label>
            <div className="row">
              <div className="col-2">
                <Form.Control
                  type="text"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key !== "Backspace" && Number.isNaN(Number(e.key))) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <span className="d-flex align-items-center">Phút</span>

              <div className="col-2">
                <Form.Control
                  type="text"
                  value={second}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setSecond('')
                    } else {
                      const newValue = Math.min(Number(e.target.value), 59);
                      setSecond(newValue.toString());
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key !== "Backspace" && Number.isNaN(Number(e.key))) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <span className="d-flex align-items-center">Giây</span>
            </div>
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