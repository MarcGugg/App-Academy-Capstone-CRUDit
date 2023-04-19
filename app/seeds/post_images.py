from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.subcrudit import Subcrudit
from app.models.post import Post
from app.models.post_image import PostImage

def seed_post_images():
    image1 = PostImage(
        post_id = 3,
        url = 'https://preview.redd.it/20oayd72e2u41.jpg?auto=webp&s=d1925274ab21347b6858c4c147ad5f14fde19750'
    )
    image2 = PostImage(
        post_id = 4,
        url = 'https://cdn.wccftech.com/wp-content/uploads/2016/12/The-Legend-Of-Zelda-Breath-Of-The-Wild-screens.jpg'
    )
    image3 = PostImage(
        post_id = 5,
        url = 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
    )
    image4 = PostImage(
        post_id = 6,
        url = 'https://images.theconversation.com/files/417128/original/file-20210820-27-j1ro6y.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop'
    )
    image5 = PostImage(
        post_id = 8,
        url = 'https://bibliolifestyle.com/wp-content/uploads/2020/04/home-library-scaled-e1585852749305.jpg'
    )
    image6 = PostImage(
        post_id = 9,
        url = 'https://i.hurimg.com/i/hdn/75/0x0/5d15fe5a67b0a91c5cee3e4c.jpg'
    )
    image7 = PostImage(
        post_id = 10,
        url = 'https://doitbeforeme.com/wp-content/uploads/2020/08/face-art-sketches-e1596454765750.jpg'
    )
    image8 = PostImage(
        post_id = 13,
        url = 'https://www.allrecipes.com/thmb/Bwkz2gVOQUJcPYSzOJgD94XDi5Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/18874-Real-Italian-Calzones-ddmfs-127-4x3-1-a30a0e72801f42bcb0643ed4b57e8a3c.jpg'
    )
    image9 = PostImage(
        post_id = 14,
        url = 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.commit()




def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_images"))
        
    db.session.commit()
