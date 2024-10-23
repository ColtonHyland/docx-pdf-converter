export declare class ReportService {
    private readonly logger;
    generateDocx(data: any): Promise<Buffer>;
    convertToPDF(docxBuffer: Buffer): Promise<Buffer>;
}
