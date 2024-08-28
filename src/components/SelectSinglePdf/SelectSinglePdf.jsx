import { Icons } from "@/utils";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui";

export const SelectSinglePdf = ({
  data,
  loading,
  setFieldValue,
  name,
  closeModal,
  handleImageChange,
}) => {
  const [checkedId, setCheckedId] = useState(null);
  const filteredPdf = data.filter((pdf) => pdf.type === "pdf");

  const handleCheck = (event, idx) => {
    if (event.target.checked) {
      setCheckedId(idx.assetId);
    } else {
      setCheckedId(null);
    }
  };
  const handleSelect = () => {
    console.log(name, checkedId);
    setFieldValue(name, checkedId);
    closeModal();
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">All Pdf</h4>
      <ul className="min-h-[150px] flex flex-col justify-start items-start overflow-y-scroll ">
        {loading ? (
          <div className="w-full flex justify-center items-center h-max">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : filteredPdf.length > 0 ? (
          filteredPdf.map((item) => (
            <div
              key={item.assetId}
              className="w-fit flex justify-center items-center space-x-2 overflow-hidden rounded-lg"
            >
              <li> {item.filename} </li>
              <button className="bg-white rounded-full">
                <Checkbox
                  checked={checkedId === item.assetId}
                  onChange={(e) => handleCheck(e, item)}
                />
              </button>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            <p>No Pdf found...</p>
          </div>
        )}
      </ul>
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
            accept={"application/pdf"}
          />
        </div>
        <Button onClick={handleSelect}>Choose Photo</Button>
      </div>
    </div>
  );
};
