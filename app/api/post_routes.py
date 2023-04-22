from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post
from app.forms.create_post import CreatePostForm
from app.forms.edit_post import EditPostForm

post_routes = Blueprint('/posts', __name__)

@post_routes.route('/all')
def get_all_posts():
    # print('')
    # print('')
    # print('')
    # print('')
    # print('')
    # print('')
    # print('')
    # print('BACKEND HIT')
    # print('')
    # print('')
    # print('')
    # print('')
    # print('')
    # print('')
    posts = Post.query.all()

    if posts:
        post_list = []
        for post in posts:
            if post.image:
                post_list.append(post.to_dict_inclusive())
            else:
                post_list.append(post.to_dict_no_image())
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print(post_list)
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        # print('')
        return post_list
    return None

@post_routes.route('/<int:post_id>')
def get_post(post_id):
    post = Post.query.get(post_id)

    if post:
        if post.image:
            return post.to_dict_inclusive()
        else:
            return post.to_dict_no_image()
    return None

@post_routes.route('/authors/<int:author_id>')
def get_author_by_id(author_id):
    author = User.query.get(author_id)

    if author:
        return author.to_dict()
    return None


@post_routes.route('/<int:subcrud_id>/new_post', methods=['POST'])
@login_required
def create_post(subcrud_id):
    # print('HIT BACKEND')
    if current_user.is_authenticated:
        # print('PASSED BACKEND CONDITION')
        # print('CURRENT USER', current_user.to_dict())
        form = CreatePostForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            # print('BACKEND FORM VALIDATED')
            data = form.data
            new_post = Post(
                author_id = current_user.id,
                sub_id = subcrud_id,
                header = data['header'],
                body = data['body']
            )
            # print('new post before commit', new_post.to_dict())
            # print('new post author', new_post.author())

            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            # print('NEW POST', new_post.to_dict_no_image())
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')


            db.session.add(new_post)
            db.session.commit()

            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            # print('NEW POST', new_post.to_dict_no_image())
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')

            return new_post.to_dict_no_image()

    return {'Error': 'User must sign in to post.'}, 403


@post_routes.route('/<int:post_id>/edit', methods=['PUT'])
@login_required
def edit_post(post_id):

    post = Post.query.get(post_id)
    
    form = EditPostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    
    if post:

        if current_user.is_authenticated:

            if post.author_id == current_user.id:

                if form.validate_on_submit():

                    data = form.data

                    post.header = data['header']
                    post.body = data['body']

                    db.session.commit()
                    return post.to_dict()
            
            return {'Error': 'User did not make this post'}
    
        return {'Error': 'User must sign in to edit a post.'}, 403 
    
    return {'Error': 'No Post Found.'}, 404


@post_routes.route('/<int:post_id>/delete', methods=['DELETE'])
@login_required
def delete_post(post_id):
    print('')
    print('')
    print('')
    print('BACKEND HIT')
    print('')
    print('')
    print('')
    post = Post.query.get(post_id)

    if post:
        print('')
        print('')
        print('')
        print('')
        print('')
        print('POST EXISTS')
        print('')
        print('')
        print('')
        print('')
        if current_user.is_authenticated:
            print('')
            print('')
            print('')
            print('')
            print('USER AUTHENTICATED')
            print('')
            print('')
            print('')
            print('')
            if post.author_id == current_user.id:
                
                db.session.delete(post)
                db.session.commit()
                return {'Message': 'Post deleted.'}
            
            return {'Error': 'User did not make this post'}, 403

        return {'Error': 'User must sign in to delete a post.'}, 403
    
    return None