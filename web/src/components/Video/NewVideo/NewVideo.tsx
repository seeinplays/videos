import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import VideoForm from 'src/components/Video/VideoForm'

const CREATE_VIDEO_MUTATION = gql`
  mutation CreateVideoMutation($input: CreateVideoInput!) {
    createVideo(input: $input) {
      id
    }
  }
`

const NewVideo = () => {
  const [createVideo, { loading, error }] = useMutation(CREATE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video created')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = ({ input: { title, url, description, imageUrl } }) => {
    createVideo({ variables: { input: { title, url, description, imageUrl } } })
  }

  return (
    <div>
      <VideoForm onSave={onSave} loading={loading} error={error} />
    </div>
  )
}

export default NewVideo
