from sql_alchemy import db

class Task(db.Model):
    __tablename__ = 'task'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    status = db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
   
  
   
    def __init__(self, name, status, user_id):
        self.name = name
        self.status = status
        self.user_id = user_id

    def json(self):
        return{
            'id' : self.id,
            'name' : self.name,
            'status': self.status,
            'user_id': self.user_id,
            
        }    

    @classmethod
    def find_task(cls, id):
        user = cls.query.filter_by(id=id).first()
        if user:
            return user
        return None
    
    @classmethod
    def find_task_by_name(cls, name):
        user = cls.query.filter_by(name=name).first()
        if user:
            return user
        return None

    def save_task(self):
        db.session.add(self)
        db.session.commit()

    