# AI Customer Support Pipeline

An **event-driven AI customer support system** built with **microservices, Apache Kafka, and Retrieval-Augmented Generation (RAG)**.  
User queries are processed asynchronously through a pipeline of services that classify intent, retrieve relevant knowledge base documents, and generate LLM-powered responses.

The project demonstrates **event-driven backend architecture, distributed systems design, and practical LLM integration**.

---

## Architecture

The system follows an **event-driven pipeline** where each service consumes an event, processes it, and publishes the next event through Kafka.

```
Client
│
▼
Gateway Service
│
▼
Kafka: user_queries
│
▼
Intent Service
│
▼
Kafka: classified_queries
│
▼
Retrieval Service
│
▼
Kafka: retrieved_context
│
▼
Answer Service
│
▼
Kafka: generated_responses
│
▼
Gateway Consumer → PostgreSQL
```

---

## Services

### Gateway Service
Entry point of the system.

Responsibilities:
- Accept user queries via REST API
- Store query metadata in PostgreSQL
- Publish query events to Kafka
- Consume generated responses from Kafka

Endpoints:

```
POST /query
GET /response/:request_id
```

---

### Intent Service
- Consumes `user_queries`
- Classifies user intent using an LLM
- Produces `classified_queries`

---

### Retrieval Service
- Consumes `classified_queries`
- Performs semantic search using **pgvector**
- Produces `retrieved_context`

---

### Answer Service
- Consumes `retrieved_context`
- Generates responses using an LLM
- Produces `generated_responses`

---

## Kafka Topics

| Topic | Producer | Consumer |
|------|--------|--------|
| `user_queries` | Gateway | Intent Service |
| `classified_queries` | Intent Service | Retrieval Service |
| `retrieved_context` | Retrieval Service | Answer Service |
| `generated_responses` | Answer Service | Gateway |

---

## Tech Stack

**Backend**
- Node.js
- TypeScript
- Express

**Event Streaming**
- Apache Kafka
- KafkaJS

**Database**
- PostgreSQL
- pgvector

**AI**
- OpenAI API
- Retrieval-Augmented Generation (RAG)

**Infrastructure**
- Docker
- Docker Compose

---

## Running the Project

Start infrastructure:

```
docker compose up -d
```

Create Kafka topics inside the Kafka container:

```
user_queries
classified_queries
retrieved_context
generated_responses
```

Run gateway service:

```
cd gateway-service
npm install
npm run dev
```

---

## Example Request

**Create query**


POST /query


```json
{
  "query": "Where is my order?"
}

Response:

{
  "request_id": "uuid",
  "status": "processing"
}
````
Fetch result:
```
GET /response/:request_id
```
---
## Key Concepts Demonstrated

- Event-driven microservices

- Kafka producers and consumers

- Asynchronous distributed pipelines

- Retrieval-Augmented Generation (RAG)

- Vector similarity search with pgvector

- Containerized infrastructure with Docker