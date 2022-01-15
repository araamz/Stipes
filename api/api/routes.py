from flask import Flask, jsonify, request
import json
from api import api
from api import db
from api.models import Story
from api.models import Goal
from api.serializers import story_serializer
from api.serializers import goal_serializer

@api.route("/api", methods=["GET"])
def view_stories():
    
    return jsonify([*map(story_serializer, Story.query.all())])

@api.route("/api/<int:story_id>", methods=["GET"])
def view_story(story_id):

    return jsonify([*map(goal_serializer, Story.query.filter_by(id = story_id).first().goals)])

@api.route("/api/create", methods=["POST"])
def create_story():

    request_message = request.get_json().get('content')
    story = Story(content=request_message)
    db.session.add(story)
    db.session.commit()
    
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    

@api.route("/api/<int:story_id>/finish", methods=["POST"])
def finish_story(story_id):

    return "Hello World"

@api.route("/api/<int:story_id>/delete", methods=["POST"])
def delete_story(story_id):

    return "Hellow World"

@api.route("/api/<int:story_id>/create", methods=["POST"])
def create_goal(story_id):

    return "Hellow World"

@api.route("/api/<int:story_id>/<int:goal_id>", methods=["GET"])
def view_goal(story_id, goal_id):

    goals = Story.query.filter_by(id = story_id).first().goals

    return jsonify(goal_serializer(goals.filter_by(id = goal_id).first()))

@api.route("/api/<int:story_id>/<int:goal_id>/status", methods=["POST"])
def change_goal_status(story_id, goal_id): 

    return "Hello World"

@api.route("/api/<int:story_id>/<int:goal_id>/delete", methods=["POST"])
def delete_goal(story_id, goal_id):
    
    return "Hello World"