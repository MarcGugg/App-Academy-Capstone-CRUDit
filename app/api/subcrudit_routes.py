from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import  User, PostImage, db, Subcrudit
from app.forms.create_subcrudit import CreateSubForm
from app.forms.edit_subcrudit import EditSubForm

subcrudit_routes = Blueprint('/subcrudits', __name__)

@subcrudit_routes.route('/all')
def get_all_subcrudits():
    print("")
    print("")
    print("")
    print("")
    print("")
    print("BACKEND ALL SUBS HIT")
    print("")
    print("")
    print("")
    print("")
    print("")
    subcrudits = Subcrudit.query.all()

    if subcrudits:
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        print([sub.name for sub in subcrudits])
        print('')
        print('')
        print('')
        print('')
        print('')
        print('')
        # return [sub.to_dict() for sub in subcrudits]
        return [sub.name for sub in subcrudits]
    return None

@subcrudit_routes.route('/all/objects')
def get_all_subs_real():
    subs = Subcrudit.query.all()
    if subs:
        return [sub.to_dict() for sub in subs]
    return None

# @subcrudit_routes.route('/<int:subcrudit_id>')
# def get_subcrudit(subcrudit_id):
#     subcrudit = Subcrudit.query.get(subcrudit_id)

#     if subcrudit:
#         return subcrudit.to_dict_inclusive()
#     return None
@subcrudit_routes.route('/<string:sub_name>')
def get_subcrudit(sub_name):
    subcrudit = Subcrudit.query.filter(Subcrudit.name.ilike(sub_name)).first()

    if subcrudit:
        return subcrudit.to_dict_inclusive()
    return None

@subcrudit_routes.route('/create', methods=['POST'])
@login_required
def create_subcrudit():
    form = CreateSubForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_sub = Subcrudit(
            name = data['name'],
            description = data['description'],
            owner_id = current_user.id
        )

        db.session.add(new_sub)
        db.session.commit()
    
        return new_sub.to_dict()
    
    return {'Error': 'Validation Error'}, 401

@subcrudit_routes.route('/<string:sub_name>/edit', methods=['PUT'])
@login_required
def edit_sub(sub_name):
    subcrudit = Subcrudit.query.filter(Subcrudit.name.ilike(sub_name)).first()

    form = EditSubForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    
    if subcrudit:
        if form.validate_on_submit():
            data = form.data
            subcrudit.name = data['name']
            subcrudit.description = data['description']
            db.session.commit()
            print('')
            print('')
            print('')
            print('')
            print('')
            print('')
            print('edited sub', subcrudit.to_dict())
            print('')
            print('')
            print('')
            print('')
            print('')
            print('')
            return subcrudit.to_dict_inclusive()

        return {'Error': 'Validation Error'}, 401
    
    return None

@subcrudit_routes.route('/<string:sub_name>/delete', methods=['DELETE'])
@login_required
def delete_sub(sub_name):
    if current_user.is_authenticated:
        
        subcrudit = Subcrudit.query.filter(Subcrudit.name.ilike(sub_name)).first()
        
        if subcrudit:
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            # print('SUBCRUDIT TO DELETE', subcrudit.to_dict())
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            # print('')
            
            if not subcrudit.owner_id == current_user.id:
                return {'Error': 'Current user does not own this SubCRUDit.'}
            
            db.session.delete(subcrudit)
            db.session.commit()
            return {'Message': 'SubCRUDit deleted.'}
        else:
            return None
            
    return {'Error': 'Please sign in to delete a SubCRUDit.'}, 401

@subcrudit_routes.route('/<int:sub_id>/add_mod', methods=['PUT'])
@login_required
def add_mod(sub_id):
    print("")
    print("")
    print("")
    print("")
    print("BACKEND HIT")
    print("")
    print("")
    print("")
    print("")
    print("")
    data = request.get_json()
    print("")
    print("")
    print("")
    print("")
    # print("data backend", data['userId'])
    print("")
    print("")
    print("")
    print("")
    user = User.query.get(data['userId'])
    sub = Subcrudit.query.get(sub_id)

    if user and sub:
        print("")
        print("")
        print("")
        print("")
        print("")
        print("")
        print("")
        print("")
        print("USER", user.to_dict())
        print("SUB", sub.to_dict())
        print("")
        print("")
        print("")
        print("")
        print("")
        print('add the append and commit now')
        sub.mods.append(user)
        # db.session.add(sub)
        db.session.commit()
        return user.to_dict()
    else :
        return None
    
@subcrudit_routes.route('/<int:sub_id>/follow', methods=['PUT'])
def follow_sub(sub_id):
    # data = request.get_json()
    # user = User.query.get(data['userId'])
    sub = Subcrudit.query.get(sub_id)

    if current_user.is_authenticated:
    
        sub.users.append(current_user)
        current_user.followed_subs.append(sub)
        # db.session.add(sub)
        print('')
        print('')
        print('')
        print('')
        print('')
        print('SUB', sub.to_dict_inclusive())
        print('')
        print('')
        print('')
        print('')
        db.session.commit()
        return sub.to_dict_inclusive()
    
    
    return {'User must log in'}

@subcrudit_routes.route('/<int:sub_id>/unfollow', methods=['PUT'])
def unfollow_sub(sub_id):
    sub = Subcrudit.query.get(sub_id)

    if current_user.is_authenticated:
        curr_user = User.query.get(current_user.id)
        print('')
        print('')
        print('')
        print('')
        print('CURRENT USER', curr_user.to_dict())
        print('')
        print('')
        print('')
        print('')
        # user = user.to_dict()
        print('')
        print('')
        print('')
        print('')
        print('SUB USERS', sub.users)
        print('SUB USERS', sub.users[0].id)
        print('')
        print('')
        print('')
        for user in sub.users:
            if user.id == curr_user.id:
                sub.users.remove(user)
                # user.followed_subs.remove(sub)
                break
        # db.session.add(sub)
        for sub in curr_user.followed_subs:
            if sub.id == sub.id:
                curr_user.followed_subs.remove(sub)
                break
        db.session.commit()
        return sub.to_dict_inclusive()
    
    
    return {'User must log in'}