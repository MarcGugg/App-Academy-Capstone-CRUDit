from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.subcrudit import Subcrudit
from app.models.post import Post
from app.models.comment import Comment

def seed_comments():
    comment1 = Comment(
        author_id = 1,
        text = 'very cool',
        post_id = 1
    )
    comment2 = Comment(
        author_id = 3,
        text = 'very cool',
        post_id = 1
    )
    comment3 = Comment(
        author_id = 3,
        text = 'very cool',
        post_id = 2
    )
    comment4 = Comment(
        author_id = 1,
        text = 'very cool',
        post_id = 2
    )
    comment5 = Comment(
        author_id = 4,
        text = 'very cool',
        post_id = 3
    )
    comment6 = Comment(
        author_id = 5,
        text = 'very cool',
        post_id = 3
    )
    comment7 = Comment(
        author_id = 4,
        text = 'very cool',
        post_id = 6
    )
    comment8 = Comment(
        author_id = 5,
        text = 'very cool',
        post_id = 6
    )
    comment9 = Comment(
        author_id = 1,
        text = 'very cool',
        post_id = 7
    )
    comment10 = Comment(
        author_id = 3,
        text = 'very cool',
        post_id = 7
    )
    comment11 = Comment(
        author_id = 5,
        text = 'very cool',
        post_id = 8
    )
    comment12 = Comment(
        author_id = 4,
        text = 'very cool',
        post_id = 8
    )
    comment13 = Comment(
        author_id = 2,
        text = 'very cool',
        post_id = 9
    )
    comment14 = Comment(
        author_id = 3,
        text = 'very cool',
        post_id = 9
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()