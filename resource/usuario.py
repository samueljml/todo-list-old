from flask_restful import Resource, reqparse
from models.usuario import User

class users(Resource):
    def get(self):
        return {'user': [us.json() for us in User.query.all()]} 

class user(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('name', type=str, required=True, help="The field 'name' cannot be left blank.")
class user_a(Resource):
    def get(self, id):
        us = User.find_user(id)
        if us:
            return us.json()
        return {'message': 'user not found.'}, 404
class user_register(Resource):
    def post(self):
        dados = user.atributos.parse_args()
        if User.find_by_name(dados['name']):
            return {"message": "us name '{}' already exists.".format(dados['name'])}, 400 #Bad Request

        
        us = User(**dados)
        us.save_user()
        return {'message': 'User created successfully!'}, 201 # Created
    

    