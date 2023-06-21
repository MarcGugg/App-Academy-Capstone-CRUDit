from .db import db, environment, SCHEMA, add_prefix_for_prod

comments_downvotes = db.Table('comments_downvotes',
                     db.Model.metadata,
                     db.Column('user_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('users.id')), primary_key=True),
                     db.Column('comment_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('comments.id')), primary_key=True)
                    )


if environment == "production":
    comments_downvotes.schema = SCHEMA