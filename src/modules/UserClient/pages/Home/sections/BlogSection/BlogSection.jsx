import { BlogCard } from "../../Components";

export const BlogSection = () => {
  return (
    <div className="lg:px-0 px-2 md:px-6 space-y-6 pb-16">
      <div>
        <h2 className="md:text-3xl text-lg font-bold tracking-wider">
          Our Blogs
        </h2>
        <hr />
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};
