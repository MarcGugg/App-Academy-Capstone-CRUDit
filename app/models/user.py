from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.subs_mods import subs_mods

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # added
    bio = db.Column(db.String(255))
    
    all_subcrudits = db.relationship('Subcrudit', back_populates='owner', cascade='all, delete')
    posts = db.relationship('Post', back_populates='author')

    modded_subs = db.relationship('Subcrudit', secondary='subs_mods', back_populates='mods')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio
        }
    def to_dict_inclusive(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'allSubcruddits': [sub.to_dict() for sub in self.all_subcrudits],
            'posts': [post.to_dict() for post in self.posts],
            'moddedSubs': [modded_sub.to_dict() for modded_sub in self.modded_subs]
        }
