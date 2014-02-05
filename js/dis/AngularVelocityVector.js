/**
 * 5.2.2: angular velocity measured in radians per second out each of the entity's own coordinate axes.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.AngularVelocityVector = function()
{
   /** velocity about the x axis */
   this.x = 0;

   /** velocity about the y axis */
   this.y = 0;

   /** velocity about the zaxis */
   this.z = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.x = inputStream.readFloat32();
       this.y = inputStream.readFloat32();
       this.z = inputStream.readFloat32();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeFloat32(this.x);
       outputStream.writeFloat32(this.y);
       outputStream.writeFloat32(this.z);
};
}; // end of class
