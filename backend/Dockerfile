FROM python:3.12.7-alpine3.20 as build-stage
WORKDIR /app
RUN pip install fastapi uvicorn pydantic python-dotenv requests httpx openai bs4 lxml
COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]