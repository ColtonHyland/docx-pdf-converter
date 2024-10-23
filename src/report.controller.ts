import { Controller, Post, Body, Res, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';
import * as archiver from 'archiver';

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

      // Convert DOCX to PDF
      this.logger.log('Converting DOCX to PDF');
      const pdfBuffer = await this.reportService.convertToPDF(docxBuffer);
      this.logger.log('PDF generated successfully');

      // Create a zip file containing both DOCX and PDF
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      // Set the response headers
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=report.zip');

      // Pipe the archive to the response
      archive.pipe(res);

      // Add the files to the archive
      archive.append(docxBuffer, { name: 'report.docx' });
      archive.append(pdfBuffer, { name: 'report.pdf' });

      // Finalize the archive and send the response
      await archive.finalize();

    } catch (error) {
      this.logger.error('Error generating report:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating report' });
    }
  }
}
