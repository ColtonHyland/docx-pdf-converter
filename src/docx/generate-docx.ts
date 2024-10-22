import * as fs from 'fs';
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

// Function to generate a field report DOCX
async function generateDocx(data: any) {
  // Create a document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: 'Field Report',
            heading: HeadingLevel.TITLE,
          }),
          // Subheader for project
          new Paragraph({
            text: `Project: ${data.project}`,
            heading: HeadingLevel.HEADING_1,
          }),
          // Date and inspector information
          new Paragraph({
            text: `Date: ${data.date}`,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `Inspector: ${data.name}`,
            heading: HeadingLevel.HEADING_2,
          }),
          // Paragraph text
          new Paragraph({
            text: 'Overview of the inspection site:',
          }),
          new Paragraph({
            text: data.content,
          }),

          // Adding an image (replace the path with an actual image path)
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync('./image.webp'), // Replace with your image path
                transformation: {
                  width: 200,
                  height: 200,
                },
                type: 'jpg', // Specify the image type
              }),
            ],
          }),

          // Add a table for inspection results
          new Paragraph({
            text: 'Inspection Results:',
            heading: HeadingLevel.HEADING_2,
          }),
          new Table({
            rows: [
              // Table header row
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
              // First row
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
              // Second row
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

  // Convert the document to a Buffer and save it as a .docx file
  const buffer = await Packer.toBuffer(doc);
  console.log('DOCX buffer created');
  return buffer;
}

export { generateDocx };
