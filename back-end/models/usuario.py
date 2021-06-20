from sql_alchemy import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    task_id = db.relationship('Task', lazy='select',
        backref=db.backref('user', lazy='joined'))



    def json(self):
        return{
            'id' : self.id,
            'name' : self.name,
        }    

    @classmethod
    def find_user(cls, id):
        user = cls.query.filter_by(id=id).first()
        if user:
            return user
        return None
    
    @classmethod
    def find_by_name(cls, name):
        user = cls.query.filter_by(name=name).first()
        if user:
            return user
        return None

    def save_user(self):
        db.session.add(self)
        db.session.commit()

    