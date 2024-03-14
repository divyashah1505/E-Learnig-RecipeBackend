const pool = require('../../config/db');

const getCategoryVideos = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    // Fetch videos for the specified category from the database
    const query = 'SELECT * FROM videos WHERE category_id = $1';
    const result = await pool.query(query, [categoryId]);
    const videos = result.rows.map(video => ({
      ...video,
      video_url: `/videos/${video.video_url}`,
      thumbnail_url: `/thumbnail/${video.thumbnail_image_name}`
    }));
    // Send the videos data as JSON response
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching category videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVideo = (req, res) => {
  const videoFileName = req.params.videoFileName;
  // Serve the video file from the upload directory
  res.sendFile(videoFileName, { root: 'upload/videos' });
};

const getThumbnailImage = (req, res) => {
  const thumbnailFileName = req.params.thumbnailFileName;
  // Serve the thumbnail image from the upload directory
  res.sendFile(thumbnailFileName, { root: 'upload/thumbnails' });
};

module.exports = { getCategoryVideos, getVideo, getThumbnailImage };
