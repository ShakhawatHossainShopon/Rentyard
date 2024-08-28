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

export const SelectMultipleVideos = ({
  data,
  loading,
  video,
  setFieldValue,
  name,
  setVideo,
  closeModal,
  handleVideoChange,
}) => {
  const [checkedIds, setCheckedIds] = useState([]);
  const [tempVideos, setTempVideos] = useState([]);
  const filteredVideos = data.filter((video) => video.type === "videos");

  useEffect(() => {
    setCheckedIds((prev) => [...prev, ...video.map((item) => item.assetId)]);
  }, []);

  const handleCheck = (event, item) => {
    if (event.target.checked) {
      setCheckedIds((prev) => [...prev, item.assetId]);
      setTempVideos([...tempVideos, item]);
    } else {
      setCheckedIds((prev) => prev.filter((id) => id !== item.assetId));
      setTempVideos((prev) => prev.filter((link) => link !== item));
    }
  };

  const handleSelect = () => {
    if (video.length > 0) {
      setVideo((prev) => [...prev, ...tempVideos]);
    } else {
      setVideo(tempVideos);
    }
    setFieldValue(name, [...video.map((item) => item.assetId), ...checkedIds]);
    closeModal();
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">All Videos</h4>
      <div className="min-h-[150px] flex justify-start items-center space-x-5 overflow-x-scroll no-scrollbar">
        {!loading && filteredVideos.length > 0 ? (
          <Carousel responsive={responsive} infinite={true} className="w-full">
            {filteredVideos.map((item) => (
              <div
                key={item.assetId}
                className="w-fit relative overflow-hidden rounded-lg border border-blue-500"
              >
                <video controls>
                  <source src={`${config.url.ASSET_URL}${item.link}`} />
                </video>

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
            <p className="">No Video found...</p>
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
            onChange={handleVideoChange}
            type="file"
            id={name}
            multiple
            hidden
            className=""
            accept={"video/mp4, video/avi, video/mkv, video/mov"}
          />
        </div>
        <Button type="button" onClick={handleSelect}>
          Choose Video
        </Button>
      </div>
    </div>
  );
};
