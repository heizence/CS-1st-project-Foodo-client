import React from "react";

const VidPlayer = ({ video }) => {
  return (
    <div>
            {video !== null && (

      <div>
        <iframe
          title="FoodVideo"
          className="embed-responsive-item"
          style={{ width: "70%", height: "350px" }}
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          allowFullScreen
        ></iframe>
        
        <br />
        <div className="font-weight-bold ">
          {video.snippet.title}
        </div>
        
      </div>
      )}

    </div>
  );
};

export default VidPlayer;
