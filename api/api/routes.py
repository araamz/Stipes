from flask import Flask, jsonify, request
import json
from api import api, db
from api.models import Story, Goal
from api.serializers import story_serializer, goal_serializer

# *** BEGIN "routes.py" DOCUMENTATION ***
# routes.py defines the routes for the REST API. This documentation
# includes explanations and instructions to modify and create new 
# routes. 
# * Creating a New Route
# 1. Use the mixin "@api.route()" with the route passed in with an 
#    optional HTTP method object.
# 1a. The optional HTTP method is used for access control of the
#     route. This means a "GET" request can not access a route 
#     only meant for "PATCH". 
# 1b. Routes can have parameters through "<parameter>" syntax. The
#     parameter can have a specified type with the syntax 
#     "<type:parameter>". 
# 2. Define the function below the mixin.
# 2a. A function must be defined below the mixin to be used for 
#     operations when the route has been hit by a request. If
#     the route has a parameter, the parameter must be passed 
#     into the function with the same name. When passed into
#     the function, it can be used for whatever operation is 
#     defined.
# 3. For operations, if the incoming request has data tied 
#    to the request that must be used for operations, it can
#    be accessed through the "request" variable.
# 4. The return statement of a function is used to return a
#    response to the incoming request. If a "GET" function, 
#    the response returned by the function is json data
#    itself. If any other method, a response usually 
#    entails a json message with a success and status
#    message.
# * Database Operations
# 1. Accessing a record from the database usually entails querying 
# a record type. This is a bulk access operation meaning it is
# accessing all records in the database. A example of the operation
# is "Story.query.some_operation".
# 2. When querying the database, operations can be found at 
# https://docs.sqlalchemy.org/en/14/orm/query.html. An example of an,
# query operation is "filter_by()" in which a true/false predicate is 
# passed in and if a predicate is true, a new query is returned.
# 3. When modifying the database, all changes must be committed. 
# Commits to a database are done through the accessing the database
# object and calling ".session.commit()". In this case, the database
# object is "db" hence "db.session.commit()".
# *** END "routes.py" DOCUMENTATION ***

response_successful = json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@api.route("/api", methods=["GET"])
def view_stories():
    
    story_records = db.session.query(Story).all()

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

    goal_records = Story.query.filter_by(id = story_id).first().goals
    goal_record = goal_records.filter_by(id = goal_id).first()

    return jsonify(goal_serializer(goal_record))

@api.route("/api/<int:story_id>/goals/<int:goal_id>/edit/status", methods=["PATCH"])
def change_goal_status(story_id, goal_id): 

    status = request.get_json().get('status')

    goal_records = Story.query.filter_by(id = story_id).first().goals
    goal_record = goal_records.filter_by(id = goal_id).first()
    goal_record.status = status

    db.session.commit()

    return response_successful

@api.route("/api/<int:story_id>/goals/<int:goal_id>/edit/content", methods=["PATCH"])
def edit_goal(story_id, goal_id): 

    content = request.get_json().get('content')

    goal_records = Story.query.filter_by(id = story_id).first().goals
    goal_record = goal_records.filter_by(id = goal_id).first()
    goal_record.content = content

    db.session.commit()

    return response_successful

@api.route("/api/<int:story_id>/goals/<int:goal_id>/delete", methods=["DELETE"])
def delete_goal(story_id, goal_id):
    
    goal_records = Story.query.filter_by(id = story_id).first().goals
    goal_record = goal_records.filter_by(id = goal_id)

    goal_record.delete()
    db.session.commit()

    return response_successful

@api.route("/api/<int:story_id>/delete", methods=["DELETE"])
def delete_story(story_id):

    story_record = db.session.query(Story).filter(Story.id == story_id).first()
    
    db.session.delete(story_record)
    db.session.commit()

    return response_successful

@api.route("/api/<int:story_id>/edit", methods=["PATCH"])
def edit_story(story_id):

    content = request.get_json().get('content')

    story_record = Story.query.filter_by(id = story_id).first()
    story_record.content = content

    db.session.commit()

    return response_successful

@api.route("/api/<int:story_id>/goals/create", methods=["POST"])
def create_goal(story_id):

    content = request.get_json().get('content')
    goal_record = Goal(content=content)
    story_record = Story.query.filter_by(id = story_id).first()

    story_record.goals.append(goal_record)
    db.session.commit()
    
    return response_successful

@api.route("/api/create", methods=["POST"])
def create_story():

    content = request.get_json().get('content')
    story_record = Story(content=content)

    db.session.add(story_record)
    db.session.commit()
    
    return response_successful