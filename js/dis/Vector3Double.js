/**
 * Section 5.3.34. Three double precision floating point values, x, y, and z
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.Vector3Double = function()
{
   /** X value */
   this.x = 0;

   /** Y value */
   this.y = 0;

   /** Z value */
   this.z = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.x = inputStream.readFloat64();
       this.y = inputStream.readFloat64();
       this.z = inputStream.readFloat64();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeFloat64(this.x);
       outputStream.writeFloat64(this.y);
       outputStream.writeFloat64(this.z);
};
}; // end of class
