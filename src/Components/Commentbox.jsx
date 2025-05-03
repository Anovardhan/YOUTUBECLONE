import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Commentbox = ({ videoId }) => {
  const [commentdata, setcommentdata] = useState([]);
  const [activeButton, setActiveButton] = useState("Top comments");
  const [commentlike, setcommentlike] = useState(0);
  const handlelike = (likecount) => {
    setcommentlike((pre) => pre + 1 + likecount);
  };
  const categories = [
    { label: "Top comments", query: "sort_by=top" },
    { label: "Newest first", query: "sort_by=newest" },
  ];
  const handleClick = (category) => {
    setActiveButton(category.label);
    fetchcomment(category.query);
  };
  const fetchcomment = async (query) => {
    const url = `https://yt-api.p.rapidapi.com/comments?id=${videoId}&${query}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a536a0fe81msha7f6b2f73a18fd9p191761jsna3ea9fa1b380",
        "x-rapidapi-host": "yt-api.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result) {
        setcommentdata(result);
        console.log(result);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };
  useEffect(() => {
    fetchcomment();
  }, [videoId]);
  return (
    <>
      <div className="thirdbar d-flex gap-3  flex-wrap mt-2">
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
      {commentdata?.data?.map((c) => (
        <>
          <div className=" d-flex mt-3 p-1">
            <Link to={`/channel/${c.authorChannelId}`}>
              <img
                src={c.authorThumbnail?.[0]?.url}
                style={{ borderRadius: "50px" }}
                width={50}
                height={50}
              />
            </Link>
            <div>
              <div className="d-flex">
                <p className="mt-1 ms-3">{c.authorText}</p>
                <p className="mt-1 ms-3">{c.publishedTimeText}</p>
              </div>
              <p className="mt-1 ms-3" style={{ marginTop: "-10px" }}>
                {c.textDisplay}
              </p>
              <div className="d-flex gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                  </svg>

                  <span className="mt-1 ms-3">{c.likesCount}</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};
export default Commentbox;
