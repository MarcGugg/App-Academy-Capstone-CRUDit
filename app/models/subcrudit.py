from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.subs_mods import subs_mods
from app.models.subs_users import subs_users


class Subcrudit(db.Model):
    __tablename__ = 'subcrudits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    
    owner = db.relationship('User', back_populates='all_subcrudits')
    posts = db.relationship('Post', back_populates='subcrudit', cascade='all, delete')

    mods = db.relationship('User', secondary='subs_mods', back_populates='modded_subs')

    users = db.relationship('User', secondary='subs_users', back_populates='followed_subs')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'ownerId': self.owner_id
        }
    def to_dict_inclusive(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'ownerId': self.owner_id,
            'owner': self.owner.to_dict(),
            'mods': [mod.to_dict() for mod in self.mods],
            'posts': [post.to_dict() for post in self.posts],
            'users': [user.to_dict() for user in self.users]
        }