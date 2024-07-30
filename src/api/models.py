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
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    poster_id = db.relationship("Posts", foreign_keys=(post_id),
                        backref=db.backref("medias_to", lazy="select"))
    
    def __repr__(self):
        return f'<User {self.id} - {self.medias_type}>'

    def serialize(self):
        return {
            "id": self.id,
            "medias_type": self.medias_type,
            "url": self.url,
            "post_id": self.post_id}

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to= db.relationship("Users", foreign_keys=(user_id),
                        backref=db.backref("post_to", lazy="select"))
    
    def __repr__(self):
        return f'<Posts {self.id} - {self.user_id}>'

    def serialize(self):
        return {"id": self.id,
                "user_id": self.user_id}
           

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    users_to = db.relationship("Users", foreign_keys=(user_id),
                                backref=db.backref("comment_to", lazy="select"))
    
    post_to = db.relationship("Posts", foreign_keys=(post_id),
                                backref=db.backref("comment_to", lazy="select"))
    def __repr__(self):
        return f'<Comment {self.id} - {self.comment_text} - {self.user_id} - {self.post_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "comment_text": self.comment_text,
            "user_id": self.user_id,
            "post_id": self.post_id}
