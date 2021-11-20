# The notebooks

This folder contains all the notebooks used to build the model and assess its performance.

- `Build_Keywords_JSON.ipynb`: TODO.
- `Data_Preprocessing.ipynb`: responsible for preprocess data and rearrange the collection of training/evaluation data in order to be used for building the model. The result is having three different .csv files, one for each subset of data. There are two actions performed in this notebook:
  1. Each law branch is mapped into an integer value. Using this method, BERT will be able to associate a law document to a law branch (represented as an integer code).
  2. The notebook divides up the entire dataset into three other groups: Training, Validation, and Test. In order to divide the data, the notebook uses the method 70% (Training), 15% (Validation), and 15% (Test).
- `Descriptive_Data_Analysis.ipynb`: created to summarize data in a human way. Large amounts of data are hard to understand, from the human perspective. Therefore, some tables and charts may be useful. This notebook wraps up the entire collection of data to visualize patterns and metrics of it. Example of analysis: frequent words, frequent words by law branch, numbeer of law documents by law branch, number of law documents that are possible to classify through law document summary, etc.
- `Fine_Tuning_Word_Truncated.ipynb`: fine tunes the Front Back model. With this notebook, it is possible to define values for hyperparameters and train a new Front Back model every time. For each execution, you can test a set of hyperparameters. You must make use of multiple runs to perform the fine tuning process.
- `Index on Model-Word_Truncated.ipynb`: TODO.
- `Metrics.ipynb`: evaluates the final state of a model. This notebook will load a model that classifies law documents summary into law branches and then assess its performance. The evaluation will happen by using the test dataset.
