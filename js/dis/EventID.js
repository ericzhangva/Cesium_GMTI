/**
 * Section 5.2.18. Identifies a unique event in a simulation via the combination of three values
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.EventID = function()
{
   /** The site ID */
   this.site = 0;

   /** The application ID */
   this.application = 0;

   /** the number of the event */
   this.eventNumber = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.site = inputStream.readUShort();
       this.application = inputStream.readUShort();
       this.eventNumber = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.site);
       outputStream.writeUShort(this.application);
       outputStream.writeUShort(this.eventNumber);
};
}; // end of class
