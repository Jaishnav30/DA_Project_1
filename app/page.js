import Link from "next/link";
import "../styles/home.css"; 

export default function Home() {
  return (
    <div className="home-container">

      <video autoPlay loop muted playsInline className="video-background">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1 style={{ fontFamily: "CustomFont, sans-serif", fontSize: "60px" }}>
          Space Missions Analytics<br />(1957-2022)
        </h1>

        <p className="description">
          A mini data analytics project exploring space missions from 1957 to 2022 using Python Libraries for Visualization
        </p>

          <div className="button-container">
            <a href="/datasets/space_missions.xlsx" download className="download-link">
              ⬇️ Download Space Missions Dataset
            </a>
            <Link href="/codes" className="view-button-home">
              View Codes & Plot Analysis
            </Link>
          </div>
      </div>
    </div>
  );
}
