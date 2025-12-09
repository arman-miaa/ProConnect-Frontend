const VideoModal = ({ onClose }) => {
  const handleBackdropClick = (e) => {

    if (e.target.id === "video-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="video-backdrop"
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black rounded-xl overflow-hidden max-w-6xl w-full">
        {/* Video iframe */}
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/VUeB8WhbZQo?autoplay=1"
            title="ProConnect Project Overview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-white cursor-pointer bg-red-500 hover:bg-red-600 pl-2 pr-3 py-1 rounded-full"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
