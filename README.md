
# KnowledgeBase AI

An AI-powered customer support assistant that helps businesses answer customer questions using their own documentation.

## Overview

Businesses often receive repetitive customer questions about shipping, returns, product information, and company policies. The answers may already exist in their documentation, but finding and responding to every question manually takes time.

KnowledgeBase AI allows a business to upload PDF documents and create an AI-powered support assistant that customers can interact with through an embeddable chat widget.

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
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Vector search | MongoDB Atlas Vector Search |
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
5. The text, metadata, and embeddings are stored in MongoDB Atlas.

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
      +------> MongoDB Atlas
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
                MongoDB Atlas


Customer Website
      |
      v
 JavaScript Chat Widget
      |
      v
 Chat API --> Vector Search --> Gemini API
      |                            |
      +--------> Answer + Sources <-+
```

## Project Structure

```text
knowledgebase-ai/
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── queue/
│   │   ├── workers/
│   │   ├── config/
│   │   ├── db.js
│   │   └── app.js
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
- MongoDB Atlas account
- Redis
- A Gemini API key

### Installation

**1. Clone the repository**

```bash
git clone <repository-url>
cd knowledgebase-ai
```

**2. Configure MongoDB Atlas**

- Create a MongoDB Atlas cluster.
- Create a database user with appropriate permissions.
- Configure your network access.
- Copy your MongoDB connection string.

**3. Configure environment variables**

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

REDIS_HOST=localhost
REDIS_PORT=6379

GEMINI_API_KEY=your_gemini_api_key
```

**4. Start Redis**

From the project root:

```bash
docker compose up -d
```

**5. Install backend dependencies**

```bash
cd server
npm install
```

**6. Start the development server**

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

The health endpoint can be accessed at:

```text
http://localhost:5000/health
```

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

- [x] Initialize backend and configure Docker services.
- [x] Configure MongoDB Atlas connection.
- [ ] Design Mongoose schemas and data models.
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
- MongoDB, Mongoose, and database indexing.
- Vector similarity search.
- Retrieval-Augmented Generation (RAG).
- Asynchronous processing and job queues.
- Multi-tenant application architecture.
- API security, testing, and error handling.
- Deploying and operating a full-stack application.

## Future Improvements

Potential future additions include website content ingestion, answer feedback, owner notifications, and customizable chat widget themes.

## License

This project is intended as a learning and portfolio project. A license will be selected before public distribution.
