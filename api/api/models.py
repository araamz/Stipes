from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api import db 

class Story(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    finished = db.Column(db.Boolean, default=False, server_default="False")

    goals = db.relationship("Goal", backref="story", lazy="dynamic", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Story - {self.finished}> {self.content}' 

class Goal(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    status = db.Column(db.String(1), default="D", server_default="D")

    story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)

    def __repr__(self):
        return f'<Goal - {self.status}> {self.content}'