import { useState, useEffect } from "react";
import Secondbar from "./Secondbar";
import { Link } from "react-router-dom";
const Trendingpage = () => {
  const [trending, settrending] = useState([]);
  const [activeButton, setActiveButton] = useState("Now");
  const categories = [
    { label: "Now", query: "now" },
    { label: "Music", query: "music" },
    { label: "News", query: "games" },
    { label: "movies", query: "movies" },
  ];

  const fetchTrending = async (query) => {
    const url = `https://yt-api.p.rapidapi.com/trending?geo=IN&type=${query}&lang=te`;
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
      if (result?.data) {
        console.log(result.data);
        settrending(result.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  const formatViews = (views) => {
    const num = parseInt(views);
    if (isNaN(num)) return views;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };
  useEffect(() => {
    fetchTrending();
  });
  const handleClick = (category) => {
    setActiveButton(category.label);
    fetchTrending(category.query);
  };
  return (
    <>
      <div className="d-flex">
        <Secondbar />
        <div>
          <div
            className="trending-logo d-flex alien-items-center  ms-4 "
            style={{ width: "100px", height: "60px" }}
          >
            <img
              alt=""
              class="yt-core-image yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image--content-mode-scale-to-fill yt-core-image--loaded"
              data-disabled="true"
              src="https://www.youtube.com/img/trending/avatar/trending_animated.webp"
              style={{ width: "100%", height: "100%" }}
            />
            <h1 className="mt-2 ms-2">Trending</h1>
          </div>
          <div className="d-flex gap-3 align-items-center  flex-nowrap mt-2 ms-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleClick(category)}
                className={`btn btn-outline-primary ${
                  activeButton === category.label ? "active" : ""
                } mx-1`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="trending-videos">
            {trending
              .filter((t) => t.type === "video")
              .map((t, videoId) => (
                <Link
                  to={`/video/${t.videoId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="trendingvideos mt-4 d-flex">
                    <div>
                      <img src={t.thumbnail?.[2]?.url} width={400} />
                      {t.lengthText && (
                        <p
                          style={{
                            position: "absolute",

                            backgroundColor:
                              t.lengthText?.trim().toLowerCase() === "live"
                                ? "red"
                                : "black",

                            color: "white",
                            padding: "4px 10px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            marginTop: "-28px",
                          }}
                          className="ms-1"
                        >
                          {t.lengthText}
                        </p>
                      )}
                    </div>
                    <div className="details ">
                      <h4 className="ms-2">{t.title}</h4>
                      <div className="d-flex">
                        <p className="ms-2">{t.channelTitle}</p>
                        <p className=" ms-3 text-muted">
                          {formatViews(t.viewCount)} views
                        </p>
                        <p className="ms-2">{t.publishedTimeText}</p>
                      </div>
                      <p className="ms-2">{t.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trendingpage;
