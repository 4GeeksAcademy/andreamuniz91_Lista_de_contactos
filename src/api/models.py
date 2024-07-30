from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String, unique=False, nullable=False)
    firtname = db.Column(db.String, unique=False, nullable=False)
    lastname = db.Column(db.String, unique=False,nullable=False)
    email = db.Column(db.String, unique=False, nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "firtname": self.firtname,
            "lastname": self.lastname,
            "email": self.email}

class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    medias_type = db.Column(db.Enum("imagen", "video", name="type_medias"), unique=False, nullable=False)
    url = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    poster_id = db.relationship("Post", foreign_keys=(post_id),
                        backref=db.backref("medias_to", lazy="select"))
    
    def __repr__(self):
        return f'<User {self.id} - {self.medias_type}>'

    def serialize(self):
        return {
            "id": self.id,
            "medias_type": self.medias_type,
            "url": self.url,
            "post_id": self.post_id}

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    users_to= db.relationship("Users", foreign_keys=(users_id),
                        backref=db.backref("post_to", lazy="select"))
    
    def __repr__(self):
        return f'<Post {self.id} - {self.users_id}>'

    def serialize(self):
        return {"id": self.id,
                "users_id": self.users_id}
           

class Commets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))

    users_to = db.relationship("Users", foreign_keys=(user_id),
                                backref=db.backref("comment_to", lazy="select"))
    
    post_to = db.relationship("Post", foreign_keys=(post_id),
                                backref=db.backref("comment_to", lazy="select"))
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "coment_text": self.comment_text,
            "user_id": self.user_id,
            "post_id": self.post_id}
