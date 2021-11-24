## Backend

The backend of this application is built using [Fast API](https://fastapi.tiangolo.com/) that uses Python. The API exposes two routes:

- `/classify` (POST): It receives the summary of a law document and calls the Law Document Classifier to classify this portion of text. It responds the request with the following:

**Request**

```
annotation (str): the summary of the Law Document.
```

**Response**

```
branch (str): the chosen Law Branch
confidence (float): the confidence for the classification that pointed to this Law Branch
probabilities (Dict[str, float]): a mapping containing the name of the Law Branch as key and the chance of the document belonging to that branch as value.
```

- `/simple_classify` (POST): It receives the summary of a law document and calls the simple model to classify this portion of text. Important to notice that this simple model is a classifier that is deterministic. It responds the request with the following:

**Request**

```
annotation (str): the summary of the Law Document.
```

**Response**

```
branch (str): the chosen Law Branch
confidence (float): the confidence for the classification that pointed to this Law Branch
probabilities (Dict[str, float]): a mapping containing the name of the Law Branch as key and the chance of the document belonging to that branch as value.
```

The application initializes using your local port 8000: `http://localhost:8000`.

## Frontend

Basic React app that serves the UI of this application and it is responsible for calling the backend APIs. The React app performs the calls through axios.

The application initializes using your local port 8000: `http://localhost:3000`

## Setup

Either the backend and frontend contain a Dockerfile, therefore the entire application makes use of a Docker Compose file which summarizes all the needed process to initialize the application.

### Step 0 - Have the requirements

Install Docker and Docker Compose: https://docs.docker.com/compose/install/

### Step 1 - Clone the repository

Use the Git commands to clone the repo:

`git clone https://github.com/yurickyh/JudgementClassifier`

### Step 2 - Add the .bin of the model to the backend

Download the bin of the model and place it at `backend/bin/assets/model_state.bin`. Please, have attention to the file name.

### Step 3 - Let Docker Compose handle the rest

Run `docker-compose build && docker-compose up`

The sequence of commands will take a while, the build-command usually lasts for 40 minutes when running for the first time. The up-command can initialize the frontend quickly, however the backend takes about 20 minutes when running for the first time. It will look stuck, but you just need to wait.
