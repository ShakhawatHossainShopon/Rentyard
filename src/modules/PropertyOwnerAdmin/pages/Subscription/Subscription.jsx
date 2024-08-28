import { AdminHeader } from "@/components";
import { useScrollToTop } from "@/hooks";
import {
  CheckPricingForm,
  PaymentHistory,
  SubscriptionCard,
} from "./components";

const Subscription = () => {
  useScrollToTop();
  return (
    <div className="w-full">
      <AdminHeader title={"Subscription"} />
      <div className="w-full md:p-4 p-2 md:space-y-10 space-y-8">
        <SubscriptionCard active={true} />
        <CheckPricingForm />
        <div className="sm:grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:space-y-0 space-y-8">
          <SubscriptionCard active={false} />
          <SubscriptionCard active={false} />
          <SubscriptionCard active={false} />
        </div>
        <PaymentHistory />
      </div>
    </div>
  );
};

export default Subscription;
