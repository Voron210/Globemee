import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../lib/axios/AxiosConfig";
import styles from "./AdminComment.module.css";

const AdminComment = ({ type, id, comments, onUpdate }) => {
  const [newComment, setNewComment] = useState();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const textAreaRef = useRef(null);

  const handleNewComment = async () => {
    try {
      const response = await axiosInstance.post(`a_common/comment`, {
        companyId: `${type === "company" ? id : "null"}`,
        jobOfferId: `${type === "jobOffer" ? id : "null"}`,
        talentUserId: `${type === "talent" ? id : "null"}`,
        comment: newComment,
      });
      setNewComment("");
      onUpdate();
    } catch (error) {}
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(`a_common/comment`, {
        data: {
          companyId: `${type === "company" ? id : "null"}`,
          jobOfferId: `${type === "jobOffer" ? id : "null"}`,
          talentUserId: `${type === "talent" ? id : "null"}`,
          commentId: `${commentId}`,
        },
      });
      onUpdate();
    } catch (error) {}
  };

  const handleEditComment = (commentId, currentComment) => {
    setEditingCommentId(commentId);
    setEditComment(currentComment);
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    if (textAreaRef.current) {
      autoResizeTextarea(textAreaRef.current);
    }
  }, [editComment]);

  const handleSaveEditComment = async (commentId) => {
    try {
      await axiosInstance.patch(`a_common/comment`, {
        companyId: `${type === "company" ? id : "null"}`,
        jobOfferId: `${type === "jobOffer" ? id : "null"}`,
        talentUserId: `${type === "talent" ? id : "null"}`,
        commentId: commentId,
        comment: editComment,
      });
      setEditingCommentId(null);
      setEditComment("");
      onUpdate();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  return (
    <div className={styles.commentWrapper}>
      <h3 id="comment">Kommentare</h3>
      <div className={styles.inputWrapper}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Kommentieren"
          style={{ height: "90px" }}
        />
        <div className="end">
          <button
            type="button"
            className="secondary small"
            onClick={() => handleNewComment()}
            style={{ width: "250px" }}
          >
            Kommentar speichern
          </button>
        </div>
      </div>
      <div className={styles.comment_list}>
        {comments &&
          Array.isArray(comments) &&
          [...comments].reverse().map((item, index) => (
            <div key={index} className={styles.comment_item}>
              {editingCommentId === item.commentId ? (
                <div className="column gap-16">
                  <textarea
                    ref={textAreaRef}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  />
                  <div className="row end">
                    <button
                      className="secondary small"
                      type="button"
                      onClick={() => handleSaveEditComment(item.commentId)}
                    >
                      Speichern
                    </button>
                    <button
                      type="button"
                      className="tertiary small"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{item.comment}</p>
                  <div className="row space-between center">
                    <p>{item.commentDate}</p>
                    <div className="row">
                      <button
                        className="tertiary small"
                        type="button"
                        onClick={() =>
                          handleEditComment(item.commentId, item.comment)
                        }
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="tertiary small"
                        type="button"
                        onClick={() => handleDeleteComment(item.commentId)}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminComment;
