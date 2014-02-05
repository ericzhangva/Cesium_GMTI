/**
 * discrete ostional relationsihip 
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.NamedLocation = function()
{
   /** station name enumeration */
   this.stationName = 0;

   /** station number */
   this.stationNumber = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.stationName = inputStream.readUShort();
       this.stationNumber = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.stationName);
       outputStream.writeUShort(this.stationNumber);
};
}; // end of class
