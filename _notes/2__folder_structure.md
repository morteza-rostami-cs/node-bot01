<!--

/src
  /api
    /routes         → Express route definitions (auth, users, ai, bots, etc.)
    /controllers    → Request handling, orchestrates services
    /middlewares    → Auth, rate limiting, error handler, logging
  /core
    /config         → Env vars, DB configs, Redis configs
    /errors         → Custom error classes
    /logger         → Centralized logging (winston/pino)
    /utils          → Helpers (validators, formatters)
  /domain
    /models         → Entities (User, ChatSession, Document, etc.)
    /repositories   → Abstract persistence layer (Mongo, SQL, Redis)
    /services
      /auth         → JWT, sessions
      /user         → User CRUD
      /files        → File upload/storage
      /ai           → All AI related services
         /llm       → Interface for LLMs (OpenAI, Ollama)
         /rag       → Retrieval pipelines (Chroma, Pinecone)
         /graph     → LangGraph orchestrations
         /memory    → Redis conversation memory
         /agents    → Agents + tools
  /infrastructure
    /db             → Mongo connection (or other DBs later)
    /vector         → Chroma client (swap to Pinecone/Qdrant easily)
    /cache          → Redis connection
  /interfaces
    /telegram       → Telegram bot adapter
    /websocket      → Socket.io/WS server
    /http           → Express bootstrap
  /tests
    /unit
    /integration


================================


/src
  /config           → environment config, constants, 3rd-party API configs
    └─ index.ts
  /modules          → feature-specific modules (CRUD, AI services, bots)
    └─ user/
        ├─ controller.ts
        ├─ service.ts
        ├─ repository.ts
        └─ schema.ts
  /shared           → reusable utilities, types, helpers
    ├─ utils/
    ├─ types/
    └─ constants.ts
  /infra            → infrastructure layer (DB, Redis, vector stores)
    ├─ db/
    │   └─ mongo.ts
    ├─ cache/
    │   └─ redis.ts
    └─ vector/
        └─ chroma.ts
  /bots             → Telegram / other bot adapters
    └─ telegramBot.ts
  /domain           → optional: core entities & business logic (OOP classes)
  /services         → AI services, LangChain/LangGraph orchestrations
    ├─ llmService.ts
    ├─ ragService.ts
    ├─ graphService.ts
    └─ memoryService.ts
  index.ts          → main Express server entry point
/tests
  /unit             → unit tests
  /integration      → integration tests
.env.example        → environment variable template


=============================
Folder Purpose Explained:

config → central place for API keys, DB URIs, LLM provider configs.

modules → each project feature has its own module (controller → service → repository → schema).

shared → helpers, validators, common types.

infra → DB connections, Redis cache, vector database clients.

bots → Telegram or other bot adapters, can expand later.

domain → core OOP entities (User, ChatSession, Document, etc.).

services → AI-specific logic like LangChain chains, LangGraph flows, retrieval QA, memory management.

tests → structured into unit and integration tests.








/src
  /modules
    /auth
      ├─ controller.ts     → Express handlers (input/output mapping)
      ├─ service.ts        → Business logic (uses ports, not concrete libs)
      ├─ repository.ts     → DB access (User, Session, etc.)
      ├─ schema.ts         → Zod validation
      ├─ ports/            → Interfaces (e.g., HashingPort, TokenPort)
      ├─ adapters/         → Implementations (BcryptAdapter, JwtAdapter)
      └─ index.ts          → glue (container for this module)
  /infra
    /db/                   → Mongo connection
    /cache/                → Redis connection
    /vector/               → Chroma service
  /shared
    /utils/                → helpers (logger, response wrapper, etc.)
    /types/                → global types
  /config                  → env, constants
  /services                → higher-level orchestrations (LangChain, LLM)
  /domain (optional)       → core entities (e.g., UserEntity)









src/
├── services/
│   ├── ai/                          # Application layer for AI-related services
│   │   ├── llm/
│   │   │   ├── ports/               # Abstractions/interfaces
│   │   │   │   ├── ILLMService.ts
│   │   │   │   ├── IEmbeddingService.ts
│   │   │   │   └── IChatService.ts
│   │   │   ├── adaptors/            # Concrete implementations
│   │   │   │   ├── OllamaAdaptor.ts
│   │   │   │   └── OpenAIAdaptor.ts
│   │   │   └── LLMService.ts        # Orchestrator: uses ports, injects adaptors
│   │   ├── vector/
│   │   │   ├── ports/
│   │   │   │   └── IVectorDB.ts
│   │   │   ├── adaptors/
│   │   │   │   ├── ChromaAdaptor.ts
│   │   │   │   └── PineconeAdaptor.ts
│   │   │   └── VectorService.ts     # Orchestrator for vector DB ops
│   │   ├── rag/
│   │   │   └── RAGService.ts        # Combines LLM + VectorService
│   │   └── langGraph/
│   │       └── LangGraphService.ts  # Orchestrates workflows
│   └── telegram/
│       ├── ports/
│       │   └── ITelegramBot.ts
│       ├── adaptors/
│       │   └── TelegramBotAdaptor.ts
│       └── TelegramService.ts       # Orchestrates bot messages, handlers
├── domain/
│   └── services/                    # Pure domain/business logic
│       └── ExampleDomainService.ts
├── modules/
│   └── ...                          # Module-specific controllers/services


 -->
