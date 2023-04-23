from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit, Post


search_routes = Blueprint('/search', __name__)

@search_routes.route('/<string:params>')
def search_subcrudits(params):
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("BACKEDN HIT")
    print("")
    print("")
    print("")
    print("")
    print("")
    results = Subcrudit.query.filter(Subcrudit.name.ilike(f'{params}%')).all()

    if results:
        print("")
        print("")
        print("")
        print("")
        print("")
        print("")
        print("")
        print("SUBS", [sub.to_dict() for sub in results])
        print("")
        print("")
        print("")
        print("")
        print("")
        return [sub.to_dict() for sub in results]
    return None