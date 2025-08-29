import { ChromaClient, QueryResult, type Collection } from 'chromadb';
// import { Document } from 'langchain/document';

export class ChromaService {
  protected client: ChromaClient;

  constructor({ url = 'http://localhost:8000' }: { url?: string }) {
    this.client = new ChromaClient({ path: url });
  }

  // create collection
  public async createCollection({ name }: { name: string }): Promise<void> {
    this.client.createCollection({ name });
  }

  // get a collection
  public async getCollection({ name }: { name: string }): Promise<Collection> {
    return this.client.getCollection({ name });
  }

  // add a new doc
  public async addDoc({
    collectionName,
    id,
    text,
    metadata = {},
  }: {
    collectionName: string;
    id: string;
    text: string;
    metadata: Record<string, any>;
  }): Promise<void> {
    const collection = await this.getCollection({ name: collectionName });
    await collection.add({ ids: [id], documents: [text], metadatas: [metadata] });
  }

  // similarity search
  public async similaritySearch({
    collectionName,
    query,
    topK = 5,
  }: {
    collectionName: string;
    query: string;
    topK: number;
  }): Promise<QueryResult> {
    // get the collection we are searching =>collection of vectors
    const collection = await this.getCollection({ name: collectionName });
    const results = await collection.query({ queryTexts: [query], nResults: topK });
    return results;
  }
}
