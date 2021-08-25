from typing import Dict

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .classifier.model import Model, get_model


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class LawDocumentRequest(BaseModel):
    annotation: str

class LawDocumentResponse(BaseModel):    
    branch: str
    confidence: float
    probabilities: Dict[str, float]


@app.post('/classify', response_model=LawDocumentResponse)
def classify(request: LawDocumentRequest, model: Model = Depends(get_model)):
    branch, confidence, probabilities = model.classify(request.annotation)
    return LawDocumentResponse(
        branch=branch,
        confidence=confidence,
        probabilities=probabilities
    )
