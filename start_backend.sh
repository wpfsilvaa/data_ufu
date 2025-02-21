sudo systemctl start postgresql.service
cd BACKEND
source .venv/bin/activate
uvicorn main:app --reload
