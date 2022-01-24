from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api import db 

# *** BEGIN "models.py" DOCUMENTATION ***
# models.py defines the models used by the ORM for creating the
# database. Models are defined as classess with attributes 
# defined within the class. 
# * Creating a New Model
# 1. A new class must be defined with the database object Model 
# passed into the class for inheritance hence "db.Model" passed into
# classes. 
# 2. Attributes must be defined by calling the database object and
# creating a new column by calling "db.Column". The type for the records
# must be passed into the function based upon the database object. 
# SQLAlchemy provides several generic types to choose from at 
# https://docs.sqlalchemy.org/en/14/core/type_basics.html#generic-types.
# 3. Relationships can be defined between database tables. These 
# relationships can be defined by the ".relationship()" call on 
# the database object. Several options can be passed into the 
# function call that configure the relationship. More information of
# relationships can be found at 
# https://docs.sqlalchemy.org/en/13/orm/relationships.html and 
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/#simple-relationships.
# Note due to Flask-SQLAlchemy being middleware between Flask and 
# SQLAlchemy, the database object must be called when using most 
# functions of SQLAlchemy. In this case the "db" variable is the 
# database object.
# *** END "models.py" DOCUMENTATION ***

class Story(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)

    goals = db.relationship("Goal", backref="story", lazy="dynamic", cascade="all, delete")

    def __repr__(self):
        return f'<Story - {self.finished}> {self.content}' 

class Goal(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    status = db.Column(db.String(1), default="D", server_default="D")

    story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)

    def __repr__(self):
        return f'<Goal - {self.status}> {self.content}'