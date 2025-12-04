# GründerAI Backend

FastAPI backend for business plan analysis using Claude Sonnet 4.5

## Setup

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

Get your Anthropic API key at: https://console.anthropic.com/

### 3. Run Server

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

Server will be available at: http://localhost:8000

## API Endpoints

### Health Check
```
GET /health
```

### Analyze Business Plan
```
POST /api/analyze
Content-Type: multipart/form-data

Form Data:
- file: PDF or DOCX file (max 5MB)

Response:
{
  "score": 43,
  "risk_level": "HIGH",
  "detected_industry": "Solo-Gastronomie",
  "estimated_revenue": "€85.000",
  "benchmark_revenue": "€35.000-€45.000",
  "top_issues": [
    {
      "title": "Umsatzprognose 89% zu hoch",
      "description": "...",
      "severity": "CRITICAL",
      "fix": "..."
    }
  ]
}
```

## Testing

Test the API with curl:

```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@sample_businessplan.pdf"
```

Or use the Swagger UI: http://localhost:8000/docs

## Project Structure

```
backend/
├── main.py                  # FastAPI app + endpoints
├── grant_calibration.py     # Claude AI integration
├── pdf_processor.py         # PDF/DOCX text extraction
├── requirements.txt         # Python dependencies
└── .env                     # Environment variables (not in git)
```

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)
