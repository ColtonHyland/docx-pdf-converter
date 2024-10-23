"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReportController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
let ReportController = ReportController_1 = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
        this.logger = new common_1.Logger(ReportController_1.name);
    }
    async generateReport(data, res) {
        this.logger.log('Received request to generate report');
        try {
            this.logger.log('Generating DOCX');
            const docxBuffer = await this.reportService.generateDocx(data);
            this.logger.log('DOCX generated successfully');
            this.logger.log('Converting DOCX to PDF');
            const pdfBuffer = await this.reportService.convertToPDF(docxBuffer);
            this.logger.log('PDF converted successfully');
            this.logger.log('Sending PDF response');
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=report.pdf',
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            this.logger.error('Error generating report:', error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating report' });
        }
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "generateReport", null);
exports.ReportController = ReportController = ReportController_1 = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map