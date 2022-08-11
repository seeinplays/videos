import { getYouTubeId } from 'src/helpers/url'

const VideoThumbnail = ({ width = 480, height = 360, video }) => {
  const { url } = video
  const id = getYouTubeId(url)

  return (
    <div className="bg-black" style={{ width, height }}>
      {id ? (
        <img
          alt={video.title}
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        />
      ) : (
        <div>Video url ${video.url} is not supported</div>
      )}
    </div>
  )
}

export default VideoThumbnail
