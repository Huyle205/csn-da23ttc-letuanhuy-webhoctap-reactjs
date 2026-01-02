
const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className="w-full flex flex-col bg-white ">
            <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                <iframe 
                width="100%" 
                height="100%" 
                src={videoUrl} 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;fullscreen" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}


export default VideoPlayer;