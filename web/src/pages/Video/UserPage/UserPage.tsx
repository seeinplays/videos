import UserCell from 'src/components/Video/UserCell'

type VideoPageProps = {
  id: number
}

const VideoPage = ({ id }: VideoPageProps) => {
  return <UserCell id={id} />
}

export default VideoPage
