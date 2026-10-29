
# KnowledgeBase AI

An AI-powered customer support assistant that helps businesses answer customer questions using their own documentation.

## Overview

Businesses often receive repetitive customer questions about shipping, returns, product information, and company policies. The answers may already exist in their documentation, but finding and responding to every question manually takes time.

KnowledgeBase AI allows a business to upload its PDF documents and create an AI-powered support assistant that customers can interact with through an embeddable chat widget.

The system retrieves relevant information from the business's knowledge base, generates answers using that information, and provides source citations so users can understand where the answers came from.

When the available documents do not contain a reliable answer, the assistant can acknowledge the uncertainty and save the unanswered question for the business owner.

## Key Features

The following features are planned for the project:

- **Document ingestion:** Upload PDF documents and process them in the background.
- **AI-powered knowledge base:** Extract, chunk, and convert document content into vector embeddings.
- **Semantic search:** Retrieve relevant document sections based on the meaning of a question.
- **Context-aware answers:** Generate answers using retrieved document content through Retrieval-Augmented Generation (RAG).
- **Source citations:** Show the source document and page associated with an answer.
- **Unanswered question handling:** Record questions that cannot be answered confidently.
- **Embeddable chat widget:** Allow businesses to add a support chatbot to their websites using a JavaScript snippet.
- **Conversation history:** Store conversations and support follow-up questions.
- **Business workspaces:** Keep each business's documents, conversations, and data isolated.
- **Background processing:** Use a job queue to process uploaded documents asynchronously.
- **Usage analytics:** Track conversations, messages, and answered versus unanswered questions.

## Tech Stack

| Component | Technology |
|---|---|
| Frontend dashboard | React, Vite |
| Backend API | Node.js, Express.js |
| Database | PostgreSQL |
| Vector search | pgvector |
| Background jobs | Redis, BullMQ |
| AI and embeddings | Gemini API |
| Authentication | JWT, bcrypt |
| PDF processing | pdf-parse or pdfjs-dist |
| File uploads | Multer |
| Chat widget | Vanilla JavaScript |
| Local development | Docker Compose |

## How It Works

### 1. Document Ingestion

1. A business owner uploads a PDF.
2. The backend stores the document and queues a background job.
3. A worker extracts the text and divides it into smaller chunks.
4. An embedding model converts the chunks into numerical vectors.
5. The text, metadata, and embeddings are stored in PostgreSQL with pgvector.

### 2. Question Answering

1. A customer asks a question through the chat widget.
2. The backend converts the question into an embedding.
3. Vector search retrieves the most relevant document chunks.
4. A relevance check determines whether sufficient information is available.
5. The AI generates an answer using the retrieved context.
6. The response includes source citations, or the system records the question as unanswered when appropriate.

### 3. Business Dashboard

Business owners will be able to manage their documents, test their chatbot, review conversations, inspect unanswered questions, and monitor usage.

## Architecture

```text
Business Owner
      |
      v
 React Dashboard
      |
      v
 Node.js / Express API
      |
      +------> PostgreSQL + pgvector
      |              ^
      |              |
      +------> Redis / BullMQ
                     |
                     v
               Background Worker
                     |
             Extract PDF Text
                     |
                Chunk Text
                     |
              Create Embeddings
                     |
                     v
               PostgreSQL


Customer Website
      |
      v
 JavaScript Chat Widget
      |
      v
 Chat API --> Vector Search --> Gemini API
      |                              |
      +----------> Answer + Sources <-+
```

## Project Structure

```text
knowledgebase-ai/
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── queue/
│   │   ├── workers/
│   │   ├── config/
│   │   └── app.js
│   ├── migrations/
│   └── tests/
├── client/
├── widget/
├── eval/
├── docs/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

This project is currently under development. Setup instructions will be updated as the implementation progresses.

### Prerequisites

- Node.js and npm
- Docker and Docker Compose
- PostgreSQL with the pgvector extension
- Redis
- A Gemini API key

### Planned Setup

1. Clone the repository.
2. Configure environment variables using `.env.example`.
3. Start PostgreSQL and Redis using Docker Compose.
4. Install backend and frontend dependencies.
5. Run database migrations.
6. Start the API server, background worker, and React dashboard.

Never commit API keys, database credentials, JWT secrets, or other sensitive environment variables.

## Security and Reliability

The implementation will focus on:

- Workspace-level data isolation.
- Authentication and authorization.
- File type and file size validation.
- Background job retries and failure handling.
- API rate limiting and request validation.
- Secure widget access using public keys and allowed domains.
- Environment-based configuration and secret management.
- Tests for cross-workspace data access.

## Development Roadmap

- [ ] Set up PostgreSQL, pgvector, and Redis.
- [ ] Design the database schema and migrations.
- [ ] Implement authentication and workspaces.
- [ ] Build PDF extraction, chunking, and embedding.
- [ ] Implement semantic retrieval and cited answers.
- [ ] Add background document processing with BullMQ.
- [ ] Build conversation history and unanswered question handling.
- [ ] Develop the React dashboard.
- [ ] Build and secure the embeddable chat widget.
- [ ] Add usage analytics and retrieval evaluation.
- [ ] Write tests and deploy the application.

## Learning Objectives

This project is intended to provide practical experience with:

- Backend API design and database modelling.
- PostgreSQL, SQL, and vector similarity search.
- Retrieval-Augmented Generation (RAG).
- Asynchronous processing and job queues.
- Multi-tenant application architecture.
- API security, testing, and error handling.
- Deploying and operating a full-stack application.

## Future Improvements

Potential future additions include website content ingestion, answer feedback, owner notifications, and customizable chat widget themes.

## License

This project is intended as a learning and portfolio project. A license will be selected before public distribution.
