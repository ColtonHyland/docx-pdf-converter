import { ReportService } from './report.service';
import { Response } from 'express';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    generateReport(data: any, res: Response): Promise<void>;
}
