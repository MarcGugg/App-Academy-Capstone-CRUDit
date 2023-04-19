from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post

post_routes = Blueprint('/posts', __name__)

@post_routes.route('/all')
def get_all_posts():
    posts = Post.query.all()

    if posts:
        post_list = []
        for post in posts:
            if post.image:
                post_list.append(post.to_dict_inclusive())
            else:
                post_list.append(post.to_dict_no_image())
        return post_list
    return None