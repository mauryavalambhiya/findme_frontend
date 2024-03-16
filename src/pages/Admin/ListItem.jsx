/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../services/backen_api/axios";
import { useNavigate } from "react-router-dom";
import DemoImg from "../../assets/Camera Roll/download (2).jpeg";

const ListItem = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [productsList, setProdutList] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProductList = async () => {
      try {
        const response = await axiosPrivate.post(
          "/v1/admin/getproduct",
          {},
          {
            signal: controller.signal,
            headers: {
              origin_private: "x03467235737",
            },
          }
        );
        isMounted && setProdutList(response.data.massage);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getProductList();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const updateList = (id) => {
    setProdutList(prevProducts => {
      // Filter out the profile with the specified id
      const updatedProdutes = prevProducts.filter(product => product._id !== id);
      return updatedProdutes;
    });
  };

  const deleteProduct = async (id) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        "v1/admin/deleteproduct",
        {
          product_id: id,
        },
        {
          signal: controller.signal,
          headers: {
            origin_private: "x03467235737",
          },
        }
      );
      setSuccess("Product successfully deleted");
      updateList(id)
    } catch (err) {
      console.error(err);
      setError(err.massage);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const redirectTo = (product_id) => {
    navigate(`/editproduct/${product_id}`);
  };

  return (
    <>
      <div className=" w-full h-full px-10 my-4 pt-4">
        {success && (
          <div className="fixed top-3 inset-0 z-50 flex items-start justify-center pointer-events-none">
            {/* Success message */}
            <div className="absolute px-8 py-6 bg-green-500 text-white flex justify-between rounded shadow-lg transition-all transform -translate-y-full opacity-0 translate-y-0 opacity-100 pointer-events-auto">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p>Success! {success}</p>
              </div>
              <button
                className="text-green-100 hover:text-white"
                onClick={() => {
                  setSuccess(false);
                  // setSuccessMsg("")
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed top-3 inset-0 z-50 flex items-start justify-center pointer-events-none">
            <div className="absolute px-8 py-6 bg-red-500 text-white flex justify-between rounded shadow-lg transition-all transform -translate-y-full opacity-0 translate-y-0 opacity-100 pointer-events-auto">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
                </svg>
                <p>Warning! {error}</p>
              </div>
              <button
                className="text-red-100 hover:text-white"
                onClick={() => {
                  setError(false);
                  // setErrorMsg("")
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        <div className=" w-auto h-full">
        <div className=" w-full m-auto h-fit text-center font-primary-font">
          <p className=" text-4xl font-bold">All Products</p>
        </div>
        {/* make a responsive card  here */}
        {productsList ? (
          productsList.map((product) => (
            <div
              key={product._id}
              className="max-w-full  bg-white shadow-lg rounded-lg overflow-hidden m-4"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={product.product_image} // Access the product image from the product object
                    alt="Product"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      Product Category
                    </div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                      {product.product_name}{" "}
                      {/* Access the product name from the product object */}
                    </h2>
                    <p className="mt-2 text-gray-500">
                      {product.product_disc}{" "}
                      {/* Access the product description from the product object */}
                    </p>
                  </div>
                  <div className=" w-full mt-4 flex justify-end">
                    <button
                      value={product._id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                      onClick={(event) => {
                        redirectTo(event.target.value);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      value={product._id}
                      onClick={(event) => {
                        deleteProduct(event.target.value);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to show...</p>
        )}
        </div>
        

        

        {/* <div className="max-w-full  bg-white shadow-lg rounded-lg overflow-hidden m-4">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={DemoImg}
                alt="Product"
              />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Product Category
                </div>
                <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  Product Name
                </h2>
                <p className="mt-2 text-gray-500">
                  Product Description goes here. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatibus quia, nulla!
                  Maiores et perferendis eaque, exercitationem praesentium
                  nihil.
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* <button
          className=" w-fit h-fit p-3 bg-green-400 m-3"
          onClick={() => {
            redirectTo("65f35c967b9ac9fe2b12b5d8");
          }}
        >
          Edit Product
        </button>
        <button
          className=" w-fit h-fit p-3 bg-green-400 m-3"
          onClick={() => {
            deleteProduct("65caf47aa4748e55eac2148c");
          }}
        >
          Delete product
        </button>
        <button
          className=" w-fit h-fit p-3 bg-green-400 m-3"
          onClick={() => {
            console.log(JSON.stringify(productsList))
          }}
        >
          Log product
        </button>  */}
      </div>
    </>
  );
};

export default ListItem;
