/**
 * 5.2.47.  Layer header.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.LayerHeader = function()
{
   /** Layer number */
   this.layerNumber = 0;

   /** Layer speccific information enumeration */
   this.layerSpecificInformaiton = 0;

   /** information length */
   this.length = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.layerNumber = inputStream.readUByte();
       this.layerSpecificInformaiton = inputStream.readUByte();
       this.length = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUByte(this.layerNumber);
       outputStream.writeUByte(this.layerSpecificInformaiton);
       outputStream.writeUShort(this.length);
};
}; // end of class
