import { Controller, Post, Body, Res, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  private readonly logger = new Logger(ReportController.name);

  constructor(private readonly reportService: ReportService) {}

  @Post('generate/docx')
  async generateDocx(@Body() data: any, @Res() res: Response) {
    this.logger.log('Received request to generate DOCX report');
    try {
      const docxBuffer = await this.reportService.generateDocx(data);
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=report.docx',
      });
      res.send(docxBuffer);
    } catch (error) {
      this.logger.error('Error generating DOCX report:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating DOCX report' });
    }
  }

  @Post('generate/pdf')
  async generatePdf(@Body() data: any, @Res() res: Response) {
    this.logger.log('Received request to generate PDF report');
    try {
      const docxBuffer = await this.reportService.generateDocx(data);
      const pdfBuffer = await this.reportService.convertToPDF(docxBuffer);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=report.pdf',
      });
      res.send(pdfBuffer);
    } catch (error) {
      this.logger.error('Error generating PDF report:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating PDF report' });
    }
  }
}
