import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogPage.css";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import API_BASE_URL from "../../constants"

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Link className="back-to-home clickable" to="/blogs">
        <FontAwesomeIcon className="back" icon={faArrowLeft} /> Back
      </Link>
      <div className="blog-container">
        <div className="blog-image">
          <img src={blog.image} alt={blog.title} />
        </div>
        <div className="blog-content">
          <h2>{blog.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
