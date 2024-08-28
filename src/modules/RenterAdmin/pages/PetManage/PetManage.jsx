import { AdminHeader, Button, Input, Select } from "@/components";
import { useAppDispatch, useGetAllPetSelector, useScrollToTop } from "@/hooks";
import { addPet, deletePet, getAllPet } from "@/services/pet/pet";
import { Checkbox } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { InfoCard } from "../../components";

const initialValues = {
  type: "",
  breed: "",
  weight: "",
};

const validationSchema = Yup.object({
  type: Yup.string().required("Required!"),
  breed: Yup.string().required("Required!"),
  weight: Yup.number().required("Required!"),
});

const PetManage = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllPetSelector();
  console.log(data);
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(addPet(values));
    resetForm();
  };

  useEffect(() => {
    dispatch(getAllPet());
  }, []);

  useScrollToTop();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Pet Manager"} />
      <div className="w-full p-4 space-y-10">
        {!loading && data ? (
          <div className="grid grid-cols-3 gap-6">
            {data.map((item) => {
              return (
                <InfoCard
                  onClick={() => dispatch(deletePet(item.petId))}
                  key={item.petId}
                  isCloseBtn={true}
                  title={item.type}
                  className={"flex flex-col justify-center items-center"}
                >
                  <ul className="list-disc">
                    <li>Breed- {item.breed} </li>
                    <li>Weight: {item.weight}lbs</li>
                  </ul>
                </InfoCard>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold flex justify-start items-center space-x-2">
            <span>Add Pet</span>
            {/* <span
              onClick={openModal}
              className="text-sm text-blue-500 underline cursor-pointer"
            >
              View Pet Fees & Policy
            </span>
            <PopUp
              isOpen={isModalOpen}
              onClose={closeModal}
              title={"Pet Policy"}
            >
              <PetPolicyPopUp />
            </PopUp> */}
          </h2>
          <hr className="my-5" />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="space-y-5">
              <div className="md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Select
                  name={"type"}
                  required={true}
                  label={"Pet Type"}
                  options={[
                    {
                      label: "Select Pet",
                      value: "",
                    },
                    {
                      value: "Dog",
                      label: "Dog",
                    },
                    {
                      value: "Cat",
                      label: "Cat",
                    },
                    {
                      value: "Others",
                      label: "Others",
                    },
                  ]}
                  className={"w-full px-2 py-2"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Input
                  required={true}
                  label={"Breed"}
                  placeholder={"Bulldog"}
                  name={"breed"}
                  className={"py-2 px-2 bg-white"}
                />
                <Input
                  required={true}
                  label={"Weight"}
                  placeholder={"20lbs"}
                  type="number"
                  name={"weight"}
                  className={"py-2 px-2 bg-white"}
                />
              </div>
              <div>
                <Checkbox label="Accepts pet policy" />
              </div>
              <Button type={"submit"}>Add Now</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PetManage;
