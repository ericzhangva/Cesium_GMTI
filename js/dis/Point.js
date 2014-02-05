/**
 * x,y point
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.Point = function()
{
   /** x */
   this.x = 0;

   /** y */
   this.y = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.x = inputStream.readFloat32();
       this.y = inputStream.readFloat32();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeFloat32(this.x);
       outputStream.writeFloat32(this.y);
};
}; // end of class
