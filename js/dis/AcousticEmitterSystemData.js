/**
 * Used in the UA pdu; ties together an emmitter and a location. This requires manual cleanup; the beam data should not be attached to each emitter system.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.AcousticEmitterSystemData = function()
{
   /** Length of emitter system data */
   this.emitterSystemDataLength = 0;

   /** Number of beams */
   this.numberOfBeams = 0;

   /** padding */
   this.pad2 = 0;

   /** This field shall specify the system for a particular UA emitter. */
   this.acousticEmitterSystem = new dis.AcousticEmitterSystem(); 

   /** Represents the location wrt the entity */
   this.emitterLocation = new dis.Vector3Float(); 

   /** For each beam in numberOfBeams, an emitter system. This is not right--the beam records need to be at the end of the PDU, rather than attached to each system. */
    this.beamRecords = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.emitterSystemDataLength = inputStream.readUByte();
       this.numberOfBeams = inputStream.readUByte();
       this.pad2 = inputStream.readUShort();
       this.acousticEmitterSystem.initFromBinaryDIS(inputStream);
       this.emitterLocation.initFromBinaryDIS(inputStream);
       for(var idx = 0; idx < this.numberOfBeams; idx++)
       {
           var anX = new dis.AcousticBeamData();
           anX.initFromBinaryDIS(inputStream);
           this.beamRecords.push(anX);
       }

  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUByte(this.emitterSystemDataLength);
       outputStream.writeUByte(this.numberOfBeams);
       outputStream.writeUShort(this.pad2);
       this.acousticEmitterSystem.encodeToBinaryDIS(outputStream);
       this.emitterLocation.encodeToBinaryDIS(outputStream);
       for(var idx = 0; idx < this.beamRecords.length; idx++)
       {
           beamRecords[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
