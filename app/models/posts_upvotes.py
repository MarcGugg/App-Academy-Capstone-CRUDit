from .db import db, environment, SCHEMA, add_prefix_for_prod

posts_upvotes = db.Table('posts_upvotes',
                     db.Model.metadata,
                     db.Column('user_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('users.id')), primary_key=True),
                     db.Column('post_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('posts.id')), primary_key=True)
                    )


if environment == "production":
    posts_upvotes.schema = SCHEMA