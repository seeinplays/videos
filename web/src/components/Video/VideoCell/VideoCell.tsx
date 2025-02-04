import type { FindVideoById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Video from 'src/components/Video/Video'

export const QUERY = gql`
  query FindVideoById($id: Int!) {
    video: video(id: $id) {
      id
      url
      title
      description
      imageUrl
      createdAt
      user {
        id
        email
      }
      reactions {
        id
        type
        user {
          id
          email
        }
      }
      comments {
        id
        comment
        user {
          id
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Video not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ video }: CellSuccessProps<FindVideoById>) => {
  return <Video video={video} />
}
