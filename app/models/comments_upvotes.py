from .db import db, environment, SCHEMA, add_prefix_for_prod

comments_upvotes = db.Table('comments_upvotes',
                     db.Model.metadata,
                     db.Column('user_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('users.id')), primary_key=True),
                     db.Column('comment_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('comments.id')), primary_key=True)
                    )


if environment == "production":
    comments_upvotes.schema = SCHEMA