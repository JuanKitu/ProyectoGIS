"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensayo_controllers_1 = __importDefault(require("../controllers/ensayo.controllers"));
const router = express_1.Router();
const controller = new ensayo_controllers_1.default();
router.get('/', controller.getAll);
router.get('/:idEnsayo', controller.getById);
router.post('/', controller.new);
router.delete('/:idEnsayo', controller.delete);
router.put('/:idEnsayo', controller.change);
router.post('/:idEnsayo', controller.crearParametros);
router.put('/:idEnsayo/parametros/:idParametro', controller.EditAParametro);
router.delete('/:idEnsayo/parametros/:idParametro', controller.deleteAParametro);
router.get('/:idEnsayo/parametros', controller.getAllParametros);
router.get('/:idEnsayo/parametros/:idParametro', controller.getAParametro);
router.get('/:idEnsayo/ambiente', controller.getAllAmbiente);
router.get('/:idEnsayo/ambiente/:idAmbiente', controller.getAnAmbiente);
/* router.get('/prueba',(req,res)=>{
  const server = Server.instance;
  const hijoPrueba = fork('./dist/testChildProcess.js');
  const unObservable = new Observable(subscriber=>{
    hijoPrueba.on('message',(M:any)=>{
      //console.log(typeof(M));
      if(typeof(M) =="number" ){
        console.log('ENTRANDO AL IF');
        server.io.emit('prueba',M);
        subscriber.next(M);
        //console.log(M);
      }else if(typeof(M) == "string"){
        console.log('ENTRANDO AL ELSE');
        //console.log(M);
        hijoPrueba.kill();
        subscriber.complete();
      }
      
    })
  });
  unObservable.subscribe(data=>{
    console.log(data);
  },
  error=>{

  },
  ()=>{
    console.log('FINNnNNn');
  })
 
  
  

}) */
exports.default = router;
