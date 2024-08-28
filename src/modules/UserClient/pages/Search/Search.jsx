import { useGetPropertyPublicViewSelector, useScrollToTop } from "@/hooks";
import { CardSection } from "../Home/sections/CardSection/CardSection";
import { Pagination } from "./../Home/Components/Pagination/Pagination";
import { AllFilters } from "./AllFilters";
const Search = () => {
  useScrollToTop();
  const { loading, data } = useGetPropertyPublicViewSelector();
  console.log(data);
  return (
    <>
      <AllFilters />
      <div className="flex justify-center items-center">
        <div className="py-6 space-y-10 w-full max-w-[1440px] flex flex-col items-center justify-start px-2 md:px-6 mx-auto">
          <CardSection loading={loading} data={data} />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Search;
