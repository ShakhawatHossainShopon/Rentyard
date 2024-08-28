import { config } from "@/config";
import { Icons } from "@/utils";
import { Checkbox } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "../ui";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const SelectMultipleImages = ({
  data,
  loading,
  photo,
  setFieldValue,
  name,
  setPhoto,
  closeModal,
  handleImageChange,
}) => {
  const [tempImages, setTempImages] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const filteredImages = data.filter((image) => image.type === "images");

  useEffect(() => {
    setCheckedIds((prev) => [...prev, ...photo.map((item) => item.assetId)]);
  }, []);

  const handleCheck = (event, item) => {
    if (event.target.checked) {
      setCheckedIds((prev) => [...prev, item.assetId]);
      setTempImages([...tempImages, item]);
    } else {
      setCheckedIds((prev) => prev.filter((id) => id !== item.assetId));
      setTempImages((prev) => prev.filter((link) => link !== item));
    }
  };

  const handleSelect = () => {
    if (photo.length > 0) {
      setPhoto((prev) => [...prev, ...tempImages]);
    } else {
      setPhoto(tempImages);
    }
    setFieldValue(name, [...photo.map((item) => item.assetId), ...checkedIds]);
    closeModal();
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">All Image</h4>
      <div className="min-h-[150px] flex justify-start items-center space-x-5 overflow-x-scroll no-scrollbar">
        {!loading && filteredImages.length > 0 ? (
          <Carousel responsive={responsive} infinite={true} className="w-full">
            {filteredImages.map((item) => (
              <div
                key={item.assetId}
                className="w-fit relative overflow-hidden rounded-lg border border-blue-500"
              >
                <img
                  key={item.assetId}
                  src={`${config.url.ASSET_URL}${item.link}`}
                  alt={item.filename}
                  loading="lazy"
                  className="h-32 w-32 rounded-lg object-cover hover:scale-110 transition-all duration-200 cursor-pointer"
                />
                {checkedIds.includes(item.assetId) && (
                  <div className="absolute w-full h-full bg-white bg-opacity-50 top-0 right-0"></div>
                )}
                <button className="absolute right-0 top-0 bg-white rounded-full">
                  <Checkbox
                    checked={checkedIds.includes(item.assetId)}
                    onChange={(e) => handleCheck(e, item)}
                  />
                </button>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="w-full text-center">
            <p className="">No Image found...</p>
          </div>
        )}
      </div>
      <div className="flex justify-start items-center space-x-4 w-full">
        <div>
          <label
            htmlFor={name}
            className="flex justify-start items-center space-x-2 border border-blue-500 p-2 w-fit cursor-pointer"
          >
            {" "}
            <Icons.Upload /> <span>Upload From Device</span>{" "}
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id={name}
            multiple
            hidden
            className=""
            accept={"image/jpeg, image/png, image/jpg"}
          />
        </div>
        <Button onClick={handleSelect}>Choose Photo</Button>
      </div>
    </div>
  );
};
