def story_serializer(story):

    return {

        "id": story.id,
        "content": story.content,

    }

def goal_serializer(goal):

    return {

        "id": goal.id,
        "content": goal.content,
        "status": goal.status

    }