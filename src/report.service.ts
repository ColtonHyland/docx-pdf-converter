import { Injectable } from '@nestjs/common';
import { generateDocx } from './docx/generate-docx';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class ReportService {
  async generateDocx(data: any): Promise<Buffer> {
    const docxBuffer = await generateDocx(data);
    return docxBuffer;
  }

  async convertToPDF(docxBuffer: Buffer): Promise<Buffer> {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const response = await axios.post('http://localhost:3000/convert', docxBuffer, {
          headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
          responseType: 'arraybuffer',
          timeout: 10000, // 10 seconds timeout
        });
        return Buffer.from(response.data);
      } catch (error) {
        console.error(`Error converting DOCX to PDF (attempt ${retries + 1}):`, error);
        retries++;
        if (retries >= maxRetries) {
          throw new Error('Failed to convert DOCX to PDF after multiple attempts');
        }
        // Wait for 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}
