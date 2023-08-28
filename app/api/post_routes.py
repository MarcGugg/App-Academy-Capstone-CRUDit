from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post
from app.forms.create_post import CreatePostForm
from app.forms.edit_post import EditPostForm
from app.api.AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename

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
        if post.image and post.comments:
            return post.to_dict_inclusive()
        elif post.image and not post.comments:
            return post.to_dict_no_comments()
        elif post.comments and not post.image:
            return post.to_dict_no_image()
        else: #no comments and no image
            return post.to_dict_no_comments_no_image()
    return None

@post_routes.route('/authors/<int:author_id>')
def get_author_by_id(author_id):
    author = User.query.get(author_id)

    if author:
        return author.to_dict()
    return None


@post_routes.route('/<string:subcrud_name>/new_post', methods=['POST'])
@login_required
def create_post(subcrud_name):
    # print('HIT BACKEND')
    sub = Subcrudit.query.filter(Subcrudit.name.like(subcrud_name)).first()
    
    if sub:
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('SUB EXISTS', sub.to_dict())
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')

    if current_user.is_authenticated:
        # print('PASSED BACKEND CONDITION')
        # print('CURRENT USER', current_user.to_dict())
        form = CreatePostForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            # print('BACKEND FORM VALIDATED')
            data = form.data
            print('')
            print('')
            print('')
            print('')
            print('FORM DATA', data)
            print('')
            print('')
            print('')
            print('')
            print('')
            new_post = Post(
                author_id = current_user.id,
                sub_id = sub.id,
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

            if data['image']:

                file = data['image']
                print('')
                print('')
                print('')
                print('FILE', file)
                print('NAME', file.filename)
                print('')

                file.filename = get_unique_filename(file.filename)
                upload = upload_file_to_s3(file)
                img_url = None
                if 'url' in upload:
                    img_url = upload['url']

                new_post_img = PostImage(
                    url = img_url,
                    post_id = new_post.id
                )

                db.session.add(new_post_img)
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
    print('')
    print('')
    print('')
    print('POST', post)
    print('')
    print('')
    print('')

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
            # if post.author_id == current_user.id:
            if post.image:
                image_to_delete = post.image.to_dict()
                remove_file_from_s3(image_to_delete)
                db.session.delete(image_to_delete)
                
            db.session.delete(post)
            db.session.commit()
            return {'Message': 'Post deleted.'}
            

        return {'Error': 'User must sign in to delete a post.'}, 403
    
    return None

@post_routes.route('/<int:post_id>/upvote', methods=['PUT'])
@login_required
def upvote_post(post_id):
    post = Post.query.get(post_id)

    if post:
        
        if current_user.is_authenticated:
        
            if current_user in post.downvotes:
                
                for user in post.downvotes:
                    if user.id == current_user.id:
                        post.downvotes.remove(user)
                
                for downvoted_post in current_user.post_downvotes:
                    if downvoted_post.id == post.id:
                        current_user.post_downvotes.remove(downvoted_post)
        
            post.upvotes.append(current_user)
        
            current_user.post_upvotes.append(post)
        
            db.session.commit()

            if post.image:
                return [current_user.to_dict(), post.to_dict_inclusive()]
            else:
                return [current_user.to_dict(), post.to_dict_no_image()]
        
        return {'Message':'User must log in'}
    
    return None

@post_routes.route('/<int:post_id>/downvote', methods=['PUT'])
@login_required
def downvote_post(post_id):
    post = Post.query.get(post_id)

    if post:
        
        if current_user.is_authenticated:
        
            if current_user in post.upvotes:
                print("")
                print("")
                print("")
                print("")
                print("USER", current_user.to_dict())
                print("")
                print("")
                print("")
                print("")
                for user in post.upvotes:
                    if user.id == current_user.id:
                        post.upvotes.remove(user)

                for upvoted_post in current_user.post_upvotes:
                    if upvoted_post.id == post.id:
                        current_user.post_upvotes.remove(upvoted_post)
        
            post.downvotes.append(current_user)
        
            current_user.post_downvotes.append(post)
        
            db.session.commit()
        
            if post.image:
                return [current_user.to_dict(), post.to_dict_inclusive()]
            else:
                return [current_user.to_dict(), post.to_dict_no_image()]
        
        return {'Message':'User must log in'}
    
    return None


@post_routes.route('/<int:post_id>/remove_upvote', methods=['PUT'])
@login_required
def remove_upvote(post_id):
    post = Post.query.get(post_id)

    if post:
    
        if current_user.is_authenticated:
    
            if current_user in post.upvotes:
    
                for user in post.upvotes:
                    if user.id == current_user.id:
                        post.upvotes.remove(user)
                
                for upvoted_post in current_user.post_upvotes:
                    if upvoted_post.id == post.id:
                        current_user.post_upvotes.remove(post)

                db.session.commit()

                if post.image:
                    return [current_user.to_dict(), post.to_dict_inclusive()]
                else:
                    return [current_user.to_dict(), post.to_dict_no_image()]
                    
    
            return None
    
        return {'Message': 'User must log in'}
    
    return None

@post_routes.route('/<int:post_id>/remove_downvote', methods=['PUT'])
@login_required
def remove_downvote(post_id):
    post = Post.query.get(post_id)

    if post:
    
        if current_user.is_authenticated:
    
            if current_user in post.downvotes:
    
                for user in post.downvotes:
                    if user.id == current_user.id:
                        post.downvotes.remove(user)
                
                    for downvoted_post in current_user.post_downvotes:
                        if downvoted_post.id == post.id:
                            current_user.post_downvotes.remove(post)

                db.session.commit()

                if post.image:
                    return [current_user.to_dict(), post.to_dict_inclusive()]
                else:
                    return [current_user.to_dict(), post.to_dict_no_image()]
    
            return None
    
        return {'Message': 'User must log in'}
    
    return None