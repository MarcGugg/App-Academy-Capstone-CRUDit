from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, URLField, TextAreaField
from wtforms.validators import DataRequired, URL
from app.models import  User

class CreateCommentForm(FlaskForm):
    text = TextAreaField('Text', validators=[DataRequired()])