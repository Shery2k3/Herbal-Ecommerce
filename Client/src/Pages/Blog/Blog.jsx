import React, { useState, useEffect } from "react";
import Card from "../../Components/BlogCard/Card";
const { Meta } = Card;
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination, Spin } from "antd";
import "./Blog.css";
import API_BASE_URL from "../../constants"

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [displayedBlogs, setDisplayedBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_BASE_URL}/blog/blogs`)
            .then((response) => {
                setBlogs(response.data);
                setDisplayedBlogs(
                    response.data.slice((currentPage - 1) * 5, currentPage * 5)
                );
                setTimeout(() => {
                    const blogItems = document.querySelectorAll(".blog-item");
                    blogItems.forEach((item) => item.classList.add("loaded"));
                }, 100);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <div className={loading ? "loading-container" : ""}>
            <Spin spinning={loading} size="large">
                <h2 className="blog-header">Blogs</h2>
                <div className="blogs-container">
                    {displayedBlogs.map((blog) => (
                        <div key={blog._id} className="blog-item card-wrapper">
                            <Link
                                to={`/blogs/${blog._id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Card
                                    image={blog.image}
                                    title={blog.title}
                                    description={blog.content}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "50px 0px",
                    }}
                >
                    {blogs.length > 5 && (
                        <Pagination
                            className="custom-pagination"
                            current={currentPage}
                            total={blogs.length}
                            pageSize={5}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    )}
                </div>
            </Spin>
        </div>
    );
};

export default Blog;
