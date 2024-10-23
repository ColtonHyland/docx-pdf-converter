JSON_PAYLOAD='{
  "project": "Test Project",
  "date": "2024-10-23",
  "name": "John Doe",
  "content": "This is a test inspection report. The site looks good overall."
}'

curl -X POST http://localhost:3002/report/generate/docx \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  --output report.docx

curl -X POST http://localhost:3002/report/generate/pdf \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  --output report.pdf

echo "DOCX and PDF reports have been generated."