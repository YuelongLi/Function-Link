import * as $ from "jquery";

class Portal{
   public static importFunc(port: number, dim: number):Link{
      return new Link(port, dim);
   }
}

class Link{
   port: number;
   private waiting = false;
   private reqQueue: (number | number[])[]=[];
   private values: (number | number[])[]=[];
   private callbackQueue: ((value:number|number[])=>void)[]=[];
   dim: number;
   constructor(port: number, reqDimensions: number) {
      this.port = port;
      this.dim = reqDimensions;
   }
   get(xs:number[]|number, onFinished:(value:number|number[])=>void){
      if(!this.waiting){
         this.waiting = true;
         this.post();
      }else{
         this.reqQueue.push(xs);
         this.callbackQueue.push(onFinished);
      }
   }

   /**
    * There should only be one instance of post running at
    * all times
    */
   private post(){
      let req = $.ajax({
         url: 'http://localhost:8080/singular',
         method: 'POST',
         // sends fields with filename mimetype etc
         data: JSON.stringify({at:this.reqQueue, dimension:this.dim}),
         // data: aFiles[0], // optional just sends the binary
         processData: false, // don't let jquery process the data
         contentType: false // let xhr set the content type
      });
      req.done((res)=>{
         this.values = res.value;
         let pass;
         while((pass=this.values.shift())!=undefined){
            this.reqQueue.shift();
            let callback = this.callbackQueue.shift();
            if(callback!=undefined)
               callback(pass);
         }
         if(this.reqQueue.length!=0){
            this.post();
         }else{
            this.waiting = false;
         }
      });
      req.fail((err)=>{
         if(err.status==416){
            let pass;
            while((pass=this.reqQueue.shift())!=undefined){
               let callback = this.callbackQueue.shift();
               if(callback!=undefined)
                  callback(NaN);
            }
            this.waiting = false;
         }
      })
   }
}

export {Portal, Link};