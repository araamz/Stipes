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
    
    story_records = Story.query.all()

    return jsonify([*map(story_serializer, story_records)])

@api.route("/api/<int:story_id>/story", methods=["GET"])
def view_story(story_id):

    return jsonify(story_serializer(Story.query.filter_by(id = story_id).first()))

@api.route("/api/create", methods=["POST"])
def create_story():

    request_message = request.get_json().get('content')
    story = Story(content=request_message)
    db.session.add(story)
    db.session.commit()
    
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/delete", methods=["POST"])
def delete_story(story_id):

    story = Story.query.filter_by(id = story_id).delete()
    db.session.commit()

    return "Hellow World"

@api.route("/api/<int:story_id>/edit", methods=["POST"])
def edit_story(story_id):

    new_story = request.get_json().get('content')

    story_record = Story.query.filter_by(id = story_id).first()
    story_record.content = new_story
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/create", methods=["POST"])
def create_goal(story_id):

    request_message = request.get_json().get('content')
    goal = Goal(content=request_message)

    story_record = Story.query.filter_by(id = story_id)
    story_record.goals.add(goal)
    db.session.commit()
    
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/<int:goal_id>", methods=["GET"])
def view_goal(story_id, goal_id):

    goals = Story.query.filter_by(id = story_id).first().goals

    return jsonify(goal_serializer(goals.filter_by(id = goal_id).first()))

@api.route("/api/<int:story_id>/<int:goal_id>/edit/status", methods=["POST"])
def change_goal_status(story_id, goal_id): 

    status = request.get_json().get('status')
    goal_reocrd = Goal.query.filter_by(id = goal_id).first()
    goal_reocrd.status = status
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/<int:goal_id>/edit/content", methods=["POST"])
def edit_goal(story_id, goal_id): 

    content = request.get_json().get('content')
    goal_reocrd = Goal.query.filter_by(id = goal_id).first()
    goal_reocrd.content = content

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/<int:goal_id>/delete", methods=["POST"])
def delete_goal(story_id, goal_id):
    
    goal = Story.query.filter_by(id = goal_id).delete()
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}