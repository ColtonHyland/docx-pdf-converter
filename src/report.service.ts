import { Injectable, Logger } from '@nestjs/common';
import { generateDocx } from './docx/generate-docx'; // Import the generateDocx function
import axios from 'axios';
import * as FormData from 'form-data';
import * as JSZip from 'jszip';

@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);

  // Generate a DOCX file using the logic from generate-docx.ts
  async generateDocx(data: any): Promise<Buffer> {
    try {
      // Use the generateDocx function to create a DOCX buffer
      const docxBuffer = await generateDocx(data);
      this.logger.log('DOCX generated successfully');
      return docxBuffer; // Return the generated DOCX buffer
    } catch (error) {
      this.logger.error('Error generating DOCX:', error);
      throw error;
    }
  }

  // Convert DOCX to PDF using Gotenberg
  async convertToPDF(docxBuffer: Buffer): Promise<Buffer> {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const form = new FormData();
        form.append('files', docxBuffer, 'report.docx');

        this.logger.log(`Attempting to convert DOCX to PDF (attempt ${retries + 1})`);
        this.logger.log(`Sending request to Gotenberg at: http://gotenberg:3000/forms/libreoffice/convert`);

        const response = await axios.post(
          'http://gotenberg:3000/forms/libreoffice/convert',
          form,
          {
            headers: form.getHeaders(),
            responseType: 'arraybuffer',
            timeout: 10000,
          },
        );

        this.logger.log(`Gotenberg response status: ${response.status}`);
        this.logger.log('Successfully converted DOCX to PDF');
        return response.data;
      } catch (error) {
        this.logger.error(`Error converting DOCX to PDF (attempt ${retries + 1}):`, error);
        if (error.response) {
          this.logger.error('Error response:', error.response.data);
        } else if (error.request) {
          this.logger.error('No response received:', error.request);
        } else {
          this.logger.error('Error setting up request:', error.message);
        }
        retries++;
        if (retries >= maxRetries) {
          throw new Error('Failed to convert DOCX to PDF after multiple attempts');
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async createZipWithDocxAndPdf(docxBuffer: Buffer, pdfBuffer: Buffer): Promise<Buffer> {
    const zip = new JSZip();
    zip.file('report.docx', docxBuffer);
    zip.file('report.pdf', pdfBuffer);
    return zip.generateAsync({ type: 'nodebuffer' });
  }
}
