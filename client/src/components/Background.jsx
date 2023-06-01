import React from "react";

 function Background() {
  return (
    <video className="w-100" autoPlay loop muted>
      <source
        src="../../media/Queen1.mp4"
        type="video/mp4"
        allowFullScreen
      />
    </video>
  );
}

export default Background;

