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

@api.route("/api/<int:story_id>", methods=["GET"])
def view_story(story_id):

    story_record = Story.query.filter_by(id = story_id).first()

    return jsonify(story_serializer(story_record))

@api.route("/api/<int:story_id>/goals", methods=["GET"])
def view_goals(story_id):

    goal_records = Story.query.filter_by(id = story_id).first().goals
    
    return jsonify([*map(goal_serializer, goal_records)])

@api.route("/api/<int:story_id>/goals/<int:goal_id>", methods=["GET"])
def view_goal(story_id, goal_id):

    goal_records = Story.query.filter_by(id = story_id).goals
    goal_record = goal_records.filter_by(id = goal_id).first()

    return jsonify(goal_serializer(goal_record))

@api.route("/api/<int:story_id>/goals/<int:goal_id>/edit/status", methods=["PATCH"])
def change_goal_status(story_id, goal_id): 

    status = request.get_json().get('status')

    goal_records = Story.query.filter_by(id = story_id).goals
    goal_record = goal_records.filter_by(id = goal_id).first()
    goal_record.status = status

    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/<int:goal_id>/edit/content", methods=["PATCH"])
def edit_goal(story_id, goal_id): 

    content = request.get_json().get('status')

    goal_records = Story.query.filter_by(id = story_id).goals
    goal_record = goal_records.filter_by(id = goal_id).first()
    goal_record.content = content

    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/<int:goal_id>/delete", methods=["POST"])
def delete_goal(story_id, goal_id):
    
    goal_records = Story.query.filter_by(id = story_id).goals
    goal_record = goal_records.filter_by(id = goal_id).first()

    goal_record.delete()
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/delete", methods=["DELETE"])
def delete_story(story_id):

    story_record = Story.query.filter_by(id = story_id)
    
    story_record.delete()
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/edit", methods=["PATCH"])
def edit_story(story_id):

    content = request.get_json().get('content')

    story_record = Story.query.filter_by(id = story_id).first()
    story_record.content = content

    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/<int:story_id>/create", methods=["POST"])
def create_goal(story_id):

    content = request.get_json().get('content')
    goal_record = Goal(content=content)
    story_record = Story.query.filter_by(id = story_id)

    story_record.goals.add(goal_record)
    db.session.commit()
    
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api/create", methods=["POST"])
def create_story():

    content = request.get_json().get('content')
    story_record = Story(content=content)

    db.session.add(story_record)
    db.session.commit()
    
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}