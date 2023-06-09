from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))

    post = db.relationship('Post', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'postId': self.post_id
        }
    def to_dict_inclusive(self):
        return {
            'id': self.id,
            'url': self.url,
            'postId': self.post_id,
            'post': self.post.to_dict()
        }