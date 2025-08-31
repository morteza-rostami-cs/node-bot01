// let's langchain:

/*
📘 LangChain.js Lessons

Introduction & Ecosystem Overview

Installation & Project Setup

Build a Simple LLM App

Prompt Templates & Structured Output

Semantic Search (Loaders + Embeddings + Vector Stores)

Text Classification

Data Extraction (Structured Outputs)

Tool Calling with Chat Models

LangChain Expression Language (LCEL) Basics

Streaming & Parallel Execution with LCEL

Building a Chatbot with Memory

Building an Agent with LangGraph.js

RAG App – Part 1: Basic Document Q&A

RAG App – Part 2: Conversational / Multi-Step RAG

Question Answering with SQL

Summarization Pipeline

Question Answering with Graph Databases

Debugging & Tracing LLM Apps

Security Best Practices
*/

/*
# langchain features:

  # prompt management ->templates, chaining, dynamic input
  # data retrieval =>pdf, dbs, web etc
  # agents and tools => llmS making decisions ->call apis and tools(function)
  # chat memory
  # orchestration => Langgraph => for complex workflow
  # vector db =>Chroma
  # embedding

# 

*/
import { CallbackManager } from '@langchain/core/callbacks/manager';
import { Ollama } from '@langchain/ollama';
// import { LLM, LLMResult } from 'langchain/schema/';
import readline from 'readline';
import { PromptTemplate } from '@langchain/core/prompts';
// import { LLMChain } from 'langchain/chains';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

const OLLAMA_URI = 'http://localhost:11434';
const OLLAMA_PORT = '11434';
// embed model
const EMBED_MODEL = 'mxbai-embed-large';
const LLM_NAME = 'gemma2:2b';

process.env.LANGCHAIN_DEBUG = 'false';

// create a read input
const readInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// start a llm
const llm = new Ollama({
  model: LLM_NAME,
  temperature: 0.7,
  maxRetries: 2,
  // stream: true,
  baseUrl: OLLAMA_URI,
  // verbose: true,
});

async function getLLMStream(query: string) {
  // prompt template
  const template = `
  role: you are a helpful assistant, provide best answers for my queries.

  RULES:
  1. each answer should not be longer than 1000 tokens.

  query: {topic}
  `;

  // langchain prompt
  const prompt = PromptTemplate.fromTemplate(template, {});

  // output parser
  const outputParser = new StringOutputParser();

  // chain
  const chain = RunnableSequence.from([prompt, llm, outputParser]);

  // example input data
  // const inputData = { topic: 'ice cream' };

  // const stream = await llm.stream(query);
  const stream = await chain.stream({ topic: query }, {});

  console.log('\n************* streaming the response: \n');
  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
  console.log('\n*************\n');
}

function getInput(query: string): Promise<any> {
  const response = new Promise((resolve: any) => {
    readInput.question(query, (answer) => {
      resolve(answer);
    });
  });
  return response;
}

async function tut01() {
  async function run() {
    console.log('program start --');

    // get user input => pause
    while (true) {
      const query = await getInput('Enter your question: or /exit\n');

      console.log('your query: \n' + query + '\n');

      // quit
      if (query.toLowerCase() === '/exit') {
        console.log('GOOD BYE!');
        readInput.close();
        break;
      }

      // get response from llm =>await the stream
      await getLLMStream(query);
    }

    // close the readline
    // readInput.close();

    console.log('end of program------');
  }

  run();
}

tut01();
