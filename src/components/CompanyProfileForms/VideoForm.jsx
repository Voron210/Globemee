import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import styles from "./ProfileForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const VideoForm = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "facts.videos",
  });

  return (
    <>
      <h3>Videos</h3>
      {fields.map((item, index) => (
        <div key={item.id} className={styles.videoItem}>
          <p>Link einfügen</p>
          <div className={styles.videoRow}>
            <input type="text" {...register(`facts.videos.${index}`)} />
            <DeleteOutlineIcon onClick={() => remove(index)} fontSize="large" />
          </div>
        </div>
      ))}
      <div>
        <button
          onClick={() => append("")}
          className={styles.video_button}
          type="button"
        >
          <AddIcon />
          Weiteres Video hinzufügen
        </button>
      </div>
    </>
  );
};

export default VideoForm;
