from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# *** BEGIN "__init__.py" DOCUMENTATION ***
# __init__.py initializes the python module, database object, and 
# Flask  application.
# *** END "__init__.py" DOCUMENTATION ***

api = Flask(__name__)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(api)

from api import models, routes
