from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    sub_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('subcrudits.id')))
    header = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)

    author = db.relationship('User', back_populates='posts')
    subcrudit = db.relationship('Subcrudit', back_populates='posts')
    image = db.relationship('PostImage', back_populates='post', uselist=False)
    comments = db.relationship('Comment', back_populates='post')
    upvotes = db.relationship('User', secondary='posts_upvotes', back_populates='post_upvotes')
    downvotes = db.relationship('User', secondary='posts_downvotes', back_populates='post_downvotes')
    
    # perhaps add another to_dict method that excludes upvotes and downvotes
    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body,
            'upvotes': [user.to_dict() for user in self.upvotes],
            'downvotes': [user.to_dict() for user in self.downvotes]
        }
    def to_dict_inclusive(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body,
            'author': self.author.to_dict(),
            'subcrudit': self.subcrudit.to_dict(),
            'image': self.image.to_dict(),
            'comments': [comment.to_dict_no_post() for comment in self.comments],
            'upvotes': [user.to_dict() for user in self.upvotes],
            'downvotes': [user.to_dict() for user in self.downvotes]
        }
    def to_dict_no_image(self):
        # print('POST AUTHOR', self.author)
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body,
            'author': self.author.to_dict(),
            'subcrudit': self.subcrudit.to_dict(),
            'comments': [comment.to_dict_no_post() for comment in self.comments],
            'upvotes': [user.to_dict() for user in self.upvotes],
            'downvotes': [user.to_dict() for user in self.downvotes]
        }
    def to_dict_no_comments(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body,
            'author': self.author.to_dict(),
            'subcrudit': self.subcrudit.to_dict(),
            'image': self.image.to_dict(),
            'upvotes': [user.to_dict() for user in self.upvotes],
            'downvotes': [user.to_dict() for user in self.downvotes]
        }
    def to_dict_no_comments_no_image(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body,
            'author': self.author.to_dict(),
            'subcrudit': self.subcrudit.to_dict(),
            'upvotes': [user.to_dict() for user in self.upvotes],
            'downvotes': [user.to_dict() for user in self.downvotes]
        }
