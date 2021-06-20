from flask_restful import Resource, reqparse
from models.tasks import Task



class tasks(Resource):
    def get(self):
        return {'task': [tsk.json() for tsk in Task.query.all()]} 

class task_class(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('name', type=str, required=True, help="The field 'name' cannot be left blank.")
    atributos.add_argument('status', type=str, required=True, help="The field 'name' cannot be left blank.")
    atributos.add_argument('user_id', type=int, required=True, help="The field 'name' cannot be left blank.")
class task_a(Resource):
    def get(self, id):
        tsk = Task.find_task(id)
        if tsk:
            return tsk.json()
        return {'message': 'task not found.'}, 404
class task_register(Resource):
    def post(self):
        dados = task_class.atributos.parse_args()
        if Task.find_task_by_name(dados['name']):
            return {"message": "task name '{}' already exists.".format(dados['name'])}, 400 #Bad Request
        


        us = Task(**dados)
        us.save_task()
        return {'message': 'task created successfully!'}, 201 # Created
    

    