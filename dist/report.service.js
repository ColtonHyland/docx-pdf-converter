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
const docx_1 = require("docx");
const axios_1 = require("axios");
const FormData = require("form-data");
let ReportService = class ReportService {
    async generateDocx(data) {
        const doc = new docx_1.Document({
            sections: [
                {
                    children: [
                        new docx_1.Paragraph({
                            children: [
                                new docx_1.TextRun('JSON Data Output'),
                                new docx_1.TextRun(JSON.stringify(data)),
                            ],
                        }),
                    ],
                },
            ],
        });
        return await docx_1.Packer.toBuffer(doc);
    }
    async convertToPDF(docxBuffer) {
        const form = new FormData();
        form.append('files', docxBuffer, 'report.docx');
        const response = await axios_1.default.post('http://gotenberg:3001/forms/libreoffice/convert', form, {
            headers: form.getHeaders(),
            responseType: 'arraybuffer',
        });
        return response.data;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map