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
    const form = new FormData();
    form.append('files', docxBuffer, 'report.docx');

    const response = await axios.post(
      'http://localhost:3001/forms/libreoffice/convert',
      form,
      {
        headers: form.getHeaders(),
        responseType: 'arraybuffer',
      },
    );

    return response.data;
  }
}
