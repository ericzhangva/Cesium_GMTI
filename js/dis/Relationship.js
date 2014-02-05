/**
 * 5.2.56. Purpose for joinging two entities
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.Relationship = function()
{
   /** Nature of join */
   this.nature = 0;

   /** position of join */
   this.position = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.nature = inputStream.readUShort();
       this.position = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.nature);
       outputStream.writeUShort(this.position);
};
}; // end of class
