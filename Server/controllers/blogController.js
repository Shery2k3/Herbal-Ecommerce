const Blog = require("../models/blogModel");

module.exports = {
    getAllBlogs: async (req, res, next) => {
        try {
            const blogs = await Blog.find().sort({ _id: -1 });
    
            res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    createBlog: async (req, res, next) => {
        try {
            let { image, title, content } = req.body;

            const blog = await Blog.create({ title, content, image });
            res.status(200).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    editBlog: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, content, image } = req.body;

            const updatedBlog = await Blog.findByIdAndUpdate(
                id,
                { title, content, image },
                { new: true }
            );

            if (!updatedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            res.status(200).json(updatedBlog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    deleteBlog: async (req, res, next) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);

            if (!blog) {
                return res
                    .status(404)
                    .json({ message: "No blog found with this id." });
            }

            await Blog.findByIdAndDelete(id);

            res.json({ message: "Blog deleted successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    getBlogById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);

            if (!blog) {
                return res
                    .status(404)
                    .json({ message: "No blog found with this ID." });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
};
