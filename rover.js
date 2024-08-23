class Rover {
   // Write code here!
   constructor(position)   {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts =110;
   }

   receiveMessage(message) {
      let results = message.commands.map(command => {
         if(command.commandType === 'STATUS_CHECK') {

         return {
             completed: true, 
             roverStatus: {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
             }
            };
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode =command.value;
            return { completed: true };
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER')
         
      {
         return { completed: false };
      } else {
         this.position = command.value;
         return { completed : true };
      }
   } else {
      return { completed: true };
   }

   });

      return {
         message: message.name,
         results: results

      };
   }
}

module.exports = Rover;