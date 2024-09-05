import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

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

  // const posts = [
  //   {
  //     id: 1,
  //     title:
  //       "The Ultimate Guide to Mastering Full-Stack Web Development: From Beginner to Expert in 2024",
  //     desc: "Unlock the secrets to becoming a full-stack web developer with our comprehensive guide. Whether you're just starting out or looking to enhance your skills, this step-by-step tutorial covers everything from front-end basics to advanced back-end techniques",
  //     image:
  //       "https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg",
  //   },
  //   {
  //     id: 2,
  //     title:
  //       "The Ultimate Guide to Mastering Full-Stack Web Development: From Beginner to Expert in 2024",
  //     desc: "Unlock the secrets to becoming a full-stack web developer with our comprehensive guide. Whether you're just starting out or looking to enhance your skills, this step-by-step tutorial covers everything from front-end basics to advanced back-end techniques",
  //     image:
  //       "https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg",
  //   },
  //   {
  //     id: 3,
  //     title:
  //       "The Ultimate Guide to Mastering Full-Stack Web Development: From Beginner to Expert in 2024",
  //     desc: "Unlock the secrets to becoming a full-stack web developer with our comprehensive guide. Whether you're just starting out or looking to enhance your skills, this step-by-step tutorial covers everything from front-end basics to advanced back-end techniques",
  //     image:
  //       "https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg",
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "The Ultimate Guide to Mastering Full-Stack Web Development: From Beginner to Expert in 2024",
  //     desc: "Unlock the secrets to becoming a full-stack web developer with our comprehensive guide. Whether you're just starting out or looking to enhance your skills, this step-by-step tutorial covers everything from front-end basics to advanced back-end techniques",
  //     image:
  //       "https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg",
  //   },
  //   {
  //     id: 1,
  //     title:
  //       "The Ultimate Guide to Mastering Full-Stack Web Development: From Beginner to Expert in 2024",
  //     desc: "Unlock the secrets to becoming a full-stack web developer with our comprehensive guide. Whether you're just starting out or looking to enhance your skills, this step-by-step tutorial covers everything from front-end basics to advanced back-end techniques",
  //     image:
  //       "https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg",
  //   },
  // ];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
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
              <p>{getText(post.desc)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
