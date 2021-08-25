import json

from transformers import BertForSequenceClassification
import pytorch_lightning as pl

with open('src/config.json') as constants:
    configs = json.load(constants)


class LawDocumentClassifier(pl.LightningModule):
    
    def __init__(self, number_classes: int, steps_per_epoch: int=None, epochs: int=None, learning_rate: float=2e-5):
        super().__init__()
        
        self.model = BertForSequenceClassification.from_pretrained(
            configs['BERT_MODEL'],
            num_labels=number_classes,                      # The number of output labels--2 for binary classification
            output_attentions=False,                        # Returns attention weights
            output_hidden_states=False                      # Returns all hidden states
            )
        self.steps_per_epoch = steps_per_epoch
        self.epochs = epochs
        self.learning_rate = learning_rate
        
    def forward(self, input_ids, attention_mask, labels=None):
        output = self.model(input_ids,
                            attention_mask=attention_mask,
                            labels=labels,
                            return_dict=True)
        
        return output.logits
        
   