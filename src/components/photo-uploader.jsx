import { f7 } from "framework7-react";
import React from "react";
import { uploadImage } from "../js/api";
import defaulImage from "/images/upload-image.jpeg";
import { resizeImage } from "../js/image-utlils";
const PhotoUploader = ({ value, onChange }) => {
  const selectPhoto = async (event) => {
    let srcFile = event.target.files[0];
    let image = await resizeImage({
      file: srcFile,
      maxSize: 1024,
    });
    let uploadFile = new File([image], srcFile.name, {
      type: srcFile.type,
      lastModified: new Date().getTime(),
    });
    // console.log(uploadFile, srcFile);
    var data = new FormData();
    data.append("photo",uploadFile);
    let resp = await uploadImage(data);
    if (resp?.data?.url) {
      onChange(resp?.data?.url);
    } else {
      f7.dialog.alert(
        "Tải lên file không thành công. (Lỗi: " + resp.message + ")"
      );
    }
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
