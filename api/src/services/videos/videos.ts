import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
  ReactionResolvers,
  CommentResolvers,
  VideoResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const videos: QueryResolvers['videos'] = () => {
  return db.video.findMany()
}

async function findById({ table, id, assert = false }) {
  const row = await table.findUnique({
    where: { id },
  })
  if (!row && assert) {
    throw new Error('Not found')
  }
  return row
}

export const video: QueryResolvers['video'] = ({ id }) => {
  return findById({ table: db.video, id })
}

export const createVideo: MutationResolvers['createVideo'] = (
  { input },
  { context }
) => {
  return db.video.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })
}

export const createComment: MutationResolvers['createComment'] = (
  { input },
  { context }
) => {
  return db.comment.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })
}

export const updateVideo: MutationResolvers['updateVideo'] = ({
  id,
  input,
}) => {
  return db.video.update({
    data: input,
    where: { id },
  })
}

export const reactToVideo: MutationResolvers['reactToVideo'] = async (
  { id: videoId, type },
  { context }
) => {
  const userId = context.currentUser.id

  const video = findById({ table: db.video, id: videoId, assert: true })

  const existing = await db.reaction.findFirst({
    where: {
      videoId,
      userId,
    },
  })

  // remove their existing reaction
  if (existing) {
    await db.reaction.delete({
      where: {
        id: existing.id,
      },
    })
  }

  // add their reaction if its different
  if (!existing || type !== existing.type) {
    await db.reaction.create({
      data: {
        userId,
        videoId,
        type,
      },
    })
  }

  return video
}

export const deleteVideo: MutationResolvers['deleteVideo'] = ({ id }) => {
  return db.video.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  reactions: (_args, { root }) =>
    db.reaction.findMany({ where: { userId: root.id } }),
  videos: (_args, { root }) =>
    db.video.findMany({ where: { userId: root.id } }),
}

export const Video: VideoResolvers = {
  reactions: (_args, { root }) =>
    db.reaction.findMany({ where: { videoId: root.id } }),
  comments: (_args, { root }) =>
    db.comment.findMany({ where: { videoId: root.id } }),
  user: (_args, { root }) => findById({ table: db.user, id: root.userId }),
}

export const Reaction: ReactionResolvers = {
  video: (_args, { root }) => findById({ table: db.video, id: root.videoId }),
  user: (_args, { root }) => findById({ table: db.user, id: root.userId }),
}

export const Comment: CommentResolvers = {
  video: (_args, { root }) => findById({ table: db.video, id: root.videoId }),
  user: (_args, { root }) => findById({ table: db.user, id: root.userId }),
}
