import { Icons } from "@/utils";

export const ReviewTitle = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="md:text-xl text-base font-bold">Reviews</h2>
        <div className="md:flex justify-start items-center md:space-x-2">
          <div className="flex justify-start items-center space-x-1 text-yellow-400 py-2 md:py-0">
            <Icons.Star />
            <Icons.Star />
            <Icons.Star />
            <Icons.Star />
            <Icons.Star />
          </div>
          <h5 className="font-bold text-sm">
            4.3 out of 5 (Total 12 Renter Reviews)
          </h5>
        </div>
      </div>
      {/* <div>
        <Button>Write Review</Button>
      </div> */}
    </div>
  );
};
