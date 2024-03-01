import { Link } from "react-router-dom";

const Resturants = () => {

    const query1 = "resturents Indian Flavours";
    const query2 = "resturents  Global Cuisines";
    const query3 = "resturents Quick Bites";
    const query4 = "resturents Sweet Tooth";
    const query5 = "resturents 5+ Stars";

  return (
    <>
    <div className=" w-96 h-fit m-auto  text-center p-5  rounded-lg bg-orange font-primary-font ">
        <p className=" text-3xl ">RESTURANTS</p>
      </div>
      <section className="mt-12 mb-3">
        <div className="category grid place-content-center ">
          <Link to={`/search?q=${query1}`} className="border p-4 w-80 transition-transform duration-300 hover:transform hover:scale-y-100 shadow-lg bg-gray-200 text-left col-span-2 hover:bg-blue-500 mb-1">
            Indian Flavours
          </Link>
          <Link to={`/search?q=${query2}`}className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-1 mb-1">
            Global Cuisines
          </Link>
          <Link to={`/search?q=${query3}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            Quick Bites
          </Link>
          <Link to={`/search?q=${query4}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            Sweet Tooth
          </Link>
          <Link to={`/search?q=${query5}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            5+ Stars
          </Link>
        </div>
      </section>
    </>
  );
};

export default Resturants;
