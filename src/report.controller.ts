import { Controller, Post, Body, Res, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  private readonly logger = new Logger(ReportController.name);

  constructor(private readonly reportService: ReportService) {}

  @Post('generate')
  async generateReport(@Body() data: any, @Res() res: Response) {
    this.logger.log('Received request to generate report');
    try {
      // Generate DOCX file
      this.logger.log('Generating DOCX');
      const docxBuffer = await this.reportService.generateDocx(data);
      this.logger.log('DOCX generated successfully');

      // Convert DOCX to PDF using Gotenberg
      this.logger.log('Converting DOCX to PDF');
      const pdfBuffer = await this.reportService.convertToPDF(docxBuffer);
      this.logger.log('PDF converted successfully');

      // Create a JSON response with base64 encoded files
      const response = {
        docx: docxBuffer.toString('base64'),
        pdf: pdfBuffer.toString('base64')
      };

      res.json(response);
    } catch (error) {
      this.logger.error('Error generating report:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating report' });
    }
  }
}
