import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Commentbox from "./Commentbox";

const VideoPage = () => {
  const { videoId } = useParams();
  const [videodetails, setvideodetails] = useState([]);
  const location = useLocation();
  const [show, setshow] = useState(true);
  const [subscribe, setsubscribe] = useState(false);

  const handleshow = () => {
    setshow((pre) => !pre);
  };
  const handlesub = () => {
    setsubscribe((pre) => !pre);
  };

  const { channelThumbnail, channelTitle } = location.state || {};
  const formatViews = (views) => {
    const num = parseInt(views);
    if (isNaN(num)) return views;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const fetchvideo = async () => {
    const url = `https://yt-api.p.rapidapi.com/video/info?id=${videoId}&extend=1`;
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
        setvideodetails(result);
        console.log(result);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchvideo();
  }, [videoId]);

  return (
    <>
      <div className="d-flex">
        <div className="container mt-1">
          <div className="ratio ratio-16x9">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            {videodetails ? (
              <h4 className="mt-3">{videodetails.title}</h4>
            ) : (
              <p className="mt-3">Loading...</p>
            )}
          </div>
          <div className="thumbnail d-flex ">
            <div className="rounded-full">
              <Link to={`/channel/${videodetails.channelId}`}>
                <img
                  className="mt-3 "
                  src={channelThumbnail}
                  alt="no image"
                  width={80}
                  height={80}
                  style={{ borderRadius: "50px" }}
                />
              </Link>
            </div>
            <div className="">
              <div className="d-flex align-items-center">
                <h6 className="mt-4 ms-2">{channelTitle}</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                  className="mt-3 ms-2"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
                </svg>
              </div>
              <p className="ms-2"> {videodetails.subscriberCountText}</p>
            </div>
            <button
              className="mt-5 ms-4 text-white "
              style={{
                width: "140px",
                height: "40px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "black",
              }}
              onClick={handlesub}
            >
              {subscribe === true ? "subscribe" : "subscribed"}
            </button>
            <div
              style={{
                width: "160px",
                height: "40px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "black",
              }}
              className="mt-5 ms-4 text-white d-flex align-items-center "
            >
              <span className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                  fill="white"
                >
                  <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                </svg>
                <span className="ms-2">
                  {formatViews(videodetails.likeCount)} |
                </span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div
              style={{
                width: "100px",
                height: "40px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "black",
              }}
              className="mt-5 ms-4 text-white d-flex align-items-center justify-content-center "
            >
              <span className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"
                    fill="white"
                  ></path>
                </svg>
                <span>Share</span>
              </span>
            </div>

            <div
              style={{
                width: "140px",
                height: "40px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "black",
              }}
              className="mt-5 ms-4 text-white d-flex align-items-center justify-content-center "
            >
              <span className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  aria-hidden="true"
                  fill="white"
                >
                  <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
                </svg>
                <span>Download</span>
              </span>
            </div>
          </div>

          <div className="description-box card p-3">
            <div className="d-flex gap-4">
              <p>{formatViews(videodetails.viewCount)} views</p>
              <p>{videodetails.category}</p>
              <p>{videodetails.superTitle}</p>
            </div>
            <p>
              {show === true
                ? videodetails.description?.slice(0, 150)
                : videodetails.description}{" "}
              <button
                className="btn "
                style={{ color: "blue" }}
                onClick={handleshow}
              >
                {show === true ? "seemore" : "showless"}
              </button>
            </p>
          </div>
          <h1 className="mt-2">
            {formatViews(videodetails.commentCount)} comments
          </h1>
          <Commentbox videoId={videoId} />
        </div>

        <div className="recommended videos">
          {videodetails.relatedVideos?.data.map((video, index) => (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/video/${video.videoId}`}
              state={{
                channelThumbnail: video.channelThumbnail?.[0]?.url,
                channelTitle: video.channelTitle,
              }}
            >
              <div key={index} className="d-flex mt-3">
                <img
                  src={video.thumbnail?.[1]?.url}
                  style={{ borderRadius: "10px" }}
                />
                <div className="ms-1 d-inline">
                  <h5>{video.title}</h5>
                  <p>{video.channelTitle}</p>
                  <div className="d-flex" style={{ marginTop: "-10px" }}>
                    <span>{formatViews(video.viewCount)}</span>
                    <span className="ms-2">.{video.publishedTimeText}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoPage;
