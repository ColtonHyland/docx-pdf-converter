import { Injectable } from '@nestjs/common';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class ReportService {
  async generateDocx(data: any): Promise<Buffer> {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun('JSON Data Output'),
                new TextRun(JSON.stringify(data)),
              ],
            }),
          ],
        },
      ],
    });

    // Return the .docx file as a Buffer
    return await Packer.toBuffer(doc);
  }

  async convertToPDF(docxBuffer: Buffer): Promise<Buffer> {
    const form = new FormData();
    form.append('files', docxBuffer, 'report.docx');

    // Send the .docx file to Gotenberg for PDF conversion
    const response = await axios.post(
      'http://gotenberg:3001/forms/libreoffice/convert',
      form,
      {
        headers: form.getHeaders(),
        responseType: 'arraybuffer',
      },
    );

    return response.data;
  }
}
