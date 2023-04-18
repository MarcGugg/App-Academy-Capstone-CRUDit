from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.subcrudit import Subcrudit
from app.models.post import Post

def seed_posts():
    post1 = Post(
        author_id = 2,
        sub_id = 1,
        header = 'How to write hello world in Javascript?',
        body='I have an assessment in 5 minutes please help!'
    )
    post2 = Post(
        author_id = 3,
        sub_id = 1,
        header = 'How to write list comprehensions in Python?',
        body='Don\'t understand the syntax'
    )
    post3 = Post(
        author_id = 4,
        sub_id = 2,
        header = 'How do I beat this boss?',
        body='Been at this for 3 hours and can\'t beat him'
    )
    post4 = Post(
        author_id = 5,
        sub_id = 2,
        header = 'I really love this game.',
        body='I\'ve put over 500 hours into it so far'
    )
    post5 = Post(
        author_id = 2,
        sub_id = 3,
        header = 'Here\'s a picture of my dog.',
        body='He is very cute'
    )
    post6 = Post(
        author_id = 3,
        sub_id = 3,
        header = 'Saw these stray cats in my neighborhood today.',
        body='I want to adopt them'
    )
    post7 = Post(
        author_id = 4,
        sub_id = 4,
        header = 'Any recommendations for books?',
        body='I\'m really into fantasy in particular.'
    )
    post8 = Post(
        author_id = 5,
        sub_id = 4,
        header = 'This is my book collection',
        body='I\'ve collected even more than pictured'
    )
    post9 = Post(
        author_id = 2,
        sub_id = 5,
        header = 'I love looking at the Mona Lisa. It\'s my favorite painting!',
        body='Here it is at the Louvre'
    )
    post10 = Post(
        author_id = 4,
        sub_id = 5,
        header = 'Here\'s a sketch I made the other day',
        body='I hope you like it. I\'ve been practicing!'
    )
    post11 = Post(
        author_id = 5,
        sub_id = 6,
        header = 'Best music recommendations?',
        body='Trying to broaden my horizons regarding music taste'
    )
    post12 = Post(
        author_id = 2,
        sub_id = 6,
        header = 'I love listening to Drake omg',
        body='I\'ve been listening to Hotline Bling on repeat for the last 36 hours'
    )
    post13 = Post(
        author_id = 3,
        sub_id = 7,
        header = 'Calzone > Pizza',
        body='There is no debate. Anyone who stans pizza over calzones is taking money from Big Pizza'
    )
    post14 = Post(
        author_id = 4,
        sub_id = 7,
        header = 'Pizza > Calzone',
        body='There is no debate. Anyone who stans calzones over pizza is taking money from Big Calzone'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.commit()






def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()