from flask import Flask
from flask_restful import Api
from resource.usuario import user_a, user_register
from resource.tasks import task_a, task_register



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

@app.before_first_request
def cria_db():
    db.create_all()

api.add_resource(user_a, '/usuarios/<int:id>')
api.add_resource(user_register, '/cadastro')
api.add_resource(task_a, '/task/<int:id>')
api.add_resource(task_register, '/cadastrotask')


if __name__ == '__main__':
    from sql_alchemy import db
    db.init_app(app)
    app.run(debug=True)