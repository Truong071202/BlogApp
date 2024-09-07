import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit-icon.png";
import Delete from "../img/delete-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "./../context/authContext";
import { showSuccessToast } from "../services/toastService";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  //localhost:5137/post/1, need id post => 1, in the third place. but index array = 2
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");
      showSuccessToast("The post has been deleted");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        console.log(res.data);

        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{getText(post.title)}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
