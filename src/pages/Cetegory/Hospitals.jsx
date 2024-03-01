import { Link } from "react-router-dom";

const Hospitals = () => {
    const query1 = "hospitals Children Hospital";
    const query2 = "hospitals  Eye Hospital";
    const query3 = "hospitals Maternity Hospital";
    const query4 = "hospitals Mental Hospital";
    const query5 = "hospitals 5+ Stars";
    const query6 = "hospitals Veterinary Hospital";
    const query7 = "hospitals MultiSpeciality Hospital";

  return (
    <>
      <div className=" w-96 h-fit m-auto  text-center p-5  rounded-lg bg-orange font-primary-font ">
        <p className=" text-3xl ">HOSPITALS</p>
      </div>
      <section className="mt-12 mb-3">
        <div className="category grid place-content-center ">
          <Link to={`/search?q=${query1}`}  className="border p-4 w-80 transition-transform duration-300 hover:transform hover:scale-y-100 shadow-lg bg-gray-200 text-left col-span-2 hover:bg-blue-500 mb-1">
            Children Hospital
          </Link>
          <Link to={`/search?q=${query2}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-1 mb-1">
            Eye Hospital
          </Link>
          <Link to={`/search?q=${query3}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            Maternity Hospital
          </Link>
          <Link to={`/search?q=${query4}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            Mental Hospital
          </Link>
          <Link to={`/search?q=${query5}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            Public Hospital
          </Link>
          <Link to={`/search?q=${query6}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            Veterinary Hospital
          </Link>
          <Link to={`/search?q=${query7}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            MultiSpeciality Hospital
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hospitals;
