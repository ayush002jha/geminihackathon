import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getPineconeStore } from '@/lib/pineconeClient';

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempFilePath = `/tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(tempFilePath, fileBuffer);

      const loader = new PDFLoader(tempFilePath);
      const docs = await loader.load();

      // Split the documents into chunks
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      const splitDocs = await textSplitter.splitDocuments(docs);

      // Get Pinecone store
      const vectorStore = await getPineconeStore();

      // Add documents to Pinecone
      await vectorStore.addDocuments(splitDocs.map(doc => ({
        ...doc,
        metadata: { ...doc.metadata, source: fileName }
      })));

      // Clean up the temporary file
      await fs.unlink(tempFilePath);
    } else {
      console.log('Uploaded file is not in the expected format.');
    }
  } else {
    console.log('No files found.');
  }

  const response = new NextResponse(JSON.stringify({ message: 'PDF processed and stored successfully' }));
  response.headers.set('Content-Type', 'application/json');
  return response;
}