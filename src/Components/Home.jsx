import { useEffect, useState } from "react";
import Secondbar from "./Secondbar";
import { Link } from "react-router-dom";
import Thirdbar from "./Thirdbar";

const Home = () => {
  const [home, sethome] = useState([]);

  const fetchHome = async (query = "Telugu entertainment") => {
    const url = `https://yt-api.p.rapidapi.com/search?query=${query}&filter=video&lang=te`;
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
        sethome(result.data);
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
    fetchHome();
  }, []);

  return (
    <>
      <Thirdbar fetchHome={fetchHome} />
      <div className="d-flex">
        <Secondbar />

        <div className="container my-4">
          <div className="row g-4">
            {home
              .filter((v) => v.type === "video")
              .map((v, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12"
                  key={v.videoId || index}
                >
                  <Link
                    to={`/video/${v.videoId}`}
                    state={{
                      channelThumbnail: v.channelThumbnail?.[0]?.url,
                      channelTitle: v.channelTitle,
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="shadow-sm"
                      style={{
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        transition: "transform 0.2s",
                      }}
                    >
                      <img
                        src={v.thumbnail?.[0]?.url}
                        alt={v.title}
                        style={{
                          width: "100%",
                          height: "240px",
                        }}
                      />
                      {v.lengthText && (
                        <p
                          style={{
                            position: "absolute",

                            backgroundColor:
                              v.lengthText?.trim().toLowerCase() === "live"
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
                          {v.lengthText}
                        </p>
                      )}
                      <div className="p-2">
                        <div className="d-flex align-items-start gap-2">
                          <Link
                            to={`/channel/${v.channelId}`}
                            state={{
                              channelThumbnail: v.channelThumbnail?.[0]?.url,
                              channelTitle: v.channelTitle,
                            }}
                          >
                            <img
                              src={v.channelThumbnail?.[0]?.url}
                              alt={v.channelTitle}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                          <div>
                            <h6 className="mb-1 text-truncate" title={v.title}>
                              {v.title}
                            </h6>
                            <small className="text-muted">
                              {v.channelTitle}
                            </small>
                          </div>
                        </div>
                        <p className="mb-0 mt-2 text-muted">
                          {formatViews(v.viewCount)} views
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
