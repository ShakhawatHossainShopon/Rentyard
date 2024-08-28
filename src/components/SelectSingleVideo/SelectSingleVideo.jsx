import { config } from "@/config";
import { Icons } from "@/utils";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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

export const SelectSingleVideo = ({
  data,
  loading,
  setFieldValue,
  name,
  setVideo,
  closeModal,
  handleImageChange,
}) => {
  const [checkedId, setCheckedId] = useState(null);
  const [asset, setAsset] = useState(null);
  const filteredVideos = data.filter((video) => video.type === "videos");

  const handleCheck = (event, idx) => {
    if (event.target.checked) {
      setCheckedId(idx.assetId);
      setAsset(idx);
    } else {
      setCheckedId(null);
    }
  };
  const handleSelect = () => {
    setVideo(asset);
    setFieldValue(name, checkedId);
    closeModal();
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">All Videos</h4>
      <div className="min-h-[150px] flex justify-start items-center space-x-5 overflow-x-scroll no-scrollbar">
        {loading ? (
          <div className="w-full flex justify-center items-center h-max">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : filteredVideos.length > 0 ? (
          <Carousel responsive={responsive} infinite={true} className="w-full">
            {filteredVideos.map((item) => (
              <div
                key={item.assetId}
                className="w-fit relative overflow-hidden rounded-lg border border-blue-500"
              >
                <video controls>
                  <source src={`${config.url.ASSET_URL}${item.link}`} />
                </video>
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
            accept={"video/mp4"}
          />
        </div>
        <Button onClick={handleSelect}>Choose Photo</Button>
      </div>
    </div>
  );
};
