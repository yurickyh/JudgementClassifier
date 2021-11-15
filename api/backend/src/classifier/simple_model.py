import json

from .law_branch import LawBranch

with open('src/keywords.json') as keywords_file:
    keywords = json.load(keywords_file)

class SimpleModel:
    def classify(self, annotation):
        counts = []
        for branch_word in keywords:
            i = 0
            for word in keywords[branch_word]:
                if word in annotation.lower():
                    i = i + 1
            counts.append(i)
        index = counts.index(max(counts))
        return (LawBranch.get_lawbranch_by_index(index))

simple_model = SimpleModel()

def get_simple_model():
    return simple_model