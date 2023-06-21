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
    

    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body
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
            'comments': [comment.to_dict() for comment in self.comments]
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
            'comments': [comment.to_dict() for comment in self.comments]
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
        }
    def to_dict_no_comments_no_image(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'subId': self.sub_id,
            'header': self.header,
            'body': self.body,
            'author': self.author.to_dict(),
            'subcrudit': self.subcrudit.to_dict()
        }
