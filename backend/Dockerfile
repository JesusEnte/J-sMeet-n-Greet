FROM python:3-slim
WORKDIR usr/src

RUN apt-get update && \
    apt-get install -y libpq-dev gcc

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY scripts ./scripts

CMD ["fastapi", "run", "--root-path", "/api"]

EXPOSE 8000

HEALTHCHECK --interval=10m --timeout=10s --start-period=30s --retries=0 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1