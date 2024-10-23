import { ReportService } from './report.service';
import { Response } from 'express';
export declare class ReportController {
    private readonly reportService;
    private readonly logger;
    constructor(reportService: ReportService);
    generateReport(data: any, res: Response): Promise<void>;
}
