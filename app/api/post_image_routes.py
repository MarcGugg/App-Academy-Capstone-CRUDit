from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post


post_image_routes = Blueprint('/post_images', __name__)

@post_image_routes.route('/all')
def get_all_images():
    images = PostImage.query.all()

    if images:
        return [image.to_dict() for image in images]
    return None

@post_image_routes.route('/<int:post_id>')
def get_image(post_id):
    image = PostImage.query.filter(PostImage.post_id == post_id).first()

    if image:
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('image', image.to_dict())
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        return image.to_dict()
    # return {'Message':'Image Not Found'}
    return None

@post_image_routes.route('/<int:post_id>/add_image', methods=['POST'])
@login_required
def create_post_image(post_id):
    if current_user.is_authenticated:
        post = Post.query.get(post_id)

        if post:
            data = request.get_json()

            new_image = PostImage(
                url = data['url'],
                post_id = post.id
            )

            print('') 
            print('') 
            print('') 
            print('') 
            print('')
            print('NEW IMAGE', new_image.to_dict_inclusive()) 
            print('') 
            print('') 
            print('') 
            print('') 
            print('')

            db.session.add(new_image)
            db.session.commit()
            return new_image.to_dict_inclusive() 
        
        return None
    
    return {'Error': 'User must sign in to add post image.'}, 403