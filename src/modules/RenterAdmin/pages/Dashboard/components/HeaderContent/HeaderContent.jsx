export const HeaderContent = ({ move_in_deposit, property, apartment }) => {
  return (
    <div className="md:flex justify-between items-center">
      <div className="space-y-3">
        <h2 className="md:text-lg text-base font-semibold">
          Your Current Address
        </h2>
        <div className="">
          <p className="text-sm"></p>
          <p className="text-sm">
            {property && property.address && property.address}, Apt{" "}
            {apartment && apartment.unit_number && apartment.unit_number}
          </p>
          <p className="text-sm">
            {" "}
            {property && property.city && property.city},{" "}
            {property && property.state && property.state},{" "}
            {property && property.zip && property.zip}{" "}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="md:text-lg text-base mt-4 md:mt-0 font-semibold">
          Move-in Deposit: ${move_in_deposit}
        </h2>
        <div className="">
          <p className="text-sm">Rental Score: 92 Out of 100</p>
          <p className="text-sm">
            Rental score is important for next rent, so pay all bill on time
          </p>
        </div>
      </div>
    </div>
  );
};
