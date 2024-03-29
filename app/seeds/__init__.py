from flask.cli import AppGroup
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA
from app.seeds.post_images import seed_post_images, undo_post_images
from app.seeds.posts import seed_posts, undo_posts
from app.seeds.subcrudits import seed_subcrudits, undo_subcrudits
from app.seeds.comments import seed_comments, undo_comments


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_subcrudits()
        undo_posts()
        undo_post_images()
        undo_comments()
    seed_users()
    seed_subcrudits()
    seed_posts()
    seed_post_images()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_subcrudits()
    undo_posts()
    undo_post_images()
    undo_comments()
    # Add other undo functions here