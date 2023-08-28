from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

from io import BytesIO

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
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('image', image.to_dict())
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        return image.to_dict()
    # return {'Message':'Image Not Found'}
    return None

@post_image_routes.route('/<int:post_id>/add_image', methods=['POST'])
@login_required
def create_post_image(post_id):
    if current_user.is_authenticated:
        post = Post.query.get(post_id)

        if post:
            # data = request.get_json()
            data = request.data

            print('')
            print('')
            print('')
            print('')
            print('DATA', data)
            # print('filename', data.filename)
            print('')
            print('')

            # decoded_data = data.decode()
            # print("")
            # print("")
            # print("")
            # print("DECODED DATA", decoded_data)
            # print("")
            # print("")

            # file = BytesIO(bytes.fromhex(str(data)))
            # print('')
            # print('')
            # print('')
            # print('')
            # print('FILENAME', file.filename)
            # print('')
            # print('')
            # print('')

          
            # new_image = PostImage(
            #     url = data['url'],
            #     post_id = post.id
            # )


            # db.session.add(new_image)
            # db.session.commit()
            # # print('') 
            # # print('') 
            # # print('') 
            # # print('') 
            # # print('')
            # # print('NEW IMAGE', new_image.to_dict_inclusive()) 
            # # print('') 
            # # print('') 
            # # print('') 
            # # print('') 
            # # print('')
            # return new_image.to_dict_inclusive() 
        
        return None
    
    return {'Error': 'User must sign in to add post image.'}, 403