# Videos App
The code we'll be working on implements a basic application that lets you share and react to videos. Currently it supports YouTube urls i.e. `https://www.youtube.com/watch?v=kfVsfOSbJY0` and has the following pages

| Route | Page |
| - | - |
| [/videos/new](http:localhost:8910/videos/new) | Create a video  |
| [/videos/:id](http:localhost:8910/videos/1) | View a video |
| [/videos/:id/edit](http:localhost:8910/videos/1/edit) | Edit a video |
| [/videos](http:localhost:8910/videos) | All the videos |

# Technical Interview
Our goals for the technical interview are to:
- Understand your approach to coding
- Experience collaborating together

Our process has two steps:
1. A take home intro to familiarize you with the codebase
1. A follow-up video call reviewing your code and collaborating on additional fixes and enhancements

In the [Intro](#intro) section below, we've listed some known bugs and potential feature enhancements. **We do not expect or want you to do everything listed there.**  Start with a bug from section 1 to get going and then move on to working on the full stack feature from section 2 that you find most interesting. We believe this should take between 1 and 2 hours. Please don't spend more than 2 hours on this first step. The goal is just for you to get familiar with the codebase prior to our call where we'll discuss your changes and collaborate on additional features.

# Setup
## Installing dependencies
If you don't already have Yarn and Node.js installed, here's how we recommend installing them:

### **[NVM](https://github.com/nvm-sh/nvm)**
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
$ nvm install 14.18.0
$ nvm alias default 14.18.0
```

### **Yarn**
Instructions on installing Yarn are [here](https://yarnpkg.com/getting-started/install)

## Cloning and running the app
1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repo
2. Clone it to your local machine
3. Install deps and setup the [SQLite](https://www.sqlite.org/index.html) database
```
cd videos
git checkout -b <yourname>
echo SESSION_SECRET=putsomeuniquelongstringoftexthereplz > .env
yarn
yarn migrate
```
4. Start the app
```
yarn dev
````

# Intro
## 0. Sign up
Once you are running the app, start by signing up and creating a video:
1. Create an account for yourself by opening [/signup](http://localhost:8910/signup) and entering an email and password.
2. Open [/videos/new](http:localhost:8910/videos/new) and add your first video(s)

You may find it helpful to open two browsers / browser sessions so you can log in as multiple users, but that isn't required for all the features mentioned.

## 1. Bugs
- [ ] The [Nav](./web/src/components/Nav/Nav.tsx) component should show the currently active link in bold but the logic is broken
- [ ] On the [new video page](http:localhost:8910/videos/new) the `description` field isn't getting properly sent in the [mutation](./web/src/components/Video/NewVideo/NewVideo.tsx#L26-L28)
- [ ] The [delete video](./api/src/services/videos/videos.ts#L89-L91) resolver isn't working correctly
- [ ] The [edit and delete buttons](./web/src/components/Video/Video/Video.tsx#L70-L78) on the video page are different heights

## 2. Features
- [ ] There is a commented out `imageUrl String?` field on the `Video` schema [model](./api/db/schema.prisma#L30). Uncomment that, run `yarn migrate`, and then add support for passing it to the `createVideo` and `updateVideo` mutations. Request the `imageUrl` field on the `/videos` [page](https://github.com/myria-us/videos/blob/main/web/src/components/Video/VideosCell/VideosCell.tsx#L8-L21) so you can display it as the video thumbnail when it has been set on a video
- [ ] Add additional [ReactionType](https://github.com/myria-us/videos/blob/main/api/src/graphql/schema.sdl.ts#L2-L20) emoji(s).
- [ ] Add support for showing all the videos uploaded by a given user using a query param i.e. `/videos?userId=1` or on a dedicated page i.e. `/user/1`
- [ ] Add support for showing all the videos with a given reaction using a query param i.e `/videos?reaction=Rofl` or on a dedicated page i.e. `/reaction/Rofl`

<!--
## UI Features
- [ ] Use [Tailwind](https://tailwindcss.com/docs/responsive-design) to make the UI responsive
- [ ] Show the `createdAt` timestamp on the video page more readably
- [ ] Support some video host other than YouTube i.e. [Vimeo](https://developer.vimeo.com/player/sdk/basics)
- [ ] Add support for [Markdown](https://github.com/remarkjs/react-markdown) rendering in the video description
-->

## 3. Sharing your code
When you are done with your bug fix and feature, please share the code as follows:
1. Commit your changes and push the branch to **your fork of the repo**.
2. [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) off of `main` **in your fork of the repo**.
3. Follow the link in the email where we sent you this challenge in order to schedule our follow up call. There will be a text field where you can share the url to the PR you just created.

# Notes
## File Structure

This is a [RedwoodJS](https://redwoodjs.com/)-based project, which is what we use for our production app. The code is loosely based on the [Redwood Tutorial](https://redwoodjs.com/docs/tutorial/). The app uses [React](https://reactjs.org/) and [Tailwind](https://tailwindcss.com/docs/utility-first) on the frontend, [Node.js](https://nodejs.org/en/docs/) and [GraphQL](https://graphql.org/) for the API, and [Prisma](https://www.prisma.io/docs/) for reading from and writing to a [SQLite](https://www.sqlite.org/index.html) database. Here are some key directories and files you will want to keep in mind. There are more details are in [Redwood docs](https://redwoodjs.com/docs/tutorial/chapter1/file-structure).

| Path | Purpose |
| - | - |
| [/api/db/schema.prisma](./api/db/schema.prisma) | [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) which defines the database models |
| [/api/src/graphql/schema.sdl.ts](./api/src/graphql/schema.sdl.ts) | [GraphQL schema file](https://graphql.org/learn/schema/) which defines the API interface |
| [/api/src/services/videos/videos.ts](./api/src/services//videos/videos.ts) | `videos` service where your [GraphQL resolvers](https://redwoodjs.com/docs/graphql#server-side) are implemented |
| [/web/src/Routes.tsx](./web/src/Routes.tsx) | Frontend [Routes](https://redwoodjs.com/docs/router) file |
| [/web/src/components/](./web/src/components) | Frontend [React](https://reactjs.org/) components |
| [/web/src/helpers/](./web/src/helpers) | Frontend helpers (functions, enums, hooks, etc.) |
| [/web/src/layouts/](./web/src/layouts) | Frontend [React](https://reactjs.org/) [Layout](https://redwoodjs.com/docs/tutorial/chapter1/layouts) components |
| [/web/src/pages/](./web/src/pages) | Frontend [React](https://reactjs.org/) [Page](https://redwoodjs.com/docs/tutorial/chapter1/first-page) components |


## Documentation
- [README generated by Redwood](./Redwood.md)
- [Redwood](https://redwoodjs.com/docs/index)
- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/docs/utility-first)
- [GraphQL](https://graphql.org/)
- [Prisma](https://www.prisma.io/docs/)
- [Node.js](https://nodejs.org/en/docs/)
- [SQLite](https://www.sqlite.org/index.html)
- [Yarn](https://yarnpkg.com/)

## Commands
Here are some commands you may find useful

## Run the app
```
yarn dev
```

## Migrate the database
If you make changes to [/api/db/schema.prisma](./api/db/schema.prisma) you will want to run this to sync your database with the schema. If needed it will generate and apply a migration.
```
yarn migrate
```

## Open Prisma studio
This will open a web UI to view and edit the contents of the database
```
yarn studio
```

## Reset the db
This will wipe / reset the db
```
yarn reset
```

## Generate a component
This will generate a new react component named `{name}` in [/web/src/components/](./web/src/components)
```
yarn rw g component <name>
```

## Generate a page
This will generate a new react component named `{name}Page` (with optional `<path>` for the associated route) in [/web/src/pages/](./web/src/pages)
```
yarn rw g page <name> <path>
```

## Adding a frontend dependency
```
yarn workspace web add <dep name>
```

## Adding a backend dependency
```
yarn workspace api add <dep name>
```

## Clean and reinstall deps
In case you run into any issues running the app after installing dependencies, this is worth trying.
```
yarn clean
yarn
```

