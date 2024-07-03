# -*- coding: utf-8 -*-
# @Author: Dastan Alam
# @Date:   2024-07-02 10:12:43 PM   22:07
# @Last Modified by:   Dastan Alam
# @Last Modified time: 2024-07-02 10:12:45 PM   22:07

# @Email:  HARSHMAHILANG7@GMAIL.COM
# @workspaceFolder:  c:\BACKCOFFER\Python Full-Stack Assignment\proj\backend
# @workspaceFolderBasename:  backend
# @file:  c:\BACKCOFFER\Python Full-Stack Assignment\proj\backend\model.py
# @relativeFile:  backend\model.py
# @relativeFileDirname:  backend
# @fileBasename:  model.py
# @fileBasenameNoExtension:  model
# @fileDirname:  c:\BACKCOFFER\Python Full-Stack Assignment\proj\backend
# @fileExtname:  .py
# @cwd:  c:\BACKCOFFER\Python Full-Stack Assignment\proj\backend


# backend/models.py
from flask_mongoengine import MongoEngine

db = MongoEngine()

class DashboardData(db.Document):
    intensity = db.IntField()
    likelihood = db.IntField()
    relevance = db.IntField()
    year = db.IntField()
    country = db.StringField()
    topics = db.ListField(db.StringField())
    region = db.StringField()
    city = db.StringField()
