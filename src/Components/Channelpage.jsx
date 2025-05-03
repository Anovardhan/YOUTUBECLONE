import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Secondbar from "./Secondbar";
const Channelpage = () => {
  const [subscribe, setsubscribe] = useState(false);
  const [seemore, setseemore] = useState(true);
  const [activeButton, setActiveButton] = useState("Home");
  const { channelId } = useParams();
  const [channeldata, setchanneldata] = useState([]);
  const [channel, setchannel] = useState([]);

  const categories = [
    { label: "Home", query: "home" },
    { label: "Videos", query: "videos" },
    { label: "Shorts", query: "shorts" },
    { label: "liveStreams", query: "liveStreams" },
    { label: "Community", query: "community" },
  ];
  const handleClick = (category) => {
    setActiveButton(category.label);
    fetchchannel(category.query);
  };
  const handlesubscribe = () => {
    setsubscribe((pre) => !pre);
  };
  const handleseemore = () => {
    setseemore((pre) => !pre);
  };
  const formatViews = (views) => {
    const num = parseInt(views);
    if (isNaN(num)) return views;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };
  const location = useLocation();
  const { channelThumbnail } = location.state || {};

  const fetchchannel = async (query) => {
    const url = `https://yt-api.p.rapidapi.com/channel/${query}?id=${channelId}`;
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
        setchanneldata(result.meta);
        setchannel(result.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  useEffect(() => {
    fetchchannel("home");
  }, [channelId]);

  return (
    <>
      <div className="d-flex">
        <Secondbar />
        <div className="channelhomepage ">
          <div
            className="banner"
            style={{
              width: "89vw",
              height: "200px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
              src={channeldata.banner?.[0]?.url}
              alt="Channel Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="d-flex">
            {channelThumbnail && (
              <div className=" my-3 mt-4">
                <img
                  src={channelThumbnail}
                  alt="Channel Thumbnail"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <div className="mt-3 ms-3">
              <h1 className="">{channeldata.title}</h1>
              <div className="d-flex gap-2">
                <p>{channeldata.channelHandle}</p>

                <p>.{channeldata.subscriberCountText} subscribers</p>

                <p>.{channeldata.videosCountText}</p>
              </div>

              <p>
                {seemore === true
                  ? channeldata.description?.slice(0, 150)
                  : channeldata.description?.slice(0, 1000)}

                <button
                  style={{ color: "blue" }}
                  className="btn outline-none"
                  onClick={handleseemore}
                >
                  {seemore === true ? "....seemore" : "show less"}
                </button>
              </p>

              <button
                className="btn btn-success"
                style={{ borderRadius: "20px" }}
                onClick={handlesubscribe}
              >
                <h4>{subscribe === true ? "subscribe" : "subscribed"}</h4>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="thirdbar d-flex gap-3 align-items-center flex-wrap mt-2"
        style={{ marginLeft: "110px" }}
      >
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
      <hr></hr>
      <div style={{ marginLeft: "100px" }} className="mt-3">
        {activeButton === "Home" &&
          channel
            .filter((cv) => cv.type !== "player")
            .map((cv) => (
              <div className="container">
                <h2>
                  {" "}
                  {cv.type === "shorts" ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="m19.45,3.88c1.12,1.82.48,4.15-1.42,5.22l-1.32.74.94.41c1.36.58,2.27,1.85,2.35,3.27.08,1.43-.68,2.77-1.97,3.49l-8,4.47c-1.91,1.06-4.35.46-5.48-1.35-1.12-1.82-.48-4.15,1.42-5.22l1.33-.74-.94-.41c-1.36-.58-2.27-1.85-2.35-3.27-.08-1.43.68-2.77,1.97-3.49l8-4.47c1.91-1.06,4.35-.46,5.48,1.35Z"
                          fill="#f03"
                        ></path>
                        <path d="m10,15l5-3-5-3v6Z" fill="#fff"></path>
                      </svg>
                      {cv.title}
                    </span>
                  ) : (
                    <span> {cv.title}</span>
                  )}{" "}
                </h2>

                <div className="d-flex gap-3 overflow-scroll chinnu  ">
                  {cv.data?.map((v) => (
                    <Link
                      to={`/video/${v.videoId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className=" flex-shrink-0"
                        style={{
                          width:
                            v.type === "shorts"
                              ? "270px"
                              : v.type === "channel"
                              ? "250px"
                              : "400px",
                        }}
                      >
                        <>
                          <img
                            src={
                              v.type === "shorts"
                                ? v.thumbnail?.[1]?.url
                                : v.type === "channel"
                                ? v.thumbnail?.[1]?.url
                                : v.thumbnail?.[3]?.url
                            }
                            alt={v.title}
                            style={{
                              width:
                                v.type === "shorts"
                                  ? "220px"
                                  : v.type === "channel"
                                  ? "200px"
                                  : "400px",
                              height:
                                v.type === "shorts"
                                  ? "350px"
                                  : v.type === "channel"
                                  ? "200px"
                                  : "230px",
                              borderRadius: v.type === "channel" ? "50%" : null,
                            }}
                          />
                          <h5>
                            {" "}
                            {v.type === "shorts" ? (
                              <span>{v.title}</span>
                            ) : v.type === "shorts" ? (
                              <span className="ms-5">{v.title}</span>
                            ) : (
                              <span>{v.title}</span>
                            )}
                          </h5>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            focusable="false"
                            aria-hidden="true"
                          >
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
                          </svg>
                          <span> {formatViews(v.viewCount)} views</span>
                          <span className="ms-2">{v.publishedTimeText}</span>
                        </>
                      </div>
                    </Link>
                  ))}
                </div>
                <hr></hr>
              </div>
            ))}
      </div>
      <div className="container my-4" style={{ marginLeft: "100px" }}>
        <div className="row g-4">
          {activeButton === "Videos" &&
            channel
              .filter((v) => v.type === "video")
              .map((v) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={v.videoId}>
                  <Link
                    to={`/video/${v.videoId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={v.thumbnail?.[3]?.url}
                        alt={v.title}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          borderRadius: "8px",
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

                      <h5 className="mt-2">{v.title}</h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
                      </svg>
                      <span> {formatViews(v.viewCount)} views</span>
                      <span className="ms-2">{v.publishedTimeText}</span>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
      <div className="container my-4" style={{ marginLeft: "100px" }}>
        <div className="row g-4">
          {activeButton === "liveStreams" &&
            channel
              .filter((v) => v.type === "video")
              .map((v) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={v.videoId}>
                  <Link
                    to={`/video/${v.videoId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={v.thumbnail?.[3]?.url}
                        alt={v.title}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          borderRadius: "8px",
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
                      <h5 className="mt-2">{v.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>

      <div
        className="container my-4"
        style={{ marginLeft: "100px", width: "1000px" }}
      >
        <div className="row g-4">
          {activeButton === "Shorts" &&
            channel.map((v) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={v.videoId}>
                <Link
                  to={`/video/${v.videoId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div>
                    <img
                      src={v.thumbnail?.[0]?.url}
                      alt={v.title}
                      style={{
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <h5 className="mt-2">{v.title}</h5>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div className="container my-4">
        <div className="row g-4">
          {activeButton === "Community" &&
            channel
              .filter((c) => c.type === "post")
              .map((c) => (
                <div className="card">
                  <div className="mt-2 d-flex">
                    <div>
                      <img
                        src={`https:${c.authorThumbnail?.[0]?.url}`}
                        alt="Author"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </div>
                    <h3 className="mb-0 ms-3">{c.authorText}</h3>
                    <p className="mb-0 ms-2 mt-1">{c.publishedTimeText}</p>
                  </div>
                  <p className="mb-0 ms-2 mt-1">{c.contentText}</p>
                  <div className="mt-3 d-flex align-items-center justify-content-center">
                    {c.attachment?.type === "image" &&
                    c.attachment?.image?.[0]?.url ? (
                      <img
                        src={c.attachment.image?.[4]?.url}
                        alt="Post"
                        style={{ borderRadius: "10px", width: "100%" }}
                      />
                    ) : c.attachment?.type === "video" &&
                      c.attachment?.video?.[0]?.url ? (
                      <img src={c.attachment.video?.[0]?.url} />
                    ) : null}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
export default Channelpage;
