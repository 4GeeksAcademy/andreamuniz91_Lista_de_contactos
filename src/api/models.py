from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    firstname = db.Column(db.String, unique=False, nullable=True)
    lastname = db.Column(db.String, unique=False, nullable=True)
    is_active = db.Column(db.Boolean, unique=False, nullable=False)
    is_admin = db.Column(db.Boolean, unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id} - {self.email}>'
        
    def serialize(self):
        return {"id": self.id,
                "firstname": self.firstname,
                "lastname": self.lastname,
                "email": self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin}


class Favorites(db.Model):
    __tablename__ = 'favorite'
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(120))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to', lazy='select'))
    def __repr__(self):
        return f'The item favorite from {self.user_id} is {self.item}>'
    def serialize(self):
        return {"id": self.id,
                "item": self.item,
                "user_id": self.user_id}