import * as fs from 'fs';
import * as path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  ImageRun,
} from 'docx';

async function generateDocx(data: any) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'Field Report',
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            text: `Project: ${data.project}`,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: `Date: ${data.date}`,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `Inspector: ${data.name}`,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: 'Overview of the inspection site:',
          }),
          new Paragraph({
            text: data.content,
          }),
          ...(fs.existsSync(path.join(__dirname, 'images', 'image.jpg'))
            ? [
                new Paragraph({
                  children: [
                    new ImageRun({
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

          new Paragraph({
            text: 'Inspection Results:',
            heading: HeadingLevel.HEADING_2,
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Area')],
                  }),
                  new TableCell({
                    children: [new Paragraph('Condition')],
                  }),
                  new TableCell({
                    children: [new Paragraph('Remarks')],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Foundation')],
                  }),
                  new TableCell({
                    children: [new Paragraph('Good')],
                  }),
                  new TableCell({
                    children: [new Paragraph('No issues found')],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Walls')],
                  }),
                  new TableCell({
                    children: [new Paragraph('Minor cracks')],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph('Needs patching in several areas'),
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

  const buffer = await Packer.toBuffer(doc);
  console.log('DOCX buffer created');
  return buffer;
}

export { generateDocx };
