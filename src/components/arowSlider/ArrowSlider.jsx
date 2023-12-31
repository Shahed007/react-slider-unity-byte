import { useState } from "react";
import useSlider1 from "../../api/useSlider1";
import Loading from "../loading/Loading";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";

function divideItemsIntoSections(items, itemsPerSection) {
  const sections = [];
  for (let i = 0; i < items.length; i += itemsPerSection) {
    sections.push(items.slice(i, i + itemsPerSection));
  }
  return sections;
}

const ratingChanged = () => {};

const SliderSection = ({ items, itemsPerSection, currentSlider }) => {
  const sections = divideItemsIntoSections(items, itemsPerSection);

  return (
    <>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`grid grid-cols-1 md:grid-cols-2 p-3 duration-500 transition-all ease-in-out `}
          style={{
            flex: "0 0 100%",
            boxSizing: "border-box",
            transform: `translateX(-${currentSlider * 101}%)`,
          }}
        >
          {section?.map((item, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-y-10 py-5 px-2 gap-x-8 lg:gap-7 h-full  lg:h-80  `}
            >
              <div className="relative group">
                <img className="sm:h-72 " src={item.img} alt={item.title} />
                <h4 className="absolute  group-hover:hidden top-0 left-0 bg-orange-500 h-10 w-10 flex items-center justify-center text-white rounded-full">
                  10%
                </h4>
                <div className="bg-gray-400/30 absolute gap-3  hidden top-0 left-0 w-full h-full group-hover:flex duration-300 items-center justify-center">
                  <span className="h-10 w-10 bg-white rounded-full flex justify-center items-center duration-200 hover:text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </span>
                  <span className="h-10 w-10 bg-white rounded-full flex justify-center items-center duration-200 hover:text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </span>
                  <span className="h-10 w-10 bg-white rounded-full flex justify-center items-center duration-200 hover:text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="py-5 px-3 lg:p-0">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
                <h2 className="sm:text-xl text-base font-bold">
                  {item.title.slice(0, 28)}...
                </h2>
                <div className="my-3 flex gap-6 items-center">
                  <h1 className="text-2xl font-bold text-red-600">
                    ${item.discount_price}
                  </h1>
                  <del className="text-gray-600 text-lg">${item.price}</del>
                </div>
                <p>{item.description.slice(0, 100)}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

const ArrowSlider = () => {
  const { slider1, loading } = useSlider1();
  const [currentSlider, setCurrentSlider] = useState(0);
  const section = divideItemsIntoSections(slider1, 4);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);

  const handlePrevious = () => {
    if (section.length > 0) {
      setNext(false);
      setPrev(true);
      setCurrentSlider(currentSlider - 1);
    }
  };

  const handleNext = () => {
    if (section.length - 1 > currentSlider) {
      setNext(true);
      setPrev(false);
      setCurrentSlider(currentSlider + 1);
    }
  };

  if (loading)
    return (
      <div className="h-[500px]">
        <Loading></Loading>
      </div>
    );

   
  return (
    <section className="relative h-full mb-20 px-5 sm:px-5 mx-auto">
      <div className="lg:max-w-screen-xl  mx-auto  lg:p-3 relative  overflow-x-hidden flex  ">
        <SliderSection
          items={slider1}
          itemsPerSection={4}
          currentSlider={currentSlider}
        ></SliderSection>
        <div className="h-[1px] md:block hidden w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200"></div>
      </div>

      <button
        className={`  md:absolute top-[47%] left-5 z-10 h-10 w-10 rounded-full duration-300 transition-colors bg-white active:scale-95 hover:bg-orange-500  flex justify-center items-center shadow-lg border ${
          prev ? "bg-orange-500" : ""
        }`}
        onClick={handlePrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className={` md:absolute top-[47%] right-5 z-10 h-10 w-10 rounded-full duration-300 transition-colors bg-white active:scale-95 hover:bg-orange-500  flex justify-center items-center shadow-lg border ${
          next ? "bg-orange-500" : ""
        }`}
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </section>
  );
};

SliderSection.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerSection: PropTypes.number.isRequired,
  currentSlider: PropTypes.number.isRequired,
};

export default ArrowSlider;
