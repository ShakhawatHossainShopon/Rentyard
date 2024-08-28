import { cn } from "@/utils";

export const InfoCard = ({
  children,
  isCloseBtn,
  title,
  className,
  onClick,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center max-w-[400px]">
      <h2 className="w-full bg-black text-white md:text-base text-sm font-bold py-2 text-center relative">
        {title}
        {isCloseBtn && (
          <button
            onClick={onClick}
            className="bg-white px-1 absolute right-1 top-2 text-black w-7 h-7 rounded-full flex justify-center items-center text-lg"
          >
            X
          </button>
        )}
      </h2>
      <div className={cn(`w-full bg-gray-100 py-5`, className)}>{children}</div>
    </div>
  );
};
