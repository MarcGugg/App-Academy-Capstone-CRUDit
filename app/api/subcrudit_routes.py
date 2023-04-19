from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit


subcrudit_routes = Blueprint('/subcrudits', __name__)

@subcrudit_routes.route('/all')
def get_all_subcrudits():
    subcrudits = Subcrudit.query.all()

    if subcrudits:
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print(subcrudits[0].owner.to_dict())
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        return [sub.to_dict() for sub in subcrudits]
    return None