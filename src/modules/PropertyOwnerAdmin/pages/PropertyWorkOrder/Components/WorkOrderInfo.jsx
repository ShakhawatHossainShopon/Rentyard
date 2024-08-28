import { Button, Imageslider, Input, Modal, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { updateWorkOrder } from "@/services/workOrder/workOrder";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
const initialValues = {
  status: "",
  working_time: "",
  fixer: "",
};

const validationSchema = Yup.object({
  status: Yup.string().required("Required!"),
  // working_time: Yup.string().required("Required!"),
  // fixer: Yup.string().required("Required!"),
});

export const WorkOrderInfo = ({ item, history, historyData }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    console.log(values);
    dispatch(
      updateWorkOrder({
        ...values,
        propertyId:
          item &&
          item.property &&
          item.property.propertyId &&
          item.property.propertyId,
        workOrderId: item && item.workOrderId && item.workOrderId,
      })
    );
  };
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const OpenGallery = () => {
    setIsModalOpenGallery(true);
  };

  const CloseModal = () => {
    setIsModalOpenGallery(false);
  };
  return (
    <div className="md:p-4 p-0">
      <div className="md:flex justify-between items-center">
        <div>
          <p className="text-sm">
            <span className="font-semibold">Name: </span>
            {item && item.user_name && item.user_name}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Unit: </span>
            {item && item.apartment && item.apartment.unit_number}(
            {item && item.apartment && item.apartment.type})
          </p>
          <p className="text-sm">
            <span className="font-semibold">Contact: </span>
            {item && item.contact_number && item.contact_number}
          </p>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-semibold">Pet: </span>
            {item && item.pet && item.pet}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Entry Permission: </span>
            {item && item.permission && item.permission}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Entry Time: </span>
            {item && item.time && item.time}
          </p>
        </div>
        <div className="space-y-1">
          <p className="md:text-lg text-sm">
            {" "}
            {item &&
              item.property &&
              item.property.name &&
              item.property.name}{" "}
          </p>
          <div className="flex justify-start items-start space-x-2">
            <p className="text-gray-700 text-base pt-0.5">
              <Icons.Location className="text-blue-700" />{" "}
            </p>
            <p className="text-gray-700 text-base flex flex-col items-start justify-center">
              <span className="text-sm">
                {" "}
                {item &&
                  item.property &&
                  item.property.address &&
                  item.property.address}
                ,
              </span>
              <span className="text-sm">
                {" "}
                {item &&
                  item.property &&
                  item.property.city &&
                  item.property.city}
                ,{" "}
                {item &&
                  item.property &&
                  item.property.state &&
                  item.property.state}
                ,{" "}
                {item &&
                  item.property &&
                  item.property.zip &&
                  item.property.zip}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="py-6">
        <p className="font-semibold underline md:text-lg text-base py-1">
          Brief Description :{" "}
        </p>
        <p className="text-sm">
          {item && item.description && item.description}
        </p>
        <Button onClick={OpenGallery} className={"bg-black mt-3"}>
          Click to preview images
        </Button>
      </div>
      {/* Gallerry pop up */}
      <Modal
        title={"Work Order Gallery"}
        isOpen={isModalOpenGallery}
        onClose={CloseModal}
        height={"h-screen"}
        width={"max-w-full"}
      >
        <Imageslider images={item && item.images && item.images} />
      </Modal>
      <hr className="border border-gray-400 mb-4" />
      {history ? (
        <div>
          <p className="text-sm">
            <span className="font-semibold">Status : </span>
            {item && item.status && item.status}
          </p>
          {item && item.working_time && (
            <p className="text-sm">
              <span className="font-semibold">Working time : </span>{" "}
              {item.working_time}
            </p>
          )}
          {item && item.fixer && (
            <p className="text-sm">
              <span className="font-semibold">Who fix it : </span> {item.fixer}
            </p>
          )}
        </div>
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, touched, errors, setValues, values }) => {
              useEffect(() => {
                setValues({
                  status: item && item.status && item.status,
                  working_time: item && item.working_time && item.working_time,
                  fixer: item && item.fixer && item.fixer,
                });
              }, []);
              return (
                <Form className="w-full">
                  <div className="md:flex items-center md:gap-7 space-y-5 md:space-y-0">
                    <Select
                      name={"status"}
                      required={true}
                      label={"Status"}
                      options={[
                        {
                          label: "Select One",
                          value: "",
                        },
                        {
                          label: "Pending",
                          value: "Pending",
                        },
                        {
                          label: "Resolved",
                          value: "Resolved",
                        },
                        {
                          label: "Work in Progress",
                          value: "Work in Progress",
                        },
                        {
                          label: "Order Received",
                          value: "Order Received",
                        },
                        {
                          label: "Cancelled",
                          value: "Cancelled",
                        },
                      ]}
                      className={"w-full px-2 py-2"}
                      parentClassName={"w-full px-0 py-0"}
                    />

                    <Input
                      label={"Working Time"}
                      placeholder={"2 Hour"}
                      name={"working_time"}
                      className={"py-2 px-2"}
                    />

                    <Input
                      label={"Who fixed it"}
                      placeholder={"Fullname of who fixed it"}
                      name={"fixer"}
                      className={"py-2 px-2"}
                    />
                    <div>
                      <Button className={"md:mt-7 mt-3"} type="submit">
                        Update
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};
