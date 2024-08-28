export const LeaseTermPopUp = ({ rent_and_lease }) => {
  return (
    <div className="flex justify-center pb-10">
      <div className="w-fit border-gray-300 text-gray-900 antialiased font-sans leading-normal overflow-x-hidden">
        <table className="w-full lg:w-[30vw] px-6 bg-gray-50 border">
          <thead className="bg-blue-700">
            <tr>
              <th className="px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white">
                Lease Term
              </th>
              <th className="px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white">
                Rent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rent_and_lease.map((item, index) => (
              <tr className="divide-x" key={index}>
                <td className="px-2 md:px-6 py-4 text-center">
                  {item.lease_term}
                </td>
                <td className="px-2 md:px-6 py-4 text-center">
                  ${item.rent} / Months
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
