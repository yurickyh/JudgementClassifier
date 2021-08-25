import json

import torch
import torch.nn.functional as F
from transformers import BertTokenizerFast as BertTokenizer

from .law_document_classifier import LawDocumentClassifier
from .law_branch import LawBranch

with open('src/config.json') as constants:
    configs = json.load(constants)


class Model:
    def __init__(self):
        self.device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

        self.tokenizer = BertTokenizer.from_pretrained(configs['BERT_MODEL'])

        classifier = LawDocumentClassifier(
            LawBranch.get_number_of_branches(),
            configs['TRAIN_DATASET_LENGTH'] // configs['BATCH_SIZE'],
            configs['EPOCHS'],
            configs['LEARNING_RATE']
            )
        classifier.load_state_dict(
            torch.load(configs['PRE_TRAINED_MODEL'], map_location=self.device)
        )
        classifier = classifier.eval()
        self.classifier = classifier.to(self.device)
    
    def classify(self, annotation):
        encoded_text = self.tokenizer.encode_plus(
            annotation,
            add_special_tokens=True,
            max_length=configs['MAX_TOKEN_LENGTH'],
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
            return_token_type_ids=False
        )
        input_ids = encoded_text['input_ids'].to(self.device)
        attention_mask = encoded_text['attention_mask'].to(self.device)

        with torch.no_grad():
            probabilities = F.softmax(self.classifier(input_ids, attention_mask), dim=1)
        confidence, predicted_branch = torch.max(probabilities, dim=1)
        predicted_branch = predicted_branch.cpu().item()
        probabilities = probabilities.flatten().cpu().numpy().tolist()
        branches = LawBranch.get_all_names()

        return (
            branches[predicted_branch],
            confidence,
            dict(zip(branches, probabilities))
        )

model = Model()

def get_model():
    return model
