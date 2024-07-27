from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
            # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "is_admin": self.is_admin}


class Authors(db.model):
    id = db.Column(db.Integer, primary_Key=True)
    name = db.column(db.string, unique=False, nullable=False)
    lastname = db.column(db.string, unique=False, nullable=False)
    # ForeignKey
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Relaciones
    user_to = db.relationship('Users', foreign_keys=['users_id'],
                               backref=db.backref('author_to', lazy='select'))

    def __repr__(self):
            return f'<Author: {self.id } - {self.name} - {self.lastname}'

    def serialize(self):
         return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "is_admin": self.is_admin}

class Books(db.Model):
    id = db.Column(db.Integer, primary_Key=True)
    title = db.Colum(db.string(100))
    author_id = db.Column(db.Integer, db.ForeignKey('authos.id'))
    author_to = db(db.).realationship