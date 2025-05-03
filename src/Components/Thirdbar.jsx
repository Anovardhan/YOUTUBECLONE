import { useState } from "react";

const Thirdbar = ({ fetchHome }) => {
  const [activeButton, setActiveButton] = useState("ALL");

  const categories = [
    { label: "All", query: "telugu videos" },
    { label: "Music", query: "telugu music" },
    { label: "News", query: " telugu news" },
    { label: "Gaming", query: " telugu gaming and indian gaming" },
    { label: "Live", query: " telugu live and indian livelive" },
    { label: "Comedy", query: " telugu comedy" },
    { label: "Science", query: "science" },
    { label: "Latest trailers", query: "Latest telugu trailers" },
    { label: "IPL", query: "IPL NEWS AND IPL VIDEOS AND IPL FANTASY AND IPL " },
    { label: "Latest movies", query: "Latest telugu movies " },
  ];

  const handleClick = (category) => {
    setActiveButton(category.label);
    fetchHome(category.query);
  };

  return (
    <div className="thirdbar d-flex gap-3 align-items-center justify-content-center flex-wrap">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`btn btn-outline-primary ${
            activeButton === category.label ? "active" : ""
          } mx-1`}
          onClick={() => handleClick(category)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default Thirdbar;
