module.exports.determineFileType = (fileName) => {
    if (!fileName) return 'unknown';

    const fileExtension = fileName.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension);

    return isImage ? 'image' : isVideo ? 'video' : 'unknown';
};