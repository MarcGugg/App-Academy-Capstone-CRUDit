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
        print(subcrudits[0].owner.to_dict_inclusive())
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        # return [sub.to_dict() for sub in subcrudits]
        return [sub.to_dict_inclusive() for sub in subcrudits]
    return None

@subcrudit_routes.route('/<int:subcrudit_id>')
def get_subcrudit(subcrudit_id):
    subcrudit = Subcrudit.query.get(subcrudit_id)

    if subcrudit:
        return subcrudit.to_dict_inclusive()
    return None