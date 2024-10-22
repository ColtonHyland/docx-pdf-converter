"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocx = generateDocx;
const fs = require("fs");
const docx_1 = require("docx");
async function generateDocx() {
    const doc = new docx_1.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx_1.Paragraph({
                        text: 'Field Report',
                        heading: docx_1.HeadingLevel.TITLE,
                    }),
                    new docx_1.Paragraph({
                        text: 'Project: Engineering Site Inspection',
                        heading: docx_1.HeadingLevel.HEADING_1,
                    }),
                    new docx_1.Paragraph({
                        text: 'Date: October 21, 2024',
                        heading: docx_1.HeadingLevel.HEADING_2,
                    }),
                    new docx_1.Paragraph({
                        text: 'Inspector: John Doe',
                        heading: docx_1.HeadingLevel.HEADING_2,
                    }),
                    new docx_1.Paragraph({
                        text: 'Overview of the inspection site:',
                    }),
                    new docx_1.Paragraph({
                        text: 'The inspection covered various aspects of the project, including structural integrity, material quality, and overall compliance with safety standards. The following observations were made.',
                    }),
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.ImageRun({
                                data: fs.readFileSync('./image.webp'),
                                transformation: {
                                    width: 200,
                                    height: 200,
                                },
                                type: 'jpg',
                            }),
                        ],
                    }),
                    new docx_1.Paragraph({
                        text: 'Inspection Results:',
                        heading: docx_1.HeadingLevel.HEADING_2,
                    }),
                    new docx_1.Table({
                        rows: [
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Area')],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Condition')],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Remarks')],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Foundation')],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Good')],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('No issues found')],
                                    }),
                                ],
                            }),
                            new docx_1.TableRow({
                                children: [
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Walls')],
                                    }),
                                    new docx_1.TableCell({
                                        children: [new docx_1.Paragraph('Minor cracks')],
                                    }),
                                    new docx_1.TableCell({
                                        children: [
                                            new docx_1.Paragraph('Needs patching in several areas'),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
    const buffer = await docx_1.Packer.toBuffer(doc);
    console.log('DOCX buffer created');
    return buffer;
}
generateDocx().catch((error) => console.error(error));
//# sourceMappingURL=generate-docx.js.map