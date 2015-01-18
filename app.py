import json
import flask
import numpy as np
from flask import request
import pdb
from flask import jsonify

app = flask.Flask(__name__)

@app.route("/companies")
def get_companies():
    json_data=open('data/company.json')
    data = json.load(json_data)
    return jsonify(companies=data)

if __name__ == "__main__":
    import os

    port = 8000

    # Open a web browser pointing at the app.
    os.system("open http://localhost:{0}".format(port))

    # Set up the development server on port 8000.
    app.debug = True
    app.run(port=port)