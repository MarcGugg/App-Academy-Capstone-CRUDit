from .db import db, environment, SCHEMA, add_prefix_for_prod
# from app.models.user import User
from app.models.comments_upvotes import comments_upvotes
from app.models.comments_downvotes import comments_downvotes

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    
    post = db.relationship('Post', back_populates='comments')
    author = db.relationship('User', back_populates='comments')
    upvotes = db.relationship('User', secondary='comments_upvotes', back_populates='comment_upvotes')
    downvotes = db.relationship('User', secondary='comments_downvotes', back_populates='comment_downvotes')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'authorId': self.author_id,
            'postId': self.post_id
        }
    def to_dict_inclusive(self):
        return {
            'id': self.id,
            'text': self.text,
            'authorId': self.author_id,
            'author': self.author.to_dict(),
            'upvotes': [user.to_dict() for user in self.upvotes],
            'downvotes': [user.to_dict() for user in self.downvotes],
            'postId': self.post_id,
            'post': self.post.to_dict()
        }