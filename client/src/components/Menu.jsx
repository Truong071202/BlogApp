import axios from "axios";
import React, { useEffect, useState } from "react";
import { start, done } from "../services/nprogressService"; // Import nprogressService
import { Link, useNavigate } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const navigate = useNavigate();
  const handleReadMore = (id) => {
    start(); // Start the progress bar
    setTimeout(() => {
      navigate(`/post/${id}`);
      done(); // Complete the progress bar
      window.scrollTo(0, 0);
    }, 500); // Adjust the delay as needed
  };
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
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <Link
            onClick={() => handleReadMore(post.id)}
            style={{ textDecoration: "unset" }}
          >
            <h2>{post.title}</h2>
          </Link>
          <button onClick={() => handleReadMore(post.id)}>Read more</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
