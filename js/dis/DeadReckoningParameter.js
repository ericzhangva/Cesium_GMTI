/**
 * represents values used in dead reckoning algorithms
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.DeadReckoningParameter = function()
{
   /** enumeration of what dead reckoning algorighm to use */
   this.deadReckoningAlgorithm = 0;

   /** other parameters to use in the dead reckoning algorithm */
   this.otherParameters = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

   /** Linear acceleration of the entity */
   this.entityLinearAcceleration = new dis.Vector3Float(); 

   /** angular velocity of the entity */
   this.entityAngularVelocity = new dis.Vector3Float(); 

  this.initFromBinaryDIS = function(inputStream)
  {

       this.deadReckoningAlgorithm = inputStream.readUByte();
       for(var idx = 0; idx < 15; idx++)
       {
          this.otherParameters[ idx ] = inputStream.readByte();
       }
       this.entityLinearAcceleration.initFromBinaryDIS(inputStream);
       this.entityAngularVelocity.initFromBinaryDIS(inputStream);
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUByte(this.deadReckoningAlgorithm);
       for(var idx = 0; idx < 15; idx++)
       {
          outputStream.writeByte(this.otherParameters[ idx ] );
       }
       this.entityLinearAcceleration.encodeToBinaryDIS(outputStream);
       this.entityAngularVelocity.encodeToBinaryDIS(outputStream);
};
}; // end of class
