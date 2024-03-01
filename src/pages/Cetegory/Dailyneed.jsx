import { Link } from "react-router-dom";

const Dailyneed = () => {

    const query1 = "dailyneed Grocery";
    const query2 = "dailyneed Milk & Milk Products";
    const query3 = "dailyneed Fruits & Vegetables";
    const query4 = "dailyneed Stationery Store";
    const query5 = "dailyneed Medicines";
    const query6 = "dailyneed Laundry Services";
    const query7 = "dailyneed COMPETETIVE TRAINING";
    const query8 = "dailyneed Electricians";

  return (
    <>
    <div className=" w-96 h-fit m-auto  text-center p-5  rounded-lg bg-orange font-primary-font ">
        <p className=" text-3xl ">DAILYNEED</p>
      </div>
      <section className="mt-12 mb-3">
        <div className="category grid place-content-center ">
          <Link to={`/search?q=${query1}`} className="border p-4 w-80 transition-transform duration-300 hover:transform hover:scale-y-100 shadow-lg bg-gray-200 text-left col-span-2 hover:bg-blue-500 mb-1">
            Grocery
          </Link>
          <Link to={`/search?q=${query2}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-1 mb-1">
            Milk & Milk Products
          </Link>
          <Link to={`/search?q=${query3}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            Fruits & Vegetables
          </Link>
          <Link to={`/search?q=${query4}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            Stationery Store
          </Link>
          <Link to={`/search?q=${query5}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            Medicines
          </Link>
          <Link to={`/search?q=${query6}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            Laundry Services
          </Link>
          <Link to={`/search?q=${query7}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            COMPETETIVE TRAINING
          </Link>
          <Link to={`/search?q=${query8}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            Electricians
          </Link>
        </div>
      </section>
    </>
  );
};

export default Dailyneed;
