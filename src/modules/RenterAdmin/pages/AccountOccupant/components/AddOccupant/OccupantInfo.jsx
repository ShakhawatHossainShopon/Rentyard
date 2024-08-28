import { PopUp } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { deleteOccupant } from "@/services/occupant/occupant";
import { Icons } from "@/utils";
import { useState } from "react";
import Swal from "sweetalert2";
import { UpdateDependent } from "./components";

export const OccupantInfo = ({ item }) => {
  console.log(item);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const {
    type,
    relation,
    middle_name,
    work,
    first_name,
    last_name,
    date_of_birth,
    sex,
    marital_status,
    country_of_citizenship,
    date_of_birth_formatted,
    ssn,
    contact_number,
    govt_issued_id_type,
    govt_issued_id_number,
    issuing_city_state,
    govt_id_photo,
  } = item;

  const handleDeleteOccupant = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteOccupant(id));
      }
    });
  };

  return (
    <div className="md:flex justify-between items-center bg-white border border-gray-400 p-4 text-black">
      <div className="md:flex justify-start items-start md:space-x-20 font-medium">
        <ul>
          <li>
            Name: {first_name} {last_name}{" "}
          </li>
          <li>
            Date of Birth: {date_of_birth_formatted}{" "}
            <span className="text-xs">(MM-DD-YYYY)</span>{" "}
          </li>
          <li>Sex: {sex} </li>
          <li>Marital Status: {marital_status} </li>
          <li>Occupant type: {type} </li>
          <li>Relation: {relation} </li>
          <li>Social Security Number: {ssn} </li>
        </ul>
        <ul>
          <li>Country of Citizen: {country_of_citizenship} </li>
          <li>Govt. Issued Id Type: {govt_issued_id_type} </li>
          <li>Govt. Issued Id Number: {govt_issued_id_number} </li>
          <li>Expire Date: 12 June 2025</li>
          <li>Does He/She Work: {work === true ? "Yes" : "No"} </li>
          <li>Issuing Place: {issuing_city_state} </li>
          <li>
            Govt. Issued It Photo:{" "}
            <button className="underline" onClick={openModal}>
              View Image
            </button>{" "}
          </li>
        </ul>
      </div>
      <PopUp
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Govt. Issued It Photo"}
      >
        <img
          src={`${config.url.ASSET_URL}${
            govt_id_photo && govt_id_photo.link && govt_id_photo.link
          }`}
          alt="Govt ID"
        />
      </PopUp>
      <PopUp
        isOpen={isModalOpen2}
        onClose={closeModal2}
        title={"Update Dependent"}
      >
        <div className="px-4 py-4">
          <UpdateDependent item={item} />
        </div>
      </PopUp>
      <div className="space-y-4 text-xl flex md:block md:items-center">
        <Icons.Edit
          onClick={openModal2}
          className="my-4 mx-3 md:mx-0 md:my-0 cursor-pointer"
        />
        <Icons.Delete
          onClick={() => handleDeleteOccupant(item.occupantId)}
          className="text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
};
