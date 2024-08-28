import { config } from "@/config";
import { Icons } from "@/utils";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ClipLoader } from "react-spinners";
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

export const SelectSingleImage = ({
  data,
  loading,
  setFieldValue,
  name,
  setPhoto,
  closeModal,
  handleImageChange,
}) => {
  const [checkedId, setCheckedId] = useState(null);
  const [image, setImage] = useState(null);
  const filteredImages = data.filter((image) => image.type === "images");

  const handleCheck = (event, idx) => {
    if (event.target.checked) {
      setCheckedId(idx.assetId);
      setImage(idx);
    } else {
      setCheckedId(null);
    }
  };
  const handleSelect = () => {
    setPhoto(image);
    setFieldValue(name, checkedId);
    closeModal();
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">All Image</h4>
      <div className="min-h-[150px] flex justify-start items-center space-x-5 overflow-x-scroll no-scrollbar">
        {loading ? (
          <div className="w-full flex justify-center items-center h-max">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : filteredImages.length > 0 ? (
          <Carousel responsive={responsive} infinite={true} className="w-full">
            {filteredImages.map((item) => (
              <div
                key={item.assetId}
                className="w-fit relative overflow-hidden rounded-lg border border-blue-500"
              >
                <LazyLoadImage
                  src={`${config.url.ASSET_URL}${item.link}`}
                  alt={item.filename}
                  loading="lazy"
                  className="h-32 w-32 rounded-lg object-cover hover:scale-110 transition-all duration-200 cursor-pointer"
                />
                {checkedId === item.assetId && (
                  <div className="absolute w-full h-full bg-white bg-opacity-50 top-0 right-0"></div>
                )}
                <button className="absolute right-0 top-0 bg-white rounded-full">
                  <Checkbox
                    checked={checkedId === item.assetId}
                    onChange={(e) => handleCheck(e, item)}
                  />
                </button>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="w-full text-center">
            <p>No Image found...</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-start items-center space-x-4">
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
