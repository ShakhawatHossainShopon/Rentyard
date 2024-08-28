import { Button, Datepicker, FileUpload, Input, Select } from "@/components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
const initialValues = {
  firstName: "", // Corrected typo here
  middleName: "",
  lastName: "",
  DoB: "",
  gender: "",
  maritalStatus: "",
  countryCitizen: "",
  idNumberType: "",
  idNumber: "",
  govtIssuedId: "",
  govtIssuedIdNumber: "",
  issuingCity: "",
  idPicture: "",
  creditScrore: "",
  company: "",
  companyYear: "",
  EIN: "",
  companyLocation: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required!"), // Corrected typo here
  lastName: Yup.string().required("Required!"),
  DoB: Yup.string().required("Required!"),
  gender: Yup.string().required("Required!"),
  maritalStatus: Yup.string().required("Required!"),
  countryCitizen: Yup.string().required("Required!"),
  idNumberType: Yup.string().required("Required!"),
  idNumber: Yup.string().required("Required!"),
  govtIssuedId: Yup.string().required("Required!"),
  govtIssuedIdNumber: Yup.string().required("Required!"),
  issuingCity: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  companyYear: Yup.string().required("Required!"),
  EIN: Yup.string().required("Required!"),
  companyLocation: Yup.string().required("Required!"),
  idPicture: Yup.string().required("Required!"),
});

const onSubmit = (values) => {
  console.log(values);
};

export const AboutYou = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, values }) => {
        return (
          <Form className="w-full space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0 pt-2 md:pt-5">
                <Input
                  label={"First Name"} // Corrected typo here
                  placeholder={"John"}
                  name={"firstName"} // Corrected typo here
                  className={"py-2 px-2"}
                  required={true}
                />

                <Input
                  label={"Middle Name(Optional)"}
                  placeholder={"Write your middle name"}
                  name={"middleName"}
                  className={"py-2 px-2"}
                />

                <Input
                  label={"Last Name"}
                  placeholder={"Doe"}
                  name={"lastName"}
                  className={"py-2 px-2"}
                  required={true}
                />
              </div>
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Datepicker
                label={"Date of Birth"}
                parentClassName={"w-full px-0 py-0 bg-transparent"}
                className={"w-full"}
                name="DoB"
                value={values.DoB}
                errors={errors.DoB}
                touched={touched.DoB}
                onChange={(date) => setFieldValue("DoB", date)}
                required={true}
              />

              <Select
                name={"gender"}
                required={true}
                label={"Marital Sex"}
                options={[
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                  {
                    label: "Others",
                    value: "Others",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />

              <Select
                name={"maritalStatus"}
                required={true}
                label={"Marrital Status"}
                options={[
                  {
                    label: "Single",
                    value: "Single",
                  },
                  {
                    label: "Married",
                    value: "Married",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>

            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                name={"countryCitizen"}
                required={true}
                label={"Country of Citizen"}
                options={[
                  {
                    label: "Bangladesh",
                    value: "Bangladesh",
                  },
                  {
                    label: "Usa",
                    value: "Usa",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"company"}
                required={true}
                label={"Do you have company"}
                options={[
                  {
                    label: "NID",
                    value: "NID",
                  },
                  {
                    label: "Smartcard",
                    value: "Smartcard",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Datepicker
                label={"Company Year"}
                parentClassName={"w-full px-0 py-0 bg-transparent"}
                className={"w-full"}
                name="companyYear"
                errors={errors.companyYear}
                touched={touched.companyYear}
                value={values.companyYear}
                onChange={(date) => setFieldValue("companyYear", date)}
                required={true}
              />
            </div>

            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                label={"EIN"}
                name={"EIN"}
                className={"py-2 px-2"}
                required={true}
                placeholder={"12-3456789"}
              />
              <Input
                label={"Company Location"}
                name={"companyLocation"}
                className={"py-2 px-2"}
                required={true}
                placeholder={"Texas, USA"}
              />
              <Select
                name={"idNumberType"}
                required={true}
                label={"Select Identification Number type"}
                options={[
                  {
                    label: "NID",
                    value: "NID",
                  },
                  {
                    label: "Smart Card",
                    value: "Smart Card",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                label={"Enter Selected Identification Number"}
                name={"idNumber"}
                className={"py-2 px-2"}
                placeholder={"********"}
                required={true}
                type="number"
              />
              <Select
                name={"govtIssuedId"}
                required={true}
                label={"Select Govt. Issued ID"}
                options={[
                  {
                    label: "NID",
                    value: "NID",
                  },
                  {
                    label: "Smartcard",
                    value: "Smartcard",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />

              <Input
                label={"Enter Selected ID Number"}
                name={"govtIssuedIdNumber"}
                className={"py-2 px-2"}
                placeholder={"4563223566"}
                required={true}
                type="number"
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                label={"Issuing City/State Name"}
                name={"issuingCity"}
                placeholder={"Select State"}
                className={"py-2 px-2"}
                required={true}
              />
              <FileUpload
                required={true}
                label={"Upload Photo of that ID"}
                className={"bg-white w-full"}
                parentClassName={"w-full"}
                name={"idPicture"}
                setFieldValue={setFieldValue}
                touched={touched.idPicture}
                errors={errors.idPicture}
              />

              <Input
                label={"Credit Score(Optional)"}
                name={"creditScrore"}
                placeholder={"60"}
                className={"py-2 px-2"}
              />
            </div>

            <Button type={"submit"}>Save Now</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
