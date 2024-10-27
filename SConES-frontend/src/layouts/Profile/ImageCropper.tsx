import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { Button, Grid, Typography } from "@mui/material";
import { DebounceEffect } from "./DebounceEffect";
import { canvasPreview } from "./canvasPreview";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropper({ updateAvatar, closeModal }: any) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  DebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  return (
    <Grid container spacing={2} columnSpacing={{ md: 3 }}>
      {/* Scale and rotate */}
      <Grid item xs>
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <Typography>Scale: </Typography>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <Typography>Rotate: </Typography>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <Button variant="contained" onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </Button>
        </div>
      </Grid>
      {/* Image */}
      <Grid item xs={12} sm={6}>
        {/* Crop element */}
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            circularCrop
            aspect={aspect}
            minWidth={100}
            minHeight={50}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{
                maxWidth: "100%",
                maxHeight: "50vh",
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <>
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  if (imgRef.current && previewCanvasRef.current) {
                    canvasPreview(
                      imgRef.current,
                      previewCanvasRef.current,
                      completedCrop,
                      scale,
                      rotate
                    ).then(() => {
                      if (previewCanvasRef.current) {
                        const croppedImageUrl =
                          previewCanvasRef.current.toDataURL("image/png");
                        updateAvatar(croppedImageUrl);
                      }
                    });
                  }
                }}
              >
                Set Profile Picture
              </Button>
            </div>
          </>
        )}
      </Grid>
    </Grid>
  );
}
