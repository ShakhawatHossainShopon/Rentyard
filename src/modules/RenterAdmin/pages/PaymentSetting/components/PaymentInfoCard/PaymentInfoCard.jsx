import { useAppDispatch } from "@/hooks";
import { deletePaymentMethod } from "@/services/paymentMethods/paymentMethods";

export const PaymentInfoCard = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-gray-100 relative w-full px-4 py-4">
      <button
        onClick={() => dispatch(deletePaymentMethod(item.paymentMethodId))}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-black"
      >
        X
      </button>
      <h4 className="md:text-xl font-semibold text-lg">
        {" "}
        {item && item.bank_account_holder_name
          ? item.bank_account_holder_name
          : item && item.card_holder_name && item.card_holder_name}{" "}
      </h4>
      <p className="font-medium md:text-base text-sm">
        {" "}
        {item && item.bank_name && item.bank_name
          ? item.bank_name
          : item && item.card_number && item.card_number}{" "}
      </p>
    </div>
  );
};
