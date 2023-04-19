from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit


post_image_routes = Blueprint('/post_images', __name__)

@post_image_routes.route('/all')
def get_all_images():
    images = PostImage.query.all()

    if images:
        return [image.to_dict() for image in images]
    return None

@post_image_routes.route('/<int:post_id>')
def get_image(post_id):
    image = PostImage.query.filter(PostImage.post_id == post_id).one()

    if image:
        return image.to_dict()
    return None