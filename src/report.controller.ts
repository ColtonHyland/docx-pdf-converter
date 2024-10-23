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

      // Return the DOCX as a download
      this.logger.log('Sending DOCX response');
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=report.docx',
      });
      res.send(docxBuffer);
    } catch (error) {
      this.logger.error('Error generating report:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating report' });
    }
  }
}
