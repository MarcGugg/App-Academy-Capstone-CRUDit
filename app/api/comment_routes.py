from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post
from app.models.comment import Comment
from app.forms.create_comment import CreateCommentForm
from app.forms.edit_comment import EditCommentForm
from app.forms.create_post import CreatePostForm
from app.forms.edit_post import EditPostForm

comment_routes = Blueprint('/comments', __name__)

@comment_routes.route('/all', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()

    if comments:
        return [comment.to_dict_inclusive() for comment in comments]
    
    return None

@comment_routes.route('/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def get_comment_by_id(comment_id):
    
    comment = Comment.query.get(comment_id)

    if comment:
        if request.method == 'GET':
            return comment.to_dict_inclusive()
    
        if request.method == 'PUT':
            print('')
            print('')
            print('')
            print('')
            print('COMMENT', comment.to_dict())
            print('')
            print('')
            print('')
            form = EditCommentForm()

            form['csrf_token'].data = request.cookies['csrf_token']

            if current_user.is_authenticated:
                print("")
                print("")
                print("")
                print("")
                print("USER AUTHENTICATED")
                print("")
                print("")
                print("")
                print("")

                if comment.author_id == current_user.id:
                    print('')
                    print('')
                    print('')
                    print('CORRECT USER')
                    print('')
                    print('')
                    print('')
                    print('')

                    if form.validate_on_submit():
                        print('')
                        print('')
                        print('')
                        print('FORM VALIDATED')
                        print('')
                        print('')
                        print('')

                        data = form.data

                        comment.text = data['text']

                        db.session.commit()

                        return comment.to_dict_inclusive()
                
                return {'User did not write this comment', 400}
            
            return {'User must log in', 400}
        
        if request.method == 'DELETE':
            
            if current_user.is_authenticated:
            
                if comment.author_id == current_user.id:
            
                    db.session.delete(comment)
                    db.session.commit()
                    return {'Success': 'Comment Deleted'}
            
                return {'User did not write this comment', 400}
            
            return {'User must log in', 400}
        
    return None


@comment_routes.route('/from_post/<int:post_id>', methods=['GET', 'POST'])
@login_required
def comment_by_post_id(post_id):
    if request.method == 'GET':
        comments = Comment.query.filter(post_id == post_id).all()

        if comments:
            return [comment.to_dict_inclusive() for comment in comments]
        return None
    
    if request.method == 'POST':
        
        if current_user.is_authenticated:
            form = CreateCommentForm()

            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                data = form.data

                new_comment = Comment(
                    author_id = current_user.id,
                    text = data['text'],
                    post_id = post_id
                )

                db.session.add(new_comment)
                db.session.commit()
                return new_comment.to_dict()
            
            return {'Form validation failed', 400}
        
        return {'User must be logged in', 400}
    

@comment_routes.route('/<int:comment_id/upvote', methods=['PUT'])
@login_required
def upvote_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment:
        
        if current_user.is_authenticated:
        
            if current_user in comment.downvotes:
        
                comment.downvotes.remove(current_user)
                current_user.comment_downvotes.remove(comment)
        
            comment.upvotes.append(current_user)
        
            current_user.comment_upvotes.append(comment)
        
            db.sesion.commit()
        
            return current_user.to_dict()
        
        return {'Message': 'User must log in'}
    
    return None

@comment_routes.route('/<int:comment_id/downvote', methods=['PUT'])
@login_required
def downvote_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment:
    
        if current_user.is_authenticated:
    
            if current_user in comment.upvotes:
    
                comment.upvotes.remove(current_user)
                current_user.comment_downvotes.remove(comment)
    
            comment.downvotes.append(current_user)
    
            current_user.comment_downvotes.append(comment)
    
            db.sesion.commit()
    
            return current_user.to_dict()
    
        return {'Message': 'User must log in'}
    
    return None

@comment_routes.route('/<int:comment_id/remove_downvote', methods=['PUT'])
@login_required
def remove_downvote(comment_id):
    comment = Comment.query.get(comment_id)

    if comment:
    
        if current_user.is_authenticated:
    
            if current_user in comment.downvotes:
    
                comment.downvotes.remove(current_user)
                current_user.comment_downvotes.remove(comment)
                return current_user.to_dict()
    
            return None
    
        return {'Message': 'User must log in'}
    
    return None

@comment_routes.route('/<int:comment_id/remove_upvote', methods=['PUT'])
@login_required
def remove_upvote(comment_id):
    comment = Comment.query.get(comment_id)

    if comment:
    
        if current_user.is_authenticated:
    
            if current_user in comment.upvotes:
    
                comment.upvotes.remove(current_user)
                current_user.comment_upvotes.remove(comment)
                return current_user.to_dict()
    
            return None
    
        return {'Message': 'User must log in'}
    
    return None
    