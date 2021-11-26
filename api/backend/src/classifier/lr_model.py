import pickle
from sklearn.feature_extraction.text import TfidfVectorizer

from .law_branch import LawBranch


class LRModel:
    def __init__(self):        
        self.vectorizer = pickle.load(open('assets/vectorizer.pickle', 'rb'))
        self.model = pickle.load(open('assets/lr_model.sav', 'rb'))
        
    def classify(self, annotation):
        feature = self.vectorizer.transform([annotation]).toarray()
        prediction = self.model.predict(feature)
        return (LawBranch.get_lawbranch_by_index(prediction[0]))

lr_model = LRModel()

def get_lr_model():
    return lr_model
