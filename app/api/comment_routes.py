from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post
from app.models.comment import Comment
from app.forms.create_comment import CreateCommentForm
from app.forms.create_post import CreatePostForm
from app.forms.edit_post import EditPostForm

comment_routes = Blueprint('/comments', __name__)

@comment_routes.route('/all', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()

    if comments:
        return [comment.to_dict_inclusive() for comment in comments]
    
    return None