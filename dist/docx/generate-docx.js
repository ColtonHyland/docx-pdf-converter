"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocx = generateDocx;
const fs = require("fs");
const path = require("path");
const docx_1 = require("docx");
async function generateDocx(data) {
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
                        text: `Project: ${data.project}`,
                        heading: docx_1.HeadingLevel.HEADING_1,
                    }),
                    new docx_1.Paragraph({
                        text: `Date: ${data.date}`,
                        heading: docx_1.HeadingLevel.HEADING_2,
                    }),
                    new docx_1.Paragraph({
                        text: `Inspector: ${data.name}`,
                        heading: docx_1.HeadingLevel.HEADING_2,
                    }),
                    new docx_1.Paragraph({
                        text: 'Overview of the inspection site:',
                    }),
                    new docx_1.Paragraph({
                        text: data.content,
                    }),
                    ...(fs.existsSync(path.join(__dirname, 'images', 'image.jpg'))
                        ? [
                            new docx_1.Paragraph({
                                children: [
                                    new docx_1.ImageRun({
                                        data: fs.readFileSync(path.join(__dirname, 'images', 'image.jpg')),
                                        transformation: {
                                            width: 200,
                                            height: 200,
                                        },
                                        type: 'jpg',
                                    }),
                                ],
                            }),
                        ]
                        : []),
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
//# sourceMappingURL=generate-docx.js.map