from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.subcrudit import Subcrudit


def seed_subcrudits():
    sub1 = Subcrudit(
        name='Programming', 
        description='A friendly environment in which people can learn how to program!',
        owner_id = 2
    )
    sub2 = Subcrudit(
        name='Gaming', 
        description='A place to discuss all facets of video games and their development.',
        owner_id = 3
    )
    sub3 = Subcrudit(
        name='Cute_Animals', 
        description='A central repository for pictures of adorable animals. Post your pets here!',
        owner_id = 4
    )
    sub4 = Subcrudit(
        name='Books', 
        description='Come here to discuss books you enjoy, get recommendations for new reading material, or recommend your favorite book to a curious stranger! All genres welcome.',
        owner_id = 5
    )
    sub5 = Subcrudit(
        name='Art', 
        description='We like to discuss our favorite pieces of art, and even enjoy posting our own art sometimes.',
        owner_id = 2
    )
    sub6 = Subcrudit(
        name='Music', 
        description='A subCRUDit for all things music!',
        owner_id = 3
    )
    sub7 = Subcrudit(
        name='Food', 
        description='Forget Instagram! This is the best place on the internet to post food pics!',
        owner_id = 4
    )


    db.session.add(sub1)
    db.session.add(sub2)
    db.session.add(sub3)
    db.session.add(sub4)
    db.session.add(sub5)
    db.session.add(sub6)
    db.session.add(sub7)
    db.session.commit()

def undo_subcrudits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subcrudits"))
        
    db.session.commit()