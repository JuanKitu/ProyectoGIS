import { colaDatos } from "../interfaces/interfaces";




export default class Queue {
    queue:colaDatos[]= [];
    constructor() {}
  
    enqueue(element:colaDatos) {
      this.queue.push(element);
      return this.queue;
    }
  
    dequeue() {
      const aux = this.queue.shift();

      if(aux != undefined){
        return aux
      }else{
        this.queue= []
      return this.queue[0] ;
      }
    }
  
    peek() {
      return this.queue[0];
    }
  
    size() {
      return this.queue.length;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    print() {
      return this.queue;
    }
    copy(unaCola:colaDatos[]){
      this.queue=unaCola;
    }
  };