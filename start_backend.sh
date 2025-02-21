#!/bin/bash

cd BACKEND
source .venv/bin/activate
uvicorn main:app --reload
