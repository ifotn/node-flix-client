# COMP2068 Node Flix Client

Created using Next.js:

```bash
npx create-next-app@latest node-flix-client --yes
```

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Lesson 9 Notes

We created .env.local with 2 env vars (excluded by .gitignore):

# Express API Backend Domain
NEXT_PUBLIC_SERVER_URL=http://localhost:4000/api

# React / Next Client Domain
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000/api

## Lesson 13 Notes

This week we used the context hook as a global variable store with setters to hide forms from anonymous users and toggle navbar links depending on a user's authentication status.
