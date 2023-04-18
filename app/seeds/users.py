from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='demo user')
    user2 = User(
        username='marnie', email='marnie@aa.io', password='password', bio='I love programming, drawing, and browsing CRUDit!')
    user3 = User(
        username='bobbie', email='bobbie@aa.io', password='password', bio='I like gaming and playing on my guitar.')
    user4 = User(
        username='John123', email='John@aa.io', password='password', bio='I love to take care of animals and eat the finest cuisine.')
    user5 = User(
        username='stephanie365', email='steph@gmail.com', password='password', bio='New to CRUDit. I love to read.'
    )
    
    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()