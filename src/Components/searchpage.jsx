import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Searchpage = ({ setsearchterm, searchterm }) => {
  const [searchresult, setsearchresult] = useState([]);

  const fetchSearch = async () => {
    const url = `https://yt-api.p.rapidapi.com/search?query=${searchterm}`;
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
        setsearchresult(result.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (searchterm) {
      fetchSearch();
    }
  }, [searchterm]);

  return (
    <div className="container my-4">
      <div className="row g-4">
        {searchresult
          .filter((s) => s.type === "video")
          .map((s) => (
            <div className="col-md-4" key={s.videoId}>
              <Link
                to={`/video/${s.videoId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="card h-100"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <img
                    src={s.thumbnail?.[0]?.url}
                    alt={s.title}
                    className="card-img-top"
                    style={{
                      height: "200px",
                    }}
                  />
                  <div className="card-body d-flex ">
                    <img
                      src={s.channelThumbnail?.[0]?.url}
                      alt={s.channelTitle}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <h5
                      className="card-title ms-2"
                      style={{ fontSize: "16px" }}
                    >
                      {s.title}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Searchpage;
