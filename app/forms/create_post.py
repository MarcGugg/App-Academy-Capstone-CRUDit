from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, URLField, TextAreaField
from wtforms.validators import DataRequired, URL
from app.models import  User

class CreatePostForm(FlaskForm):
    header = StringField('Header', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
    image = StringField('Image')