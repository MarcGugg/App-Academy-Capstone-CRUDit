from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post
from app.forms.create_post import CreatePostForm

post_routes = Blueprint('/posts', __name__)

@post_routes.route('/all')
def get_all_posts():
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('BACKEND HIT')
    print('')
    print('')
    print('')
    print('')
    print('')
    print('')
    posts = Post.query.all()

    if posts:
        post_list = []
        for post in posts:
            if post.image:
                post_list.append(post.to_dict_inclusive())
            else:
                post_list.append(post.to_dict_no_image())
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print(post_list)
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
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
    if current_user.is_authenticated:

        form = CreatePostForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            new_post = Post(
                author_id = current_user.id,
                sub_id = subcrud_id,
                header = data['header'],
                body = data['body']
            )

            print('')
            print('')
            print('')
            print('')
            print('')
            print('NEW POST', new_post.to_dict_no_image())
            print('')
            print('')
            print('')
            print('')
            print('')


            db.session.add(new_post)
            db.session.commit()

    return {'Error': 'User must sign in to post.'}, 403