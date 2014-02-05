/**
 * 5.2.44: Grid data record, a common abstract superclass for several subtypes 
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.GridAxisRecord = function()
{
   /** type of environmental sample */
   this.sampleType = 0;

   /** value that describes data representation */
   this.dataRepresentation = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.sampleType = inputStream.readUShort();
       this.dataRepresentation = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.sampleType);
       outputStream.writeUShort(this.dataRepresentation);
};
}; // end of class
