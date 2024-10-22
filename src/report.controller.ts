import { Controller, Post, Body, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('generate')
  async generateReport(@Body() data: any, @Res() res: Response) {
    // Generate DOCX file
    const docxBuffer = await this.reportService.generateDocx(data);

    // Convert DOCX to PDF using Gotenberg
    const pdfBuffer = await this.reportService.convertToPDF(docxBuffer);

    // Return the PDF as a download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });
    res.send(pdfBuffer);
  }
}
