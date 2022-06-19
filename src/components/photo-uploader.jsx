import defaulImage from "/images/upload-image.jpeg";
import React, { useState } from "react";
import { API_DOMAIN } from "../js/constant";
const PhotoUploader = ({ value, onChange }) => {
  const selectPhoto = async (event) => {
    var data = new FormData();
    data.append("photo", event.target.files[0]);

    fetch(`${API_DOMAIN}/upload/photo`, {
      method: "POST",
      body: data,
    })
      .then((body) => body.json())
      .then((resp) => {
        onChange(resp?.data?.url);
      });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${value || defaulImage})`,
        height: "150px",
        backgroundPosition: "center",
        padding: "0 5px",
        borderRadius: "10px",
      }}
    >
      <input
        type="file"
        accept="image/*;capture=camera"
        style={{ opacity: 0, width: "100%", height: "100%" }}
        onChange={selectPhoto}
      ></input>
    </div>
  );
};
export default PhotoUploader;
