"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const generate_docx_1 = require("./docx/generate-docx");
const axios_1 = require("axios");
let ReportService = class ReportService {
    async generateDocx(data) {
        const docxBuffer = await (0, generate_docx_1.generateDocx)(data);
        return docxBuffer;
    }
    async convertToPDF(docxBuffer) {
        const maxRetries = 3;
        let retries = 0;
        while (retries < maxRetries) {
            try {
                const response = await axios_1.default.post('http://localhost:3000/convert', docxBuffer, {
                    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
                    responseType: 'arraybuffer',
                    timeout: 10000,
                });
                return Buffer.from(response.data);
            }
            catch (error) {
                console.error(`Error converting DOCX to PDF (attempt ${retries + 1}):`, error);
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
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map