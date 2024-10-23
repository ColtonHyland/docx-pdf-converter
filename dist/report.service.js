"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const generate_docx_1 = require("./docx/generate-docx");
const axios_1 = require("axios");
const FormData = require("form-data");
let ReportService = ReportService_1 = class ReportService {
    constructor() {
        this.logger = new common_1.Logger(ReportService_1.name);
    }
    async generateDocx(data) {
        try {
            const docxBuffer = await (0, generate_docx_1.generateDocx)(data);
            this.logger.log('DOCX generated successfully');
            return docxBuffer;
        }
        catch (error) {
            this.logger.error('Error generating DOCX:', error);
            throw error;
        }
    }
    async convertToPDF(docxBuffer) {
        const maxRetries = 3;
        let retries = 0;
        while (retries < maxRetries) {
            try {
                const form = new FormData();
                form.append('files', docxBuffer, 'report.docx');
                this.logger.log(`Attempting to convert DOCX to PDF (attempt ${retries + 1})`);
                this.logger.log(`Sending request to Gotenberg at: http://gotenberg:3000/forms/libreoffice/convert`);
                const response = await axios_1.default.post('http://gotenberg:3000/forms/libreoffice/convert', form, {
                    headers: form.getHeaders(),
                    responseType: 'arraybuffer',
                    timeout: 10000,
                });
                this.logger.log(`Gotenberg response status: ${response.status}`);
                this.logger.log('Successfully converted DOCX to PDF');
                return response.data;
            }
            catch (error) {
                this.logger.error(`Error converting DOCX to PDF (attempt ${retries + 1}):`, error);
                if (error.response) {
                    this.logger.error('Error response:', error.response.data);
                }
                else if (error.request) {
                    this.logger.error('No response received:', error.request);
                }
                else {
                    this.logger.error('Error setting up request:', error.message);
                }
                retries++;
                if (retries >= maxRetries) {
                    throw new Error('Failed to convert DOCX to PDF after multiple attempts');
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = ReportService_1 = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map