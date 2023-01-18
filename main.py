import json

from flask import Flask, render_template, request, jsonify 
import spacy

app = Flask(__name__)
#モデルの読み込み

nlp = spacy.load('ja_ginza_electra')

#トップページの表示
@app.route("/",methods=["GET"])
def index():
    return render_template('index.html')

#文章をPOSTで受け取り、解析結果を返す
@app.route("/data",methods=["POST"])
def post_data():
    sentense = request.form['w_box']
    print(sentense)
    result = analysis(sentense)
    print(result)
    result_word = jsonify(result)
    print(type(result_word))
    print(type(result))
    return result_word


#形態素解析＋構文解析など諸々の処理
def analysis(word):

    doc = nlp(word)
    d=[]
    for sent in doc.sents:
        for token in sent:
            data=[ 
            token.i,
            token.orth_,
            token.dep_,
            token.pos_,
            token.head.i,
            token.morph.get("Reading"),
            token.tag_,
            token.lemma_
            ]
            d.append(data)
    
    return d


if __name__ == '__main__':
    app.run(port=8000, debug=True)