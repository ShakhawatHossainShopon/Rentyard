import { AdminHeader, Button, TabCom } from "@/components";
import {
  useAppDispatch,
  useGetAllPaymentMethodsSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllPaymentMethods } from "@/services/paymentMethods/paymentMethods";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  BankPaymentForm,
  CardPaymentForm,
  PaymentInfoCard,
} from "./components";

const PaymentSetting = () => {
  useScrollToTop();
  const [isShowPayment, setIsShowPayment] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllPaymentMethodsSelector();
  console.log(data);

  useEffect(() => {
    dispatch(getAllPaymentMethods());
  }, []);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Payment Setting"} />
      <div className="w-full p-4 space-y-10">
        <div>
          <p className="tracking-wide font-medium md:text-base text-sm">
            Add payment method, that saves your time while making payment. You
            can add multiple payment method.
          </p>
        </div>
        {!loading && data ? (
          <div className="grid grid-cols-3 gap-6">
            {data.map((item) => {
              return <PaymentInfoCard key={item.paymentMethodId} item={item} />;
            })}
          </div>
        ) : (
          <div className="w-full h-[40vh] flex justify-center items-center">
            {" "}
            <ClipLoader size={100} color="blue" />{" "}
          </div>
        )}
        <Button
          className={"md:text-sm text-xs"}
          onClick={() => setIsShowPayment((prev) => !prev)}
        >
          {isShowPayment ? "Close Tab" : "Add New Payment Method"}
        </Button>
        {isShowPayment && (
          <TabCom
            data={[
              {
                label: "Add Credit/Debit Card",
                value: "Add Credit/Debit Card",
                component: <CardPaymentForm />,
              },
              {
                label: "Add Bank Account",
                value: "Add Bank Account",
                component: <BankPaymentForm />,
              },
            ]}
            defaultValue={"Add Credit/Debit Card"}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentSetting;
