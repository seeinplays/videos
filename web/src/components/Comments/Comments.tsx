import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($comment: String!, $videoId: Int!) {
    createComment(input: { comment: $comment, videoId: $videoId }) {
      id
      comment
      user {
        id
        email
      }
    }
  }
`

const Comments = ({ video }) => {
  const [comment, setComment] = useState('')
  const { comments } = video
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION)

  const commentSubmit = () => {
    const videoId = video.id
    console.log('Video id :', videoId, comment)
    createComment({ variables: { comment, videoId } })
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button onClick={commentSubmit}>Submit</button>
      </div>

      <div>
        <h2>{'Comments'}</h2>
        {comments.map((comment) => (
          <div key={comment.id}>{comment.comment}</div>
        ))}
      </div>
    </div>
  )
}

export default Comments
