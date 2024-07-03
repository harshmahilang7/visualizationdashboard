# -*- coding: utf-8 -*-
# @Author: Dastan Alam
# @Date:   2024-07-02 11:21:30 PM   23:07
# @Last Modified by:   Dastan Alam
# @Last Modified time: 2024-07-03 12:02:32 AM   00:07

# @Email:  HARSHMAHILANG7@GMAIL.COM
# @workspaceFolder:  c:\BACKCOFFER\Python Full-Stack Assignment\New folder
# @workspaceFolderBasename:  New folder
# @file:  c:\BACKCOFFER\Python Full-Stack Assignment\New folder\visualizationdashboard\backend\App.py
# @relativeFile:  backend\App.py
# @relativeFileDirname:  backend
# @fileBasename:  App.py
# @fileBasenameNoExtension:  App
# @fileDirname:  c:\BACKCOFFER\Python Full-Stack Assignment\New folder\visualizationdashboard\backend
# @fileExtname:  .py
# @cwd:  c:\BACKCOFFER\Python Full-Stack Assignment\New folder


from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB configuration with added connection options
app.config['MONGO_URI'] = 'mongodb://localhost:27017/VisualizationDashboard?connectTimeoutMS=30000&socketTimeoutMS=30000'
mongo = PyMongo(app)

# Example route to fetch data from MongoDB
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Access the collection
        collection = mongo.db.blackcoffer

        # Fetch all documents from the collection excluding the _id field
        data = list(collection.find({}, {'_id': 0}))

        # Return the data as JSON response
        return jsonify(data), 200
    except Exception as e:
        # Handle any exceptions and return an error response
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
