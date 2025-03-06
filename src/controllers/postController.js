import Post from '../models/post.js';

// Create a new blog post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.userId;

        const post = new Post({ title, content, author });
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Get all blog posts
export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        const posts = await Post.find()
            .populate('author', 'username') 
            .skip(skip) 
            .limit(limit); 

        const totalPosts = await Post.countDocuments(); 
        const totalPages = Math.ceil(totalPosts / limit); 

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages,
            totalPosts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Get a specific blog post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Update a blog post
export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, author: req.userId }, 
            { title, content },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Delete a blog post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};