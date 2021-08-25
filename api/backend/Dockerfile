FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
WORKDIR /backend/

COPY requirements.txt ./requirements.txt

RUN pip install -r requirements.txt --no-cache-dir

COPY . .
EXPOSE 8000
CMD ["uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8000"]