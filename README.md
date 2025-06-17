# 📢 HeyAll Chat App 📢

This application allows users to communicate through the use of one-to-one chats.

[Live link](https://chat-app-5adk.onrender.com/login)
```
email: john@email.com
password: 12345678
```

## Features

- Stack: MERN, Zustand, Socket.io, ShadCN, TailwindCSS
- Online user status
- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## Create .env file

```bash
// database
MONGODB_URI=........
PORT=3001
JWT_SECRET=........

NODE_ENV=development

// media storage
IMAGEKIT_PUBLIC_KEY=.........
IMAGEKIT_PRIVATE_KEY=........
IMAGEKIT_URL_ENDPOINT=.........
```

Be sure to replace the omitted values in the .env files with your own details.

- Setup MongoDB here: https://www.mongodb.com/
- Setup Imagekit here: https://imagekit.io/

## Build project

```bash
npm run build
```

## Start project

```bash
npm start
```

## Roadmap

- image upload optimization
- add search for user in sidebar
- create a groupchat
- online/offline display etc
- emoji support
- typing notification (user is typing...)
- add filter
- settings page for user account settings -> separate from profile options (delete account, change password etc)
- stronger password verification
- email authentication
