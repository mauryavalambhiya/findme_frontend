import { Link } from "react-router-dom";

const Education = () => {

    const query1 = "education School";
    const query2 = "education  Collages";
    const query3 = "education Coaching";
    const query4 = "education Vocational training";
    const query5 = "education Competetive traning";
    const query6 = "education Typing school";

  return (
    <>
      <div className=" w-96 h-fit m-auto  text-center p-5  rounded-lg bg-orange font-primary-font ">
        <p className=" text-3xl ">EDUCATION</p>
      </div>
      <section className="mt-8 mb-3">
        <div className="category grid place-content-center ">
          <Link to={`/search?q=${query1}`} className="border p-4 w-80 transition-transform duration-300 hover:transform hover:scale-y-100 shadow-lg bg-gray-200 text-left col-span-2 hover:bg-blue-500 mb-1">
            SCHOOL
          </Link>
          <Link to={`/search?q=${query2}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-1 mb-1">
            COLLEGES
          </Link>
          <Link to={`/search?q=${query3}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            COACHING
          </Link>
          <Link to={`/search?q=${query4}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            VOCATIONAL TRAINING
          </Link>
          <Link to={`/search?q=${query5}`} className="border p-4 w-80 shadow-lg bg-gray-200 hover:bg-blue-500 text-left col-span-2 mb-1">
            COMPETETIVE TRAINING
          </Link>
          <Link to={`/search?q=${query6}`} className="border p-4 w-80 shadow-lg bg-white hover:bg-blue-500 text-left col-span-2 mb-1">
            TYPING SCHOOL
          </Link>
        </div>
      </section>
    </>
  );
};

export default Education;
