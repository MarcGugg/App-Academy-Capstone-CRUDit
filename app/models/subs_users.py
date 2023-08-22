from .db import db, environment, SCHEMA, add_prefix_for_prod

subs_users = db.Table('subs_users',
                     db.Model.metadata,
                     db.Column('user_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('users.id')), primary_key=True),
                     db.Column('subcrudit_id', db.Integer, db.ForeignKey(
                        add_prefix_for_prod('subcrudits.id')), primary_key=True)
                    )


if environment == "production":
    subs_users.schema = SCHEMA