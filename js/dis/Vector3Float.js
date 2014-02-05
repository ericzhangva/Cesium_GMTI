/**
 * Section 5.2.33. Three floating point values, x, y, and z
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.Vector3Float = function()
{
   /** X value */
   this.x = 0;

   /** y Value */
   this.y = 0;

   /** Z value */
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
