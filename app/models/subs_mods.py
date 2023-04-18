from .db import db, environment, SCHEMA, add_prefix_for_prod

subs_mods = db.Table('subs_mods',
                     db.Model.metadata,
                     db.Column('user_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('user.id')), primary_key=True),
                     db.Column('subcrudit_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('subcrudit.id')), primary_key=True)
                    )


if environment == "production":
    subs_mods.schema = SCHEMA
# post_tag = db.Table('post_tag',
#                     db.Column('post_id', db.Integer, db.ForeignKey('post.id')),
#                     db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'))
#                     )