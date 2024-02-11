![Alt text](image.png)

Kisahari, a personal journaling app where you can chat with your entries locally.

## Motivation

I just want a personal journal app where i keep the data locally, while having the power to chat with it using local LLM.

## Features

- Minimal techy look
- NextJS + TailwindCSS
- Keyboard shortcut
- Local LLM support through Ollama
- Langchain for RAG
- Local embedding
- In-memory Vector DB
- Entries stored in IndexedDB

## Todo / Ideas

- Option to use OpenAI API
- Turn into PWA
- Turn into Tauri app (Desktop)

## Develop

clone the repo

```
git clone https://github.com/0xn1/kisahari.git
```

install dependencies

```
cd kisahari && bun i
```

run development server

```
bun run dev
```

build the app

```
bun run build
```
