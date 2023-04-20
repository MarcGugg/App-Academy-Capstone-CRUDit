from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, URLField
from wtforms.validators import DataRequired, URL
from app.models import  User

class EditSubForm(FlaskForm):
    name = StringField('Subcrudit Name', validators=[DataRequired()])
    description = StringField('Description')