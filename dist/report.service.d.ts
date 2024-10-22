export declare class ReportService {
    generateDocx(): Promise<Buffer>;
    convertToPDF(docxBuffer: Buffer): Promise<Buffer>;
}
