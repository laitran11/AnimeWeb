
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from gensim.models import Word2Vec
import faiss
import re

app = Flask(__name__)
CORS(app) 

# Load resources
model = Word2Vec.load("anime_word2vec.model")
df = pd.read_csv("anime.csv").fillna('')
anime_vectors = np.load("anime_vectors.npy")
index = faiss.read_index("anime_faiss.index")

def clean_text(text):
    if not isinstance(text, str):
        text = str(text)
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    return text.lower().split()

def get_anime_vector(title, description, genres, type_, studios):
    words = []
    words += clean_text(title)
    words += clean_text(description)
    words += genres.lower().replace(',', ' ').split()
    words += clean_text(type_)
    words += clean_text(studios)
    vectors = [model.wv[w] for w in words if w in model.wv]
    if not vectors:
        return np.zeros(model.vector_size, dtype=np.float32)
    return np.mean(vectors, axis=0).astype(np.float32)


@app.route('/recommend', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', methods=['POST', 'OPTIONS'])
def recommend():
    if request.method == 'OPTIONS':
        return '', 200 

    data = request.json
    vector = get_anime_vector(
        data.get('title', ''),
        data.get('descriptions', ''),
        data.get('genres', ''),
        data.get('types', ''),
        data.get('studios', '')
    )
    vector = np.expand_dims(vector, axis=0)
    D, I = index.search(vector, 5)
    recommendations = df.iloc[I[0]][['id', 'title', 'genres','url', 'score','image_url','type','description']].to_dict(orient='records')
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
