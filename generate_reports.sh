# Define the JSON payload
JSON_PAYLOAD='{
  "project": "Test Project",
  "date": "2024-10-23",
  "name": "John Doe",
  "content": "This is a test inspection report. The site looks good overall."
}'

# Generate the DOCX file
curl -X POST http://localhost:3002/report/generate \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  -o report.docx

# Check if the DOCX file was created successfully
if [ -f report.docx ]; then
  echo "DOCX report generated successfully: report.docx"
else
  echo "Failed to generate DOCX report."
fi

# Generate the PDF file
curl -X POST http://localhost:3002/report/generate \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  -o report.pdf

# Check if the PDF file was created successfully
if [ -f report.pdf ]; then
  echo "PDF report generated successfully: report.pdf"
else
  echo "Failed to generate PDF report."
fi