export const schema = gql`
  enum ReactionType {
    Barf
    Crying
    Grimace
    HeartEyes
    Hearts
    Joy
    Melting
    NoHear
    NoSee
    NoSpeak
    Poop
    PrayerHands
    Rocket
    Rofl
    RussianDoll
    Smiling
    Thinking
    ThumbsUp
    ThumbsDown
  }

  type User {
    id: Int!
    email: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    videos: [Video!]!
    reactions: [Reaction!]!
  }

  type Video {
    id: Int!
    userId: Int!
    url: String!
    title: String!
    description: String
    imageUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    reactions: [Reaction!]!
    comments: [Comment!]!
  }

  type Reaction {
    id: Int!
    userId: Int!
    videoId: Int!
    type: ReactionType!
    createdAt: DateTime!
    video: Video!
    user: User!
  }

  type Comment {
    id: Int!
    userId: Int!
    videoId: Int!
    comment: String!
    createdAt: DateTime!
    video: Video!
    user: User!
  }

  type Query {
    videos: [Video!]! @requireAuth
    video(id: Int!): Video @requireAuth
  }

  input CreateVideoInput {
    url: String!
    title: String!
    description: String
    imageUrl: String!
  }

  input CreateCommentInput {
    comment: String!
    videoId: Int!
  }

  input UpdateVideoInput {
    url: String
    title: String
    description: String
    imageUrl: String
  }

  type Mutation {
    createVideo(input: CreateVideoInput!): Video! @requireAuth
    updateVideo(id: Int!, input: UpdateVideoInput!): Video! @requireAuth
    reactToVideo(id: Int!, type: ReactionType!): Video! @requireAuth
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    deleteVideo(id: Int!): Video! @requireAuth
  }
`
