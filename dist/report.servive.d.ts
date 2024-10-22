export declare class ReportService {
    generateDocx(data: any): Promise<Buffer>;
    convertToPDF(docxBuffer: Buffer): Promise<Buffer>;
}
