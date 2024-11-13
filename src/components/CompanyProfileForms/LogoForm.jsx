import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { useFormContext } from "react-hook-form";

// Утилитные функции для загрузки изображения и преобразования углов
const createImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const getRadianAngle = (degreeValue) => (degreeValue * Math.PI) / 180;

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      },
      "image/jpeg",
      1
    );
  });
};

const LogoForm = ({ logo, command, onCommandExecuted, onCrop }) => {
  const { setValue } = useFormContext();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [blobURL, setBlobURL] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(logo, croppedAreaPixels);
      const fileName = logo.name || "CroppedImage.jpg";
      setValue("facts.documents.logo.file", croppedImage);
      setValue("facts.documents.logo.name", fileName);
      onCrop();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, logo, setValue, onCrop]);

  useEffect(() => {
    if (command) {
      showCroppedImage();
      onCommandExecuted();
    }
  }, [command, showCroppedImage, onCommandExecuted]);

  useEffect(() => {
    if (blobURL) {
      URL.revokeObjectURL(blobURL);
    }
    const newBlobURL = URL.createObjectURL(logo);
    setBlobURL(newBlobURL);

    return () => {
      URL.revokeObjectURL(newBlobURL);
    };
  }, [logo]);

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: 400 }}>
        <Cropper
          image={blobURL}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );
};

export default LogoForm;
