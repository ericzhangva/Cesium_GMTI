/**
 * One track/jam target
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.TrackJamTarget = function()
{
   /** track/jam target */
   this.trackJam = new dis.EntityID(); 

   /** Emitter ID */
   this.emitterID = 0;

   /** beam ID */
   this.beamID = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.trackJam.initFromBinaryDIS(inputStream);
       this.emitterID = inputStream.readUByte();
       this.beamID = inputStream.readUByte();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       this.trackJam.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.emitterID);
       outputStream.writeUByte(this.beamID);
};
}; // end of class
