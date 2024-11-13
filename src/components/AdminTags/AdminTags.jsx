import React, { useEffect, useMemo, useState } from "react";
import styles from "./AdminTags.module.css";
import { ClickAwayListener } from "@mui/material";
import DropdownWithSearch from "../../components/DropdownWithSearch/DropdownWithSearch";
import Fuse from "fuse.js";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetTagsQuery,
} from "../../appApi";
import axiosInstance from "../../lib/axios/AxiosConfig";

// const tagsList = [
//   "German B2",
//   "Title Fully Recognised",
//   "Elektroniker",
//   "Klimatechniker",
// ];

const Tag = ({ item, index, handleDeleteTag, handleTagSelect }) => {
  const [settigsVisible, setSettingsVisible] = useState(false);
  // console.log(item);

  return (
    <div className="row space-between center" key={index}>
      <p
        className="text-xs-medium white"
        onClick={() => handleTagSelect(item)}
        style={{ cursor: "pointer" }}
      >
        {item.name}
      </p>
      <div style={{ position: "relative" }}>
        <i
          className="material-symbols-outlined"
          style={{
            fontSize: "14px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setSettingsVisible(!settigsVisible);
          }}
        >
          more_horiz
        </i>
        {settigsVisible && (
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={() => setSettingsVisible(false)}
          >
            <div className={styles.tagSettings}>
              <div
                className={styles.settingsItem}
                onClick={() => handleDeleteTag(item.id)}
              >
                <i
                  style={{ fontSize: "14px", color: "white" }}
                  className="material-symbols-outlined"
                >
                  delete
                </i>
                <p className="text-xs-medium">Delete Tag</p>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

const TagsMenu = ({
  setVisible,
  tags,
  onDelete,
  handleTagSelect,
  onUpdate,
}) => {
  const { data: tagsList, error, isLoading } = useGetTagsQuery();
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Хуки для мутаций (создание и удаление тегов)
  const [createTag] = useCreateTagMutation();
  const [deleteTag] = useDeleteTagMutation();
  // console.log(tagsList);
  // console.log(searchResults);

  useEffect(() => {
    // Проверяем, отличаются ли tagsList и searchResults
    if (tagsList) {
      setSearchResults(tagsList);
      // console.log(tagsList);
    }
  }, [tagsList]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tags</div>;
  // console.log(tagsList);

  const fuse = new Fuse(tagsList, { keys: ["name"], threshold: 0.3 });

  const handleSearch = (e) => {
    const query = e.target.value;
    setInputValue(query);
    if (query) {
      const results = fuse.search(query).map((result) => result.item);
      setSearchResults(results);
    } else {
      setSearchResults(tagsList);
    }
  };

  const handleAddTag = async () => {
    if (!tagsList.some((tag) => tag.name === inputValue) && inputValue) {
      try {
        // Создаем новый тег и получаем обновленные данные
        const newTag = await createTag(inputValue).unwrap();

        // Обновляем кэшированный список тегов
        // appApi.util.updateQueryData("getTags", undefined, (draft) => {
        //   draft.push(newTag); // Добавляем новый тег в кэш
        // });

        setInputValue("");
      } catch (error) {
        // console.error("Failed to create tag", error);
      }
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      // Удаляем тег и получаем обновленные данные
      const deletedTagId = await deleteTag(tagId).unwrap();

      // Обновляем кэшированный список тегов
      // appApi.util.updateQueryData("getTags", undefined, (draft) => {
      //   return draft.filter((tag) => tag.id !== deletedTagId); // Удаляем тег из кэша
      // });
      onUpdate(0, tagId, "remove");
    } catch (error) {
      // console.error("Failed to delete tag", error);
    }
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setVisible(false)}
    >
      <div className={styles.tagsMenu}>
        <div className={styles.tagsWrapper}>
          {tags.map((item, index) => (
            <div
              className={styles.tagsItem}
              key={index}
              // onClick={() => console.log(item)}
            >
              <p className="text-xs-medium">{item.name}</p>
              <i
                className="material-symbols-outlined"
                style={{ fontSize: "16px", cursor: "pointer" }}
                onClick={() => onDelete(item)}
              >
                close
              </i>
            </div>
          ))}
        </div>
        <div className={styles.inputWrapper}>
          <i className={`${styles.search_icon} material-symbols-outlined`}>
            search
          </i>
          <input
            type="text"
            value={inputValue}
            placeholder={"Create or find Tags"}
            className={styles.dropdownButton}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.tagsList}>
          {searchResults.map((item) => (
            <Tag
              item={item}
              key={item.id}
              handleDeleteTag={handleDeleteTag}
              handleTagSelect={handleTagSelect}
            />
          ))}
          {inputValue && (
            <button
              className="primary small"
              type="button"
              onClick={() => handleAddTag()}
            >
              + Create as a new Tag
            </button>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

const AdminTags = ({ id, tags = [], onUpdate }) => {
  // const tags = ["German B1", "Title Partly Recognised"];
  const [visible, setVisible] = useState(false);

  const handleTagSelect = async (tag) => {
    const tagExists = tags.some((t) => t.id === tag.id);
    if (tagExists) {
      return;
    }
    try {
      const response = await axiosInstance.post(`a_common/tags/talent/set`, {
        user_id: id,
        tag_id: tag.id,
      });
      onUpdate(id, tag, "post");
    } catch (error) {}
  };

  const onDelete = async (tag) => {
    const tagExists = tags.some((t) => t.id === tag.id);
    if (!tagExists) {
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `a_common/tags/talent/remove`,
        {
          data: {
            user_id: id,
            tag_id: tag.id,
          },
        }
      );
      onUpdate(id, tag, "delete");
    } catch (error) {}
  };

  return (
    <div className={styles.tagsWrapper}>
      <p className="text-xs-medium">Tags:</p>
      {tags.map((item, index) => (
        <div key={index} className={styles.tagsItem}>
          <p className="text-xs-medium">{item.name}</p>
          <i
            onClick={() => onDelete(item)}
            className="material-symbols-outlined"
            style={{ fontSize: "16px", cursor: "pointer" }}
          >
            close
          </i>
        </div>
      ))}
      <div style={{ position: "relative" }}>
        <button
          className={styles.addBtn}
          type="button"
          onClick={() => setVisible(!visible)}
        >
          <i className="material-symbols-outlined">add</i>
        </button>
        {visible && (
          <TagsMenu
            setVisible={setVisible}
            tags={tags}
            onDelete={onDelete}
            handleTagSelect={handleTagSelect}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminTags;
