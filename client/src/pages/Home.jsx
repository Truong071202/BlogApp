import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { start, done } from "../services/nprogressService"; // Import nprogressService

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html, limit = 50) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";

    const words = text.split(" ");

    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }

    return text;
  };

  const handleReadMore = (id) => {
    start(); // Start the progress bar
    setTimeout(() => {
      navigate(`/post/${id}`);
      done(); // Complete the progress bar
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p style={{ marginBottom: "20px" }}>{getText(post.desc, 30)}</p>
              <button onClick={() => handleReadMore(post.id)}>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
