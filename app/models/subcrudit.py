from .db import db, environment, SCHEMA, add_prefix_for_prod
from subs_mods import subs_mods


class Subcrudit(db.Model):
    __tablename__ = 'subcrudits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    
    owner = db.relationship('User', back_populates='subCRUDits')
    posts = db.relationship('Post', back_populates='subCRUDit', cascade='all, delete')

    mods = db.relationship('User', secondary=subs_mods, backref='modded_subs')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }